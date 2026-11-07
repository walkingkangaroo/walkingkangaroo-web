// The offer: the price, the founders' price, the trial and the GST note (JSON-LD only; the page
// doesn't mention GST). The one place they are written, so a price change is one edit here. The
// page, the hero's line, the pricing band, the questions and the JSON-LD all read from it. (PanePilot decisions 0057, 0058 and 0062; the prices
// are decision 0052.)

const price = 39;
const currency = 'AUD';
const priceLabel = `A$${price}`;
const billing = 'a month';
const noGst = 'no GST';
const trialDays = 30;
/** When self-serve sign-up opens, for the hero's line until then. */
const opens = 'Q1 2027';

/** Businesses that sign up (start a trial) before the deadline keep this price while they stay subscribed. */
const foundersPrice = 27;
const foundersLabel = `A$${foundersPrice}`;
/** Keep this date: an Australian "limited time" offer that keeps being extended can mislead. */
const foundersUntil = '30 June 2027';
/** The last day the founders' price can be had, for the JSON-LD. */
const foundersUntilIso = '2027-06-30';

export const offer = {
  /** Whole dollars, billed monthly. */
  price,
  /** ISO code, for the JSON-LD. */
  currency,
  /** How the price is written on the page. */
  priceLabel,
  billing,
  /** For the JSON-LD. The page itself doesn't mention GST. */
  noGst,
  /** Days free from sign-up, with no card. */
  trialDays,
  opens,
  foundersPrice,
  foundersUntil,
  foundersUntilIso,
  /** The hero's line beside the trial button: "30 days free, no card. Founders' price A$27 a month until 30 June 2027." */
  trialLine: `${trialDays} days free, no card. Founders' price ${foundersLabel} ${billing} until ${foundersUntil}.`,
  /** The hero's line until sign-up opens: "Opening in Q1 2027. Founders' price A$27 a month." */
  openingLine: `Opening in ${opens}. Founders' price ${foundersLabel} ${billing}.`,
  /** "A$39 a month": the price with its billing period. */
  priceLine: `${priceLabel} ${billing}`,
  /** The pricing band's founders' line. */
  foundersLine: `Founders' price ${foundersLabel} ${billing}, for as long as you're subscribed, if you sign up before ${foundersUntil}. A trial started before then counts.`,
  /** The JSON-LD offers' descriptions. */
  schemaDescription: `${trialDays} days free, then ${priceLabel} ${billing}, ${noGst}`,
  foundersSchemaDescription: `Founders' price: ${trialDays} days free, then ${foundersLabel} ${billing} for as long as you stay subscribed, ${noGst}. For sign-ups before ${foundersUntil}.`,
} as const;
