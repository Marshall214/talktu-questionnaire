import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ParentInfo from './pages/ParentInfo'
import ChildInfo from './pages/ChildInfo'
import Questionnaire from './pages/Questionnaire'
import Results from './pages/Results'

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parent-info" element={<ParentInfo />} />
          <Route path="/child-info" element={<ChildInfo />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/results/:assessmentId" element={<Results />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
