import { BookOpen, Trophy, Zap } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'
import { DoubtSolver } from './DoubtSolver'
import { PracticeArena } from './PracticeArena'
import { ScholarshipFinder } from './ScholarshipFinder'

export const StudentPortal = () => {
  const { language } = useAppContext()
  const [activeTab, setActiveTab] = useState<'doubt' | 'practice' | 'scholarship'>('doubt')

  const tabs = [
    { id: 'doubt', label: getTranslation('doubtSolver', language), icon: Zap },
    { id: 'practice', label: getTranslation('practiceArena', language), icon: Trophy },
    { id: 'scholarship', label: getTranslation('scholarshipFinder', language), icon: BookOpen },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
                  ? 'bg-blue-600 text-white shadow-lg'
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
        {activeTab === 'doubt' && <DoubtSolver />}
        {activeTab === 'practice' && <PracticeArena />}
        {activeTab === 'scholarship' && <ScholarshipFinder />}
      </div>
    </div>
  )
}
