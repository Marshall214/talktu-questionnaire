import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loader, AlertCircle, Download, Home, CheckCircle, AlertTriangle, TrendingUp, Sparkles, Brain, Zap, Target } from 'lucide-react'
import { assessmentAPI } from '../services/api'
import { DOMAIN_INFO } from '../data/questions'
import DomainCard from '../components/DomainCard'
import OverallScore from '../components/OverallScore'

export default function Results() {
  const { assessmentId } = useParams()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [interestedInPlatform, setInterestedInPlatform] = useState(false)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  useEffect(() => {
    fetchResults()
  }, [assessmentId])

  const fetchResults = async () => {
    try {
      const data = await assessmentAPI.getResults(assessmentId)
      setResults(data.results)
    } catch (err) {
      console.error('Error fetching results:', err)
      setError('Failed to load results. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    window.print()
  }

  const handlePlatformInterest = async (interested) => {
    setInterestedInPlatform(interested)
    
    if (interested) {
      setShowWaitlistModal(true)
      
      // Save interest to backend
      try {
        await assessmentAPI.updatePlatformInterest(assessmentId, true)
      } catch (error) {
        console.error('Error saving platform interest:', error)
      }
    }
  }

  const closeModal = () => {
    setShowWaitlistModal(false)
    setWaitlistSubmitted(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="text-center relative z-10">
          <Loader className="w-12 h-12 text-accent-500 animate-spin mx-auto mb-4" />
          <p className="text-white">Loading your results...</p>
        </div>
      </div>
    )
  }

  if (error || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="card max-w-md text-center relative z-10">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary-500 mb-2">Error Loading Results</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  // Parse recommendations if stored as string
  const recommendations = typeof results.recommendations === 'string' 
    ? JSON.parse(results.recommendations) 
    : results.recommendations

  const redFlags = typeof results.red_flags === 'string'
    ? JSON.parse(results.red_flags)
    : results.red_flags

  // Domain data
  const domains = {
    speech_language: {
      ...DOMAIN_INFO.speech_language,
      score: results.speech_language_score,
      max: results.speech_language_max,
      percentage: results.speech_language_percentage,
      level: results.speech_language_level
    },
    literacy: {
      ...DOMAIN_INFO.literacy,
      score: results.literacy_score,
      max: results.literacy_max,
      percentage: results.literacy_percentage,
      level: results.literacy_level
    },
    numeracy: {
      ...DOMAIN_INFO.numeracy,
      score: results.numeracy_score,
      max: results.numeracy_max,
      percentage: results.numeracy_percentage,
      level: results.numeracy_level
    },
    cognitive: {
      ...DOMAIN_INFO.cognitive,
      score: results.cognitive_score,
      max: results.cognitive_max,
      percentage: results.cognitive_percentage,
      level: results.cognitive_level
    }
  }

  return (
    <div className="min-h-screen px-4 py-12 relative">
      {/* Decorative circles */}
      <div className="circle-decoration top-10 right-10 w-40 h-40 bg-accent-500/10 blur-3xl"></div>
      <div className="circle-decoration bottom-20 left-20 w-48 h-48 bg-accent-500/15 blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/logo/logo-white.svg" alt="TalkTu" className="h-14 mx-auto" />
        </div>
        
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-accent-500 rounded-full mb-4 shadow-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Assessment Complete!</h1>
          <p className="text-white/90 text-lg">
            Here's your child's personalized learning profile
          </p>
          <p className="text-sm text-white/60 mt-2">
            Assessment ID: {assessmentId.slice(0, 8)}...
          </p>
        </div>

        {/* Red Flags Alert */}
        {redFlags && redFlags.length > 0 && (
          <div className="card mb-8 border-l-4 border-red-500 bg-red-50 animate-fade-in">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">⚠️ Areas Requiring Immediate Attention</h3>
                <ul className="space-y-1">
                  {redFlags.map((flag, index) => (
                    <li key={index} className="text-red-700 text-sm">• {flag}</li>
                  ))}
                </ul>
                <p className="text-red-700 text-sm mt-3 font-semibold">
                  We strongly recommend consulting with a speech-language pathologist or child development specialist.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Overall Score */}
        <OverallScore
          totalScore={results.total_score}
          maxScore={results.max_score}
          percentage={results.overall_percentage}
          level={results.overall_level}
        />

        {/* Domain Scores */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Learning Areas Breakdown
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {Object.entries(domains).map(([key, domain]) => (
              <DomainCard key={key} domain={domain} />
            ))}
          </div>
        </div>

        {/* TalkTu Platform Section */}
        <div className="card bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white mb-8 overflow-hidden relative border-2 border-accent-500/30">
          {/* Decorative elements - golden circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500 opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500 opacity-15 rounded-full -ml-24 -mb-24 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <Sparkles className="w-6 h-6 text-primary-500" />
              </div>
              <h2 className="text-3xl font-bold">Introducing TalkTu Platform</h2>
            </div>
            
            <p className="text-lg mb-6 text-white/90 leading-relaxed">
              Now that you understand your child's learning profile, imagine having <span className="font-bold text-accent-500">AI-powered tools</span> that grow with them every day.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-accent-500/30">
                <Brain className="w-8 h-8 mb-2 text-accent-500" />
                <h3 className="font-bold mb-1">Personalized Learning</h3>
                <p className="text-sm text-white/80">AI adapts to your child's pace, strengths, and needs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-accent-500/30">
                <Zap className="w-8 h-8 mb-2 text-accent-500" />
                <h3 className="font-bold mb-1">Speech Therapy Activities</h3>
                <p className="text-sm text-white/80">Fun, interactive exercises for language development</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-accent-500/30">
                <Target className="w-8 h-8 mb-2 text-accent-500" />
                <h3 className="font-bold mb-1">Progress Tracking</h3>
                <p className="text-sm text-white/80">Real-time insights and milestone celebrations</p>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border border-accent-500/40">
              <h3 className="font-bold text-xl mb-3">✨ What TalkTu Offers:</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-accent-500" />
                  <span><strong>AI Speech Coach:</strong> Interactive voice-based activities tailored to your child's speech level</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-accent-500" />
                  <span><strong>Smart Learning Activities:</strong> Literacy, numeracy, and cognitive exercises that adapt in real-time</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-accent-500" />
                  <span><strong>Parent Dashboard:</strong> Track progress, get weekly tips, and celebrate achievements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5 text-accent-500" />
                  <span><strong>Expert Support:</strong> Access to speech therapists and child development specialists</span>
                </li>
              </ul>

              {!waitlistSubmitted && (
                <div className="bg-white rounded-lg p-6 text-primary-500">
                  <p className="font-bold text-lg mb-4 text-center">
                    Would you be interested in joining TalkTu when we launch?
                  </p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => handlePlatformInterest(true)}
                      className="px-8 py-3 bg-accent-500 text-primary-500 rounded-lg font-bold hover:bg-accent-400 hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Yes, I'm Interested! 🎉
                    </button>
                    <button
                      onClick={() => handlePlatformInterest(false)}
                      className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              )}

              {waitlistSubmitted && (
                <div className="bg-green-500 bg-opacity-20 border border-green-300 rounded-lg p-4 text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-bold text-lg">Thank you for your interest!</p>
                  <p className="text-sm">We'll keep you updated on our launch.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button onClick={handleDownload} className="btn-primary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary flex items-center">
            <Home className="w-4 h-4 mr-2" />
            Take Another Assessment
          </button>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            <strong>Important:</strong> This assessment is a screening tool and does not replace professional evaluation. 
            Results are based on parent observations and should be discussed with qualified healthcare providers 
            if you have concerns about your child's development.
          </p>
        </div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-primary-500/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-scale-in shadow-2xl">
            {/* Confetti effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-4 left-4 text-4xl animate-bounce">🎉</div>
              <div className="absolute top-4 right-4 text-4xl animate-bounce" style={{animationDelay: '0.1s'}}>🎊</div>
              <div className="absolute bottom-4 left-8 text-3xl animate-bounce" style={{animationDelay: '0.2s'}}>✨</div>
              <div className="absolute bottom-4 right-8 text-3xl animate-bounce" style={{animationDelay: '0.3s'}}>🌟</div>
            </div>

            <div className="text-center relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-primary-500 mb-3">
                Welcome to the Waitlist! 🎉
              </h2>
              
              <p className="text-gray-600 mb-4 text-lg">
                You've been added to our <span className="font-bold text-blue-600">exclusive early access list</span>!
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
                <p className="text-sm text-gray-700 mb-2">
                  🎁 <strong>Early Access Benefits:</strong>
                </p>
                <ul className="text-xs text-gray-600 text-left space-y-1 ml-4">
                  <li>✓ First to try TalkTu's AI platform</li>
                  <li>✓ Special launch discount (up to 50% off)</li>
                  <li>✓ Free consultation with our child development experts</li>
                  <li>✓ Priority support and personalized onboarding</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                We'll email you when TalkTu launches. Get ready for an amazing journey! 🚀
              </p>

              <button
                onClick={closeModal}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Continue to Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
