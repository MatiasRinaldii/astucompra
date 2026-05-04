import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Platforms from './components/Platforms'
import Presentation from './components/Presentation'
import PainPoints from './components/PainPoints'
import Method from './components/Method'
import Results from './components/Results'
import Testimonials from './components/Testimonials'
import Calendar from './components/Calendar'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    // Intersection Observer for reveal animations
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      }),
      { threshold: 0.07 }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    // Bar fill animation
    const bo = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const w = entry.target.style.width
          entry.target.style.width = '0%'
          requestAnimationFrame(() =>
            setTimeout(() => (entry.target.style.width = w), 100)
          )
          bo.unobserve(entry.target)
        }
      }),
      { threshold: 0.7 }
    )
    document.querySelectorAll('.mb-fill').forEach((b) => bo.observe(b))

    return () => {
      io.disconnect()
      bo.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <Presentation />
      <Platforms />
      <PainPoints />
      <Method />
      <Results />
      <Testimonials />
      <Calendar />
      <Footer />
    </>
  )
}
