import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Mail, Phone, MapPin, User } from 'lucide-react'

export default function ParentInfo() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    parentEmail: '',
    parentPhone: '',
    parentRelationship: 'parent',
    city: '',
    country: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Store parent info in session storage
    sessionStorage.setItem('parentInfo', JSON.stringify(formData))
    navigate('/child-info')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Decorative circles */}
      <div className="circle-decoration top-10 right-20 w-24 h-24 bg-accent-500/10 blur-2xl"></div>
      <div className="circle-decoration bottom-32 left-16 w-32 h-32 bg-accent-500/15 blur-3xl"></div>
      
      <div className="max-w-2xl w-full animate-fade-in relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src="/logo/logo-white.svg" alt="TalkTu" className="h-12 mx-auto" />
        </div>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="progress-step active">1</div>
            <div className="h-1 w-16 bg-white/20"></div>
            <div className="progress-step upcoming">2</div>
            <div className="h-1 w-16 bg-white/20"></div>
            <div className="progress-step upcoming">3</div>
            <div className="h-1 w-16 bg-white/20"></div>
            <div className="progress-step upcoming">4</div>
          </div>
        </div>

        <div className="card">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-primary-500 mb-2">Parent Information</h2>
            <p className="text-gray-600">
              We'd like to know a bit about you. All information is optional and kept confidential.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address (Optional)
              </label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                We'll send you a copy of the results if you'd like
              </p>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                placeholder="+234 803 123 4567"
                className="input-field"
              />
              <p className="text-xs text-gray-500 mt-1">
                Nigerian mobile format (e.g., +234 803, +234 806, +234 701)
              </p>
            </div>

            {/* Relationship */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Your Relationship to the Child
              </label>
              <select
                name="parentRelationship"
                value={formData.parentRelationship}
                onChange={handleChange}
                className="input-field"
              >
                <option value="parent">Parent</option>
                <option value="guardian">Guardian</option>
                <option value="teacher">Teacher</option>
                <option value="caregiver">Caregiver</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  City (Optional)
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Lagos, Abuja, Port Harcourt, etc."
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State (Optional)
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select State</option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="FCT">FCT (Abuja)</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                </select>
              </div>
            </div>

            {/* Privacy note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                🔒 <span className="font-semibold">Privacy First:</span> All information is encrypted and stored securely. 
                We never share your data with third parties.
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-secondary flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
