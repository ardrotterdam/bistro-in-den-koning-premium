import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pgids = [
  'jtefkht7-59ca0eb6-88e0-4abe-8ad0-3b9cd23225ff',
  'jtefkht7-851fb2f4-e2d0-495e-ade8-aa98525b55c2',
  'jtefkht7-3ca38c3e-c10f-48ca-9ceb-c913be3349ed',
  'jtefkht7-8de14c1a-7c22-46cb-9764-d59e6e4a783b',
  'jtefkht7-acff2b61-fcaf-46f5-9d49-9743508b6566',
  'jtefkht7-46693841-62b8-4bf0-9a1f-cba10a337751',
  'jtefkht7-da7680e6-22c5-40d4-b973-8118543c66dc',
  'jtefkht7-5f5466e0-c260-4d44-8429-8ea8e29dab37',
  'jtefkht7-90b27686-b258-46e8-bac1-2fa5109ea46a',
  'jtefkht7-6b729dd7-eff6-4fad-a781-5da1f23ca3d0',
  'jtefkht7-e298a822-7890-4b8c-a3a0-3d30ce10ae39',
  'jtefkht7-af7eed4e-66bc-4529-8b33-329eba681c85',
  'jtefkht7-3cc0f055-a933-4798-a238-ffaf7a05f602',
  'jtefkht7-8b7413a8-39a5-41e0-a452-c0312b9dc2aa',
  'jtefkht7-b146adaf-0098-4cc5-9f73-1b389763a90b',
  'jtefkht7-a9759666-3d4e-4fb8-93f3-53f65eb514d7',
  'jtefkht7-d91d0c94-dc7a-4b98-88a7-5775cc8484cc',
  'jtefkht7-f2eeb1b3-b31f-456d-a7a6-1b5da8a3868a',
  'jtefkht7-d6d3dfae-7947-4bde-9272-8e08c7ec999d',
  'jtefkht7-e9c68ba2-e252-40b8-9bfc-971f9347ba2b',
  'jtefkht7-e7a9a512-bae2-4222-81e1-e159d58ca710',
  'jtefkht7-a8d6702b-18fc-44f2-b92b-9be3f2b60d25',
  'jtefkht7-5e2bdaf3-0bae-48fe-8e52-58815aed4bb8',
  'jtefkht7-d2643db4-72ab-4ef2-b282-4ae332175f59',
  'jtefkht7-a64e6e48-33de-4cda-a906-375c61046ed4',
  'jtefkht7-e402dbae-0d52-4b31-b7d2-bb5a878a50eb',
  'jtefkht7-e59f5fa6-162c-4be8-8ff9-c4a4f69a5470',
  'jtefkht7-627a6043-6163-443a-9fb8-fecb94831f1c',
  'jtefkht7-9e1b3fa3-44cc-4aa4-a0d1-59348eb980ef',
  'jtefkht7-881b6d54-843d-4e70-974c-945d7a826880',
  'jtefkht7-08f18fb8-50fd-49be-8346-a74b9525af2f',
  'jtefkht7-f38a1124-9937-4688-b04a-dc2dc100e266',
  'jtefkht7-096a6385-2a05-4fa9-852f-318e3ec2c4eb',
  'jtefkht7-dea7aefd-17b3-4c63-917c-48bbd09b1cf0',
  'jtefkht7-500f6dc1-e6c9-481d-809f-052691888748',
  'jtefkht7-8c59a68e-7913-413e-8513-599f390906c7',
  'jtefkht7-808fc070-6490-42c7-9e28-85aa11cd98ef',
  'jtefkht7-2bcc9358-757a-496a-bd41-23e2a7de8555',
]

const categories = ['Signature', 'Seasonal', "Chef's Selection"]
const layouts = ['featured', 'tall', 'wide', 'standard']

function extractCaption(html) {
  const metaDesc = html.match(/name="description"\s+content="([^"]+)"/)?.[1]?.trim()
  if (metaDesc && !/^(List 10|Your Wix|Offer coupons|Intussen)/i.test(metaDesc)) {
    return metaDesc
      .replace(/\\n/g, ' · ')
      .replace(/\n/g, ' · ')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
  }

  const afterHeading = html.match(/Gerechten[\s\S]{0,400}?>([^<]{3,80})</)?.[1]?.trim()
  if (afterHeading && !/^(PZC|FOTO|HOME)/i.test(afterHeading)) return afterHeading

  return ''
}

function extractHeroSrc(html) {
  const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]
  if (ogImage && ogImage.includes('wixstatic')) {
    return ogImage.split(' ')[0]
  }

  const fillUrls = [...html.matchAll(/https:\/\/static\.wixstatic\.com\/media\/(a8552a_[^~]+~mv2\.(?:jpg|jpeg|png))\/v1\/fill\/w_(\d+),h_(\d+)/gi)]
  if (fillUrls.length > 0) {
    const best = fillUrls.sort((a, b) => Number(b[2]) - Number(a[2]))[0]
    return `https://static.wixstatic.com/media/${best[1]}/v1/fill/w_${best[2]},h_${best[3]},al_c,q_90,enc_auto/${best[1].split('/').pop()}`
  }

  const base = html.match(/https:\/\/static\.wixstatic\.com\/media\/(a8552a_[^"'\\s<>]+~mv2\.(?:jpg|jpeg|png))/i)?.[1]
  return base ? `https://static.wixstatic.com/media/${base}` : ''
}

const results = []

for (const pgid of pgids) {
  const sourceUrl = `https://www.bistroindenkoning.com/foto-s?pgid=${pgid}`
  try {
    const res = await fetch(sourceUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    })
    const html = await res.text()
    const caption = extractCaption(html)
    const src = extractHeroSrc(html)
    results.push({ pgid, sourceUrl, caption, src })
    process.stdout.write('.')
  } catch {
    process.stdout.write('x')
  }
}

const seen = new Set()
const unique = results.filter((item) => {
  if (!item.src || seen.has(item.src)) return false
  seen.add(item.src)
  return true
})

const galleryItems = unique.map((item, index) => ({
  id: index + 1,
  pgid: item.pgid,
  sourceUrl: item.sourceUrl,
  src: item.src.replace(/\/v1\/fill\/[^/]+\/[^/]+$/, ''),
  caption: item.caption || `Gerecht ${index + 1}`,
  category: categories[index % categories.length],
  layout: index === 0 ? 'featured' : layouts[(index % (layouts.length - 1)) + 1],
  featured: index === 0,
}))

// Prefer a dramatic high-res photograph as the featured hero
const heroIndex = galleryItems.findIndex((item) => /8605ef30|f3aab284|e232beaa|162121dc/.test(item.src))
if (heroIndex > 0) {
  galleryItems.forEach((item, i) => {
    item.featured = i === heroIndex
    item.layout = i === heroIndex ? 'featured' : layouts[(i % (layouts.length - 1)) + 1]
  })
}

const tsContent = `export type GalleryCategory = 'Signature' | 'Seasonal' | "Chef's Selection"
export type GalleryLayout = 'featured' | 'tall' | 'wide' | 'standard'

export interface GalleryImage {
  id:          number
  pgid:        string
  sourceUrl:   string
  src:         string
  caption:     string
  category:    GalleryCategory
  layout:      GalleryLayout
  featured?:   boolean
}

/** Wix CDN helper — returns an optimized fill URL for display */
export function wixImage(src: string, width: number, height?: number): string {
  const h = height ?? Math.round(width * 0.75)
  const file = src.split('/').pop() ?? ''
  return \`\${src}/v1/fill/w_\${width},h_\${h},al_c,q_90,enc_auto/\${file}\`
}

export const galleryImages: GalleryImage[] = ${JSON.stringify(galleryItems, null, 2)
  .replace(/"category": "Chef's Selection"/g, `"category": "Chef's Selection" as GalleryCategory`)
  .replace(/"layout": "(featured|tall|wide|standard)"/g, `"layout": "$1" as GalleryLayout`)
  .replace(/"category": "(Signature|Seasonal)"/g, `"category": "$1" as GalleryCategory`)}
`

mkdirSync(join(__dirname, '../src/data'), { recursive: true })
writeFileSync(join(__dirname, '../src/data/galleryImages.ts'), tsContent)
console.log(`\nGenerated ${galleryItems.length} images -> src/data/galleryImages.ts`)
