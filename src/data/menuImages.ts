import { galleryImages, wixImage } from './galleryImages'

export type MenuSeason   = 'Lente' | 'Zomer' | 'Herfst' | 'Winter'
export type MenuCategory = 'Voorgerechten' | 'Hoofdgerechten' | 'Desserts'

export interface MenuImageSource {
  galleryId: number
  alt:       string
  /** CSS object-position; tunes the portrait crop on the underlying photo */
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

/** Portrait crop helper for menu accents */
export function menuCrop(id: number, width: number, height: number): string | undefined {
  const img = getGalleryImage(id)
  if (!img) return undefined
  return wixImage(img.src, width, height)
}

export function resolveMenuImageSrc(
  image:  MenuImageSource,
  width:  number,
  height: number,
): string | undefined {
  return menuCrop(image.galleryId, width, height)
}

/**
 * Sparse editorial image accents for the seasonal menu.
 *
 * Rules:
 *  - One floating dish image per season — no more.
 *  - Only close-up food photos. Never people, hands, or interior shots.
 *  - The accent reads as a quiet editorial moment, not a gallery tile.
 */
export const menuImageAccents: Record<MenuSeason, Partial<Record<MenuCategory, MenuImageAccent[]>>> = {
  Lente: {
    Voorgerechten: [
      {
        afterDish: 'Lente-asperges',
        align:     'right',
        image:     { galleryId: 4, alt: "Asperge 'Mimosa'", position: 'center 45%' },
      },
    ],
  },
  Zomer: {
    Desserts: [
      {
        afterDish: 'Crème brûlée',
        align:     'left',
        image:     { galleryId: 21, alt: 'Crème brûlée', position: 'center 45%' },
      },
    ],
  },
  Herfst: {
    Desserts: [
      {
        afterDish: 'Tarte tatin',
        align:     'right',
        image:     { galleryId: 35, alt: "Opa's appeltaart", position: 'center 50%' },
      },
    ],
  },
  Winter: {
    Voorgerechten: [
      {
        afterDish: 'Bisque de homard',
        align:     'left',
        image:     { galleryId: 37, alt: 'Gevulde vissoep', position: 'center 40%' },
      },
    ],
  },
}
