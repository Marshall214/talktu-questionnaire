import { useNavigate } from 'react-router-dom'
import { Sparkles, Brain, Heart, TrendingUp, BookOpen } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Floating circles background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large yellow circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-accent-500/70 rounded-full animate-float" style={{animationDelay: '0s', animationDuration: '20s'}}></div>
        <div className="absolute top-40 right-20 w-52 h-52 bg-accent-500/60 rounded-full animate-float-slow" style={{animationDelay: '3s', animationDuration: '25s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-accent-500/75 rounded-full animate-float" style={{animationDelay: '5s', animationDuration: '22s'}}></div>
        
        {/* Medium yellow circles */}
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-accent-500/65 rounded-full animate-float-slow" style={{animationDelay: '2s', animationDuration: '18s'}}></div>
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-accent-500/70 rounded-full animate-float" style={{animationDelay: '7s', animationDuration: '24s'}}></div>
        
        {/* Small pink circles */}
        <div className="absolute top-20 right-1/4 w-20 h-20 bg-pink-300/80 rounded-full animate-float" style={{animationDelay: '1s', animationDuration: '15s'}}></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-pink-300/85 rounded-full animate-float-slow" style={{animationDelay: '4s', animationDuration: '17s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-18 h-18 bg-pink-300/75 rounded-full animate-float" style={{animationDelay: '6s', animationDuration: '19s'}}></div>
        <div className="absolute top-2/3 right-20 w-14 h-14 bg-pink-300/90 rounded-full animate-float-slow" style={{animationDelay: '8s', animationDuration: '16s'}}></div>
        
        {/* Extra small pink circles */}
        <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-pink-300/80 rounded-full animate-float" style={{animationDelay: '2.5s', animationDuration: '14s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-pink-300/75 rounded-full animate-float-slow" style={{animationDelay: '5.5s', animationDuration: '20s'}}></div>
      </div>
      
      <div className="max-w-4xl w-full animate-fade-in relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-6">
            <img src="/logo/logo-white.svg" alt="Talktu" className="h-16" />
          </div>
          <p className="text-white/90 text-lg font-medium">Child Development Assessment</p>
        </div>

        {/* Main Card */}
        <div className="card mb-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary-500 mb-4">
              Is your child's speech, learning, and attention developing as expected?
            </h2>
            <p className="text-xl text-gray-600 mb-2">
              Every child learns differently, some through listening, others by doing or talking.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Take this <span className="font-semibold text-accent-500">2-minute Talktu Quick Check</span> to discover how your child is learning, communicating, and growing — and find out if they might need a little extra support along the way.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl border border-accent-200">
              <Sparkles className="w-12 h-12 text-accent-500 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-500 mb-2">Quick & Easy</h3>
              <p className="text-sm text-gray-600">Just 10 questions, takes only 2 minutes</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200">
              <Brain className="w-12 h-12 text-primary-500 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-500 mb-2">Expert Insights</h3>
              <p className="text-sm text-gray-600">Get personalized recommendations</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border border-pink-200">
              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-primary-500 mb-2">Private & Secure</h3>
              <p className="text-sm text-gray-600">Your information stays confidential</p>
            </div>
          </div>

          {/* What we assess */}
          <div className="bg-gradient-to-r from-accent-50/50 to-primary-50 rounded-xl p-6 mb-8 border border-accent-200">
            <h3 className="font-semibold text-primary-500 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-accent-500" />
              What We Assess
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🗣️</span>
                <span className="text-gray-700">Speech & Language Development</span>
              </div>
              <div className="flex items-center">
                <BookOpen className="w-6 h-6 mr-3 text-accent-500" />
                <span className="text-gray-700">Literacy & Reading Readiness</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🔢</span>
                <span className="text-gray-700">Numeracy & Math Skills</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🧠</span>
                <span className="text-gray-700">Focus, Memory & Attention</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/parent-info')}
              className="btn-primary text-lg px-12 py-4"
            >
              Start Assessment
              <span className="ml-2">→</span>
            </button>
            <p className="text-sm text-gray-500 mt-4">
              No account required • Results in 2 minutes • Free to use
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-white/70">
          This assessment is a screening tool and does not replace professional evaluation. 
          For concerns about your child's development, please consult with a qualified healthcare provider.
        </p>
      </div>
    </div>
  )
}
