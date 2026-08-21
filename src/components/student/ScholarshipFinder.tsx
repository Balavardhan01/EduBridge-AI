import { Award, Calendar, Check, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'

interface Scholarship {
  id: string
  name: string
  organization: string
  amount: string
  eligibility: string[]
  deadline: string
  link: string
}

const scholarships: Scholarship[] = [
  {
    id: '1',
    name: 'National Scholarship Scheme',
    organization: 'Ministry of Education',
    amount: '₹50,000 - ₹100,000',
    eligibility: ['Income < 2.5 LPA', 'Min 60% in previous exam', 'Indian Citizen'],
    deadline: '2024-12-31',
    link: '#',
  },
  {
    id: '2',
    name: 'STEM Excellence Award',
    organization: 'TechForGood Foundation',
    amount: '₹75,000 - ₹150,000',
    eligibility: ['Science/Math focused', 'Min 70% average', 'Rural background preferred'],
    deadline: '2024-11-30',
    link: '#',
  },
  {
    id: '3',
    name: 'Girl Child Education Grant',
    organization: 'Empowerment NGO',
    amount: '₹40,000 - ₹80,000',
    eligibility: ['Female student', 'Grade 9-12', 'Any stream'],
    deadline: '2024-10-15',
    link: '#',
  },
  {
    id: '4',
    name: 'Merit-Based Scholarship',
    organization: 'Education Excellence Board',
    amount: '₹60,000 - ₹120,000',
    eligibility: ['Min 75% score', 'Clear entrance test', 'No income limit'],
    deadline: '2025-01-15',
    link: '#',
  },
  {
    id: '5',
    name: 'Rural Education Fund',
    organization: 'Global Learning Initiative',
    amount: '₹30,000 - ₹70,000',
    eligibility: ['From rural area', 'All streams eligible', 'Min 50% score'],
    deadline: '2024-11-20',
    link: '#',
  },
]

export const ScholarshipFinder = () => {
  const { language } = useAppContext()
  const [filters, setFilters] = useState({ minAmount: 0, deadline: '' })
  const [applied, setApplied] = useState<string[]>([])

  const filtered = scholarships.filter((s) => {
    const amount = parseInt(s.amount.split('-')[0].replace(/[^0-9]/g, ''))
    if (amount < filters.minAmount) return false
    if (filters.deadline && new Date(s.deadline) < new Date(filters.deadline)) return false
    return true
  })

  const handleApply = (id: string) => {
    setApplied((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold">{getTranslation('scholarshipFinder', language)}</h2>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Min Amount (₹)</label>
            <input
              type="number"
              value={filters.minAmount}
              onChange={(e) => setFilters({ ...filters, minAmount: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{getTranslation('deadline', language)}</label>
            <input
              type="date"
              value={filters.deadline}
              onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600">{filtered.length} scholarships found</p>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((scholarship) => (
          <div key={scholarship.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition card-hover">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{scholarship.name}</h3>
                <p className="text-sm text-gray-600">{scholarship.organization}</p>
              </div>
              {applied.includes(scholarship.id) && (
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Applied
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg mb-4">
              <p className="text-2xl font-bold text-green-600">{scholarship.amount}</p>
            </div>

            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2 uppercase">{getTranslation('eligibility', language)}</p>
              <div className="flex flex-wrap gap-2">
                {scholarship.eligibility.map((crit, idx) => (
                  <span key={idx} className="badge-info text-xs">
                    {crit}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
            </div>

            <button
              onClick={() => handleApply(scholarship.id)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition ${
                applied.includes(scholarship.id)
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <ExternalLink className="w-4 h-4" />
              {applied.includes(scholarship.id) ? 'Applied' : getTranslation('apply', language)}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
