import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Baby, Calendar, Languages, AlertCircle } from 'lucide-react'

export default function ChildInfo() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    childAgeYears: '',
    childGender: '',
    primaryLanguage: '',
    concerns: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.childAgeYears) {
      newErrors.childAgeYears = 'Please enter your child\'s age in years'
    } else if (formData.childAgeYears < 2 || formData.childAgeYears > 8) {
      newErrors.childAgeYears = 'This assessment is designed for children ages 2-8'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      // Store child info in session storage
      sessionStorage.setItem('childInfo', JSON.stringify(formData))
      navigate('/questionnaire')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Decorative circles */}
      <div className="circle-decoration top-20 left-10 w-28 h-28 bg-accent-500/10 blur-2xl"></div>
      
      <div className="max-w-2xl w-full animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/logo/logo-white.svg" alt="Talktu" className="h-12 mx-auto" />
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="progress-step completed">✓</div>
            <div className="h-1 w-16 bg-green-500"></div>
            <div className="progress-step active">2</div>
            <div className="h-1 w-16 bg-white/20"></div>
            <div className="progress-step upcoming">3</div>
            <div className="h-1 w-16 bg-white/20"></div>
            <div className="progress-step upcoming">4</div>
          </div>
        </div>

        <div className="card">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary-500 mb-2">About Your Child</h2>
            <p className="text-gray-600">
              Help us understand your child better. We don't need their name - just some basic information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Child's Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="childAgeYears"
                value={formData.childAgeYears}
                onChange={handleChange}
                placeholder="Enter age (e.g., 5)"
                min="2"
                max="8"
                className={`input-field ${errors.childAgeYears ? 'border-red-500' : ''}`}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Age in years (2-8 years old)</p>
              {errors.childAgeYears && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.childAgeYears}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Baby className="w-4 h-4 inline mr-2" />
                Gender (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['male', 'female'].map((gender) => (
                  <label
                    key={gender}
                    className={`radio-option ${formData.childGender === gender ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="childGender"
                      value={gender}
                      checked={formData.childGender === gender}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span className="capitalize">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Primary Language */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Languages className="w-4 h-4 inline mr-2" />
                Primary Language Spoken at Home (Optional)
              </label>
              <input
                type="text"
                name="primaryLanguage"
                value={formData.primaryLanguage}
                onChange={handleChange}
                placeholder="e.g., English, Spanish, Mandarin"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                This helps us provide more relevant recommendations
              </p>
            </div>

            {/* Concerns */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Any Specific Concerns? (Optional)
              </label>
              <textarea
                name="concerns"
                value={formData.concerns}
                onChange={handleChange}
                placeholder="e.g., Speech clarity, reading readiness, attention span..."
                rows="3"
                className="input-field resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Share anything you'd like us to know about your child's development
              </p>
            </div>

            {/* Privacy reminder */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-800">
                🔐 <span className="font-semibold">Anonymous Assessment:</span> We don't ask for your child's name or any identifying information. 
                This ensures complete privacy while still giving you valuable insights.
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/parent-info')}
                className="btn-secondary flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                Start Questionnaire
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
