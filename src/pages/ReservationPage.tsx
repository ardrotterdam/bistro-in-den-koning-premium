import { motion } from 'framer-motion'
import Navigation from '../components/Navigation'
import Reservation from '../components/Reservation'
import Footer from '../components/Footer'

const fadeEase = [0.25, 0.46, 0.45, 0.94] as const

export default function ReservationPage() {
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
        <Reservation />
      </main>
      <Footer />
    </motion.div>
  )
}
