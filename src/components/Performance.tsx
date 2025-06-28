import React from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const Performance = () => {
  const benchmarkData = [
    { name: 'MMLU', gemma3: 85, competitor1: 78, competitor2: 72 },
    { name: 'HellaSwag', gemma3: 92, competitor1: 87, competitor2: 83 },
    { name: 'ARC-C', gemma3: 88, competitor1: 82, competitor2: 79 },
    { name: 'TruthfulQA', gemma3: 76, competitor1: 69, competitor2: 65 },
    { name: 'GSM8K', gemma3: 91, competitor1: 84, competitor2: 78 }
  ]

  const performanceData = [
    { size: '1B', latency: 12, throughput: 850 },
    { size: '4B', latency: 28, throughput: 420 },
    { size: '12B', latency: 65, throughput: 180 },
    { size: '27B', latency: 145, throughput: 85 }
  ]

  const languageData = [
    { name: 'English', value: 25, color: '#0ea5e9' },
    { name: 'Chinese', value: 18, color: '#8b5cf6' },
    { name: 'Spanish', value: 15, color: '#10b981' },
    { name: 'French', value: 12, color: '#f59e0b' },
    { name: 'German', value: 10, color: '#ef4444' },
    { name: 'Others', value: 20, color: '#6b7280' }
  ]

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
            <span className="gradient-text">Performance Metrics</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how Gemma 3 outperforms competitors across various benchmarks and real-world scenarios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Benchmark Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Benchmark Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={benchmarkData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="gemma3" fill="#0ea5e9" name="Gemma 3" />
                <Bar dataKey="competitor1" fill="#8b5cf6" name="Competitor A" />
                <Bar dataKey="competitor2" fill="#10b981" name="Competitor B" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Latency vs Model Size</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="size" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#0ea5e9" strokeWidth={3} name="Latency (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">Language Support Distribution</h3>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <ResponsiveContainer width="100%" height={300} className="lg:w-1/2">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {languageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="lg:w-1/2 lg:pl-8">
              <div className="space-y-4">
                {languageData.map((lang, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: lang.color }}
                    ></div>
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-500">({lang.value}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Context Window', value: '128K', suffix: 'tokens' },
            { label: 'Languages', value: '140+', suffix: 'supported' },
            { label: 'Performance', value: '95%', suffix: 'accuracy' },
            { label: 'Efficiency', value: '3x', suffix: 'faster' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-primary-50 to-gemma-50 rounded-2xl border border-primary-100">
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.suffix}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Performance