import { Circle } from 'lucide-react'

export default function DomainCard({ domain }) {
  const getColorClasses = (level) => {
    switch (level) {
      case 'strong':
        return {
          bg: 'bg-green-50',
          border: 'border-green-500',
          text: 'text-green-700',
          barBg: 'bg-green-500',
          label: 'Strong',
          emoji: '🟢'
        }
      case 'developing':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500',
          text: 'text-yellow-700',
          barBg: 'bg-yellow-500',
          label: 'Developing',
          emoji: '🟡'
        }
      case 'needs_support':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-500',
          text: 'text-orange-700',
          barBg: 'bg-orange-500',
          label: 'Needs Support',
          emoji: '🟠'
        }
      case 'urgent':
        return {
          bg: 'bg-red-50',
          border: 'border-red-500',
          text: 'text-red-700',
          barBg: 'bg-red-500',
          label: 'Urgent Attention',
          emoji: '🔴'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-500',
          text: 'text-gray-700',
          barBg: 'bg-gray-500',
          label: 'Unknown',
          emoji: '⚪'
        }
    }
  }

  const colors = getColorClasses(domain.level)
  const percentage = Math.round(domain.percentage)

  return (
    <div className={`card border-l-4 ${colors.border} ${colors.bg} animate-fade-in`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-2">{domain.icon}</span>
            <h3 className="text-xl font-bold text-gray-800">{domain.name}</h3>
          </div>
          <p className="text-sm text-gray-600">{domain.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
          <span className={`text-sm font-semibold ${colors.text} flex items-center`}>
            {colors.emoji} {colors.label}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Score: {domain.score}/{domain.max}
          </span>
          <span className="text-sm font-bold text-gray-800">{percentage}%</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.barBg} transition-all duration-1000 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Interpretation */}
      <div className={`text-sm ${colors.text} mt-3 p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
        {domain.level === 'strong' && (
          <p>✨ <strong>Excellent!</strong> Your child is performing very well in this area.</p>
        )}
        {domain.level === 'developing' && (
          <p>📈 <strong>On Track.</strong> Continue supporting development in this area.</p>
        )}
        {domain.level === 'needs_support' && (
          <p>💡 <strong>Additional Support Recommended.</strong> Focus on activities in this area.</p>
        )}
        {domain.level === 'urgent' && (
          <p>⚠️ <strong>Requires Immediate Attention.</strong> Consider professional evaluation.</p>
        )}
      </div>
    </div>
  )
}
