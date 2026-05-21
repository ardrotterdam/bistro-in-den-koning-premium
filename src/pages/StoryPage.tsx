import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '../components/Navigation'
import About from '../components/About'
import Footer from '../components/Footer'

const fadeEase = [0.25, 0.46, 0.45, 0.94] as const

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: fadeEase }}
    >
      {children}
    </motion.div>
  )
}

// ─── Interior Page Hero ─────────────────────────────────────────────────────
function PageHero() {
  return (
    <div className="relative bg-forest-600 overflow-hidden grain-overlay">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(26,51,41,0.3) 0%, rgba(10,20,16,0.9) 100%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-24 lg:pt-52 lg:pb-32">
        <motion.p
          className="section-label text-gold-300/80 mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: fadeEase }}
        >
          Onze Geschiedenis
        </motion.p>
        <motion.h1
          className="display-heading text-cream-50 mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: fadeEase }}
        >
          Ons<br />
          <em className="text-gold-300 not-italic font-medium">Verhaal</em>
        </motion.h1>
        <motion.p
          className="editorial-body text-cream-200/65 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: fadeEase }}
        >
          Zeeuws-Vlaanderen, zee en akker, en een bistro in het hart van Waterlandkerkje.
          Het verhaal van Angie & Juriën.
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

// ─── Chef Philosophy Section ─────────────────────────────────────────────────
function PhilosophySection() {
  return (
    <section className="bg-cream-100 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left column — quote/pull */}
          <div className="lg:col-span-4">
            <FadeIn>
              <p className="section-label mb-6">Filosofie</p>
              <blockquote className="border-l-2 border-terra-400 pl-6">
                <p
                  className="font-display font-light text-forest-500 italic leading-tight mb-4"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.25rem)' }}
                >
                  "Koken met<br />gevoel voor plek"
                </p>
                <footer className="font-sans text-sm text-terra-400 font-light tracking-wide">
                  — Juriën, Chef-kok
                </footer>
              </blockquote>
            </FadeIn>

            <FadeIn delay={0.2} className="mt-12">
              <div className="bg-forest-500 p-6">
                <p className="font-sans text-2xs tracking-widest-3 uppercase text-gold-300/80 mb-3">
                  Geopend
                </p>
                <p className="font-display text-2xl text-cream-50 font-light mb-1">
                  Do — Ma
                </p>
                <p className="font-sans text-sm text-cream-300/70">
                  vanaf 11:00 uur
                </p>
                <div className="mt-4 pt-4 border-t border-gold-300/20">
                  <p className="font-sans text-sm text-cream-200/50 line-through">Di & Wo</p>
                  <p className="font-sans text-xs text-cream-300/35 mt-0.5">Gesloten</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right column — text */}
          <div className="lg:col-span-8">
            <FadeIn delay={0.1}>
              <h2
                className="display-heading text-forest-500 mb-8"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', lineHeight: 1.05 }}
              >
                Geen trends, maar{' '}
                <em className="text-terra-400 not-italic font-medium">terroir</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="editorial-body text-forest-400/90 mb-6 max-w-2xl">
                Voor ons begint een gerecht bij de producent. De vissers die elke
                ochtend uitvaren op de Westerschelde, de groenteboer uit het naburige
                polder­dorp, de imker die zijn kasten in de Zeeuwse weiden plaatst.
                Wij koken wat er is — en wat er is, is hier altijd bijzonder.
              </p>
              <p className="editorial-body text-forest-400/90 mb-6 max-w-2xl">
                Ons menu is geen statisch document. Het is een levende wisselkaart die
                reageert op weer, oogst en vangst. Wat donderdag op het bord ligt, kan
                maandag al iets anders zijn — en dat is precies de bedoeling.
              </p>
              <p className="editorial-body text-forest-400/85 max-w-2xl">
                De Vlaamse en Franse invloeden die je in onze keuken terug­vindt, zijn
                geen academische oefening. Ze zijn de natuurlijke taal van een streek
                die altijd op de grens van culturen heeft geleefd. We spreken die taal
                vloeiend — maar met een Zeeuws accent.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Local Producers Section ─────────────────────────────────────────────────
const producers = [
  {
    icon: '⚓',
    name: 'Vissers Westerschelde',
    type: 'Zeevruchten & vis',
    note: 'Tong, tarbot, garnalen, oesters — vers van het scheldewater',
  },
  {
    icon: '🌿',
    name: 'Zeeuwse polderboerderijen',
    type: 'Groenten & kruiden',
    note: 'Seizoensgroenten, aromatische kruiden, bloemen van eigen land',
  },
  {
    icon: '🧀',
    name: 'Lokale zuivelmakers',
    type: 'Kaas & boter',
    note: 'Ambachtelijke streekkazen en verse roomboter uit de polder',
  },
  {
    icon: '🍯',
    name: 'Delta-imkers',
    type: 'Honing & bloemen',
    note: 'Wilde honing van bijen die de Zeeuwse delta als thuis kennen',
  },
]

function ProducersSection() {
  return (
    <section className="bg-cream-200 relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, #1A3329 0, #1A3329 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20">
          <FadeIn>
            <p className="section-label mb-5">Van ons land</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2
              className="display-heading text-forest-500 max-w-2xl"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.0 }}
            >
              Lokale{' '}
              <em className="text-terra-400 not-italic font-medium">producenten</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="editorial-body text-forest-400/80 mt-5 max-w-xl">
              Elke leverancier is een buur, een verhaal, een handdruk. Geen anonieme
              groothandel — alles komt van mensen die wij kennen en vertrouwen.
            </p>
          </FadeIn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {producers.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <div className="bg-cream-100/60 border border-gold-200/40 p-7 h-full hover:bg-white/50 transition-colors duration-300">
                <div className="w-12 h-12 rounded-full border border-gold-300/30 flex items-center justify-center mb-5 text-xl">
                  {p.icon}
                </div>
                <p className="section-label text-terra-400/70 mb-2">{p.type}</p>
                <h3 className="font-display text-lg text-forest-500 mb-3 leading-tight">
                  {p.name}
                </h3>
                <p className="font-sans text-sm text-forest-400/65 font-light leading-relaxed">
                  {p.note}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA strip at bottom ─────────────────────────────────────────────────────
function StoryCTA() {
  return (
    <section className="bg-forest-500 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-display text-2xl text-cream-50 font-light mb-1">
              Klaar om te proeven?
            </p>
            <p className="font-sans text-sm text-cream-300/60">
              Reserveer een tafel en beleef het zelf.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu" className="btn-hero-outline inline-flex items-center gap-3">
              Bekijk het menu
            </Link>
            <Link to="/reserveren" className="btn-primary inline-flex items-center gap-3 group">
              <span>Reserveren</span>
              <svg
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M11 1L15 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function StoryPage() {
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
        <About />
        <PhilosophySection />
        <ProducersSection />
        <StoryCTA />
      </main>
      <Footer />
    </motion.div>
  )
}
