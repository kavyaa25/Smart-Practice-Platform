import React from 'react'

export default function StatCard({ icon: Icon, label, value, color = 'blue' }) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
  }

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <Icon className="w-12 h-12 opacity-30" />
      </div>
    </div>
  )
}