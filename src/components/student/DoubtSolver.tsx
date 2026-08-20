import { MessageCircle, Send, Zap, Globe, BookOpen } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  source?: string
}

const mockAIResponses: Record<string, string> = {
  algebra:
    "Step 1: Identify the variable on one side of the equation.\nStep 2: Use inverse operations to isolate the variable.\nStep 3: Simplify both sides.\n\nExample: If 2x + 3 = 7, subtract 3 from both sides: 2x = 4, then divide by 2: x = 2.\n\nVerified Source: NCERT Class 10 Mathematics, Ch 4, p.87",
  photosynthesis:
    "Photosynthesis is the process where plants convert light energy into chemical energy.\nFormula: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\nKey Steps:\n1. Light-dependent reactions (Thylakoid)\n2. Light-independent reactions (Calvin Cycle in Stroma)\n\nVerified Source: NCERT Biology Class 10, Ch 6, p.98",
  trigonometry:
    "Trigonometry deals with angles and sides of triangles.\nBasic Ratios: sin θ = opposite/hypotenuse, cos θ = adjacent/hypotenuse, tan θ = opposite/adjacent\n\nRemember SOHCAHTOA!\n\nVerified Source: OpenStax Trigonometry, Chapter 2",
}

export const DoubtSolver = () => {
  const { language, lowBandwidthMode } = useAppContext()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase()
      let response = 'I understand your question. Please try to break it down into smaller concepts.'
      let source = 'General Knowledge'

      if (lowerInput.includes('algebra')) {
        response = mockAIResponses.algebra
        source = 'NCERT Class 10 Mathematics'
      } else if (lowerInput.includes('photosynthesis')) {
        response = mockAIResponses.photosynthesis
        source = 'NCERT Biology Class 10'
      } else if (lowerInput.includes('trigonometry') || lowerInput.includes('sine')) {
        response = mockAIResponses.trigonometry
        source = 'OpenStax Trigonometry'
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        source,
      }
      setMessages((prev) => [...prev, aiMsg])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className={`${lowBandwidthMode ? 'bg-white text-black' : 'bg-white'} rounded-lg shadow-lg p-6 max-w-2xl`}>
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">{getTranslation('doubtSolver', language)}</h2>
      </div>

      {/* Chat History */}
      <div className="bg-gray-50 rounded-lg p-4 min-h-96 max-h-96 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p>{getTranslation('askQuestion', language)}</p>
          </div>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              {msg.type === 'ai' && msg.source && (
                <div className="mt-2 pt-2 border-t border-gray-300 flex items-center gap-1 text-xs">
                  <BookOpen className="w-3 h-3" />
                  <span className="font-semibold">{getTranslation('verifiedSource', language)}:</span>
                  <span>{msg.source}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-600 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={getTranslation('enterYourQuestion', language)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Action Buttons */}
      {messages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold hover:bg-purple-200 transition">
            <Zap className="w-4 h-4" />
            {getTranslation('simplify', language)}
          </button>
          <button className="flex items-center gap-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition">
            <Globe className="w-4 h-4" />
            {getTranslation('translate', language)}
          </button>
          <button className="flex items-center gap-1 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-200 transition">
            <BookOpen className="w-4 h-4" />
            {getTranslation('testUnderstanding', language)}
          </button>
        </div>
      )}
    </div>
  )
}
