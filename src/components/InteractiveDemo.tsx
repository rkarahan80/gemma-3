import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Image, Code, MessageSquare, Sparkles } from 'lucide-react'

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState('chat')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m Gemma 3. I can help you with text analysis, image understanding, code generation, and much more. What would you like to explore?' }
  ])

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'vision', label: 'Vision', icon: Image },
    { id: 'code', label: 'Code', icon: Code },
    { id: 'creative', label: 'Creative', icon: Sparkles }
  ]

  const examples = {
    chat: [
      'Explain quantum computing in simple terms',
      'What are the benefits of renewable energy?',
      'How does machine learning work?'
    ],
    vision: [
      'Analyze this image for accessibility features',
      'Describe the architectural style in this photo',
      'Extract text from this document image'
    ],
    code: [
      'Create a React component for a todo list',
      'Write a Python function to sort a list',
      'Generate SQL query for user analytics'
    ],
    creative: [
      'Write a short story about AI and humanity',
      'Create a marketing slogan for a tech startup',
      'Compose a haiku about innovation'
    ]
  }

  const handleSend = () => {
    if (!input.trim()) return
    
    setMessages(prev => [...prev, 
      { role: 'user', content: input },
      { role: 'assistant', content: 'This is a demo response. In a real implementation, this would connect to the Gemma 3 API to provide intelligent responses based on your input.' }
    ])
    setInput('')
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Try Gemma 3 Now</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of Gemma 3 with our interactive demo. Test different capabilities 
            and see how it can transform your applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center mb-8 bg-gray-100 p-2 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-primary-600 shadow-md'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Demo Interface */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Try asking about ${activeTab}...`}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  onClick={handleSend}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>

              {/* Example Prompts */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examples[activeTab as keyof typeof examples].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(example)}
                      className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveDemo