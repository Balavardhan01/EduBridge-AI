import { AlertCircle, TrendingUp, Users } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'

export const AnalyticsOverview = () => {
  const { language, students, misconceptions } = useAppContext()

  const activeStudents = students.length
  const averageMastery = Math.round(
    students.reduce((sum, s) => sum + s.averageScore, 0) / students.length
  )
  const flaggedCount = students.filter((s) => s.riskLevel === 'High').length

  const topicMastery = [
    { topic: 'Algebra', mastery: 55 },
    { topic: 'Trigonometry', mastery: 48 },
    { topic: 'Photosynthesis', mastery: 65 },
    { topic: 'Atomic Structure', mastery: 60 },
    { topic: 'Fractions', mastery: 75 },
  ]

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Students */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">{getTranslation('activeStudents', language)}</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{activeStudents}</p>
            </div>
            <Users className="w-12 h-12 text-blue-600 opacity-20" />
          </div>
          <p className="text-xs text-gray-500 mt-4">Active in the last 7 days</p>
        </div>

        {/* Class Mastery Rate */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">{getTranslation('classMastery', language)}</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{averageMastery}%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600 opacity-20" />
          </div>
          <p className="text-xs text-gray-500 mt-4">Average across all topics</p>
        </div>

        {/* Flagged Students */}
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">{getTranslation('flaggedStudents', language)}</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{flaggedCount}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-red-600 opacity-20" />
          </div>
          <p className="text-xs text-gray-500 mt-4">Require immediate intervention</p>
        </div>
      </div>

      {/* Topic Mastery Bars */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 text-gray-900">Topic-wise Mastery Rate</h3>
        <div className="space-y-4">
          {topicMastery.map((item) => (
            <div key={item.topic}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">{item.topic}</span>
                <span className="text-sm font-bold text-gray-900">{item.mastery}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    item.mastery >= 70
                      ? 'bg-green-600'
                      : item.mastery >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-600'
                  }`}
                  style={{ width: `${item.mastery}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Misconceptions Alert */}
      {misconceptions.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-6">
          <h3 className="text-lg font-bold text-yellow-900 mb-3">Top Misconceptions Detected</h3>
          <div className="space-y-2">
            {misconceptions.slice(0, 5).map((item) => (
              <div key={item.topic} className="flex items-center justify-between">
                <span className="text-yellow-900">
                  <strong>{item.topic}</strong> - {item.frequency} occurrences
                </span>
                <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-1 rounded">
                  {item.affectedStudents.length} students
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
