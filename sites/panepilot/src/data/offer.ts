// The offer: the price, the trial and the GST note. The one place they are written, so a price
// change is one edit here. The page, the hero's trial line, the pricing band, the questions and the
// JSON-LD all read from it. (PanePilot decisions 0057, 0058 and 0062.)

const price = 49;
const currency = 'AUD';
const priceLabel = `A$${price}`;
const billing = 'a month';
const gstNote = 'No GST is charged';
const noGst = 'no GST';
const trialDays = 30;

export const offer = {
  /** Whole dollars, billed monthly. */
  price,
  /** ISO code, for the JSON-LD. */
  currency,
  /** How the price is written on the page. */
  priceLabel,
  billing,
  /** Sentence form, for the pricing band. */
  gstNote,
  /** Inline form, for running text and the JSON-LD. */
  noGst,
  /** Days free from sign-up, with no card. */
  trialDays,
  /** The hero's line beside the trial button: "30 days free, no card. A$49 a month after that." */
  trialLine: `${trialDays} days free, no card. ${priceLabel} ${billing} after that.`,
  /** "A$49 a month": the price with its billing period. */
  priceLine: `${priceLabel} ${billing}`,
  /** The JSON-LD offer's description. */
  schemaDescription: `${trialDays} days free, then ${priceLabel} ${billing}, ${noGst}`,
} as const;
