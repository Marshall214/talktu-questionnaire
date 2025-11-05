import { AlertTriangle, Lightbulb, Star, CheckCircle } from 'lucide-react'

export default function RecommendationCard({ recommendation, index }) {
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'urgent':
        return {
          icon: <AlertTriangle className="w-6 h-6" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
          iconColor: 'text-red-600',
          label: 'High Priority'
        }
      case 'needs_support':
        return {
          icon: <Lightbulb className="w-6 h-6" />,
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-500',
          textColor: 'text-orange-700',
          iconColor: 'text-orange-600',
          label: 'Action Needed'
        }
      case 'strength':
        return {
          icon: <Star className="w-6 h-6" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-700',
          iconColor: 'text-green-600',
          label: 'Strength'
        }
      case 'maintain':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-500',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-600',
          label: 'Keep Going'
        }
      default:
        return {
          icon: <Lightbulb className="w-6 h-6" />,
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-600',
          label: 'Suggestion'
        }
    }
  }

  const priorityInfo = getPriorityInfo(recommendation.priority)

  return (
    <div className={`card border-l-4 ${priorityInfo.borderColor} ${priorityInfo.bgColor} animate-fade-in`}
         style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 ${priorityInfo.iconColor}`}>
          {recommendation.icon ? (
            <span className="text-3xl">{recommendation.icon}</span>
          ) : (
            priorityInfo.icon
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Priority badge */}
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${priorityInfo.bgColor} ${priorityInfo.textColor} border ${priorityInfo.borderColor}`}>
            {priorityInfo.label}
          </div>

          {/* Title */}
          <h3 className={`text-lg font-bold mb-2 ${priorityInfo.textColor}`}>
            {recommendation.title}
          </h3>

          {/* Description */}
          <p className={`leading-relaxed mb-3 ${priorityInfo.textColor}`}>
            {recommendation.description}
          </p>

          {/* What This Means */}
          {recommendation.whatThisMeans && (
            <div className="mt-3 p-3 rounded-lg bg-white/80 border-l-2 border-yellow-400">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                ⚠️ What This Means:
              </p>
              <p className="text-sm text-gray-600">
                {recommendation.whatThisMeans}
              </p>
            </div>
          )}

          {/* Next Steps */}
          {recommendation.nextSteps && (
            <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <p className="text-sm font-semibold text-blue-800 mb-1">
                🎯 Next Steps:
              </p>
              <p className="text-sm text-blue-700">
                {recommendation.nextSteps}
              </p>
            </div>
          )}

          {/* Activities list */}
          {recommendation.activities && recommendation.activities.length > 0 && (
            <div className={`mt-4 p-4 rounded-lg bg-white border ${priorityInfo.borderColor}`}>
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                � Activities You Can Start Today:
              </h4>
              <ul className="space-y-2">
                {recommendation.activities.map((activity, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
