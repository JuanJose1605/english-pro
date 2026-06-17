import { useCallback, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import FloatingButtons from './components/FloatingButtons'
import LevelTest from './components/LevelTest'
import Footer from './components/sections/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AdminLogin from './pages/admin/AdminLogin'
import AdminPosts from './pages/admin/AdminPosts'
import AdminEditor from './pages/admin/AdminEditor'
import { scrollToId } from './lib/scroll'

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false)
  const location = useLocation()

  // The admin panel has its own chrome — hide the marketing navbar/footer there.
  const isAdmin = location.pathname.startsWith('/admin')

  const openQuiz = useCallback(() => setQuizOpen(true), [])
  const closeQuiz = useCallback(() => setQuizOpen(false), [])
  const goTrial = useCallback(() => scrollToId('cotiza'), [])

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home onOpenQuiz={openQuiz} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/posts/new" element={<AdminEditor />} />
        <Route path="/admin/posts/:id/edit" element={<AdminEditor />} />
      </Routes>

      {!isAdmin && <Footer />}

      {!isAdmin && (
        <>
          <FloatingButtons onTrial={goTrial} />
          <LevelTest open={quizOpen} onClose={closeQuiz} />
        </>
      )}
    </>
  )
}
