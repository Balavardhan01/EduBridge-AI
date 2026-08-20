import { Download, FileText, Printer, X } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import { getTranslation } from '../../utils/translations'

interface WorksheetModalProps {
  studentId: string
  onClose: () => void
}

export const WorksheetModal = ({ studentId, onClose }: WorksheetModalProps) => {
  const { language, getStudentById } = useAppContext()
  const student = getStudentById(studentId)

  if (!student) return null

  const generateWorksheet = () => {
    const primaryTopic = student.weakTopics[0] || 'General'
    const content = `
    REMEDIAL WORKSHEET
    Student: ${student.name} (Grade ${student.grade})
    Topic: ${primaryTopic}
    Date: ${new Date().toLocaleDateString()}
    
    === CONCEPTUAL REVIEW ===
    
    ${primaryTopic === 'Algebra' ? `
    1. Understanding Variables
       - A variable is a symbol that represents an unknown number
       - Example: In 2x + 3 = 7, 'x' is the variable
       
    2. Solving Linear Equations
       - Goal: Isolate the variable on one side
       - Step 1: Remove constants using addition/subtraction
       - Step 2: Remove coefficients using multiplication/division
       
    === PRACTICE PROBLEMS ===
    
    Easy:
    1. x + 5 = 12
    2. 2x = 10
    
    Medium:
    3. 2x + 3 = 11
    4. 3x - 5 = 10
    
    Challenging:
    5. 2(x + 3) = 16
    6. 5x - 2 = 3x + 8
    ` : primaryTopic === 'Photosynthesis' ? `
    1. What is Photosynthesis?
       - Process: Light energy → Chemical energy (Glucose)
       - Location: Chloroplasts in plant cells
       - Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂
       
    2. Two Main Stages
       - Light Dependent (Thylakoid): Produces ATP and NADPH
       - Light Independent (Calvin Cycle): Uses ATP/NADPH to make glucose
       
    === PRACTICE QUESTIONS ===
    
    1. Name the pigment that captures light energy
    2. Where does the Calvin Cycle occur?
    3. What gases are involved in photosynthesis?
    4. Explain the role of chlorophyll
    5. Draw and label the thylakoid membrane
    ` : `
    1. Core Concepts for ${primaryTopic}
       - Definition and key principles
       - Real-world applications
       
    2. Common Misconceptions
       - Avoid these errors
       - Practice correct approaches
       
    === TARGETED EXERCISES ===
    
    Complete the following:
    1. [Exercise related to ${primaryTopic}]
    2. [Application problem]
    3. [Challenge question]
    `}
    
    === REFLECTION ===
    
    After completing this worksheet:
    - Identify areas where you struggled
    - Review the concepts covered
    - Try the practice quiz in the student portal
    - Reach out to your teacher if you need clarification
    
    Resources:
    - NCERT Textbooks (relevant chapter)
    - Video tutorials (school LMS)
    - Peer study groups
    `
    return content
  }

  const worksheet = generateWorksheet()

  const handleDownload = () => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(worksheet))
    element.setAttribute('download', `worksheet_${student.name.replace(/\s+/g, '_')}.txt`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Worksheet - ${student.name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #333; }
              pre { white-space: pre-wrap; word-wrap: break-word; }
            </style>
          </head>
          <body>
            <pre>${worksheet}</pre>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6" />
            <div>
              <h3 className="text-xl font-bold">{getTranslation('generateWorksheet', language)}</h3>
              <p className="text-sm opacity-90">{student.name} - {student.weakTopics[0] || 'General Review'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6">
          <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono overflow-hidden max-h-48">
            {worksheet.slice(0, 500)}...
          </pre>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            <Download className="w-5 h-5" />
            {getTranslation('download', language)}
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
          >
            <Printer className="w-5 h-5" />
            {getTranslation('print', language)}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-bold hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
