# @walkingkangaroo/shared

Shared pieces for Walking Kangaroo product sites. Private to this workspace.

## What's in it

- `WkSignature.astro`: the Walking Kangaroo signature for a footer. A link to
  https://walkingkangaroo.com, named "Made by Walking Kangaroo", showing a logo file from the
  brand pack.
- `brand/`: the eight brand-pack logo files it uses (4 variants, small horizontal and stacked),
  copied in unchanged. Never edit them. Re-copy from the brand pack if the pack changes.

## Use

Add the package to the product site's `package.json`, then run `pnpm install`:

```json
"dependencies": { "@walkingkangaroo/shared": "workspace:*" }
```

```astro
---
import WkSignature from '@walkingkangaroo/shared/WkSignature.astro';
---
<footer>
  <WkSignature variant="reversed" />
</footer>
```

Props:

- `variant`: `'primary'` (default) or `'ink'` on light backgrounds; `'reversed'` or `'paper'` on
  dark ones (`paper` suits a Rust background). The signature never takes the product's colours
  ([0028](../../docs/decisions/0028-signature-uses-brand-pack-files.md)).
- `layout`: `'horizontal'` (default, the small horizontal logo) or `'stacked'`.
- `class`: passed to the link, for placing it.

## Size and room to leave

The logo is 120 px wide in both layouts, with one foot length of clear space around it, as the brand
pack asks. That makes the whole link about 154 px wide (horizontal, 17 px of clear space) or about
173 px wide (stacked, 26 px of clear space), so leave room for that width in the footer. Grant chose
on 2026-10-14 to keep the brand pack's full clear space rather than shrink it. The wordmark is
outlined in the logo files, so the site doesn't need Outfit for it.
