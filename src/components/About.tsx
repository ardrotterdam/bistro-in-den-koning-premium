import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const IMAGE_1 = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop'
const IMAGE_2 = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop'
const IMAGE_3 = 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80&auto=format&fit=crop'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const img1Y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const img2Y = useTransform(scrollYProgress, [0, 1], ['-3%', '8%'])

  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="verhaal" ref={sectionRef} className="relative bg-cream-100 overflow-hidden">

      {/* ── Part 1: Introduction ── */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 lg:pt-36 lg:pb-28">

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text */}
          <div className="order-2 lg:order-1">
            <FadeIn delay={0}>
              <p className="section-label mb-5">Ons Verhaal</p>
            </FadeIn>

            <motion.h2
              ref={titleRef}
              className="display-heading text-forest-500 mb-8"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', lineHeight: 1.0 }}
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              {['Een', 'landje', 'apart'].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {i === 1 ? <em className="text-terra-400 not-italic font-medium">{word}</em> : word}
                </motion.span>
              ))}
            </motion.h2>

            <FadeIn delay={0.2}>
              <p className="editorial-body text-forest-400/90 mb-6 max-w-lg">
                Waterlandkerkje, gelegen in Zeeuws-Vlaanderen — een delta waar zee en land
                elkaar ontmoeten. Op steenworp afstand brengen vissers ons het mooiste uit
                de Noordzee, terwijl om ons heen de akkers en weilanden onze andere
                producten laten groeien en bloeien.
              </p>
              <p className="editorial-body text-forest-400/90 mb-6 max-w-lg">
                We kunnen niet beter zitten dan in dit bourgondisch stukje Nederland.
                Soms voelen we ons ook even Vlaming — kortom, het beste van twee werelden
                op één bord.
              </p>
              <p className="editorial-body text-forest-400/90 max-w-lg italic font-light text-lg">
                "Maar stiekem blijven we gewoon lekker hier. Want het is hier zo fijn."
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="flex items-center gap-4 mt-10">
                <div className="flex flex-col">
                  <span className="font-display text-xl text-forest-500 italic">Angie & Juriën</span>
                  <span className="font-sans text-2xs tracking-widest-2 uppercase text-terra-400 mt-1">Eigenaren</span>
                </div>
                <div className="w-px h-10 bg-gold-300/40 ml-2" />
                <div className="flex flex-col gap-1">
                  <span className="font-sans text-2xs tracking-widest-2 uppercase text-forest-400/60">Geopend</span>
                  <span className="font-sans text-sm text-forest-500">Do – Ma · vanaf 11:00</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Images */}
          <div className="order-1 lg:order-2 relative h-[420px] lg:h-[560px]">
            <motion.div
              className="absolute top-0 right-0 w-4/5 h-4/5 overflow-hidden"
              style={{ y: img1Y }}
            >
              <motion.div
                className="w-full h-full"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
              >
                <img
                  src={IMAGE_1}
                  alt="Gerechten van Bistro In den Koning"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute bottom-0 left-0 w-2/5 h-2/5 overflow-hidden border-4 border-cream-100"
              style={{ y: img2Y }}
            >
              <img
                src={IMAGE_2}
                alt="Interieur Bistro In den Koning"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Decorative element */}
            <motion.div
              className="absolute -bottom-6 right-8 w-24 h-24 border border-gold-300/30 hidden lg:block"
              initial={{ opacity: 0, rotate: -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>

      {/* ── Part 2: Philosophy band ── */}
      <div className="bg-forest-500 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {[
              {
                icon: '⚓',
                label: 'Zee & Delta',
                body: 'Verse vis en zeevruchten rechtstreeks van lokale vissers. De Zeeuwse delta op zijn best.',
              },
              {
                icon: '🌿',
                label: 'Seizoen & Terroir',
                body: 'Ons menu verandert met de seizoenen. Wat er groeit en bloeit, verschijnt op uw bord.',
              },
              {
                icon: '🍷',
                label: 'Bourgondische Geest',
                body: 'Franse en Vlaamse invloeden, verankerd in Zeeuws-Vlaanderen. Klassiekers als basis, altijd afwisselend.',
              },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 0.15} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="w-14 h-14 rounded-full border border-gold-300/30 flex items-center justify-center mb-5 text-2xl">
                  {item.icon}
                </div>
                <p className="section-label text-gold-300/80 mb-3">{item.label}</p>
                <p className="font-sans font-light text-cream-200/80 leading-relaxed">{item.body}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ── Part 3: Atmospheric image strip ── */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: img2Y }}
        >
          <img
            src={IMAGE_3}
            alt="Sfeer Bistro In den Koning"
            className="w-full h-[120%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-forest-600/40" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <FadeIn>
            <blockquote className="text-center px-6">
              <p className="font-display font-light text-cream-50 text-2xl md:text-4xl lg:text-5xl italic max-w-3xl leading-tight">
                "Het beste van zee en akker, met de warmte van Zeeuws-Vlaanderen."
              </p>
            </blockquote>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
