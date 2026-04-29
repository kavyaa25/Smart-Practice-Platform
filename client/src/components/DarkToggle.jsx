import React from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function DarkToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5 text-yellow-500" />
      ) : (
        <MoonIcon className="w-5 h-5 text-slate-600" />
      )}
    </button>
  )
}