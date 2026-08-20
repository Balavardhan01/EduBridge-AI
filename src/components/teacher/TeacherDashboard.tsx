import { BarChart3, Users } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'
import { AnalyticsOverview } from './AnalyticsOverview'
import { InterventionRoster } from './InterventionRoster'

export const TeacherDashboard = () => {
  const { language } = useAppContext()
  const [activeTab, setActiveTab] = useState<'analytics' | 'roster'>('analytics')

  const tabs = [
    { id: 'analytics', label: getTranslation('analyticsOverview', language), icon: BarChart3 },
    { id: 'roster', label: getTranslation('interventionRoster', language), icon: Users },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{getTranslation('teacherDashboard', language)}</h1>
        <p className="text-gray-600">Monitor student progress, identify at-risk learners, and generate targeted interventions</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'analytics' && <AnalyticsOverview />}
        {activeTab === 'roster' && <InterventionRoster />}
      </div>
    </div>
  )
}
