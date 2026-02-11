import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'
import Layout from './components/Layout'
import HomePage from './page/homePage/HomePage'
import ActivatePage from './page/activate/ActivatePage'
import AboutPage from './page/about/AboutPage'
import TermsPage from './page/terms/TermsPage'
import FAQPage from './page/faq/FAQPage'
import AdminVideosPage from './page/adminVideos/AdminVideosPage'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="activate" element={<ActivatePage />} />
              <Route path="activate/:token" element={<ActivatePage />} />
              <Route path="admin" element={<AdminVideosPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
