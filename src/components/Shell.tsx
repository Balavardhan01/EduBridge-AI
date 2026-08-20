import { useAppContext } from '../context/AppContext'
import { Navbar } from './Navbar'
import { StudentPortal } from './student/StudentPortal'
import { TeacherDashboard } from './teacher/TeacherDashboard'

export const Shell = () => {
  const { currentRole, lowBandwidthMode } = useAppContext()

  return (
    <div className={lowBandwidthMode ? 'low-bandwidth-mode' : ''}>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {currentRole === 'student' ? <StudentPortal /> : <TeacherDashboard />}
      </main>
    </div>
  )
}
