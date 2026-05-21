import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Ons Verhaal', href: '#verhaal' },
  { label: 'Menu',        href: '#menu' },
  { label: 'Galerij',    href: '#galerij' },
  { label: 'Reserveren', href: '#reserveren' },
]

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [atTop, setAtTop]         = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)
      setAtTop(y < 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-forest-600/95 backdrop-blur-md py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Left links — desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.slice(0, 2).map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-sans text-xs tracking-widest-2 uppercase transition-colors duration-300 ${
                  atTop ? 'text-cream-200 hover:text-gold-300' : 'text-cream-200 hover:text-gold-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Logo — center */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 group"
          >
            <span className={`font-display text-xl md:text-2xl font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
              scrolled ? 'text-gold-300' : 'text-cream-50'
            }`}>
              In den Koning
            </span>
            <span className={`font-sans text-2xs tracking-widest-3 uppercase transition-colors duration-300 ${
              scrolled ? 'text-gold-200/70' : 'text-cream-200/70'
            }`}>
              Bistro · Waterlandkerkje
            </span>
          </button>

          {/* Right links — desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.slice(2).map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-sans text-xs tracking-widest-2 uppercase transition-colors duration-300 ${
                  link.href === '#reserveren'
                    ? 'text-terra-300 hover:text-terra-200 border border-terra-400/40 px-4 py-2 hover:border-terra-300'
                    : 'text-cream-200 hover:text-gold-300'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu openen"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${scrolled ? 'bg-cream-200' : 'bg-cream-100'}`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-4 h-px transition-colors duration-300 ${scrolled ? 'bg-cream-200' : 'bg-cream-100'}`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${scrolled ? 'bg-cream-200' : 'bg-cream-100'}`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-forest-600/98 backdrop-blur-md flex flex-col items-center justify-center"
            initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-3xl font-light text-cream-100 hover:text-gold-300 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-12 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="font-sans text-xs tracking-widest-2 uppercase text-cream-300/60">
                Do – Ma · 11:00
              </p>
              <p className="font-sans text-xs tracking-widest-2 uppercase text-terra-300">
                Waterlandkerkje, Zeeuws-Vlaanderen
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
