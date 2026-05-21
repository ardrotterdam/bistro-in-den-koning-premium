import Navigation   from '../components/Navigation'
import Hero         from '../components/Hero'
import About        from '../components/About'
import SeasonalMenu from '../components/SeasonalMenu'
import DishGallery  from '../components/DishGallery'
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
        <DishGallery />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </div>
  )
}
