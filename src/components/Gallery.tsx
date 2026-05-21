import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface GalleryImage {
  id:      number
  src:     string
  alt:     string
  caption: string
  span:    'col-1' | 'col-2' | 'row-2'
}

const images: GalleryImage[] = [
  {
    id:      1,
    src:     'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80&auto=format&fit=crop',
    alt:     'Verfijnd gerecht Bistro In den Koning',
    caption: 'Seizoensgebonden creatie',
    span:    'col-2',
  },
  {
    id:      2,
    src:     'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80&auto=format&fit=crop',
    alt:     'Vis van de Zeeuwse kust',
    caption: 'Vers uit de Noordzee',
    span:    'row-2',
  },
  {
    id:      3,
    src:     'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&q=80&auto=format&fit=crop',
    alt:     'Ambachtelijk brood',
    caption: 'Dagelijks vers gebakken',
    span:    'col-1',
  },
  {
    id:      4,
    src:     'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&q=80&auto=format&fit=crop',
    alt:     'Dessert van het seizoen',
    caption: 'Zoetheid van het seizoen',
    span:    'col-1',
  },
  {
    id:      5,
    src:     'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop',
    alt:     'Sfeer in het restaurant',
    caption: 'Bourgondische sfeer',
    span:    'col-2',
  },
  {
    id:      6,
    src:     'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80&auto=format&fit=crop',
    alt:     'Selectie van kazen',
    caption: 'Streekkazen van eigen bodem',
    span:    'col-1',
  },
  {
    id:      7,
    src:     'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=80&auto=format&fit=crop',
    alt:     'Tafelschikking',
    caption: 'Elk detail telt',
    span:    'col-1',
  },
  {
    id:      8,
    src:     'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80&auto=format&fit=crop',
    alt:     'Zeebaars van de grill',
    caption: 'Van zee naar bord',
    span:    'col-1',
  },
]

function FadeIn({ children, delay = 0, className = '', onClick }: { children: React.ReactNode; delay?: number; className?: string; onClick?: () => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null)

  return (
    <section id="galerij" className="bg-forest-600 relative overflow-hidden py-28 lg:py-36">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <FadeIn>
              <p className="section-label text-gold-300/80 mb-5">Galerij</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-heading text-cream-100"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}>
                Eten met de<br />
                <em className="text-gold-300 not-italic font-medium">ogen</em>
              </h2>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="md:text-right max-w-xs">
            <p className="editorial-body text-cream-300/70">
              Een blik in onze keuken, onze sfeer en de producten die ons inspireren.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Masonry-style grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <FadeIn
              key={img.id}
              delay={i * 0.06}
              className={`relative overflow-hidden group cursor-pointer ${
                img.span === 'col-2' ? 'col-span-2' :
                img.span === 'row-2' ? 'row-span-2' : 'col-span-1'
              } ${img.span === 'col-2' ? 'aspect-[16/9]' : 'aspect-square'}`}
              onClick={() => setSelected(img)}
            >
              <motion.img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-forest-700/0 group-hover:bg-forest-700/60 transition-all duration-500" />
              <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div>
                  <p className="font-sans text-2xs tracking-widest-2 uppercase text-gold-300 mb-1">
                    In den Koning
                  </p>
                  <p className="font-display text-base font-light text-cream-100 italic">
                    {img.caption}
                  </p>
                </div>
              </div>

              {/* Expand icon */}
              <div className="absolute top-3 right-3 w-8 h-8 bg-cream-100/10 backdrop-blur-sm border border-cream-100/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 1.5H10.5V4.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.5 10.5H1.5V7.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10.5 1.5L6.5 5.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M1.5 10.5L5.5 6.5" stroke="#F7F3ED" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 bg-forest-700/95 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-5xl max-h-[90vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selected.src.replace('w=800', 'w=1600')}
                alt={selected.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-sans text-2xs tracking-widest-2 uppercase text-gold-300/80 mb-1">
                    Bistro In den Koning
                  </p>
                  <p className="font-display text-xl text-cream-100 italic">
                    {selected.caption}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-10 h-10 border border-cream-200/30 flex items-center justify-center text-cream-200 hover:border-gold-300 hover:text-gold-300 transition-colors duration-300"
                  aria-label="Sluiten"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
