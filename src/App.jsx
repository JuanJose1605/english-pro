import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import FloatingButtons from './components/FloatingButtons'
import LevelTest from './components/LevelTest'
import Hero from './components/sections/Hero'
import TrustBar from './components/sections/TrustBar'
import Nosotros from './components/sections/Nosotros'
import PorQue from './components/sections/PorQue'
import Programas from './components/sections/Programas'
import Metodologia from './components/sections/Metodologia'
import Niveles from './components/sections/Niveles'
import Certificaciones from './components/sections/Certificaciones'
import Docentes from './components/sections/Docentes'
import Galeria from './components/sections/Galeria'
import Testimonios from './components/sections/Testimonios'
import Cotiza from './components/sections/Cotiza'
import FAQ from './components/sections/FAQ'
import Contacto from './components/sections/Contacto'
import Footer from './components/sections/Footer'
import { scrollToId } from './lib/scroll'

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false)

  const openQuiz = useCallback(() => setQuizOpen(true), [])
  const closeQuiz = useCallback(() => setQuizOpen(false), [])
  const goTrial = useCallback(() => scrollToId('cotiza'), [])

  return (
    <>
      <Navbar />

      <main>
        <Hero onOpenQuiz={openQuiz} />
        <TrustBar />
        <Nosotros />
        <PorQue />
        <Programas />
        <Metodologia />
        <Niveles />
        <Certificaciones />
        <Docentes />
        <Galeria />
        <Testimonios />
        <Cotiza />
        <FAQ />
        <Contacto />
      </main>

      <Footer />

      <FloatingButtons onTrial={goTrial} />
      <LevelTest open={quizOpen} onClose={closeQuiz} />
    </>
  )
}
