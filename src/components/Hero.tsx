import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=2400&q=80&auto=format&fit=crop'

export default function Hero() {
  const ref        = useRef<HTMLElement>(null)
  const [loaded, setLoaded] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const imageY    = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const overlayOp = useTransform(scrollYProgress, [0, 0.6], [0.45, 0.75])
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const textOp    = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  useEffect(() => {
    const img = new Image()
    img.src = HERO_IMAGE
    img.onload = () => setLoaded(true)
  }, [])

  const handleReserve = () => {
    const el = document.querySelector('#reserveren')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleMenu = () => {
    const el = document.querySelector('#menu')
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section ref={ref} className="relative h-screen min-h-[680px] overflow-hidden grain-overlay">

      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: imageY, scale: 1.1 }}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2s] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        {/* Placeholder gradient while loading */}
        <div className={`absolute inset-0 bg-forest-600 transition-opacity duration-[2s] ${loaded ? 'opacity-0' : 'opacity-100'}`} />
      </motion.div>

      {/* Cinematic dark overlay */}
      <motion.div
        className="absolute inset-0 bg-forest-700"
        style={{ opacity: overlayOp }}
      />

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 20, 16, 0.8) 100%)'
        }}
      />

      {/* Horizontal decorative lines */}
      <motion.div
        className="absolute top-1/4 left-0 right-0 flex items-center pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <div className="flex-1 h-px bg-gold-300 origin-left" />
      </motion.div>
      <motion.div
        className="absolute bottom-1/4 left-0 right-0 flex items-center pointer-events-none"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 1.7 }}
      >
        <div className="flex-1 h-px bg-gold-300 origin-right" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity: textOp }}
      >
        {/* Pre-heading */}
        <motion.p
          className="section-label text-gold-200 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Waterlandkerkje · Zeeuws-Vlaanderen
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="display-heading text-cream-50 mb-2"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.95, letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Bistro
        </motion.h1>
        <motion.h1
          className="display-heading text-gold-300 italic mb-8"
          style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)', lineHeight: 0.95, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          In den Koning
        </motion.h1>

        {/* Ornamental divider */}
        <motion.div
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          <div className="w-16 h-px bg-gold-300/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-terra-400" />
          <div className="w-16 h-px bg-gold-300/60" />
        </motion.div>

        {/* Sub-heading */}
        <motion.p
          className="font-sans font-light text-cream-200/90 text-sm md:text-base tracking-[0.12em] max-w-md mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Seizoensgebonden keuken · Lokale producten · Zee & Akker
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <button onClick={handleReserve} className="btn-primary min-w-[200px] justify-center">
            <span>Tafel Reserveren</span>
            <ArrowIcon />
          </button>
          <button onClick={handleMenu} className="font-sans text-xs tracking-widest-2 uppercase text-cream-200/80 hover:text-gold-300 transition-colors duration-300 py-4">
            Bekijk het Menu
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="font-sans text-2xs tracking-widest-3 uppercase text-cream-300/50">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-cream-300/50 to-transparent"
          animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Side info — desktop */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <p className="writing-vertical font-sans text-2xs tracking-widest-3 uppercase text-cream-300/50 rotate-180">
          Do – Ma &nbsp;·&nbsp; 11:00
        </p>
        <div className="w-px h-16 bg-cream-300/20" />
      </motion.div>

      {/* Side info — left desktop */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="w-px h-16 bg-cream-300/20" />
        <p className="writing-vertical font-sans text-2xs tracking-widest-3 uppercase text-terra-300/60">
          Est. Zeeuws-Vlaanderen
        </p>
      </motion.div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
      <path d="M11 1L15 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
