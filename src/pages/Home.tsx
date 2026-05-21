import Navigation   from '../components/Navigation'
import Hero         from '../components/Hero'
import About        from '../components/About'
import SeasonalMenu from '../components/SeasonalMenu'
import Gallery      from '../components/Gallery'
import Testimonials from '../components/Testimonials'
import Reservation  from '../components/Reservation'
import Footer       from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <SeasonalMenu />
        <Gallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
