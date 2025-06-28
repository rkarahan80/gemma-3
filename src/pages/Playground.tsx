import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Settings, Download, Share, Code, Eye, MessageSquare } from 'lucide-react'

const Playground = () => {
  const [selectedModel, setSelectedModel] = useState('gemma-3-4b')
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(1000)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const models = [
    { id: 'gemma-3-1b', name: 'Gemma 3 1B', description: 'Lightweight model for edge deployment' },
    { id: 'gemma-3-4b', name: 'Gemma 3 4B', description: 'Balanced performance and efficiency' },
    { id: 'gemma-3-12b', name: 'Gemma 3 12B', description: 'High performance for complex tasks' },
    { id: 'gemma-3-27b', name: 'Gemma 3 27B', description: 'Maximum capability model' }
  ]

  const examples = [
    {
      title: 'Creative Writing',
      prompt: 'Write a short story about a robot who discovers emotions for the first time.',
      category: 'creative'
    },
    {
      title: 'Code Generation',
      prompt: 'Create a Python function that implements a binary search algorithm with detailed comments.',
      category: 'code'
    },
    {
      title: 'Data Analysis',
      prompt: 'Analyze the following sales data and provide insights: Q1: $100k, Q2: $150k, Q3: $120k, Q4: $180k',
      category: 'analysis'
    },
    {
      title: 'Language Translation',
      prompt: 'Translate the following English text to French: "The future of artificial intelligence is bright and full of possibilities."',
      category: 'translation'
    }
  ]

  const handleGenerate = async () => {
    if (!input.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOutput(`This is a demo response from ${models.find(m => m.id === selectedModel)?.name}. In a real implementation, this would connect to the Gemma 3 API to generate intelligent responses based on your input and settings.

Your input: "${input}"

Model settings:
- Temperature: ${temperature}
- Max tokens: ${maxTokens}

This response demonstrates the model's capability to understand context and generate relevant, coherent text based on the provided prompt.`)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">AI Playground</span>
          </h1>
          <p className="text-xl text-gray-600">
            Experiment with Gemma 3 models and explore their capabilities in real-time
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold">Settings</h2>
              </div>

              {/* Model Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {models.find(m => m.id === selectedModel)?.description}
                </p>
              </div>

              {/* Temperature */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature: {temperature}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Focused</span>
                  <span>Creative</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  min="1"
                  max="4000"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Examples</h3>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(example.prompt)}
                      className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200"
                    >
                      <div className="font-medium text-sm">{example.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {example.prompt}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-5 h-5 text-primary-600" />
                      <span className="font-medium">Input</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-gemma-600" />
                      <span className="font-medium">Output</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100">
                      <Share className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-primary-600 rounded-lg hover:bg-gray-100">
                      <Code className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                {/* Input */}
                <div className="p-6 border-r border-gray-200">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="w-full h-full resize-none border-none outline-none text-gray-700 placeholder-gray-400"
                  />
                </div>

                {/* Output */}
                <div className="p-6 bg-gray-50">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  ) : (
                    <div className="h-full">
                      {output ? (
                        <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                          {output}
                        </pre>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          Generated content will appear here
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {input.length} characters
                  </div>
                  <button
                    onClick={handleGenerate}
                    disabled={!input.trim() || isLoading}
                    className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="w-4 h-4" />
                    <span>{isLoading ? 'Generating...' : 'Generate'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Playground