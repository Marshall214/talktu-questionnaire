import { CheckCircle, AlertCircle, Star, TrendingUp } from 'lucide-react'

export default function OverallScore({ totalScore, maxScore, percentage, level }) {
  const getLevelInfo = (level) => {
    switch (level) {
      case 'advanced':
        return {
          title: 'Advanced Development',
          color: 'from-green-500 to-emerald-600',
          textColor: 'text-green-700',
          bgColor: 'bg-green-50',
          icon: <Star className="w-8 h-8 text-green-600" />,
          message: 'Your child is exceeding developmental milestones! Continue fostering their strengths.',
          emoji: '🌟'
        }
      case 'on_track':
        return {
          title: 'On Track',
          color: 'from-blue-500 to-cyan-600',
          textColor: 'text-blue-700',
          bgColor: 'bg-blue-50',
          icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
          message: 'Your child is developing appropriately for their age. Keep up the great work!',
          emoji: '✅'
        }
      case 'needs_support':
        return {
          title: 'Needs Guided Support',
          color: 'from-orange-500 to-amber-600',
          textColor: 'text-orange-700',
          bgColor: 'bg-orange-50',
          icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
          message: 'Your child would benefit from targeted activities and support in key areas.',
          emoji: '📈'
        }
      case 'needs_intensive_support':
        return {
          title: 'Needs Intensive Support',
          color: 'from-red-500 to-rose-600',
          textColor: 'text-red-700',
          bgColor: 'bg-red-50',
          icon: <AlertCircle className="w-8 h-8 text-red-600" />,
          message: 'We recommend seeking professional evaluation and early intervention services.',
          emoji: '🚨'
        }
      default:
        return {
          title: 'Assessment Complete',
          color: 'from-gray-500 to-slate-600',
          textColor: 'text-gray-700',
          bgColor: 'bg-gray-50',
          icon: <CheckCircle className="w-8 h-8 text-gray-600" />,
          message: 'Review the detailed breakdown below.',
          emoji: '📊'
        }
    }
  }

  const levelInfo = getLevelInfo(level)
  const roundedPercentage = Math.round(percentage)

  return (
    <div className="card mb-8 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Overall Assessment Score</h2>
        <p className="text-gray-600">Based on all learning areas combined</p>
      </div>

      <div className={`${levelInfo.bgColor} rounded-2xl p-8 border-2 border-opacity-20`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Score Circle */}
          <div className="relative">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - roundedPercentage / 100)}`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className={`stop-color-${level}`} style={{ stopColor: level === 'advanced' ? '#22c55e' : level === 'on_track' ? '#3b82f6' : level === 'needs_support' ? '#f97316' : '#ef4444' }} />
                  <stop offset="100%" className={`stop-color-${level}`} style={{ stopColor: level === 'advanced' ? '#10b981' : level === 'on_track' ? '#0ea5e9' : level === 'needs_support' ? '#ea580c' : '#dc2626' }} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className={`text-4xl font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                {roundedPercentage}%
              </span>
              <span className="text-sm text-gray-600">{totalScore}/{maxScore}</span>
            </div>
          </div>

          {/* Level Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3">
              {levelInfo.icon}
              <h3 className={`text-2xl font-bold ml-3 ${levelInfo.textColor}`}>
                {levelInfo.emoji} {levelInfo.title}
              </h3>
            </div>
            <p className={`text-lg ${levelInfo.textColor} leading-relaxed`}>
              {levelInfo.message}
            </p>
          </div>
        </div>
      </div>

      {/* Score range explanation */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="font-bold text-green-700">87-100%</div>
          <div className="text-green-600 text-xs">Advanced</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="font-bold text-blue-700">63-86%</div>
          <div className="text-blue-600 text-xs">On Track</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
          <div className="font-bold text-orange-700">37-62%</div>
          <div className="text-orange-600 text-xs">Needs Support</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="font-bold text-red-700">0-36%</div>
          <div className="text-red-600 text-xs">Intensive Support</div>
        </div>
      </div>
    </div>
  )
}
