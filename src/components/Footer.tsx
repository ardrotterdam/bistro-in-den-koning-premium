import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="bg-forest-700 relative overflow-hidden">

      {/* Top ornamental band */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <FadeIn className="lg:col-span-1" delay={0}>
            <div className="mb-6">
              <p className="font-display text-2xl text-cream-100 font-light tracking-[0.1em]">
                In den Koning
              </p>
              <p className="font-sans text-2xs tracking-widest-3 uppercase text-gold-300/60 mt-1">
                Bistro · Waterlandkerkje
              </p>
            </div>
            <p className="font-sans text-sm font-light text-cream-300/60 leading-relaxed max-w-[220px]">
              Een landje apart, waar zee en akker samenkomen op uw bord.
            </p>
          </FadeIn>

          {/* Navigation */}
          <FadeIn delay={0.1}>
            <p className="font-sans text-2xs tracking-widest-3 uppercase text-terra-300/70 mb-5">
              Navigatie
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { label: 'Ons Verhaal', href: '#verhaal' },
                { label: 'Seizoensmenu',href: '#menu' },
                { label: 'Galerij',     href: '#galerij' },
                { label: 'Reserveren', href: '#reserveren' },
              ].map(link => (
                <button
                  key={link.href}
                  onClick={() => handleScroll(link.href)}
                  className="font-sans text-sm text-cream-300/60 hover:text-gold-300 transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </FadeIn>

          {/* Info */}
          <FadeIn delay={0.2}>
            <p className="font-sans text-2xs tracking-widest-3 uppercase text-terra-300/70 mb-5">
              Openingstijden
            </p>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-sans text-sm text-cream-200/90">Donderdag – Maandag</p>
                <p className="font-sans text-xs text-cream-300/50">vanaf 11:00 uur</p>
              </div>
              <div>
                <p className="font-sans text-sm text-cream-200/50 line-through">Dinsdag & Woensdag</p>
                <p className="font-sans text-xs text-cream-300/40">Gesloten</p>
              </div>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={0.3}>
            <p className="font-sans text-2xs tracking-widest-3 uppercase text-terra-300/70 mb-5">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://maps.google.com/?q=Waterlandkerkje+Zeeuws-Vlaanderen"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-cream-300/60 hover:text-gold-300 transition-colors duration-300"
              >
                Waterlandkerkje<br />
                <span className="text-xs text-cream-300/40">Zeeuws-Vlaanderen</span>
              </a>
              <a
                href="mailto:info@bistroindenkoning.com"
                className="font-sans text-sm text-cream-300/60 hover:text-gold-300 transition-colors duration-300"
              >
                info@bistroindenkoning.com
              </a>
              <a
                href="https://www.bistroindenkoning.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-cream-300/60 hover:text-gold-300 transition-colors duration-300"
              >
                bistroindenkoning.com
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gold-300/10 mb-8" />

        {/* Bottom bar */}
        <FadeIn delay={0.4} className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-cream-300/30">
            © {new Date().getFullYear()} Bistro In den Koning — Angie & Juriën
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.bistroindenkoning.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-cream-300/30 hover:text-cream-300/60 transition-colors duration-300"
            >
              Originele website
            </a>
            <span className="text-cream-300/20">·</span>
            <p className="font-sans text-xs text-cream-300/20">
              Zeeuws-Vlaanderen, Nederland
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Large background text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
        <p
          className="font-display font-light text-cream-100/[0.025] whitespace-nowrap"
          style={{ fontSize: 'clamp(5rem, 15vw, 14rem)', lineHeight: 1 }}
        >
          In den Koning
        </p>
      </div>
    </footer>
  )
}
