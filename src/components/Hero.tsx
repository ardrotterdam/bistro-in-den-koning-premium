import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const HERO_BASE = '/images/in-den-koning-hero'
const HERO_ALT =
  'Bistro In den Koning — het historische pand aan de kerk in Waterlandkerkje, Zeeuws-Vlaanderen'

const fadeEase = [0.25, 0.46, 0.45, 0.94] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const overlayOp = useTransform(scrollYProgress, [0, 0.65], [0.52, 0.78])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOp = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  useEffect(() => {
    const img = new Image()
    const webp = `${HERO_BASE}-1200.webp`
    img.src = webp
    img.onload = () => setLoaded(true)
    img.onerror = () => {
      img.src = `${HERO_BASE}-1200.jpg`
      img.onload = () => setLoaded(true)
    }
  }, [])

  const handleReserve = () => {
    document.querySelector('#reserveren')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] max-h-[1200px] overflow-hidden grain-overlay hero-cinematic"
      aria-label="Welkom bij Bistro In den Koning"
    >
      {/* Cinematic background */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={prefersReducedMotion ? undefined : { y: imageY }}
      >
        <motion.div
          className="absolute inset-[-8%] sm:inset-[-6%] lg:inset-[-4%]"
          initial={false}
          animate={
            prefersReducedMotion || !loaded
              ? { scale: 1 }
              : { scale: [1, 1.06] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 28, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
          }
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`
                ${HERO_BASE}-800.webp 800w,
                ${HERO_BASE}-1200.webp 1200w,
                ${HERO_BASE}-2400.webp 2400w
              `}
              sizes="100vw"
            />
            <source
              type="image/jpeg"
              srcSet={`
                ${HERO_BASE}-800.jpg 800w,
                ${HERO_BASE}-1200.jpg 1200w,
                ${HERO_BASE}-1600.jpg 1600w,
                ${HERO_BASE}-2400.jpg 2400w
              `}
              sizes="100vw"
            />
            <img
              src={`${HERO_BASE}-1200.jpg`}
              alt={HERO_ALT}
              width={1200}
              height={800}
              decoding="async"
              fetchPriority="high"
              onLoad={() => setLoaded(true)}
              className={`hero-image absolute inset-0 h-full w-full object-cover transition-opacity duration-[2.2s] ease-editorial ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </picture>
        </motion.div>

        {/* Loading placeholder — forest tone, no fake imagery */}
        <div
          className={`absolute inset-0 bg-forest-600 transition-opacity duration-[2s] ${
            loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-hidden="true"
        />
      </motion.div>

      {/* Layered cinematic overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-forest-700/75 via-forest-700/35 to-forest-600/85 pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 bg-forest-700 pointer-events-none"
        style={{ opacity: prefersReducedMotion ? 0.55 : overlayOp }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 42%, transparent 0%, rgba(10, 20, 16, 0.55) 72%, rgba(10, 20, 16, 0.92) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-700/90 via-forest-700/40 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Editorial content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 sm:px-8 text-center"
        style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOp }}
      >
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          <motion.p
            className="font-sans text-2xs sm:text-xs tracking-[0.28em] uppercase text-gold-200/90 mb-5 sm:mb-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: fadeEase }}
          >
            Seasonal Dining · Waterlandkerkje
          </motion.p>

          <motion.h1
            className="display-heading text-cream-50 text-balance mb-6 sm:mb-8"
            style={{
              fontSize: 'clamp(2.75rem, 11vw, 7.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
            }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.55, ease: fadeEase }}
          >
            In den Koning
          </motion.h1>

          <motion.div
            className="flex items-center gap-3 sm:gap-5 mb-6 sm:mb-8"
            initial={{ opacity: 0, scaleX: 0.6 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease: fadeEase }}
            aria-hidden="true"
          >
            <div className="w-12 sm:w-20 h-px bg-gold-300/50" />
            <div className="w-1 h-1 rounded-full bg-terra-400/90" />
            <div className="w-12 sm:w-20 h-px bg-gold-300/50" />
          </motion.div>

          <motion.p
            className="font-sans font-light text-cream-200/85 text-xs sm:text-sm tracking-[0.14em] max-w-lg mb-10 sm:mb-14 leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0, ease: fadeEase }}
          >
            Seizoensgebonden keuken · Lokale producten · Zee & Akker
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: fadeEase }}
          >
            <button
              onClick={handleReserve}
              className="btn-primary min-w-[220px] justify-center group"
            >
              <span>Tafel Reserveren</span>
              <ArrowIcon />
            </button>
            <button
              onClick={handleMenu}
              className="btn-hero-outline min-w-[220px] justify-center"
            >
              Bekijk Menu
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        aria-hidden="true"
      >
        <span className="font-sans text-2xs tracking-widest-3 uppercase text-cream-300/45">
          Ontdek
        </span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-cream-300/40 to-transparent"
          animate={prefersReducedMotion ? undefined : { scaleY: [1, 0.35, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path
        d="M11 1L15 5L11 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 5H14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
