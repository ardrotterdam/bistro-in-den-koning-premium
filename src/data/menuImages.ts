import { galleryImages, wixImage } from './galleryImages'

export type MenuSeason = 'Lente' | 'Zomer' | 'Herfst' | 'Winter'
export type MenuCategory = 'Voorgerechten' | 'Hoofdgerechten' | 'Desserts'

export type MenuImageSource =
  | {
      kind:       'real'
      galleryId:  number
      alt:        string
      position?:  string
    }
  | {
      kind:      'generated'
      src:       string
      alt:       string
      position?: string
    }

export interface MenuImageAccent {
  afterDish: string
  align:     'left' | 'right'
  image:     MenuImageSource
}

export function getGalleryImage(id: number) {
  return galleryImages.find((img) => img.id === id)
}

/** Cinematic crop for menu accents — wide, low height */
export function menuCrop(id: number, width: number, height: number): string | undefined {
  const img = getGalleryImage(id)
  if (!img) return undefined
  return wixImage(img.src, width, height)
}

export function resolveMenuImageSrc(image: MenuImageSource, width: number, height: number): string | undefined {
  return image.kind === 'real'
    ? menuCrop(image.galleryId, width, height)
    : image.src
}

/**
 * Sparse editorial image accents for the seasonal menu.
 * Real images are Bistro In den Koning gallery photos; generated entries are local placeholders
 * used only where no matching real dish photo is available.
 */
export const menuImageAccents: Record<MenuSeason, Partial<Record<MenuCategory, MenuImageAccent[]>>> = {
  Lente: {
    Voorgerechten: [
      {
        afterDish: 'Lente-asperges',
        align:     'right',
        // Real Bistro In den Koning photo: Asperge 'Mimosa'
        image:     { kind: 'real', galleryId: 4, alt: "Asperge 'Mimosa'", position: 'center 45%' },
      },
    ],
    Desserts: [
      {
        afterDish: 'Aardbeienvacherin',
        align:     'left',
        // Real Bistro In den Koning photo: 'Bijna Zomer' parfait
        image:     { kind: 'real', galleryId: 3, alt: 'Witte chocolade parfait met aardbei en framboos' },
      },
    ],
  },
  Zomer: {
    Voorgerechten: [
      {
        afterDish: 'Ceviche van zeebaars',
        align:     'right',
        // Generated placeholder: no matching real Bistro In den Koning ceviche photo available
        image:     {
          kind: 'generated',
          src:  '/images/menu/generated-ceviche-zeebaars.jpg',
          alt:  'Ceviche van zeebaars met limoen, koriander en avocado',
        },
      },
    ],
    Hoofdgerechten: [
      {
        afterDish: 'Gegrilde kreeft',
        align:     'left',
        // Generated placeholder: no matching real Bistro In den Koning lobster photo available
        image:     {
          kind: 'generated',
          src:  '/images/menu/generated-gegrilde-kreeft.jpg',
          alt:  'Gegrilde Zeeuwse kreeft met venkel en saffraanboter',
        },
      },
    ],
    Desserts: [
      {
        afterDish: 'Crème brûlée',
        align:     'right',
        // Real Bistro In den Koning photo: Crème Brûleé
        image:     { kind: 'real', galleryId: 21, alt: 'Crème brûlée', position: 'center 45%' },
      },
    ],
  },
  Herfst: {
    Hoofdgerechten: [
      {
        afterDish: 'Haas à la royale',
        align:     'right',
        // Real Bistro In den Koning photo: Wildplank, used as a seasonal game accent
        image:     { kind: 'real', galleryId: 8, alt: 'Wildplank', position: 'center 45%' },
      },
    ],
    Desserts: [
      {
        afterDish: 'Tarte tatin',
        align:     'left',
        // Real Bistro In den Koning photo: Opa's Appeltaart
        image:     { kind: 'real', galleryId: 35, alt: "Opa's appeltaart", position: 'center 50%' },
      },
    ],
  },
  Winter: {
    Voorgerechten: [
      {
        afterDish: 'Bisque de homard',
        align:     'left',
        // Real Bistro In den Koning photo: Gevulde Vissoep, used as a winter seafood accent
        image:     { kind: 'real', galleryId: 37, alt: 'Gevulde vissoep', position: 'center 35%' },
      },
    ],
    Hoofdgerechten: [
      {
        afterDish: 'Stoofvlees à la Flamande',
        align:     'right',
        // Real Bistro In den Koning photo: Varkenswangetjes, used as a slow-braised dish accent
        image:     { kind: 'real', galleryId: 6, alt: 'Varkenswangetjes', position: 'center 45%' },
      },
    ],
  },
}
