import kStarsImage from '@/assets/images/home/k-stars.jpg'
import kStylePicksImage from '@/assets/images/home/k-style-picks.jpg'
import keithHaringImage from '@/assets/images/home/keith-haring-collab.jpg'
import officeEditImage from '@/assets/images/home/office-edit.jpg'
import shoesImage from '@/assets/images/home/shoes.jpg'
import tankImage from '@/assets/images/home/tank.jpg'
import trendingPantsImage from '@/assets/images/home/trending-pants.jpg'

export interface HomeCampaign {
  id: string
  title: string
  subtitle: string
  image: string
  to: string
  position?: string
}

export interface HomeProduct {
  id: string
  slug: string
  brand: string
  name: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  badge?: string
}

export const heroCampaigns: readonly HomeCampaign[] = [
  {
    id: 'office-edit',
    title: "New Season's Office Edit",
    subtitle: 'Curated for the new season',
    image: officeEditImage,
    to: '/promotions/office-edit',
  },
  {
    id: 'k-stars',
    title: 'Spotted on K-Stars',
    subtitle: 'Real looks from your favorite stars',
    image: kStarsImage,
    to: '/promotions/k-stars',
  },
  {
    id: 'new-to-musinsa',
    title: 'New to MUSINSA? Take a Look!',
    subtitle: 'Everything you need to shop Korean fashion',
    image: shoesImage,
    to: '/promotions/welcome-guide',
  },
]

export const campaignTiles = [
  { id: 'coupon', label: 'First Order Coupon', image: shoesImage },
  { id: 'tour', label: 'K-Style Tour: UP TO 80%', image: tankImage },
  { id: 'helinox', label: 'Helinox Collab', image: kStylePicksImage },
  { id: 'office', label: 'The Office Edit', image: officeEditImage },
  { id: 'extra', label: 'Extra 20% Off', image: keithHaringImage },
  { id: 'brand', label: 'Brand Day R3', image: trendingPantsImage },
  { id: 'signature', label: 'Signature Deal', image: kStarsImage },
  { id: 'haring', label: 'Keith Haring', image: keithHaringImage },
  { id: 'celeb', label: 'K-Celeb Picks', image: kStylePicksImage },
  { id: 'seoul', label: 'Seoul, Standard', image: trendingPantsImage },
  { id: 'idol', label: 'K-Idol Picks', image: tankImage },
  { id: 'special', label: 'MUSINSA SPECIAL', image: kStarsImage },
] as const

export const hotTopics = [
  {
    id: 'trending-pants',
    title: 'Trending Now: Pants',
    subtitle: 'MUSINSA STANDARD',
    image: trendingPantsImage,
  },
  {
    id: 'k-style-picks',
    title: 'A K-Style Tour Pick',
    subtitle: 'MUSINSA STANDARD',
    image: kStylePicksImage,
  },
  {
    id: 'keith-haring',
    title: 'Keith Haring Collab',
    subtitle: 'MUSINSA STANDARD',
    image: keithHaringImage,
  },
] as const

const productImages = [
  shoesImage,
  kStylePicksImage,
  trendingPantsImage,
  tankImage,
  officeEditImage,
  kStarsImage,
  keithHaringImage,
] as const

const productSeeds = [
  ['ROCKFISH WEATHERWEAR', 'Bliss lace-up sneakers', 2_780_000, 3_475_000, 20],
  ['DIMITRI BLACK', 'Heavy oversized leather hooded zip-up', 861_000, 1_435_000, 40],
  ['1989STANDARD', 'Small logo hooded sweatshirt', 1_321_000, 1_554_000, 15],
  ['XERO', 'Deep one-tuck wide sweat pants', 883_000, 1_104_000, 20],
  ['DECIET WOMEN', 'Low-rise capri jeans', 1_018_000, 1_272_000, 20],
  ['GLOWNY', 'Classic scoop-neck sleeveless top', 970_000, 1_078_000, 10],
  ['ILLIGO', 'Bow chiffon mini dress', 1_477_000, 1_846_000, 20],
  ['DRAW FIT', 'Oversized wool jacket', 971_000, undefined, undefined],
  ['TANSANMAGNESIUM', 'Horse rabbit long-sleeve graphic tee', 1_284_000, 1_605_000, 20],
  ['UNDEROFF', 'Roll-up sleeve pocket T-shirt', 742_000, undefined, undefined],
  ['AMOU', 'Trouble half T-shirt gray', 376_000, 470_000, 20],
  ['UNTITLED SEOUL', 'Unicorn ringer crop short sleeve', 658_000, 731_000, 10],
  ['PLEASENOFOLLOW', 'Amelia long halter sleeve top', 1_439_000, undefined, undefined],
  ['HILLDA', 'Silky swan blouse', 1_727_000, undefined, undefined],
  ['WACKY WILLY', 'Womens big graphic sweatshirt', 1_255_000, 1_394_000, 10],
  ['GANNI', 'Graphic wool mix baseball knit', 9_482_000, undefined, undefined],
  ['ALYSS', 'Faded check crop shirt', 1_081_000, 1_201_000, 10],
  ['MUSINSA STANDARD', 'Relaxed straight denim pants', 809_000, 898_000, 10],
] as const

export const homeProducts: readonly HomeProduct[] = productSeeds.map((seed, index) => ({
  id: `home-product-${index + 1}`,
  slug: `home-product-${index + 1}`,
  brand: seed[0],
  name: seed[1],
  price: seed[2],
  originalPrice: seed[3],
  discount: seed[4],
  image: productImages[index % productImages.length]!,
  badge: index < 12 ? 'K-Style Tour' : undefined,
}))

export const popularBrands = [
  'MUSINSA STANDARD',
  'GAKKAI UNIONS',
  'MUSINSA STANDARD WOMAN',
  'CRANK',
  'ILLIGO',
  'FENNEC',
  'LOW CLASSIC',
  'AAKAM',
] as const
