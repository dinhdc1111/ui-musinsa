import campaignPlaceholder from '@/assets/images/campaign-placeholder.svg'
import type { Promotion } from '@/types/promotion'

export const mockPromotions = [
  {
    id: 'promotion-new-season',
    slug: 'new-season-edit',
    eyebrow: 'New season',
    title: 'A considered edit for what comes next',
    description: 'Fictional campaign content used to validate the UI fixture boundary.',
    image: {
      src: campaignPlaceholder,
      alt: 'Abstract neutral placeholder for a future seasonal campaign',
      width: 1600,
      height: 900,
    },
    theme: 'dark',
    cta: {
      label: 'Explore the edit',
      to: '/promotions/new-season-edit',
    },
  },
] as const satisfies readonly Promotion[]
