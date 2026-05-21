import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Home from './pages/Home'
import StoryPage from './pages/StoryPage'
import MenuPage from './pages/MenuPage'
import GalleryPage from './pages/GalleryPage'
import ReservationPage from './pages/ReservationPage'

function AppInner() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/ons-verhaal" element={<StoryPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/galerij" element={<GalleryPage />} />
        <Route path="/reserveren" element={<ReservationPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
