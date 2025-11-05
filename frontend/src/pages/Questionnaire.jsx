import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Loader } from 'lucide-react'
import { QUESTIONS } from '../data/questions'
import { assessmentAPI } from '../services/api'

export default function Questionnaire() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check if parent and child info exists
    const parentInfo = sessionStorage.getItem('parentInfo')
    const childInfo = sessionStorage.getItem('childInfo')
    
    if (!parentInfo || !childInfo) {
      navigate('/parent-info')
    }
  }, [navigate])

  const question = QUESTIONS[currentQuestion]
  const totalQuestions = QUESTIONS.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const isPricingQuestion = question.domain === 'pricing'

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

      // Step 2: Submit responses
      const formattedResponses = QUESTIONS.map((q, index) => ({
        questionNumber: q.number,
        questionText: q.question,
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
          <img src="/logo/logo-white.svg" alt="TalkTu" className="h-12 mx-auto" />
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
          {/* Domain tag or Pricing tag */}
          {!isPricingQuestion ? (
            <div className="inline-block bg-accent-100 text-accent-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 border border-accent-200">
              {question.domain.replace('_', ' ').split(' ').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </div>
          ) : (
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 border border-primary-200">
              💰 Pricing Feedback (Optional)
            </div>
          )}

          {/* Question */}
          <h2 className="text-2xl font-bold text-primary-500 mb-6 leading-relaxed">
            {question.question}
          </h2>

          {/* Text Input for Pricing Question */}
          {question.isTextInput ? (
            <div className="space-y-3">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">₦</span>
                <input
                  type="number"
                  name={`question-${currentQuestion}`}
                  value={responses[currentQuestion] || ''}
                  onChange={(e) => handleOptionSelect(e.target.value)}
                  placeholder={question.placeholder}
                  min="0"
                  step="1000"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <p className="text-sm text-gray-500 ml-1">
                💡 Enter the monthly amount you'd be comfortable paying (or enter 0 if you prefer free options)
              </p>
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
                    <span className="text-2xl mr-3">{option.emoji}</span>
                    <span className="flex-1 text-gray-700">{option.label}</span>
                    {responses[currentQuestion] === option.value && (
                      <CheckCircle className="w-6 h-6 text-blue-600 ml-2" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          )}

          {/* Optional note for pricing question */}
          {isPricingQuestion && (
            <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-3 text-purple-700 text-sm">
              ℹ️ <strong>Note:</strong> This question doesn't affect your assessment results. 
              It helps us understand what families might value in our services.
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

        {/* Helper text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          All questions must be answered to complete the assessment
        </p>
      </div>
    </div>
  )
}
