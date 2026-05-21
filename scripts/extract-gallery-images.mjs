import { writeFileSync } from 'fs'

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

const results = []

for (const pgid of pgids) {
  const url = `https://www.bistroindenkoning.com/foto-s?pgid=${pgid}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    })
    const html = await res.text()

    const wixImgs = [...new Set(html.match(/https:\/\/static\.wixstatic\.com\/media\/[^"'\\s<>]+/g) || [])]
    const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]
    const caption =
      html.match(/"title":"([^"]{3,80})"/)?.[1]?.trim() ||
      html.match(/og:title"\s+content="([^"]+)"/)?.[1]?.trim() ||
      ''

    const skipCaption = /^(PZC|Gerechten|FOTO'S|HOME|Bistro)/i.test(caption)

    // Prefer first hero-sized media image (exclude shared thumbnail hash)
    const THUMB = 'a8552a_4fd99b029e19465e8a29365bf873933e'
    const dishImg =
      wixImgs.find((u) => /\/media\/[^/]+\.(jpg|jpeg|png)/i.test(u) && !u.includes(THUMB)) ||
      ogImage ||
      wixImgs.find((u) => /\/media\//.test(u)) ||
      ''

    const baseSrc = dishImg.replace(/\/v1\/fill\/.*$/, '').split(' ')[0]

    results.push({
      pgid,
      url,
      caption: skipCaption ? '' : caption,
      src: baseSrc,
    })
    process.stdout.write('.')
  } catch (err) {
    results.push({ pgid, url, title: '', src: '', error: err.message })
    process.stdout.write('x')
  }
}

// Deduplicate by image src, keep first caption found
const seen = new Set()
const unique = results.filter((r) => {
  if (!r.src || seen.has(r.src)) return false
  seen.add(r.src)
  return true
})

writeFileSync('scripts/gallery-extracted.json', JSON.stringify(unique, null, 2))
console.log(`\n${unique.length} unique images saved to scripts/gallery-extracted.json`)
