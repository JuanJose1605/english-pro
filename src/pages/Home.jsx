import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import Nosotros from '../components/sections/Nosotros'
import PorQue from '../components/sections/PorQue'
import Programas from '../components/sections/Programas'
import Metodologia from '../components/sections/Metodologia'
import Niveles from '../components/sections/Niveles'
import Certificaciones from '../components/sections/Certificaciones'
import Docentes from '../components/sections/Docentes'
import Galeria from '../components/sections/Galeria'
import Cotiza from '../components/sections/Cotiza'
import FAQ from '../components/sections/FAQ'
import Contacto from '../components/sections/Contacto'
import { scrollToId } from '../lib/scroll'

export default function Home({ onOpenQuiz }) {
  const location = useLocation()

  // When we arrive here from another page asking to scroll to a section
  // (e.g. clicking "Programas" from the blog), honor that request once mounted.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (target) {
      const t = setTimeout(() => scrollToId(target), 60)
      return () => clearTimeout(t)
    }
  }, [location.state])

  return (
    <main>
      <Hero onOpenQuiz={onOpenQuiz} />
      <TrustBar />
      <Nosotros />
      <PorQue />
      <Programas />
      <Metodologia />
      <Niveles />
      <Certificaciones />
      <Docentes />
      <Galeria />
      <Cotiza />
      <FAQ />
      <Contacto />
    </main>
  )
}
