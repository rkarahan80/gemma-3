import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import ModelComparison from './components/ModelComparison'
import InteractiveDemo from './components/InteractiveDemo'
import UseCases from './components/UseCases'
import Performance from './components/Performance'
import Footer from './components/Footer'
import Playground from './pages/Playground'
import Documentation from './pages/Documentation'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <ModelComparison />
            <InteractiveDemo />
            <UseCases />
            <Performance />
            <Footer />
          </>
        } />
        <Route path="/playground" element={<Playground />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </div>
  )
}

export default App