export type GalleryCategory = 'Signature' | 'Seasonal' | "Chef's Selection"
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
  return `${src}/v1/fill/w_${width},h_${h},al_c,q_90,enc_auto/${file}`
}

export const galleryImages: GalleryImage[] = [
  {
    "id": 1,
    "pgid": "jtefkht7-59ca0eb6-88e0-4abe-8ad0-3b9cd23225ff",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-59ca0eb6-88e0-4abe-8ad0-3b9cd23225ff",
    "src": "https://static.wixstatic.com/media/a8552a_c466483ea8564bf09fe87fec4f589748~mv2.jpg",
    "caption": "'Sneukelplank'",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 2,
    "pgid": "jtefkht7-851fb2f4-e2d0-495e-ade8-aa98525b55c2",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-851fb2f4-e2d0-495e-ade8-aa98525b55c2",
    "src": "https://static.wixstatic.com/media/a8552a_7957d62a5f7d449ea5f7a0fd715b1a81~mv2.jpg",
    "caption": "Salade Caprese, met burrata, bio-tomaatjes, aardbei, basilicumvinaigrette en citroen",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 3,
    "pgid": "jtefkht7-3ca38c3e-c10f-48ca-9ceb-c913be3349ed",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-3ca38c3e-c10f-48ca-9ceb-c913be3349ed",
    "src": "https://static.wixstatic.com/media/a8552a_3b8c7fc0a297473fb3cf6d564c32b3b3~mv2.jpg",
    "caption": "'Bijna Zomer' Parfait van Witte Chocolade, Mousse van Aardbei & Framboos, Mascarpone crème, Merengue en Basilicum",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 4,
    "pgid": "jtefkht7-8de14c1a-7c22-46cb-9764-d59e6e4a783b",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-8de14c1a-7c22-46cb-9764-d59e6e4a783b",
    "src": "https://static.wixstatic.com/media/a8552a_3031f9fe47d541339c1aac82c3048717~mv2.jpg",
    "caption": "Asperge 'Mimosa'",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 5,
    "pgid": "jtefkht7-acff2b61-fcaf-46f5-9d49-9743508b6566",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-acff2b61-fcaf-46f5-9d49-9743508b6566",
    "src": "https://static.wixstatic.com/media/a8552a_5169309ab35f4e9a8cc24c60c11a9677~mv2.jpg",
    "caption": "'Snickers'",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 6,
    "pgid": "jtefkht7-46693841-62b8-4bf0-9a1f-cba10a337751",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-46693841-62b8-4bf0-9a1f-cba10a337751",
    "src": "https://static.wixstatic.com/media/a8552a_8310e6915bd048448ad4bd38d7b4717f~mv2_d_1999_1893_s_2.jpg",
    "caption": "Varkenswangetjes",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 7,
    "pgid": "jtefkht7-da7680e6-22c5-40d4-b973-8118543c66dc",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-da7680e6-22c5-40d4-b973-8118543c66dc",
    "src": "https://static.wixstatic.com/media/a8552a_8ef638c5e70a4e648ef5fd10bb6937b7~mv2.png",
    "caption": "Ruby 'No Bake' Cheesecake met Framboos",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 8,
    "pgid": "jtefkht7-5f5466e0-c260-4d44-8429-8ea8e29dab37",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-5f5466e0-c260-4d44-8429-8ea8e29dab37",
    "src": "https://static.wixstatic.com/media/a8552a_502da911595344b9a6946722be166d3d~mv2.png",
    "caption": "Wildplank",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 9,
    "pgid": "jtefkht7-90b27686-b258-46e8-bac1-2fa5109ea46a",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-90b27686-b258-46e8-bac1-2fa5109ea46a",
    "src": "https://static.wixstatic.com/media/a8552a_5463262ecf98440cafcc1d4c9146a3aa~mv2.png",
    "caption": "Clafoutis met Peer en Vanille",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 10,
    "pgid": "jtefkht7-6b729dd7-eff6-4fad-a781-5da1f23ca3d0",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-6b729dd7-eff6-4fad-a781-5da1f23ca3d0",
    "src": "https://static.wixstatic.com/media/a8552a_5468b03000f24471880bd7d06f016732~mv2.png",
    "caption": "Rilette van Makreel met Zuurdesem",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 11,
    "pgid": "jtefkht7-e298a822-7890-4b8c-a3a0-3d30ce10ae39",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-e298a822-7890-4b8c-a3a0-3d30ce10ae39",
    "src": "https://static.wixstatic.com/media/a8552a_dc556a7218594aa298c548bf9086e176~mv2.png",
    "caption": "Gerookte Zalm, Crème Fraîche, Biet en Ingelegde Rode Ui",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 12,
    "pgid": "jtefkht7-af7eed4e-66bc-4529-8b33-329eba681c85",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-af7eed4e-66bc-4529-8b33-329eba681c85",
    "src": "https://static.wixstatic.com/media/a8552a_ca866a956b24444b8cfe10b737754c80~mv2.png",
    "caption": "Bruschetta",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 13,
    "pgid": "jtefkht7-3cc0f055-a933-4798-a238-ffaf7a05f602",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-3cc0f055-a933-4798-a238-ffaf7a05f602",
    "src": "https://static.wixstatic.com/media/a8552a_7dd442afa28343adbb1ffe3a2d3ef616~mv2.png",
    "caption": "Eclusebol (Zuurdesem)",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 14,
    "pgid": "jtefkht7-8b7413a8-39a5-41e0-a452-c0312b9dc2aa",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-8b7413a8-39a5-41e0-a452-c0312b9dc2aa",
    "src": "https://static.wixstatic.com/media/a8552a_d2984ee555a442d286e9970beb0675d4~mv2.png",
    "caption": "Coupe 'Perelaere'",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 15,
    "pgid": "jtefkht7-b146adaf-0098-4cc5-9f73-1b389763a90b",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-b146adaf-0098-4cc5-9f73-1b389763a90b",
    "src": "https://static.wixstatic.com/media/a8552a_40ec05072fe1451297b153d0299341b9~mv2.png",
    "caption": "Vegetarische Navarin",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 16,
    "pgid": "jtefkht7-a9759666-3d4e-4fb8-93f3-53f65eb514d7",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-a9759666-3d4e-4fb8-93f3-53f65eb514d7",
    "src": "https://static.wixstatic.com/media/a8552a_6b4d0ab1b58c4f7f846b90a5af899fb1~mv2.png",
    "caption": "Opa's Appeltaart met Crème Anglaise",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 17,
    "pgid": "jtefkht7-d91d0c94-dc7a-4b98-88a7-5775cc8484cc",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-d91d0c94-dc7a-4b98-88a7-5775cc8484cc",
    "src": "https://static.wixstatic.com/media/a8552a_febfd3b7cc5b4f0c96ad678445f014d2~mv2.png",
    "caption": "Sable Brethon met Mousse & Sorbet van Framboos",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 18,
    "pgid": "jtefkht7-f2eeb1b3-b31f-456d-a7a6-1b5da8a3868a",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-f2eeb1b3-b31f-456d-a7a6-1b5da8a3868a",
    "src": "https://static.wixstatic.com/media/a8552a_449143cc89ac4b86a41a807aadf0ad6b~mv2.png",
    "caption": "Poussin (Piepkuiken)",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 19,
    "pgid": "jtefkht7-d6d3dfae-7947-4bde-9272-8e08c7ec999d",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-d6d3dfae-7947-4bde-9272-8e08c7ec999d",
    "src": "https://static.wixstatic.com/media/a8552a_de98cde3b3044e11a50199816cdf60da~mv2.png",
    "caption": "Chioggia Carpaccio en Luchtige Geitenkaas",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 20,
    "pgid": "jtefkht7-e9c68ba2-e252-40b8-9bfc-971f9347ba2b",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-e9c68ba2-e252-40b8-9bfc-971f9347ba2b",
    "src": "https://static.wixstatic.com/media/a8552a_25c45c5a35e34ba1a32255cca07e3faa~mv2.png",
    "caption": "Bietensalade met Geitenkaas",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 21,
    "pgid": "jtefkht7-e7a9a512-bae2-4222-81e1-e159d58ca710",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-e7a9a512-bae2-4222-81e1-e159d58ca710",
    "src": "https://static.wixstatic.com/media/a8552a_838e3d8e29384efe8f553808b4d108fe~mv2.png",
    "caption": "Crème Brûleé",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 22,
    "pgid": "jtefkht7-a8d6702b-18fc-44f2-b92b-9be3f2b60d25",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-a8d6702b-18fc-44f2-b92b-9be3f2b60d25",
    "src": "https://static.wixstatic.com/media/a8552a_e695da7722ef4daaa25023aece3d3a0c~mv2.png",
    "caption": "Uitsmijter Ham & Kaas",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 23,
    "pgid": "jtefkht7-5e2bdaf3-0bae-48fe-8e52-58815aed4bb8",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-5e2bdaf3-0bae-48fe-8e52-58815aed4bb8",
    "src": "https://static.wixstatic.com/media/a8552a_168b19928f944e34b1971a16780478f5~mv2.png",
    "caption": "Cremeux van 'Appelaere' met Kaneelijs",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 24,
    "pgid": "jtefkht7-d2643db4-72ab-4ef2-b282-4ae332175f59",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-d2643db4-72ab-4ef2-b282-4ae332175f59",
    "src": "https://static.wixstatic.com/media/a8552a_07317a353add483aa4fdbbdeece5709e~mv2.png",
    "caption": "Zeewolf, Pastinaak & Kruidenroom",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 25,
    "pgid": "jtefkht7-a64e6e48-33de-4cda-a906-375c61046ed4",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-a64e6e48-33de-4cda-a906-375c61046ed4",
    "src": "https://static.wixstatic.com/media/a8552a_2bd9900c042d412f8000771a9232ba83~mv2.png",
    "caption": "Chocolate Salty Ball, ijs van melkchocolade en zoute caramel, berriolet sorbet, bosvruchten en speculoos",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 26,
    "pgid": "jtefkht7-e402dbae-0d52-4b31-b7d2-bb5a878a50eb",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-e402dbae-0d52-4b31-b7d2-bb5a878a50eb",
    "src": "https://static.wixstatic.com/media/a8552a_244fceedd2784e7a90f9e702e7ed9dfc~mv2.png",
    "caption": "Chocolate Salty Ball",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 27,
    "pgid": "jtefkht7-e59f5fa6-162c-4be8-8ff9-c4a4f69a5470",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-e59f5fa6-162c-4be8-8ff9-c4a4f69a5470",
    "src": "https://static.wixstatic.com/media/a8552a_e83a3511a3bd4cd28c8ebf4b7a3e92df~mv2.png",
    "caption": "Burrata & Granité van Tomaat",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 28,
    "pgid": "jtefkht7-627a6043-6163-443a-9fb8-fecb94831f1c",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-627a6043-6163-443a-9fb8-fecb94831f1c",
    "src": "https://static.wixstatic.com/media/a8552a_9ab6f4384e084cf5b01210a8dce0ff2d~mv2.png",
    "caption": "Steak 'Tartare'",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 29,
    "pgid": "jtefkht7-9e1b3fa3-44cc-4aa4-a0d1-59348eb980ef",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-9e1b3fa3-44cc-4aa4-a0d1-59348eb980ef",
    "src": "https://static.wixstatic.com/media/a8552a_61692fa737514871a7454a9d55586a8c~mv2.png",
    "caption": "Tartaar van Conference & Vanille Bourbon ijs",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 30,
    "pgid": "jtefkht7-881b6d54-843d-4e70-974c-945d7a826880",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-881b6d54-843d-4e70-974c-945d7a826880",
    "src": "https://static.wixstatic.com/media/a8552a_a02f78bfdbd6414193d19cb8bc06b3fe~mv2.png",
    "caption": "Burrata met selectie bio-tomaat",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 31,
    "pgid": "jtefkht7-08f18fb8-50fd-49be-8346-a74b9525af2f",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-08f18fb8-50fd-49be-8346-a74b9525af2f",
    "src": "https://static.wixstatic.com/media/a8552a_a3b6c8c84ec6488694a64fe03db64d63~mv2.png",
    "caption": "Riz Condé met Kersen",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 32,
    "pgid": "jtefkht7-f38a1124-9937-4688-b04a-dc2dc100e266",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-f38a1124-9937-4688-b04a-dc2dc100e266",
    "src": "https://static.wixstatic.com/media/a8552a_49b5aef7cd46494dad6e41b99e75074f~mv2.png",
    "caption": "Witte Chocolade Cheesecake met Framboos",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 33,
    "pgid": "jtefkht7-096a6385-2a05-4fa9-852f-318e3ec2c4eb",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-096a6385-2a05-4fa9-852f-318e3ec2c4eb",
    "src": "https://static.wixstatic.com/media/a8552a_6e356626e46845a48ceff704299d584d~mv2.png",
    "caption": "Vegetarische Lasagne met Geitenkaas",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 34,
    "pgid": "jtefkht7-dea7aefd-17b3-4c63-917c-48bbd09b1cf0",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-dea7aefd-17b3-4c63-917c-48bbd09b1cf0",
    "src": "https://static.wixstatic.com/media/a8552a_f3aab2847dfc4106944a8f5e516f0f41~mv2.jpg",
    "caption": "Huisgemaakte Limonade · Vlierbloesem Limonade",
    "category": "Signature" as GalleryCategory,
    "layout": "featured" as GalleryLayout,
    "featured": true
  },
  {
    "id": 35,
    "pgid": "jtefkht7-500f6dc1-e6c9-481d-809f-052691888748",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-500f6dc1-e6c9-481d-809f-052691888748",
    "src": "https://static.wixstatic.com/media/a8552a_8605ef30e5174288be6a8f2dfaa31910~mv2.jpg",
    "caption": "Opa's Appeltaart",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  },
  {
    "id": 36,
    "pgid": "jtefkht7-8c59a68e-7913-413e-8513-599f390906c7",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-8c59a68e-7913-413e-8513-599f390906c7",
    "src": "https://static.wixstatic.com/media/a8552a_e232beaa94d94cdfa4b2d37fbb098c86~mv2.jpg",
    "caption": "Sandwich Gerookte Biefstuk",
    "category": "Chef's Selection" as GalleryCategory,
    "layout": "standard" as GalleryLayout,
    "featured": false
  },
  {
    "id": 37,
    "pgid": "jtefkht7-808fc070-6490-42c7-9e28-85aa11cd98ef",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-808fc070-6490-42c7-9e28-85aa11cd98ef",
    "src": "https://static.wixstatic.com/media/a8552a_162121dcaafe4d34a27cd30e6c6bd0e7~mv2.jpg",
    "caption": "Gevulde Vissoep · Op Bretonse wijze",
    "category": "Signature" as GalleryCategory,
    "layout": "tall" as GalleryLayout,
    "featured": false
  },
  {
    "id": 38,
    "pgid": "jtefkht7-2bcc9358-757a-496a-bd41-23e2a7de8555",
    "sourceUrl": "https://www.bistroindenkoning.com/foto-s?pgid=jtefkht7-2bcc9358-757a-496a-bd41-23e2a7de8555",
    "src": "https://static.wixstatic.com/media/a8552a_4fd99b029e19465e8a29365bf873933e~mv2.jpg",
    "caption": "Gekookte Mosselen",
    "category": "Seasonal" as GalleryCategory,
    "layout": "wide" as GalleryLayout,
    "featured": false
  }
]
