import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  Zap, 
  Settings, 
  Shield, 
  Globe,
  ChevronRight,
  Search,
  ExternalLink
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Documentation = () => {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [searchQuery, setSearchQuery] = useState('')

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Zap,
      content: `# Getting Started with Gemma 3

Welcome to Gemma 3, Google's most advanced open AI model. This guide will help you get up and running quickly.

## Quick Start

### Installation

\`\`\`bash
pip install gemma3
\`\`\`

### Basic Usage

\`\`\`python
from gemma3 import Gemma3

# Initialize the model
model = Gemma3(model_size="4b")

# Generate text
response = model.generate("Explain quantum computing in simple terms")
print(response)
\`\`\`

## Model Sizes

Choose the right model size for your use case:

- **1B**: Perfect for mobile and edge deployment
- **4B**: Balanced performance and efficiency (recommended)
- **12B**: High performance for complex tasks
- **27B**: Maximum capability model

## Key Features

- 128K context window
- Multimodal capabilities
- 140+ language support
- Function calling
- Optimized for single GPU deployment`
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code,
      content: `# API Reference

## Gemma3 Class

### Constructor

\`\`\`python
Gemma3(
    model_size: str = "4b",
    device: str = "auto",
    quantization: str = None,
    max_memory: dict = None
)
\`\`\`

**Parameters:**
- \`model_size\`: Model size ("1b", "4b", "12b", "27b")
- \`device\`: Device to run on ("cpu", "cuda", "auto")
- \`quantization\`: Quantization method ("int8", "int4", None)
- \`max_memory\`: Memory allocation per device

### Methods

#### generate()

\`\`\`python
generate(
    prompt: str,
    max_tokens: int = 1000,
    temperature: float = 0.7,
    top_p: float = 0.9,
    stop_sequences: List[str] = None
) -> str
\`\`\`

Generate text based on the input prompt.

#### chat()

\`\`\`python
chat(
    messages: List[Dict[str, str]],
    max_tokens: int = 1000,
    temperature: float = 0.7
) -> str
\`\`\`

Multi-turn conversation interface.

#### analyze_image()

\`\`\`python
analyze_image(
    image_path: str,
    prompt: str = "Describe this image"
) -> str
\`\`\`

Analyze images with multimodal capabilities.`
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: Settings,
      content: `# Configuration

## Environment Setup

### GPU Configuration

\`\`\`python
import torch
from gemma3 import Gemma3

# Check GPU availability
if torch.cuda.is_available():
    device = "cuda"
    print(f"Using GPU: {torch.cuda.get_device_name()}")
else:
    device = "cpu"
    print("Using CPU")

model = Gemma3(model_size="4b", device=device)
\`\`\`

### Memory Optimization

\`\`\`python
# For limited GPU memory
model = Gemma3(
    model_size="4b",
    quantization="int8",
    max_memory={"0": "8GB"}
)
\`\`\`

## Configuration File

Create a \`gemma3_config.yaml\` file:

\`\`\`yaml
model:
  size: "4b"
  quantization: "int8"
  device: "auto"

generation:
  max_tokens: 1000
  temperature: 0.7
  top_p: 0.9

safety:
  content_filter: true
  toxicity_threshold: 0.8
\`\`\`

Load configuration:

\`\`\`python
from gemma3 import Gemma3, load_config

config = load_config("gemma3_config.yaml")
model = Gemma3(**config.model)
\`\`\``
    },
    {
      id: 'safety',
      title: 'Safety & Ethics',
      icon: Shield,
      content: `# Safety & Ethics

## Built-in Safety Features

Gemma 3 includes comprehensive safety measures:

### Content Filtering

\`\`\`python
from gemma3 import Gemma3, SafetyConfig

safety_config = SafetyConfig(
    enable_content_filter=True,
    toxicity_threshold=0.8,
    hate_speech_detection=True,
    personal_info_detection=True
)

model = Gemma3(
    model_size="4b",
    safety_config=safety_config
)
\`\`\`

### Responsible AI Guidelines

1. **Transparency**: Always disclose AI-generated content
2. **Fairness**: Test for bias across different demographics
3. **Privacy**: Don't train on personal data without consent
4. **Accountability**: Monitor and audit AI system outputs

### Best Practices

- Implement human oversight for critical applications
- Regular bias testing and mitigation
- Clear user consent for data usage
- Transparent AI disclosure

## Compliance

Gemma 3 is designed to comply with:
- GDPR (General Data Protection Regulation)
- CCPA (California Consumer Privacy Act)
- AI Ethics Guidelines
- Industry-specific regulations`
    },
    {
      id: 'multilingual',
      title: 'Multilingual Support',
      icon: Globe,
      content: `# Multilingual Support

Gemma 3 supports 140+ languages with high-quality performance.

## Language Detection

\`\`\`python
from gemma3 import Gemma3

model = Gemma3(model_size="4b")

# Automatic language detection
text = "Bonjour, comment allez-vous?"
response = model.generate(f"Translate to English: {text}")
print(response)  # "Hello, how are you?"
\`\`\`

## Supported Languages

### Major Languages
- English, Spanish, French, German, Italian
- Chinese (Simplified & Traditional), Japanese, Korean
- Arabic, Hindi, Russian, Portuguese
- Dutch, Swedish, Norwegian, Danish

### Programming Languages
- Python, JavaScript, Java, C++, C#
- Go, Rust, Swift, Kotlin, TypeScript
- SQL, HTML, CSS, Shell scripting

## Cross-lingual Tasks

\`\`\`python
# Translation
response = model.generate(
    "Translate 'Hello world' to French, Spanish, and German"
)

# Multilingual summarization
response = model.generate(
    "Summarize this text in Spanish: [English text here]"
)

# Code comments in different languages
response = model.generate(
    "Add French comments to this Python code: [code here]"
)
\`\`\``
    }
  ]

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-xl text-gray-600">
            Complete guide to integrating and using Gemma 3 in your applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-24">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {filteredSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{section.title}</span>
                      <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                        activeSection === section.id ? 'rotate-90' : ''
                      }`} />
                    </button>
                  )
                })}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Links</h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>GitHub Repository</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Community Forum</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Report Issues</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    )
                  },
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mb-6 gradient-text">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-900">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mb-3 mt-6 text-gray-900">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-2">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start space-x-2 text-gray-700">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">{children}</strong>
                  )
                }}
              >
                {sections.find(s => s.id === activeSection)?.content || ''}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Documentation