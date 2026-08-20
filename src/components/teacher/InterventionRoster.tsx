import { AlertTriangle, Flag, TrendingDown } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'
import { WorksheetModal } from './WorksheetModal'

export const InterventionRoster = () => {
  const { language, students } = useAppContext()
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)

  const sortedStudents = [...students].sort(
    (a, b) => {
      const riskOrder = { High: 0, Medium: 1, Low: 2 }
      return riskOrder[a.riskLevel] - riskOrder[b.riskLevel]
    }
  )

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Flag className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold">{getTranslation('interventionRoster', language)}</h2>
          </div>
          <p className="text-sm text-gray-600">Real-time student performance monitoring and intervention tracking</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {getTranslation('studentName', language)}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {getTranslation('grade', language)}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Recent Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Avg Score</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {getTranslation('riskLevel', language)}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  {getTranslation('weakTopics', language)}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">Grade {student.grade}</td>
                  <td className="px-6 py-4 text-sm font-bold">
                    <span
                      className={`${
                        student.recentQuizScore >= 70
                          ? 'text-green-600'
                          : student.recentQuizScore >= 50
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {student.recentQuizScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.averageScore}%</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                        getRiskColor(student.riskLevel)
                      }`}
                    >
                      {student.riskLevel === 'High' && <AlertTriangle className="w-3 h-3" />}
                      {student.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student.weakTopics.slice(0, 2).map((topic, idx) => (
                        <span key={idx} className="badge-warning text-xs">
                          {topic}
                        </span>
                      ))}
                      {student.weakTopics.length > 2 && (
                        <span className="text-xs text-gray-500">+{student.weakTopics.length - 2} more</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedStudentId(student.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-xs font-bold hover:bg-purple-200 transition"
                    >
                      <TrendingDown className="w-4 h-4" />
                      Worksheet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Worksheet Modal */}
      {selectedStudentId && (
        <WorksheetModal
          studentId={selectedStudentId}
          onClose={() => setSelectedStudentId(null)}
        />
      )}
    </div>
  )
}
