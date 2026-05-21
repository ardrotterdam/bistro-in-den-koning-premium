import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  galleryImages,
  wixImage,
  type GalleryImage,
  type GalleryCategory,
} from '../data/galleryImages'

const categoryStyles: Record<GalleryCategory, string> = {
  Signature:        'bg-gold-300/15 text-gold-200 border-gold-300/35',
  Seasonal:         'bg-terra-400/15 text-terra-200 border-terra-300/35',
  "Chef's Selection": 'bg-cream-100/10 text-cream-100 border-cream-200/25',
}

const layoutClasses: Record<GalleryImage['layout'], string> = {
  featured: 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-7 lg:row-span-3 min-h-[320px] lg:min-h-[520px]',
  wide:     'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-5 lg:row-span-2 min-h-[240px] lg:min-h-[360px]',
  tall:     'col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 lg:col-span-4 lg:row-span-3 min-h-[280px] lg:min-h-[480px]',
  standard: 'col-span-1 row-span-2 lg:col-span-4 lg:row-span-2 min-h-[220px] lg:min-h-[300px]',
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

function GalleryTile({
  image,
  index,
  onSelect,
}: {
  image: GalleryImage
  index: number
  onSelect: (image: GalleryImage) => void
}) {
  const thumbW = image.layout === 'featured' ? 1400 : image.layout === 'wide' ? 900 : 600
  const thumbH = image.layout === 'tall' || image.layout === 'featured' ? Math.round(thumbW * 1.15) : Math.round(thumbW * 0.72)

  return (
    <FadeIn delay={index * 0.04} className={layoutClasses[image.layout]}>
      <motion.button
        type="button"
        onClick={() => onSelect(image)}
        className="group relative h-full w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-forest-600"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-label={`Bekijk ${image.caption}`}
      >
        {/* Outer frame */}
        <div className="absolute inset-0 border border-gold-300/20 bg-forest-700/40 p-[3px] sm:p-1.5 transition-colors duration-700 group-hover:border-gold-300/45">
          <div className="relative h-full w-full overflow-hidden bg-forest-700">
            <img
              src={wixImage(image.src, thumbW, thumbH)}
              alt={image.caption}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.06]"
            />

            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-700/85 via-forest-700/15 to-forest-700/10 transition-opacity duration-700 group-hover:from-forest-700/90" />
            <div className="absolute inset-0 bg-terra-400/0 mix-blend-soft-light transition-all duration-700 group-hover:bg-terra-400/10" />

            {/* Category badge */}
            <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
              <span className={`inline-block border px-2.5 py-1 font-sans text-2xs tracking-widest-2 uppercase backdrop-blur-sm ${categoryStyles[image.category]}`}>
                {image.category}
              </span>
            </div>

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
              <p className="mb-1 font-sans text-2xs tracking-widest-3 uppercase text-gold-300/75">
                Bistro In den Koning
              </p>
              <p className={`font-display font-light italic leading-snug text-cream-50 transition-transform duration-700 group-hover:translate-y-[-2px] ${
                image.layout === 'featured' ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-lg'
              }`}>
                {image.caption}
              </p>
            </div>

            {/* Expand affordance */}
            <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-cream-100/20 bg-forest-700/35 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100 sm:right-4 sm:top-4">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M7.5 1.5H10.5V4.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10.5H1.5V7.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.5 1.5L6.5 5.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M1.5 10.5L5.5 6.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </motion.button>
    </FadeIn>
  )
}

export default function DishGallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)
  const featured = galleryImages.find((img) => img.featured) ?? galleryImages[0]
  const gridImages = galleryImages.filter((img) => img.id !== featured.id)

  const selectedIndex = selected ? galleryImages.findIndex((img) => img.id === selected.id) : -1

  const goTo = useCallback((direction: -1 | 1) => {
    if (selectedIndex < 0) return
    const next = (selectedIndex + direction + galleryImages.length) % galleryImages.length
    setSelected(galleryImages[next])
  }, [selectedIndex])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowLeft') goTo(-1)
      if (e.key === 'ArrowRight') goTo(1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [selected, goTo])

  return (
    <section id="galerij" className="relative overflow-hidden bg-forest-600 py-24 sm:py-28 lg:py-36">

      {/* Ambient texture */}
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.35]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-gold-300/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-[360px] w-[360px] rounded-full bg-terra-400/8 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="mb-12 flex flex-col gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <FadeIn>
              <p className="section-label mb-5 text-gold-300/80">Gerechten</p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2
                className="display-heading text-cream-100"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.75rem)', lineHeight: 1.02 }}
              >
                Echt werk<br />
                <em className="font-medium not-italic text-gold-300">van onze keuken</em>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.16} className="max-w-sm lg:text-right">
            <p className="editorial-body text-cream-300/70">
              Authentieke gerechten uit onze keuken — gefotografeerd zoals ze op tafel komen.
              Klik voor een closer look.
            </p>
          </FadeIn>
        </div>

        {/* Featured spotlight */}
        <FadeIn delay={0.12} className="mb-8 lg:mb-12">
          <motion.button
            type="button"
            onClick={() => setSelected(featured)}
            className="group relative block w-full overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-forest-600"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="border border-gold-300/25 bg-forest-700/50 p-1 sm:p-1.5">
              <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
                <img
                  src={wixImage(featured.src, 1800, 900)}
                  alt={featured.caption}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-forest-700/80 via-forest-700/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-700/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
                  <span className={`mb-4 inline-block border px-3 py-1.5 font-sans text-2xs tracking-widest-2 uppercase backdrop-blur-sm ${categoryStyles[featured.category]}`}>
                    {featured.category}
                  </span>
                  <p className="mb-2 font-sans text-2xs tracking-widest-3 uppercase text-gold-300/80">
                    Uitgelicht · Signature dish
                  </p>
                  <h3 className="max-w-3xl font-display text-2xl font-light italic leading-tight text-cream-50 sm:text-3xl lg:text-5xl">
                    {featured.caption}
                  </h3>
                </div>
              </div>
            </div>
          </motion.button>
        </FadeIn>

        {/* Asymmetric masonry grid */}
        <div className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:gap-5">
          {gridImages.map((image, i) => (
            <GalleryTile
              key={image.id}
              image={image}
              index={i}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Footer note */}
        <FadeIn delay={0.2} className="mt-14 border-t border-gold-300/15 pt-10 text-center lg:mt-20">
          <p className="font-sans text-sm font-light tracking-wide text-cream-300/55">
            {galleryImages.length} creaties · Fotografie Bistro In den Koning
          </p>
        </FadeIn>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-forest-700/96 p-4 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption}
          >
            <motion.div
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative overflow-hidden border border-gold-300/25 bg-forest-600 p-1">
                <img
                  src={wixImage(selected.src, 1600, 1200)}
                  alt={selected.caption}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className={`mb-2 inline-block border px-2.5 py-1 font-sans text-2xs tracking-widest-2 uppercase ${categoryStyles[selected.category]}`}>
                    {selected.category}
                  </span>
                  <p className="mb-1 font-sans text-2xs tracking-widest-2 uppercase text-gold-300/80">
                    Bistro In den Koning
                  </p>
                  <p className="font-display text-xl italic text-cream-100 sm:text-2xl">
                    {selected.caption}
                  </p>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(-1)}
                    className="flex h-10 w-10 items-center justify-center border border-cream-200/25 text-cream-200 transition-colors hover:border-gold-300 hover:text-gold-300"
                    aria-label="Vorige foto"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="min-w-[3rem] text-center font-sans text-2xs tracking-widest-2 text-cream-300/60">
                    {selectedIndex + 1} / {galleryImages.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="flex h-10 w-10 items-center justify-center border border-cream-200/25 text-cream-200 transition-colors hover:border-gold-300 hover:text-gold-300"
                    aria-label="Volgende foto"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="ml-2 flex h-10 w-10 items-center justify-center border border-cream-200/30 text-cream-200 transition-colors hover:border-gold-300 hover:text-gold-300"
                    aria-label="Sluiten"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
