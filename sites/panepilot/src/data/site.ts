// Facts the pages share: the links to the app and the contact line. The price and the trial are in
// offer.ts.

export const APP_URL = 'https://app.panepilot.au';

export const site = {
  name: 'PanePilot',
  url: 'https://panepilot.au/',
  signInUrl: `${APP_URL}/sign-in`,
  /** "Start your free trial" goes to the app's sign-in, where sign-up starts. */
  trialUrl: `${APP_URL}/sign-in`,
  privacyUrl: `${APP_URL}/privacy`,
  termsUrl: `${APP_URL}/terms`,
  /** Decision 0041. support@, sales@ and accounts@ forward to the same inbox but aren't shown. */
  contact: 'hello@panepilot.au',
} as const;
