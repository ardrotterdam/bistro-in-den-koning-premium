import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import { galleryImages, wixImage } from '../data/galleryImages'

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
      <path d="M11 1L15 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Story Teaser ──────────────────────────────────────────────────────────────
const IMAGE_STORY =
  'https://images.unsplash.com/photo-1750943036999-81e666b2296c?w=1200&q=80&auto=format&fit=crop'

function StoryTeaser() {
  return (
    <section className="bg-cream-100 py-24 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Image */}
          <FadeIn className="relative h-[400px] lg:h-[540px] overflow-hidden order-1 lg:order-none">
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.4, ease: fadeEase }}
              viewport={{ once: true }}
            >
              <img
                src={IMAGE_STORY}
                alt="Verfijnd gerecht — Bistro In den Koning"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-forest-600/20 to-transparent" />
            {/* Decorative corner */}
            <motion.div
              className="absolute -bottom-5 -right-5 w-24 h-24 border border-gold-300/25 hidden lg:block"
              initial={{ opacity: 0, rotate: -8 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </FadeIn>

          {/* Text */}
          <div>
            <FadeIn delay={0.1}>
              <p className="section-label mb-5">Ons Verhaal</p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2
                className="display-heading text-forest-500 mb-7"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.0 }}
              >
                Een landje<br />
                <em className="text-terra-400 not-italic font-medium">apart</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="editorial-body text-forest-400/90 mb-4 max-w-lg">
                Waterlandkerkje, gelegen in Zeeuws-Vlaanderen — een delta waar zee en
                land elkaar ontmoeten. Op steenworp afstand brengen vissers ons het
                mooiste uit de Noordzee, terwijl om ons heen de akkers en weilanden
                onze andere producten laten groeien.
              </p>
              <p className="editorial-body text-forest-400/75 mb-8 max-w-lg italic font-light">
                "Maar stiekem blijven we gewoon lekker hier. Want het is hier zo fijn."
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex items-center gap-4 mb-10">
                <div className="flex flex-col">
                  <span className="font-display text-xl text-forest-500 italic">Angie & Juriën</span>
                  <span className="font-sans text-2xs tracking-widest-2 uppercase text-terra-400 mt-1">Eigenaren</span>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.45}>
              <Link
                to="/ons-verhaal"
                className="btn-secondary inline-flex items-center gap-3 group"
              >
                <span>Lees ons verhaal</span>
                <ArrowIcon />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Menu Teaser ───────────────────────────────────────────────────────────────
const FEATURED_DISHES = [
  {
    name: 'Haas à la royale',
    desc: 'Gestoofd in rode wijn, spek, zilveruitjes, champignons',
    price: '36',
    tag: "Chef's keuze",
  },
  {
    name: 'Tarbot',
    desc: 'Verse Noordzee tarbot, pomme de terre sarladaise, beurre blanc',
    price: '38',
  },
  {
    name: 'Paddenstoelentart',
    desc: 'Wilde paddenstoelen, truffelcrème, hazelnoot, tijm',
    price: '17',
  },
]

function MenuTeaser() {
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
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: heading + season badge + CTA */}
          <div>
            <FadeIn>
              <p className="section-label mb-5">Seizoenskaart</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="display-heading text-forest-500 mb-6"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.0 }}
              >
                Van het<br />
                <em className="text-terra-400 not-italic font-medium">seizoen</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="editorial-body text-forest-400/80 mb-10 max-w-md">
                Ons menu wisselt met de seizoenen. De beste producten van onze regio
                vertaald naar eerlijke, smaakvolle gerechten — van zee tot akker.
              </p>
              <Link
                to="/menu"
                className="btn-primary inline-flex items-center gap-3 group"
              >
                <span>Bekijk het menu</span>
                <ArrowIcon />
              </Link>
            </FadeIn>

            {/* Season badge */}
            <FadeIn delay={0.3} className="mt-12">
              <div className="inline-flex items-stretch gap-0">
                <div className="bg-forest-500 px-6 py-5">
                  <p className="font-sans text-2xs tracking-widest-3 uppercase text-gold-200/80 mb-1">
                    Nu in het seizoen
                  </p>
                  <p
                    className="font-display font-light text-cream-50"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1 }}
                  >
                    Herfst
                  </p>
                  <p className="font-sans text-2xs tracking-widest-2 uppercase text-gold-300/70 mt-2">
                    September — November
                  </p>
                </div>
                <div className="w-[3px] bg-gold-300" />
              </div>
            </FadeIn>
          </div>

          {/* Right: featured dish list */}
          <FadeIn delay={0.15}>
            <div className="divide-y divide-gold-200/40">
              {FEATURED_DISHES.map((dish, i) => (
                <motion.div
                  key={dish.name}
                  className="py-6 first:pt-0"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: fadeEase }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      {dish.tag && (
                        <span className="inline-block font-sans text-2xs tracking-widest-2 uppercase px-2 py-1 mb-2 bg-gold-100 text-gold-500">
                          {dish.tag}
                        </span>
                      )}
                      <h3 className="font-display text-xl text-forest-500">{dish.name}</h3>
                      <p className="font-sans text-sm text-forest-400/65 mt-1 leading-relaxed">
                        {dish.desc}
                      </p>
                    </div>
                    <span className="font-display text-2xl text-gold-400 flex-shrink-0 mt-1">
                      €{dish.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="font-sans text-xs text-forest-400/40 pt-4 text-right tracking-wide">
              + meer gerechten op de volledige kaart
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── Gallery Teaser ────────────────────────────────────────────────────────────
function GalleryTeaser() {
  const teaserImages = galleryImages.slice(0, 5)

  return (
    <section className="bg-forest-600 relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.3]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-gold-300/5 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <FadeIn>
              <p className="section-label text-gold-300/80 mb-5">Galerij</p>
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
          <FadeIn delay={0.16}>
            <Link
              to="/galerij"
              className="btn-primary inline-flex items-center gap-3 group whitespace-nowrap"
            >
              <span>Bekijk alle foto's</span>
              <ArrowIcon />
            </Link>
          </FadeIn>
        </div>

        {/* Asymmetric image grid */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
          {teaserImages.map((img, i) => {
            const isFirst = i === 0
            const colClass = isFirst
              ? 'col-span-2 lg:col-span-7'
              : i === 1
              ? 'col-span-1 lg:col-span-5'
              : 'col-span-1 lg:col-span-4'
            const aspectClass = isFirst
              ? 'aspect-[4/3] lg:aspect-[16/9]'
              : i === 1
              ? 'aspect-square lg:aspect-[4/3]'
              : 'aspect-square'
            const thumbW = isFirst ? 900 : 500
            const thumbH = isFirst ? 506 : 500

            return (
              <FadeIn key={img.id} delay={i * 0.07} className={colClass}>
                <div
                  className={`relative overflow-hidden border border-gold-300/20 group ${aspectClass}`}
                >
                  <img
                    src={wixImage(img.src, thumbW, thumbH)}
                    alt={img.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-700/70 via-forest-700/10 to-transparent transition-opacity duration-700 group-hover:from-forest-700/80" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-sans text-2xs tracking-widest-3 uppercase text-gold-300/65 mb-1">
                      Bistro In den Koning
                    </p>
                    <p className="font-display text-sm italic text-cream-50 line-clamp-1">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.2} className="mt-8 text-center">
          <p className="font-sans text-sm font-light text-cream-300/40 tracking-wide">
            {galleryImages.length} creaties · Fotografie Bistro In den Koning
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Reserve CTA ───────────────────────────────────────────────────────────────
function ReserveCTA() {
  return (
    <section className="bg-forest-700 relative overflow-hidden py-28 lg:py-36">
      <div className="pointer-events-none absolute inset-0 bg-grain opacity-[0.2]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,169,110,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="w-px h-12 bg-gold-300/30 mx-auto mb-8" />
          <p className="section-label text-gold-300/80 mb-6">Reserveer uw tafel</p>
          <h2
            className="display-heading text-cream-50 mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}
          >
            We verwachten<br />
            <em className="text-gold-300 not-italic font-medium">u graag</em>
          </h2>
          <p className="editorial-body text-cream-200/65 mb-10 max-w-md mx-auto">
            Donderdag tot en met maandag · vanaf 11:00 uur<br />
            Waterlandkerkje, Zeeuws-Vlaanderen
          </p>
          <Link
            to="/reserveren"
            className="btn-primary inline-flex items-center gap-3 group"
          >
            <span>Tafel Reserveren</span>
            <ArrowIcon />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: fadeEase }}
    >
      <Navigation />
      <main>
        <Hero />
        <StoryTeaser />
        <MenuTeaser />
        <GalleryTeaser />
        <Testimonials />
        <ReserveCTA />
      </main>
      <Footer />
    </motion.div>
  )
}
