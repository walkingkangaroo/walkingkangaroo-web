// Facts the pages share: the links to the app, the contact line and the page's main button. The
// price and the trial are in offer.ts.

export const APP_URL = 'https://app.panepilot.au';

const contact = 'hello@panepilot.au';

/** False until self-serve sign-up opens (decision 0052). It switches the main button and hides "Sign in". */
const isOpen = false;

const trialUrl = `${APP_URL}/sign-in`;
const interestUrl = `mailto:${contact}?subject=${encodeURIComponent('Tell me when PanePilot opens')}`;

export const site = {
  name: 'PanePilot',
  url: 'https://panepilot.au/',
  isOpen,
  signInUrl: `${APP_URL}/sign-in`,
  /** "Start your free trial" goes to the app's sign-in, where sign-up starts. */
  trialUrl,
  /** "Tell me when it opens": an email to the contact address, with the subject filled in. */
  interestUrl,
  /** The site's own pages since decision 0053; the app's /privacy and /terms redirect here. */
  privacyUrl: '/privacy',
  termsUrl: '/terms',
  /** Decision 0041. support@, sales@ and accounts@ forward to the same inbox but aren't shown. */
  contact,
} as const;

/** The page's main button, in the header, the hero, the pricing band and the 404 page. */
export const cta = isOpen
  ? { label: 'Start your free trial', href: trialUrl }
  : { label: 'Tell me when it opens', href: interestUrl };
