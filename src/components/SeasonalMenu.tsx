import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import zomerSeasonImage from '@/assets/images/season-zomer.png'

type Season = 'Lente' | 'Zomer' | 'Herfst' | 'Winter'

interface Dish {
  name:        string
  description: string
  price:       string
  highlight?:  boolean
  tag?:        string
}

interface MenuSection {
  label: string
  items: Dish[]
}

const menuData: Record<Season, MenuSection[]> = {
  Lente: [
    {
      label: 'Voorgerechten',
      items: [
        { name: 'Zeeuwse mosselen', description: 'Stoom met witte wijn, sjalot, peterselie & ambachtelijk brood', price: '16', tag: 'Klassiek' },
        { name: 'Lente-asperges', description: 'Witte & groene asperges, beurre blanc, zacht gepocheerd ei, Zeeuwse ham', price: '18', highlight: true },
        { name: 'Gerookte paling', description: 'Westerschelde paling, mierikswortelcrème, ingelegde komkommer, dille', price: '19' },
      ],
    },
    {
      label: 'Hoofdgerechten',
      items: [
        { name: 'Zeetong', description: 'Gebakken zeetong, kappertjesboter, Zeeuwse aardappelpuree, seizoensgroente', price: '34', highlight: true, tag: 'Chef\'s keuze' },
        { name: 'Lamsrack', description: 'Zeeuws lam, lentejus, gestoofde witte bonen, chimichurri van kruiden', price: '32' },
        { name: 'Risotto van voorjaarskruiden', description: 'Biologische risotto, jonge spinazie, parmezaan, truffelolie', price: '24' },
      ],
    },
    {
      label: 'Desserts',
      items: [
        { name: 'Aardbeienvacherin', description: 'Knapperig meringue, Zeeuwse aardbeien, slagroom, pistache', price: '12' },
        { name: 'Kaasplankje', description: 'Selectie streekkazen, huisgemaakte confiture, noten & honing', price: '15', tag: 'Te delen' },
      ],
    },
  ],
  Zomer: [
    {
      label: 'Voorgerechten',
      items: [
        { name: 'Ceviche van zeebaars', description: 'Verse zeebaars, limoen, koriander, rode ui, avocado', price: '17', highlight: true },
        { name: 'Gazpacho', description: 'Koude tomatensoep, Zeeuwse garnalen, croutons, basilicum-olie', price: '14' },
        { name: 'Burrata', description: 'Romige burrata, erfstukken tomaten, pesto, zeezout, basilicum', price: '16' },
      ],
    },
    {
      label: 'Hoofdgerechten',
      items: [
        { name: 'Gegrilde kreeft', description: '½ Zeeuwse kreeft, gestoofde venkel, saffraanboter, gegrild brood', price: '44', highlight: true, tag: 'Seizoenspecialiteit' },
        { name: 'Varkensbuik', description: 'Langzaam gegaard, appel-cider jus, zomerse groenten, kruidenstoemp', price: '28' },
        { name: 'Zomerse ravioli', description: 'Courgette, ricotta, tomatenragout, pijnboompitten, basilicum', price: '23' },
      ],
    },
    {
      label: 'Desserts',
      items: [
        { name: 'Sorbet trio', description: 'Aardbei, citroen-basilicum, rode fruit — seizoensvruchten', price: '11' },
        { name: 'Crème brûlée', description: 'Klassieke crème brûlée, lavendel, vers seizoensfruit', price: '12', highlight: true },
      ],
    },
  ],
  Herfst: [
    {
      label: 'Voorgerechten',
      items: [
        { name: 'Paddenstoelentart', description: 'Wilde paddenstoelen, truffelcrème, hazelnoot, tijm, parmezaan', price: '17', highlight: true },
        { name: 'Gebakken ganzenlever', description: 'Foie gras, vijgenconfiture, brioche, porto-reductie', price: '24', tag: 'Premium' },
        { name: 'Erwtensoep', description: 'Traditionele Zeeuwse snert, gerookt spek, roggebrood & mosterd', price: '13' },
      ],
    },
    {
      label: 'Hoofdgerechten',
      items: [
        { name: 'Haas à la royale', description: 'Gestoofd in rode wijn, spek, zilveruitjes, champignons, puree', price: '36', highlight: true, tag: 'Chef\'s keuze' },
        { name: 'Tarbot', description: 'Verse Noordzee tarbot, pomme de terre sarladaise, beurre blanc', price: '38' },
        { name: 'Pompoenrisotto', description: 'Biologische pompoen, gorgonzola, walnoot, salie, parmezaan', price: '24' },
      ],
    },
    {
      label: 'Desserts',
      items: [
        { name: 'Tarte tatin', description: 'Warme appeltaart, karamel, slagroom, vanille-ijs', price: '12', highlight: true },
        { name: 'Chocolade fondant', description: 'Warm hart van pure chocolade, espressocrème, fleur de sel', price: '13' },
      ],
    },
  ],
  Winter: [
    {
      label: 'Voorgerechten',
      items: [
        { name: 'Oesterselectie', description: 'Zeeuwse oesters no. 3, mignonette, citroen, tabasco & roggebrood', price: '22', highlight: true, tag: 'Klassiek' },
        { name: 'Bisque de homard', description: 'Rijke kreeftenbisque, croutons, room, cognac', price: '16' },
        { name: 'Witlof salade', description: 'Witlof, Zeeuwse blauwe kaas, walnoot, peer, honingvinaigrette', price: '14' },
      ],
    },
    {
      label: 'Hoofdgerechten',
      items: [
        { name: 'Côte de boeuf', description: 'Droog gerijpte côte de boeuf (500g), café de Paris, frites & salade — voor twee', price: '68', highlight: true, tag: 'Voor twee' },
        { name: 'Stoofvlees à la Flamande', description: 'Vlaamse stoverij, Duvel-bier, frietjes, appelmoes', price: '26' },
        { name: 'Gebakken tong', description: 'Zeeuwse tong, grenobloise, aardappelgratin, seizoensgroente', price: '34' },
      ],
    },
    {
      label: 'Desserts',
      items: [
        { name: 'Bûche de Noël', description: 'Buche met praline, slagroom en chocolade (dec.)', price: '13', tag: 'Feestmaand' },
        { name: 'Warme rijstepap', description: 'Traditionele rijstepap, kaneel, bruine suiker, rode fruitcoulis', price: '10', highlight: true },
      ],
    },
  ],
}

const seasons: Season[] = ['Lente', 'Zomer', 'Herfst', 'Winter']

const seasonColors: Record<Season, { accent: string; bg: string; badge: string }> = {
  Lente:  { accent: 'text-forest-300', bg: 'bg-forest-50',  badge: 'bg-forest-100 text-forest-400' },
  Zomer:  { accent: 'text-terra-400',  bg: 'bg-terra-100/30', badge: 'bg-terra-100 text-terra-500' },
  Herfst: { accent: 'text-gold-400',   bg: 'bg-gold-100/30',  badge: 'bg-gold-100 text-gold-500' },
  Winter: { accent: 'text-cream-400',  bg: 'bg-forest-50',   badge: 'bg-cream-200 text-forest-400' },
}

interface SeasonMeta {
  index:          string
  months:         string
  image:          string
  imagePosition?: string
}

const seasonMeta: Record<Season, SeasonMeta> = {
  Lente: {
    index:  '01',
    months: 'Maart — Mei',
    image:  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=1200&q=80&auto=format&fit=crop',
  },
  Zomer: {
    index:          '02',
    months:         'Juni — Augustus',
    image:          zomerSeasonImage,
    imagePosition:  'center 42%',
  },
  Herfst: {
    index:  '03',
    months: 'September — November',
    image:  'https://images.unsplash.com/photo-1683025192578-ae647c9d897a?w=1200&q=80&auto=format&fit=crop',
  },
  Winter: {
    index:  '04',
    months: 'December — Februari',
    image:  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80&auto=format&fit=crop',
  },
}

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

export default function SeasonalMenu() {
  const [activeSeason, setActiveSeason] = useState<Season>('Herfst')
  const colors = seasonColors[activeSeason]

  return (
    <section id="menu" className="bg-cream-200 relative overflow-hidden py-28 lg:py-36">

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #1A3329 0, #1A3329 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <p className="section-label mb-5">Seizoenskaart</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="display-heading text-forest-500 mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.05 }}>
              Van het <em className="text-terra-400 not-italic">seizoen</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="editorial-body text-forest-400/80 max-w-xl mx-auto">
              Ons menu wisselt met de seizoenen. De beste producten van onze regio
              vertaald naar eerlijke, smaakvolle gerechten.
            </p>
          </FadeIn>
        </div>

        {/* Season selector — editorial cards */}
        <FadeIn delay={0.25} className="mb-14 lg:mb-20">
          <div
            role="tablist"
            aria-label="Seizoenen"
            className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {seasons.map((season, i) => {
              const meta     = seasonMeta[season]
              const isActive = activeSeason === season

              return (
                <motion.button
                  key={season}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveSeason(season)}
                  whileTap={{ scale: 0.985 }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`group relative isolate flex h-36 sm:h-40 lg:h-[420px] flex-row overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-cream-200 lg:flex-col-reverse ${
                    isActive
                      ? 'shadow-[0_30px_60px_-25px_rgba(26,51,41,0.45)]'
                      : 'shadow-[0_8px_24px_-18px_rgba(26,51,41,0.35)] hover:shadow-[0_20px_40px_-22px_rgba(26,51,41,0.4)]'
                  } transition-shadow duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
                >
                  {/* Text panel */}
                  <div
                    className={`relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-6 lg:h-[150px] lg:flex-none lg:p-6 ${
                      isActive
                        ? 'bg-forest-500'
                        : 'bg-cream-100 group-hover:bg-cream-50'
                    } transition-colors duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className={`font-sans text-2xs tracking-widest-3 uppercase ${
                          isActive ? 'text-gold-200' : 'text-forest-400/45'
                        } transition-colors duration-700`}
                      >
                        Seizoen · {meta.index}
                      </span>
                      <motion.span
                        aria-hidden
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale:   isActive ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold-300"
                      />
                    </div>

                    <div>
                      <h3
                        className={`mb-1.5 font-display font-light leading-none ${
                          isActive ? 'text-cream-50' : 'text-forest-500'
                        } transition-colors duration-700`}
                        style={{ fontSize: 'clamp(1.875rem, 5vw, 2.75rem)', letterSpacing: '-0.01em' }}
                      >
                        {season}
                      </h3>
                      <p
                        className={`font-sans text-2xs font-light tracking-widest-2 uppercase ${
                          isActive ? 'text-gold-200/85' : 'text-terra-400/85'
                        } transition-colors duration-700`}
                      >
                        {meta.months}
                      </p>
                    </div>
                  </div>

                  {/* Image panel */}
                  <div className="relative w-[42%] overflow-hidden sm:w-[45%] lg:w-full lg:flex-1">
                    <div
                      className="absolute inset-0 bg-cover will-change-transform duration-[1600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                      style={{
                        backgroundImage:    `url(${meta.image})`,
                        backgroundPosition: meta.imagePosition ?? 'center',
                        transitionProperty: 'transform',
                      }}
                    />
                    {/* Cinematic gradient — blends image toward text panel */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r lg:bg-gradient-to-t ${
                        isActive
                          ? 'from-forest-700/35 via-forest-700/5 to-transparent'
                          : 'from-forest-700/65 via-forest-700/20 to-transparent'
                      } transition-opacity duration-700`}
                    />
                    {/* Cream desaturation wash on idle */}
                    <div
                      className={`absolute inset-0 bg-cream-200 mix-blend-soft-light transition-opacity duration-700 ${
                        isActive ? 'opacity-0' : 'opacity-45 group-hover:opacity-20'
                      }`}
                    />
                  </div>

                  {/* Gold accent — vertical on mobile, horizontal on desktop */}
                  <div
                    className={`pointer-events-none absolute left-0 top-0 z-20 h-full w-[3px] bg-gold-300 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:bottom-0 lg:top-auto lg:h-[3px] lg:w-full ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Hairline outer border */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-20 border transition-colors duration-700 ${
                      isActive ? 'border-gold-300/30' : 'border-gold-200/25'
                    }`}
                  />
                </motion.button>
              )
            })}
          </div>
        </FadeIn>

        {/* Menu content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {menuData[activeSeason].map((section) => (
              <div key={section.label}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-px bg-gold-300" />
                  <p className="font-sans text-2xs tracking-widest-3 uppercase text-terra-400">
                    {section.label}
                  </p>
                </div>

                <div className="flex flex-col gap-6">
                  {section.items.map((dish) => (
                    <div
                      key={dish.name}
                      className={`group relative p-5 border-gold-hairline transition-all duration-300 hover:bg-white/40 ${
                        dish.highlight ? 'bg-white/30' : 'bg-transparent'
                      }`}
                    >
                      {dish.tag && (
                        <span className={`inline-block font-sans text-2xs tracking-widest-2 uppercase px-2 py-1 mb-3 ${colors.badge}`}>
                          {dish.tag}
                        </span>
                      )}
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="font-display text-lg font-medium text-forest-500 leading-tight">
                          {dish.name}
                        </h3>
                        <span className={`font-display text-xl font-light flex-shrink-0 ${colors.accent}`}>
                          €{dish.price}
                        </span>
                      </div>
                      <p className="font-sans text-sm font-light text-forest-400/75 leading-relaxed">
                        {dish.description}
                      </p>

                      {dish.highlight && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-terra-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <FadeIn delay={0.3} className="mt-14 pt-10 border-t border-gold-200/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-sans text-sm font-light text-forest-400/60 max-w-md text-center md:text-left">
              Allergieën of dieetwensen? Onze bediening helpt u graag.
              Alle prijzen zijn inclusief BTW.
            </p>
            <button
              onClick={() => document.querySelector('#reserveren')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-secondary"
            >
              Tafel Reserveren
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
