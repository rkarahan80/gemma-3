import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Cpu, Globe, Zap, Eye } from 'lucide-react'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const fullText = "Google's Most Advanced Open AI Model"

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  const features = [
    { icon: Cpu, text: '128K Context Window' },
    { icon: Eye, text: 'Multimodal Capabilities' },
    { icon: Globe, text: '140+ Languages' },
    { icon: Zap, text: 'Single GPU Performance' }
  ]

  return (
    <section className="pt-20 pb-16 gradient-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Gemma 3</span>
            </h1>
            <div className="h-16 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-gray-600 typing-animation">
                {typedText}
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
          >
            Build powerful AI applications with state-of-the-art performance, multimodal capabilities, 
            and support for 140+ languages. All optimized to run efficiently on a single GPU.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="btn-primary flex items-center justify-center space-x-2">
              <span>Try Interactive Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="btn-secondary">
              View Documentation
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <Icon className="w-8 h-8 text-primary-600 mb-3" />
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {feature.text}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero