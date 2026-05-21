import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import DishGallery from '../components/DishGallery'
import Footer from '../components/Footer'

const fadeEase = [0.25, 0.46, 0.45, 0.94] as const

function PageHero() {
  return (
    <div className="relative bg-forest-700 overflow-hidden grain-overlay">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(26,51,41,0.2) 0%, rgba(10,20,16,0.92) 100%)',
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-0 h-[360px] w-[360px] rounded-full bg-gold-300/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-20 lg:pt-52 lg:pb-28">
        <motion.p
          className="section-label text-gold-300/80 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: fadeEase }}
        >
          Echt werk van onze keuken
        </motion.p>
        <motion.h1
          className="display-heading text-cream-50 mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: fadeEase }}
        >
          Galerij
        </motion.h1>
        <motion.p
          className="editorial-body text-cream-200/60 max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: fadeEase }}
        >
          Authentieke gerechten uit onze keuken — gefotografeerd zoals ze op tafel
          komen. Klik op een foto voor een closer look.
        </motion.p>
        <motion.div
          className="mt-8 flex items-center gap-4"
          initial={{ opacity: 0, scaleX: 0.6 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.65, ease: fadeEase }}
          aria-hidden="true"
        >
          <div className="w-16 h-px bg-gold-300/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-terra-400/60" />
          <div className="w-8 h-px bg-gold-300/20" />
        </motion.div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: fadeEase }}
    >
      <Navigation />
      <main>
        <PageHero />
        <DishGallery />
      </main>
      <Footer />
    </motion.div>
  )
}
