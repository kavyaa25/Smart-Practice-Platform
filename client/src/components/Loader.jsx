import React from 'react'

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-300 dark:border-slate-600 border-t-blue-500"></div>
    </div>
  )
}