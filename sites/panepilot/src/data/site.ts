// Facts the pages share. Pricing and the links to the app read from here so a change is one edit.

export const APP_URL = 'https://app.panepilot.au';

export const site = {
  name: 'PanePilot',
  url: 'https://panepilot.au/',
  signInUrl: `${APP_URL}/sign-in`,
  /** "Start your free trial" goes to the app's sign-in, where sign-up starts. */
  trialUrl: `${APP_URL}/sign-in`,
  privacyUrl: `${APP_URL}/privacy`,
  termsUrl: `${APP_URL}/terms`,
  /** Decision 0041: the launch issue swaps this for hello@panepilot.au once it receives mail. */
  contact: '[TODO: contact address]',
  price: {
    /** Whole dollars a month, no GST. */
    amount: 49,
    currency: 'AUD',
    /** How the price is written on the page. */
    display: 'A$49',
  },
  trialDays: 30,
} as const;
