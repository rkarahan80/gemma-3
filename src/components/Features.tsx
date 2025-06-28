import React from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  Code, 
  Smartphone,
  MessageSquare,
  Image,
  BarChart3,
  Workflow
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced Reasoning',
      description: 'State-of-the-art performance on complex reasoning tasks with improved logical thinking capabilities.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Image,
      title: 'Multimodal Processing',
      description: 'Analyze and understand both text and images for comprehensive AI applications.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Globe,
      title: '140+ Languages',
      description: 'Build globally accessible applications with extensive multilingual support.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Optimized Performance',
      description: 'Run efficiently on single GPU/TPU with quantized versions for reduced computational requirements.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Code,
      title: 'Function Calling',
      description: 'Create AI agents that interact with external tools, APIs, and services seamlessly.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Built with comprehensive safety measures and responsible AI practices.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: MessageSquare,
      title: 'Conversational AI',
      description: 'Enhanced dialogue capabilities for natural, context-aware conversations.',
      color: 'from-teal-500 to-blue-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics Integration',
      description: 'Built-in analytics and performance monitoring for production deployments.',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Edge Deployment',
      description: 'Deploy directly on mobile devices and edge computing environments.',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Automate complex workflows with intelligent task orchestration.',
      color: 'from-emerald-500 to-green-500'
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the advanced capabilities that make Gemma 3 the perfect choice 
            for your next AI project
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card-hover bg-white p-8 rounded-2xl border border-gray-200 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features