import { DonateCtaContent } from "@/types/donate/donateCta.types";

export const DONATE_CTA_CONTENT: DonateCtaContent = {
  heading: 'A Small Act. A Lifelong Awakening.',
  paragraphs: [
    'When you support Bodhi International Montessori School, you are not simply giving to an institution. You are helping shape a human life. In a place where compassion has long been part of history and identity, your generosity becomes part of something meaningful and lasting. It creates opportunity where it is needed most and brings hope where it can transform futures.',
    'Together, we can ensure that awakening is not a privilege for a few, but a possibility for every child.',
  ],
  buttonLabel: 'Donate Now',
  buttonHref: '/donate',
  image: {
    src: '/donate/sprout-tree.svg',
    alt: 'A sprouting plant symbolising growth and hope',
  },
}