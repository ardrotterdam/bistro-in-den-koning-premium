import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const BG_IMAGE = 'https://images.unsplash.com/photo-1776775464105-cc74282fb286?w=2000&q=80&auto=format&fit=crop'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

interface FormData {
  naam:    string
  email:   string
  datum:   string
  tijd:    string
  personen: string
  bericht: string
}

const initialForm: FormData = {
  naam:     '',
  email:    '',
  datum:    '',
  tijd:     '',
  personen: '2',
  bericht:  '',
}

export default function Reservation() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY    = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const bgOp   = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 0.65, 0.65, 0.5])

  const [form, setForm]         = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const inputClasses = `
    w-full bg-transparent border-b border-gold-200/40 text-cream-100
    font-sans text-sm font-light placeholder-cream-300/30
    py-3 focus:outline-none focus:border-gold-300
    transition-colors duration-300
  `

  const labelClasses = 'font-sans text-2xs tracking-widest-2 uppercase text-terra-300/80 mb-2 block'

  const timeSlots = ['11:30', '12:00', '12:30', '13:00', '13:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00']
  const partyOptions = ['1', '2', '3', '4', '5', '6', '7', '8+']

  return (
    <section id="reserveren" ref={sectionRef} className="relative overflow-hidden">

      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />
        <motion.div className="absolute inset-0 bg-forest-700" style={{ opacity: bgOp }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Info */}
          <div>
            <FadeIn>
              <p className="section-label text-gold-300/80 mb-5">Reserveer uw tafel</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-heading text-cream-50 mb-8"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}>
                We verwachten<br />
                <em className="text-gold-300 not-italic font-medium">u graag</em>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="editorial-body text-cream-200/80 mb-10 max-w-md">
                Geniet van een onvergetelijke maaltijd in het hart van Zeeuws-Vlaanderen.
                Reserveer uw tafel voor een bijzondere avond of een heerlijk middagmaal.
              </p>
            </FadeIn>

            {/* Opening hours */}
            <FadeIn delay={0.3} className="mb-10">
              <div className="border-l-2 border-terra-400 pl-6 space-y-4">
                <div>
                  <p className="font-sans text-2xs tracking-widest-2 uppercase text-terra-300/80 mb-1">Openingstijden</p>
                  <p className="font-display text-xl text-cream-100">Donderdag – Maandag</p>
                  <p className="font-sans text-sm text-cream-300/70">vanaf 11:00 uur</p>
                </div>
                <div>
                  <p className="font-sans text-2xs tracking-widest-2 uppercase text-terra-300/80 mb-1">Gesloten</p>
                  <p className="font-display text-xl text-cream-100">Dinsdag & Woensdag</p>
                </div>
              </div>
            </FadeIn>

            {/* Contact */}
            <FadeIn delay={0.4}>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:info@bistroindenkoning.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-px bg-gold-300/40 group-hover:w-12 transition-all duration-300" />
                  <span className="font-sans text-sm text-cream-200/70 group-hover:text-gold-300 transition-colors duration-300">
                    info@bistroindenkoning.com
                  </span>
                </a>
                <a
                  href="https://maps.google.com/?q=Waterlandkerkje+Zeeuws-Vlaanderen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-8 h-px bg-gold-300/40 group-hover:w-12 transition-all duration-300" />
                  <span className="font-sans text-sm text-cream-200/70 group-hover:text-gold-300 transition-colors duration-300">
                    Waterlandkerkje, Zeeuws-Vlaanderen
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: Form */}
          <FadeIn delay={0.2}>
            <div className="bg-forest-600/60 backdrop-blur-sm border border-gold-200/15 p-8 md:p-10">
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 border border-gold-300/50 rounded-full flex items-center justify-center mb-6">
                    <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
                      <path d="M1.5 9L8.5 16L22.5 1.5" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="section-label text-gold-300 mb-4">Reservering Ontvangen</p>
                  <h3 className="font-display text-2xl text-cream-100 mb-3">Dank u, {form.naam}!</h3>
                  <p className="font-sans text-sm text-cream-300/70 max-w-xs">
                    We bevestigen uw reservering zo spoedig mogelijk via e-mail.
                    Tot ziens in Waterlandkerkje!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm(initialForm) }}
                    className="mt-8 font-sans text-xs tracking-widest-2 uppercase text-gold-300/70 hover:text-gold-300 transition-colors duration-300 underline underline-offset-4"
                  >
                    Nieuwe reservering
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="font-sans text-2xs tracking-widest-3 uppercase text-gold-300/60 mb-6">
                    Reserveringsformulier
                  </p>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="naam" className={labelClasses}>Naam</label>
                      <input
                        id="naam"
                        name="naam"
                        type="text"
                        required
                        placeholder="Voor- en achternaam"
                        value={form.naam}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClasses}>E-mail</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="uw@email.nl"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="datum" className={labelClasses}>Datum</label>
                      <input
                        id="datum"
                        name="datum"
                        type="date"
                        required
                        value={form.datum}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className={`${inputClasses} [color-scheme:dark]`}
                      />
                    </div>
                    <div>
                      <label htmlFor="tijd" className={labelClasses}>Tijdstip</label>
                      <select
                        id="tijd"
                        name="tijd"
                        required
                        value={form.tijd}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none cursor-pointer bg-transparent`}
                      >
                        <option value="" disabled className="bg-forest-600">Kies tijdstip</option>
                        {timeSlots.map(t => (
                          <option key={t} value={t} className="bg-forest-600">{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Aantal personen</label>
                    <div className="flex gap-2 flex-wrap">
                      {partyOptions.map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, personen: n }))}
                          className={`w-10 h-10 font-sans text-sm transition-all duration-200 border ${
                            form.personen === n
                              ? 'bg-terra-400 border-terra-400 text-cream-50'
                              : 'border-gold-200/30 text-cream-300/60 hover:border-gold-300 hover:text-cream-200'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bericht" className={labelClasses}>
                      Bijzonderheden <span className="opacity-50">(optioneel)</span>
                    </label>
                    <textarea
                      id="bericht"
                      name="bericht"
                      rows={3}
                      placeholder="Allergieën, dieetwensen, speciale gelegenheden..."
                      value={form.bericht}
                      onChange={handleChange}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary justify-center mt-2 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                        <span>Verzenden...</span>
                      </>
                    ) : (
                      <>
                        <span>Reservering Bevestigen</span>
                        <ArrowIcon />
                      </>
                    )}
                  </button>

                  <p className="font-sans text-2xs text-cream-300/40 text-center">
                    Wij bevestigen uw reservering binnen 24 uur per e-mail.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 1L15 5L11 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 5H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
