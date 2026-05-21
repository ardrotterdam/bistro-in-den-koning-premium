import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import SeasonalMenu from '../components/SeasonalMenu'
import Footer from '../components/Footer'

const fadeEase = [0.25, 0.46, 0.45, 0.94] as const

function PageHero() {
  return (
    <div className="relative bg-forest-600 overflow-hidden grain-overlay">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(26,51,41,0.2) 0%, rgba(10,20,16,0.88) 100%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-52 lg:pb-32">
        <motion.p
          className="section-label text-gold-300/80 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: fadeEase }}
        >
          Wisselend met de seizoenen
        </motion.p>
        <motion.h1
          className="display-heading text-cream-50 mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: fadeEase }}
        >
          Seizoens<br />
          <em className="text-gold-300 not-italic font-medium">kaart</em>
        </motion.h1>
        <motion.p
          className="editorial-body text-cream-200/65 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: fadeEase }}
        >
          Verse gerechten van zee en akker, wisselend per seizoen.
          Kies uw seizoen en ontdek wat wij voor u bereid hebben.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: fadeEase }}
        >
          <div className="flex items-center gap-4" aria-hidden="true">
            <div className="w-16 h-px bg-gold-300/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-terra-400/60" />
            <div className="w-8 h-px bg-gold-300/20" />
          </div>
          <p className="font-sans text-2xs tracking-widest-2 uppercase text-cream-200/50">
            Allergieën of dieetwensen?{' '}
            <Link
              to="/reserveren"
              className="text-gold-300/70 hover:text-gold-300 transition-colors underline underline-offset-4"
            >
              Neem contact op
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function MenuPage() {
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
        <SeasonalMenu />
      </main>
      <Footer />
    </motion.div>
  )
}
