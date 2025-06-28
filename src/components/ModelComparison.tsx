import React from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

const ModelComparison = () => {
  const models = [
    {
      name: 'Gemma 3 1B',
      params: '1B',
      contextWindow: '128K',
      multimodal: true,
      functionCalling: true,
      languages: '140+',
      deployment: 'Mobile/Edge',
      recommended: false
    },
    {
      name: 'Gemma 3 4B',
      params: '4B',
      contextWindow: '128K',
      multimodal: true,
      functionCalling: true,
      languages: '140+',
      deployment: 'Single GPU',
      recommended: true
    },
    {
      name: 'Gemma 3 12B',
      params: '12B',
      contextWindow: '128K',
      multimodal: true,
      functionCalling: true,
      languages: '140+',
      deployment: 'High-end GPU',
      recommended: false
    },
    {
      name: 'Gemma 3 27B',
      params: '27B',
      contextWindow: '128K',
      multimodal: true,
      functionCalling: true,
      languages: '140+',
      deployment: 'Multi-GPU',
      recommended: false
    }
  ]

  const features = [
    'Parameters',
    'Context Window',
    'Multimodal',
    'Function Calling',
    'Languages',
    'Deployment'
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
            <span className="gradient-text">Choose Your Model</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect Gemma 3 model size for your specific use case and deployment requirements
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-gray-200 min-w-[800px]"
          >
            <div className="grid grid-cols-5 gap-4 p-6 border-b border-gray-200">
              <div className="font-semibold text-gray-900">Model</div>
              {models.map((model, index) => (
                <div key={index} className="text-center">
                  <div className={`p-4 rounded-xl ${model.recommended ? 'bg-gradient-to-br from-primary-50 to-gemma-50 border-2 border-primary-200' : 'bg-gray-50'}`}>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">
                      {model.name}
                    </h3>
                    {model.recommended && (
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {features.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-5 gap-4 p-6 border-b border-gray-100 last:border-b-0">
                <div className="font-medium text-gray-700">{feature}</div>
                {models.map((model, modelIndex) => (
                  <div key={modelIndex} className="text-center">
                    {feature === 'Parameters' && (
                      <span className="font-semibold text-primary-600">{model.params}</span>
                    )}
                    {feature === 'Context Window' && (
                      <span className="font-semibold text-gemma-600">{model.contextWindow}</span>
                    )}
                    {feature === 'Multimodal' && (
                      model.multimodal ? 
                        <Check className="w-5 h-5 text-green-500 mx-auto" /> : 
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                    {feature === 'Function Calling' && (
                      model.functionCalling ? 
                        <Check className="w-5 h-5 text-green-500 mx-auto" /> : 
                        <X className="w-5 h-5 text-red-500 mx-auto" />
                    )}
                    {feature === 'Languages' && (
                      <span className="font-semibold text-blue-600">{model.languages}</span>
                    )}
                    {feature === 'Deployment' && (
                      <span className="text-sm text-gray-600">{model.deployment}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ModelComparison