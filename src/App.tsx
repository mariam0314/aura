import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import FeaturePage from './pages/FeaturePage'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [mainVisible, setMainVisible] = useState(false)

  const handleSplashComplete = () => {
    setShowSplash(false)
    setMainVisible(true)
  }

  return (
    <LanguageProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <BrowserRouter>
        <div className={`site ${mainVisible ? 'site--visible' : ''}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features/:slug" element={<FeaturePage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
