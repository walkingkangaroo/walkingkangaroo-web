#!/usr/bin/env bash
# Runs the tracker CLI for this project: bash .claude/scripts/tracker.sh <command> [args...]
# /do, /shape, /retro and the tracker skill use it for every issue read and write.
# Comes from process-template and is the same in every project. Don't edit it in a project.
#
# Reads two facts from docs/process/project.env:
#   TRACKER_PROJECT  the project's folder in the tracker vault, for example "PanePilot MVP"
#   TRACKER_REMOTE   where to clone the tracker from when there's no copy on this machine
#
# Finds the tracker in this order:
#   1. $TRACKER_DIR, when it holds _tracker/tracker.mjs (Grant's PC sets it to the vault)
#   2. a "tracker" folder beside this repo's main checkout (also right for a worktree elsewhere)
#   3. otherwise clones TRACKER_REMOTE to that folder
# The CLI itself pulls before reading and commits and pushes every change.
set -u

# fact KEY: the whole value of KEY in docs/process/project.env (spaces allowed, quotes optional).
fact() {
  [ -f docs/process/project.env ] || return 0
  sed -n "s/^$1=//p" docs/process/project.env | head -n 1 | tr -d '\r' |
    sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^"\(.*\)"$/\1/' -e "s/^'\(.*\)'\$/\1/"
}

command -v node >/dev/null 2>&1 || {
  echo "tracker.sh: node is not installed or not on PATH. The tracker CLI needs Node.js 18 or later." >&2
  exit 1
}

project=$(fact TRACKER_PROJECT)
remote=$(fact TRACKER_REMOTE)
[ -n "$project" ] || {
  echo "tracker.sh: docs/process/project.env has no TRACKER_PROJECT. Add the project's folder name in the tracker vault." >&2
  exit 1
}

dir=""
if [ -n "${TRACKER_DIR:-}" ] && [ -f "$TRACKER_DIR/_tracker/tracker.mjs" ]; then
  dir=$TRACKER_DIR
else
  # The main checkout's parent, even when this runs in a worktree somewhere else.
  common=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null || true)
  if [ -n "$common" ]; then
    beside="$(dirname "$(dirname "$common")")/tracker"
  else
    beside="$(cd .. && pwd)/tracker"
  fi
  if [ ! -f "$beside/_tracker/tracker.mjs" ]; then
    [ -n "$remote" ] || {
      echo "tracker.sh: no tracker at $beside, and docs/process/project.env has no TRACKER_REMOTE to clone it from." >&2
      exit 1
    }
    if [ -e "$beside" ] && [ -n "$(ls -A "$beside" 2>/dev/null)" ]; then
      echo "tracker.sh: $beside exists but isn't the tracker. Set TRACKER_DIR, or move that folder." >&2
      exit 1
    fi
    echo "tracker.sh: cloning the tracker into $beside" >&2
    git clone --quiet "$remote" "$beside" >&2 || {
      echo "tracker.sh: could not clone $remote. Check this session can reach the tracker repo." >&2
      exit 1
    }
  fi
  dir=$beside
fi

TRACKER_PROJECT="$project" TRACKER_BY="${TRACKER_BY:-claude}" exec node "$dir/_tracker/tracker.mjs" "$@"
