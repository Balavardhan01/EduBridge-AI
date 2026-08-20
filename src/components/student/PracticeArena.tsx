import { Brain, CheckCircle, XCircle, BarChart3 } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'

interface QuizQuestion {
  id: string
  question: string
  topic: string
  options: string[]
  correct: number
}

const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is 2x + 3 = 11? Solve for x.',
    topic: 'Algebra',
    options: ['x = 2', 'x = 4', 'x = 6', 'x = 8'],
    correct: 2,
  },
  {
    id: '2',
    question: 'Which organelle is responsible for photosynthesis?',
    topic: 'Photosynthesis',
    options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'],
    correct: 1,
  },
  {
    id: '3',
    question: 'What is sin(90°)?',
    topic: 'Trigonometry',
    options: ['0', '0.5', '1', 'undefined'],
    correct: 2,
  },
]

export const PracticeArena = () => {
  const { language, updateStudentQuizScore } = useAppContext()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)

  const handleStart = () => {
    setQuizStarted(true)
  }

  const handleAnswerSelect = (index: number) => {
    setAnswered(index)
  }

  const handleSubmitAnswer = () => {
    if (answered === null) return

    const currentQuestion = quizQuestions[currentIndex]
    const isCorrect = answered === currentQuestion.correct

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    // Update student score in global context
    const percentage = isCorrect ? 100 : 0
    updateStudentQuizScore('S001', percentage, currentQuestion.topic)

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setAnswered(null)
    } else {
      setQuizComplete(true)
    }
  }

  if (!quizStarted) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl text-center">
        <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">{getTranslation('practiceArena', language)}</h2>
        <p className="text-gray-600 mb-6">
          Test your understanding with adaptive quizzes. Answer {quizQuestions.length} questions across different topics.
        </p>
        <button
          onClick={handleStart}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-purple-700 transition"
        >
          {getTranslation('startQuiz', language)}
        </button>
      </div>
    )
  }

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100)
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl text-center">
        <BarChart3 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">{getTranslation('score', language)}: {score}/{quizQuestions.length}</h2>
        <p className="text-5xl font-bold text-green-600 mb-6">{percentage}%</p>
        <button
          onClick={() => {
            setQuizStarted(false)
            setQuizComplete(false)
            setCurrentIndex(0)
            setScore(0)
            setAnswered(null)
          }}
          className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-purple-700 transition"
        >
          {getTranslation('startQuiz', language)} Again
        </button>
      </div>
    )
  }

  const current = quizQuestions[currentIndex]

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            {getTranslation('question', language)} {currentIndex + 1}/{quizQuestions.length}
          </span>
          <span className="text-sm font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {current.topic}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-6 text-gray-900">{current.question}</h3>

      <div className="space-y-3 mb-6">
        {current.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => handleAnswerSelect(idx)}
            disabled={answered !== null}
            className={`w-full p-4 rounded-lg font-semibold transition text-left ${
              answered === null
                ? 'border-2 border-gray-300 hover:border-purple-600 hover:bg-purple-50'
                : answered === idx
                ? idx === current.correct
                  ? 'bg-green-100 border-2 border-green-600 text-green-900'
                  : 'bg-red-100 border-2 border-red-600 text-red-900'
                : idx === current.correct
                ? 'bg-green-100 border-2 border-green-600 text-green-900'
                : 'border-2 border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-current rounded flex items-center justify-center">
                {answered !== null && idx === current.correct && <CheckCircle className="w-5 h-5 text-green-600" />}
                {answered !== null && answered === idx && idx !== current.correct && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {answered === null ? (
        <p className="text-center text-gray-500 text-sm">Select an option to continue</p>
      ) : (
        <button
          onClick={handleSubmitAnswer}
          className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition"
        >
          {currentIndex < quizQuestions.length - 1
            ? getTranslation('submitAnswer', language)
            : 'Finish Quiz'}
        </button>
      )}
    </div>
  )
}
