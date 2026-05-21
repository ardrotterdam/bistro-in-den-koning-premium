import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Review {
  quote:  string
  author: string
  source: string
  date:   string
}

const reviews: Review[] = [
  {
    quote:  'Een bourgondische parel verstopt in Zeeuws-Vlaanderen. Het eten is verrassend verfijnd, de sfeer huiselijk en warm. Een absolute aanrader.',
    author: 'Recensie PZC',
    source: 'Provinciale Zeeuwse Courant',
    date:   'Oktober 2021',
  },
  {
    quote:  'De kreeft was perfect bereid, de service attent en hartelijk. Waterlandkerkje alleen al waard om voor te reizen. We komen zeker terug.',
    author: 'A. de Vries',
    source: 'Google Reviews',
    date:   '2024',
  },
  {
    quote:  'Seizoensgebonden keuken op zijn best. Elke keer als we komen verrast het menu ons opnieuw. Dit is het soort bistro dat je in Frankrijk zoekt maar hier vindt.',
    author: 'M. & J. Claes',
    source: 'TripAdvisor',
    date:   '2024',
  },
]

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

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="bg-cream-100 relative overflow-hidden py-24 lg:py-32">

      {/* Decorative horizontal rule */}
      <div className="absolute top-0 left-0 right-0 flex items-center">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">

          {/* Left: heading */}
          <div className="lg:w-72 flex-shrink-0">
            <FadeIn>
              <p className="section-label mb-5">Ervaringen</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="display-heading text-forest-500 leading-tight"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Wat gasten<br />
                <em className="text-terra-400 not-italic font-medium">zeggen</em>
              </h2>
            </FadeIn>

            <FadeIn delay={0.25} className="mt-8">
              <div className="flex items-center gap-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="font-sans text-xs text-forest-400/60 mt-2">
                Uitstekend beoordeeld door onze gasten
              </p>
            </FadeIn>
          </div>

          {/* Right: reviews */}
          <div ref={trackRef} className="flex-1 grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <FadeIn key={review.author} delay={0.15 + i * 0.1}>
                <article className="flex flex-col h-full p-6 border border-gold-200/40 bg-cream-50/50 hover:bg-white/60 transition-colors duration-300">
                  {/* Quote mark */}
                  <div className="font-display text-4xl text-gold-300/40 leading-none mb-4 font-light">"</div>

                  <blockquote className="flex-1 font-sans text-sm font-light text-forest-400/80 leading-relaxed italic mb-6">
                    {review.quote}
                  </blockquote>

                  <footer className="border-t border-gold-200/30 pt-4">
                    <p className="font-sans text-sm text-forest-500 font-light">{review.author}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-sans text-xs text-terra-400/70">{review.source}</p>
                      <p className="font-sans text-xs text-forest-400/40">{review.date}</p>
                    </div>
                  </footer>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 1L8.545 5.21H13L9.545 7.79L10.91 12L7 9.42L3.09 12L4.455 7.79L1 5.21H5.455L7 1Z"
        fill="#C9A96E"
      />
    </svg>
  )
}
