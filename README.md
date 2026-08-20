# EduBridge AI - Equitable Education Access Platform

A responsive React + Tailwind CSS web application designed to bridge the digital divide in education by providing equitable learning access for students worldwide.

## 🎯 Project Overview

EduBridge AI is a **hackathon prototype** that demonstrates how AI-powered tools can democratize education through:
- **Smart Doubt Resolution** - AI-powered explanation with verified sources
- **Adaptive Practice Quizzes** - Real-time performance tracking
- **Scholarship Discovery** - Filterable opportunities for financial aid
- **Teacher Analytics** - Data-driven intervention identification
- **Multilingual Support** - Content in English, Hindi, Telugu, Tamil, and Spanish
- **Low-Bandwidth Mode** - Accessible even with limited connectivity

---

## 🏗️ Tech Stack

- **Frontend Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **State Management**: React Context API
- **Language Support**: 5 languages with i18n

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx                 # Navigation bar with role toggle & language selector
│   ├── Shell.tsx                  # Main layout shell
│   ├── student/
│   │   ├── StudentPortal.tsx      # Student hub (tab navigation)
│   │   ├── DoubtSolver.tsx        # AI-powered Q&A with verified sources
│   │   ├── PracticeArena.tsx      # Adaptive quiz system
│   │   └── ScholarshipFinder.tsx  # Scholarship discovery & filtering
│   └── teacher/
│       ├── TeacherDashboard.tsx   # Teacher hub (tab navigation)
│       ├── AnalyticsOverview.tsx  # Class performance metrics
│       ├── InterventionRoster.tsx # At-risk student roster with live updates
│       └── WorksheetModal.tsx     # Generate & download remedial worksheets
├── context/
│   └── AppContext.tsx             # Global state (students, roles, language, etc.)
├── utils/
│   └── translations.ts            # i18n translations for all languages
├── App.tsx                        # Root component
├── main.tsx                       # Entry point
└── index.css                      # Global Tailwind styles
```

---

## 🎨 Key Features

### Student Portal

#### 1. **Doubt Solver** 💬
- Chat interface for asking questions
- AI generates step-by-step explanations
- Verified source badges (NCERT, OpenStax, etc.)
- Action buttons: Simplify, Translate, Test Understanding
- **Example Topics**: Algebra, Photosynthesis, Trigonometry

#### 2. **Practice Arena** 🎯
- 3-question adaptive quiz system
- Instant feedback on correct/incorrect answers
- Quiz score updates teacher dashboard in real-time
- Topics: Algebra, Photosynthesis, Trigonometry
- Dynamic risk level recalculation based on performance

#### 3. **Scholarship Finder** 🏆
- Filterable scholarship cards (5 mock scholarships)
- Eligibility badges and deadline tracking
- Apply/bookmark functionality
- Filter by minimum amount and deadline

### Teacher Dashboard

#### 1. **Analytics Overview** 📊
- Active students count
- Class mastery rate (average %)
- Flagged students alert (High-risk count)
- Topic-wise mastery bars with color coding:
  - 🟢 Green (70%+) = Strong
  - 🟡 Yellow (50-69%) = Needs Work
  - 🔴 Red (<50%) = Critical
- Top misconceptions alert

#### 2. **Intervention Roster** 👥
- Live student performance table (sorted by risk level)
- Columns: Name, Grade, Recent Score, Avg Score, Risk Level, Weak Topics
- Risk badges with icons (High 🚨, Medium ⚠️, Low ✅)
- **Real-time Updates**: Quiz submissions instantly update student metrics
- Generate remedial worksheets per student

#### 3. **Worksheet Generator** 📝
- Modal with topic-specific content
- Includes:
  - Conceptual review
  - Practice problems (Easy → Challenging)
  - Common misconceptions
  - Resource references
- Download as `.txt` or Print functionality

---

## 🌐 Global State Management (`AppContext`)

```typescript
interface AppContext {
  language: 'en' | 'hi' | 'te' | 'ta' | 'es'
  lowBandwidthMode: boolean
  currentRole: 'student' | 'teacher'
  students: StudentProfile[]
  misconceptions: Misconception[]
  updateStudentQuizScore(studentId, score, topic) // Updates student & misconceptions dynamically
}
```

### Mock Data (5 Students)

| Name | Grade | Avg Score | Risk Level | Weak Topics |
|------|-------|-----------|------------|-------------|
| Arjun Kumar | 10 | 52% | High | Algebra, Quadratic Equations |
| Priya Sharma | 10 | 65% | Medium | Photosynthesis, Cell Division |
| Rohan Patel | 9 | 82% | Low | Fractions, Decimals |
| Anjali Verma | 10 | 48% | High | Trigonometry, Sine & Cosine |
| Vikram Singh | 9 | 60% | Medium | Atomic Structure, Valency |

---

## 🌍 Multilingual Support

- **English** 🇬🇧
- **Hindi** (हिंदी) 🇮🇳
- **Telugu** (తెలుగు) 🇮🇳
- **Tamil** (தமிழ்) 🇮🇳
- **Spanish** (Español) 🇪🇸

All UI text is fully translated via `getTranslation()` utility.

---

## 📱 Accessibility Features

### Low-Bandwidth Mode
- Toggleable via navbar button (Moon icon)
- Hides images and icons
- High-contrast black/white theme
- Text-only minimal layout
- Optimized for slow connections

### Responsive Design
- Mobile-first Tailwind CSS breakpoints
- Collapsible navigation on small screens
- Stacked cards on mobile
- Horizontal scroll tables on tablet

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Balavardhan01/EduBridge-AI.git
cd EduBridge-AI

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📊 Live Updates Demo

1. **Switch to Student Portal** → Practice Arena
2. **Take a Quiz** → Submit answers
3. **Switch to Teacher Dashboard** → Intervention Roster
4. **Observe**: Student's recent score, average score, and risk level updated in real-time ✨

---

## 🎯 Key Implementation Details

### State Update Flow

```
Student submits quiz answer
  ↓
updateStudentQuizScore() called
  ↓
Student profile updated:
  - recentQuizScore
  - totalQuizzes++
  - averageScore recalculated
  - riskLevel re-evaluated
  ↓
Teacher dashboard instantly reflects changes
```

### Risk Level Logic

```typescript
if (averageScore >= 75) riskLevel = 'Low'
else if (averageScore >= 60) riskLevel = 'Medium'
else riskLevel = 'High'
```

### Misconception Tracking

- Low quiz score + topic → added to misconceptions array
- Frequency incremented each time same topic fails
- Affected students list maintained
- Displayed as alert in teacher analytics

---

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#8b5cf6)
- **Accent**: Pink (#ec4899)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)

### Typography
- Font Family: Inter (system-ui fallback)
- Headings: Bold (700-900 weight)
- Body: Regular (400 weight)
- Small text: Medium (500 weight)

---

## 🔮 Future Enhancements

- [ ] Real AI integration (OpenAI/Claude API)
- [ ] Live whiteboard for interactive teaching
- [ ] Parent dashboard for progress tracking
- [ ] Video lecture library
- [ ] Peer-to-peer tutoring marketplace
- [ ] Offline-first PWA support
- [ ] Advanced analytics (heatmaps, cohort analysis)
- [ ] Gamification (badges, leaderboards)
- [ ] Real database (Firebase/Supabase)

---

## 📝 License

MIT License - feel free to use in your hackathon!

---

## 👨‍💻 Developer Notes

- **No external API calls**: Mock data used for demo
- **Context API only**: No Redux/Zustand needed for prototype scale
- **Tailwind utility-first**: No CSS files needed
- **Full TypeScript**: Type-safe component props and state
- **Accessible**: WCAG 2.1 AA compliant (semantic HTML, ARIA labels)

---

## 🤝 Contributing

Fork, create a feature branch, and submit a PR. All contributions welcome!

---

**Built with ❤️ for equitable education access**
