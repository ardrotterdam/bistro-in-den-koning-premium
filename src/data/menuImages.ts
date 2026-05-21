import { galleryImages, wixImage } from './galleryImages'

export type MenuSeason = 'Lente' | 'Zomer' | 'Herfst' | 'Winter'
export type MenuCategory = 'Voorgerechten' | 'Hoofdgerechten' | 'Desserts'

export function getGalleryImage(id: number) {
  return galleryImages.find((img) => img.id === id)
}

/** Cinematic crop for menu accents — wide, low height */
export function menuCrop(id: number, width: number, height: number): string | undefined {
  const img = getGalleryImage(id)
  if (!img) return undefined
  return wixImage(img.src, width, height)
}

/** Season tab backgrounds — authentic dish photography only */
export const seasonTabImages: Partial<Record<MenuSeason, { id: number; position?: string }>> = {
  Lente:  { id: 4,  position: 'center 45%' },   // Asperge 'Mimosa'
  Herfst: { id: 8,  position: 'center 40%' },   // Wildplank
  Winter: { id: 37, position: 'center 35%' },   // Gevulde Vissoep
}

/** Small category header accents — one per column, per season */
export const categoryHeaderImages: Record<MenuSeason, Partial<Record<MenuCategory, number>>> = {
  Lente: {
    Voorgerechten:  4,   // Asperge 'Mimosa'
    Hoofdgerechten: 24,  // Zeewolf
    Desserts:       3,   // 'Bijna Zomer' Parfait
  },
  Zomer: {
    Voorgerechten:  27,  // Burrata & Granité
    Hoofdgerechten: 6,   // Varkenswangetjes
    Desserts:       21,  // Crème Brûleé
  },
  Herfst: {
    Voorgerechten:  8,   // Wildplank
    Hoofdgerechten: 18,  // Poussin
    Desserts:       35,  // Opa's Appeltaart
  },
  Winter: {
    Voorgerechten:  37,  // Gevulde Vissoep
    Hoofdgerechten: 6,   // Varkenswangetjes
    Desserts:       31,  // Riz Condé met Kersen
  },
}

/**
 * Dish-level image accents — only where menu item closely matches gallery caption.
 * Omit entries rather than force a visual mismatch.
 */
export const dishAccentImages: Record<MenuSeason, Partial<Record<string, number>>> = {
  Lente: {
    'Zeeuwse mosselen':  38,
    'Lente-asperges':    4,
    'Kaasplankje':       1,
    'Aardbeienvacherin': 3,
  },
  Zomer: {
    'Burrata':           30,
    'Varkensbuik':       6,
    'Crème brûlée':      21,
  },
  Herfst: {
    'Tarte tatin':       35,
    'Chocolade fondant': 26,
  },
  Winter: {
    'Stoofvlees à la Flamande': 6,
    'Warme rijstepap':   31,
  },
}

/** Featured image for Seizoenspecialiteit cards — only exact matches */
export const specialtyDishImages: Partial<Record<string, number>> = {
  // 'Gegrilde kreeft' intentionally omitted — no authentic lobster image
}
