import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'
import Layout from './components/Layout'
import HomePage from './page/homePage/HomePage'
import ActivatePage from './page/activate/ActivatePage'

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="activate" element={<ActivatePage />} />
              <Route path="activate/:token" element={<ActivatePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
