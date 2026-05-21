import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Ons Verhaal', href: '/ons-verhaal' },
  { label: 'Menu',        href: '/menu' },
  { label: 'Galerij',    href: '/galerij' },
  { label: 'Reserveren', href: '/reserveren' },
]

export default function Navigation() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location                  = useLocation()
  const isHome                    = location.pathname === '/'

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Reset on mount in case page loaded scrolled
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const isActive = (href: string) => location.pathname === href

  // On non-home pages always show solid bg; on home page only after scroll
  const showSolid = !isHome || scrolled || menuOpen

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          menuOpen
            ? 'bg-[#0B2118] py-4'
            : showSolid
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
              <Link
                key={link.href}
                to={link.href}
                className={`font-sans text-xs tracking-widest-2 uppercase transition-colors duration-300 ${
                  isActive(link.href)
                    ? 'text-gold-300'
                    : 'text-cream-200 hover:text-gold-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo — center */}
          <Link to="/" className="flex flex-col items-center gap-1 group">
            <span className={`font-display text-xl md:text-2xl font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
              showSolid ? 'text-gold-300' : 'text-cream-50'
            }`}>
              In den Koning
            </span>
            <span className={`font-sans text-2xs tracking-widest-3 uppercase transition-colors duration-300 ${
              showSolid ? 'text-gold-200/70' : 'text-cream-200/70'
            }`}>
              Bistro · Waterlandkerkje
            </span>
          </Link>

          {/* Right links — desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.slice(2).map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-sans text-xs tracking-widest-2 uppercase transition-colors duration-300 ${
                  link.href === '/reserveren'
                    ? `border px-4 py-2 ${
                        isActive(link.href)
                          ? 'border-terra-300 text-terra-200'
                          : 'text-terra-300 hover:text-terra-200 border-terra-400/40 hover:border-terra-300'
                      }`
                    : isActive(link.href)
                    ? 'text-gold-300'
                    : 'text-cream-200 hover:text-gold-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger — mobile */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${
                menuOpen ? 'bg-gold-300' : 'bg-cream-200'
              }`}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`block w-4 h-px transition-colors duration-300 ${
                menuOpen ? 'bg-gold-300' : 'bg-cream-200'
              }`}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className={`block w-6 h-px transition-colors duration-300 ${
                menuOpen ? 'bg-gold-300' : 'bg-cream-200'
              }`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0B2118] flex flex-col items-center justify-center lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="flex flex-col items-center gap-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.45 }}
                >
                  <Link
                    to={link.href}
                    className={`font-display text-3xl font-light tracking-wide transition-colors duration-300 ${
                      isActive(link.href)
                        ? 'text-gold-300'
                        : link.href === '/reserveren'
                        ? 'text-gold-300 hover:text-gold-200'
                        : 'text-cream-100 hover:text-gold-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="absolute bottom-12 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="w-8 h-px bg-gold-300/40" aria-hidden="true" />
              <p className="font-sans text-xs tracking-widest-2 uppercase text-cream-200/80">
                Do – Ma · 11:00
              </p>
              <p className="font-sans text-xs tracking-widest-2 uppercase text-gold-300/80">
                Waterlandkerkje, Zeeuws-Vlaanderen
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
