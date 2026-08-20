import { ReactNode, createContext, useContext, useState } from 'react'

export type Language = 'en' | 'hi' | 'te' | 'ta' | 'es'
export type UserRole = 'student' | 'teacher'
export type RiskLevel = 'High' | 'Medium' | 'Low'

export interface StudentProfile {
  id: string
  name: string
  grade: number
  weakTopics: string[]
  riskLevel: RiskLevel
  recentQuizScore: number
  totalQuizzes: number
  averageScore: number
}

export interface Misconception {
  topic: string
  frequency: number
  affectedStudents: string[]
}

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  lowBandwidthMode: boolean
  setLowBandwidthMode: (enabled: boolean) => void
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
  students: StudentProfile[]
  misconceptions: Misconception[]
  updateStudentQuizScore: (studentId: string, score: number, topic: string) => void
  getStudentById: (id: string) => StudentProfile | undefined
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const mockStudents: StudentProfile[] = [
  {
    id: 'S001',
    name: 'Arjun Kumar',
    grade: 10,
    weakTopics: ['Algebra', 'Quadratic Equations'],
    riskLevel: 'High',
    recentQuizScore: 45,
    totalQuizzes: 8,
    averageScore: 52,
  },
  {
    id: 'S002',
    name: 'Priya Sharma',
    grade: 10,
    weakTopics: ['Photosynthesis', 'Cell Division'],
    riskLevel: 'Medium',
    recentQuizScore: 68,
    totalQuizzes: 7,
    averageScore: 65,
  },
  {
    id: 'S003',
    name: 'Rohan Patel',
    grade: 9,
    weakTopics: ['Fractions', 'Decimals'],
    riskLevel: 'Low',
    recentQuizScore: 85,
    totalQuizzes: 9,
    averageScore: 82,
  },
  {
    id: 'S004',
    name: 'Anjali Verma',
    grade: 10,
    weakTopics: ['Trigonometry', 'Sine & Cosine'],
    riskLevel: 'High',
    recentQuizScore: 38,
    totalQuizzes: 6,
    averageScore: 48,
  },
  {
    id: 'S005',
    name: 'Vikram Singh',
    grade: 9,
    weakTopics: ['Atomic Structure', 'Valency'],
    riskLevel: 'Medium',
    recentQuizScore: 62,
    totalQuizzes: 8,
    averageScore: 60,
  },
]

const mockMisconceptions: Misconception[] = [
  {
    topic: 'Algebra',
    frequency: 12,
    affectedStudents: ['S001'],
  },
  {
    topic: 'Photosynthesis',
    frequency: 8,
    affectedStudents: ['S002'],
  },
  {
    topic: 'Trigonometry',
    frequency: 10,
    affectedStudents: ['S004'],
  },
  {
    topic: 'Atomic Structure',
    frequency: 6,
    affectedStudents: ['S005'],
  },
  {
    topic: 'Fractions',
    frequency: 4,
    affectedStudents: ['S003'],
  },
]

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')
  const [lowBandwidthMode, setLowBandwidthMode] = useState(false)
  const [currentRole, setCurrentRole] = useState<UserRole>('student')
  const [students, setStudents] = useState<StudentProfile[]>(mockStudents)
  const [misconceptions, setMisconceptions] = useState<Misconception[]>(mockMisconceptions)

  const updateStudentQuizScore = (studentId: string, score: number, topic: string) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === studentId) {
          const newAverageScore =
            (student.averageScore * student.totalQuizzes + score) / (student.totalQuizzes + 1)
          const newRiskLevel: RiskLevel =
            newAverageScore >= 75 ? 'Low' : newAverageScore >= 60 ? 'Medium' : 'High'

          return {
            ...student,
            recentQuizScore: score,
            totalQuizzes: student.totalQuizzes + 1,
            averageScore: Math.round(newAverageScore),
            riskLevel: newRiskLevel,
            weakTopics: score < 60 ? [...new Set([...student.weakTopics, topic])] : student.weakTopics,
          }
        }
        return student
      })
    )

    setMisconceptions((prevMisconceptions) => {
      const topicIndex = prevMisconceptions.findIndex((m) => m.topic === topic)
      if (score < 60) {
        if (topicIndex !== -1) {
          const updated = [...prevMisconceptions]
          updated[topicIndex] = {
            ...updated[topicIndex],
            frequency: updated[topicIndex].frequency + 1,
            affectedStudents: Array.from(new Set([...updated[topicIndex].affectedStudents, studentId])),
          }
          return updated
        } else {
          return [...prevMisconceptions, { topic, frequency: 1, affectedStudents: [studentId] }]
        }
      }
      return prevMisconceptions
    })
  }

  const getStudentById = (id: string): StudentProfile | undefined => {
    return students.find((s) => s.id === id)
  }

  const value: AppContextType = {
    language,
    setLanguage,
    lowBandwidthMode,
    setLowBandwidthMode,
    currentRole,
    setCurrentRole,
    students,
    misconceptions,
    updateStudentQuizScore,
    getStudentById,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}
