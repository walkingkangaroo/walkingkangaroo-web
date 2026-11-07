// Who publishes PanePilot, and how to reach them: the "we" of the terms and the privacy policy.
// Moved from the app's src/lib/legal/publisher.ts with the two documents (decision 0053), so the
// two documents and this file change together. Google's OAuth consent screen names the same entity.

export const PUBLISHER = {
  /** The entity a customer would complain to, and the "we" of both documents. */
  name: 'Walking Kangaroo',
  /** Null hides the line rather than printing a placeholder. */
  abn: '91 957 676 702' as string | null,
  /** Privacy requests, access and correction requests, and complaints. */
  privacyEmail: 'privacy@walkingkangaroo.com',
  /** Everything else: billing, support, onboarding. */
  supportEmail: 'support@walkingkangaroo.com',
  website: 'https://walkingkangaroo.com',
  /** The partnership's main business location on the ABN register is SA 5453. */
  jurisdiction: 'South Australia',
  country: 'Australia',
} as const;

/**
 * The day either document last changed substantively, as an ISO day. Bump it in the same commit
 * as a change to either one: a policy whose date predates its own text is what a regulator notices.
 */
export const LEGAL_EFFECTIVE_DATE = '2026-11-01';

/** "1 November 2026": the form both documents print. Formatted as UTC so the day doesn't shift. */
export function formatLegalDate(isoDay: string): string {
  const [year, month, day] = isoDay.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
