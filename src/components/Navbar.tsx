import { BarChart3, Globe, Moon, Settings } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { getTranslation } from '../utils/translations'

export const Navbar = () => {
  const {
    language,
    setLanguage,
    lowBandwidthMode,
    setLowBandwidthMode,
    currentRole,
    setCurrentRole,
  } = useAppContext()

  return (
    <nav className={`${lowBandwidthMode ? 'bg-black border-b-2 border-white' : 'bg-gradient-to-r from-blue-600 to-purple-600'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <BarChart3 className="w-8 h-8" />
          <h1 className="text-2xl font-bold hidden sm:inline">{getTranslation('brand', language)}</h1>
        </div>

        {/* Center Controls */}
        <div className="hidden md:flex items-center gap-6">
          {/* Role Toggle */}
          <div className="flex bg-white/20 rounded-lg p-1">
            <button
              onClick={() => setCurrentRole('student')}
              className={`px-4 py-2 rounded transition font-semibold text-sm ${
                currentRole === 'student' ? 'bg-white text-blue-600' : 'text-white hover:bg-white/10'
              }`}
            >
              {getTranslation('studentPortal', language)}
            </button>
            <button
              onClick={() => setCurrentRole('teacher')}
              className={`px-4 py-2 rounded transition font-semibold text-sm ${
                currentRole === 'teacher' ? 'bg-white text-purple-600' : 'text-white hover:bg-white/10'
              }`}
            >
              {getTranslation('teacherDashboard', language)}
            </button>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-white/20 text-white px-3 py-2 rounded text-sm font-semibold hover:bg-white/30 transition cursor-pointer"
          >
            <option value="en" className="text-gray-900">🇬🇧 English</option>
            <option value="hi" className="text-gray-900">🇮🇳 हिंदी</option>
            <option value="te" className="text-gray-900">🇮🇳 తెలుగు</option>
            <option value="ta" className="text-gray-900">🇮🇳 தமிழ்</option>
            <option value="es" className="text-gray-900">🇪🇸 Español</option>
          </select>

          {/* Low Bandwidth Toggle */}
          <button
            onClick={() => setLowBandwidthMode(!lowBandwidthMode)}
            className={`p-2 rounded transition ${
              lowBandwidthMode
                ? 'bg-yellow-400 text-black'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            title={getTranslation('lowBandwidth', language)}
          >
            <Moon className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value as any)}
            className="bg-white/20 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-white/30 transition cursor-pointer"
          >
            <option value="student" className="text-gray-900">{getTranslation('studentPortal', language)}</option>
            <option value="teacher" className="text-gray-900">{getTranslation('teacherDashboard', language)}</option>
          </select>
        </div>
      </div>
    </nav>
  )
}
