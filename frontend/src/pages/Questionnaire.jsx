import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Loader } from 'lucide-react'
import { getQuestionsByAge } from '../data/questionsByAge'
import { assessmentAPI } from '../services/api'

export default function Questionnaire() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [questionData, setQuestionData] = useState(null)

  useEffect(() => {
    // Check if parent and child info exists
    const parentInfo = sessionStorage.getItem('parentInfo')
    const childInfo = sessionStorage.getItem('childInfo')
    
    if (!parentInfo || !childInfo) {
      navigate('/parent-info')
      return
    }

    // Get age-appropriate questions
    const child = JSON.parse(childInfo)
    const ageYears = parseInt(child.childAgeYears)
    const ageBasedQuestions = getQuestionsByAge(ageYears)
    setQuestionData(ageBasedQuestions)
  }, [navigate])

  if (!questionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-accent-500" />
      </div>
    )
  }

  const { questions, title, subtitle } = questionData
  const question = questions[currentQuestion]
  const totalQuestions = questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  const handleOptionSelect = (optionValue) => {
    setResponses({
      ...responses,
      [currentQuestion]: optionValue
    })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    // Validate all questions answered
    if (Object.keys(responses).length < totalQuestions) {
      setError('Please answer all questions before submitting')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Get stored info
      const parentInfo = JSON.parse(sessionStorage.getItem('parentInfo'))
      const childInfo = JSON.parse(sessionStorage.getItem('childInfo'))

      // Step 1: Start assessment
      const assessmentData = {
        parentEmail: parentInfo.parentEmail,
        parentPhone: parentInfo.parentPhone,
        parentRelationship: parentInfo.parentRelationship,
        city: parentInfo.city,
        country: parentInfo.country,
        childAgeYears: parseInt(childInfo.childAgeYears),
        childAgeMonths: parseInt(childInfo.childAgeMonths) || 0,
        childGender: childInfo.childGender,
        primaryLanguage: childInfo.primaryLanguage,
        concerns: childInfo.concerns
      }

      const { assessmentId } = await assessmentAPI.startAssessment(assessmentData)

      // Step 2: Submit responses (using age-appropriate questions)
      const formattedResponses = questions.map((q, index) => ({
        questionNumber: q.id,
        questionText: q.text,
        selectedOption: responses[index]
      }))

      await assessmentAPI.submitResponses(assessmentId, formattedResponses)

      // Clear session storage
      sessionStorage.removeItem('parentInfo')
      sessionStorage.removeItem('childInfo')

      // Navigate to results
      navigate(`/results/${assessmentId}`)

    } catch (err) {
      console.error('Error submitting assessment:', err)
      setError('Failed to submit assessment. Please try again.')
      setIsSubmitting(false)
    }
  }

  const isLastQuestion = currentQuestion === totalQuestions - 1
  const canProceed = responses[currentQuestion] !== undefined

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Decorative circles */}
      <div className="circle-decoration top-16 right-16 w-36 h-36 bg-accent-500/10 blur-3xl"></div>
      <div className="circle-decoration bottom-24 left-20 w-28 h-28 bg-accent-500/15 blur-2xl"></div>
      
      <div className="max-w-3xl w-full animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/logo/logo-white.svg" alt="Talktu" className="h-12 mx-auto" />
        </div>

        {/* Age Group Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-white/70 text-sm">{subtitle}</p>
        </div>
        
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-white">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-white/80">{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-accent-500 transition-all duration-500 rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="card mb-6">
          {/* Domain tag */}
          <div className="inline-block bg-accent-100 text-accent-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 border border-accent-200">
            {question.domain.replace('_', ' ').split(' ').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </div>

          {/* Question */}
          <h2 className="text-2xl font-bold text-primary-500 mb-6 leading-relaxed">
            {question.text}
          </h2>

          {/* Text Input for Pricing Question */}
          {question.isTextInput ? (
            <div className="mb-4">
              <input
                type={question.inputType || 'text'}
                placeholder={question.placeholder || ''}
                value={responses[currentQuestion] || ''}
                onChange={(e) => handleOptionSelect(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-accent-500 transition-colors text-lg"
              />
            </div>
          ) : (
            /* Multiple Choice Options */
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`radio-option ${responses[currentQuestion] === option.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option.value}
                    checked={responses[currentQuestion] === option.value}
                    onChange={() => handleOptionSelect(option.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center w-full">
                    <span className="flex-1 text-gray-700">{option.label}</span>
                    {responses[currentQuestion] === option.value && (
                      <CheckCircle className="w-6 h-6 text-accent-600 ml-2" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`btn-secondary flex items-center ${
              currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
              className={`btn-primary flex items-center ${
                !canProceed || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Assessment
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`btn-primary flex items-center ${
                !canProceed ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
