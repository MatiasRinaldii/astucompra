'use client'

import { useEffect } from 'react'
import Navbar from '../src/components/Navbar'
import Hero from '../src/components/Hero'
import Platforms from '../src/components/Platforms'
import Presentation from '../src/components/Presentation'
import PainPoints from '../src/components/PainPoints'
import Method from '../src/components/Method'
import Results from '../src/components/Results'
import Testimonials from '../src/components/Testimonials'
import Calendar from '../src/components/Calendar'
import FAQ from '../src/components/FAQ'
import Footer from '../src/components/Footer'

export default function Page() {
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
      <FAQ />
      <Footer />
    </>
  )
}
