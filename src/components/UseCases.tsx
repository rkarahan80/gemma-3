import React from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  ShoppingCart, 
  GraduationCap, 
  Stethoscope, 
  Building, 
  Gamepad2,
  Camera,
  FileText,
  Headphones,
  Shield
} from 'lucide-react'

const UseCases = () => {
  const useCases = [
    {
      icon: Bot,
      title: 'Intelligent Chatbots',
      description: 'Build conversational AI assistants with natural language understanding and context awareness.',
      features: ['Multi-turn conversations', 'Context retention', 'Personality customization'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce AI',
      description: 'Enhance shopping experiences with personalized recommendations and smart search.',
      features: ['Product recommendations', 'Visual search', 'Customer support'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: GraduationCap,
      title: 'Educational Tools',
      description: 'Create adaptive learning platforms with personalized tutoring and assessment.',
      features: ['Adaptive learning', 'Automated grading', 'Content generation'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Stethoscope,
      title: 'Healthcare AI',
      description: 'Support medical professionals with diagnostic assistance and patient care.',
      features: ['Medical imaging analysis', 'Symptom assessment', 'Treatment suggestions'],
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Building,
      title: 'Enterprise Solutions',
      description: 'Streamline business processes with intelligent automation and analytics.',
      features: ['Document processing', 'Workflow automation', 'Data insights'],
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Camera,
      title: 'Content Creation',
      description: 'Generate and enhance multimedia content with AI-powered creativity tools.',
      features: ['Image analysis', 'Content writing', 'Creative assistance'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'Extract insights from documents with advanced text analysis and understanding.',
      features: ['Text extraction', 'Summarization', 'Classification'],
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: Headphones,
      title: 'Voice Assistants',
      description: 'Create sophisticated voice interfaces with natural speech understanding.',
      features: ['Speech recognition', 'Intent detection', 'Voice synthesis'],
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Enhance security with AI-powered threat detection and compliance monitoring.',
      features: ['Anomaly detection', 'Risk assessment', 'Compliance checking'],
      color: 'from-gray-500 to-slate-500'
    },
    {
      icon: Gamepad2,
      title: 'Gaming & Entertainment',
      description: 'Create immersive gaming experiences with intelligent NPCs and dynamic content.',
      features: ['NPC behavior', 'Procedural generation', 'Player analytics'],
      color: 'from-cyan-500 to-blue-500'
    }
  ]

  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Endless Possibilities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how Gemma 3 can transform industries and create innovative solutions 
            across various domains and use cases.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card-hover bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${useCase.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default UseCases