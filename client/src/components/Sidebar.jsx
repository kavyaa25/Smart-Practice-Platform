import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HomeIcon, SpeakerWaveIcon, PencilSquareIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: HomeIcon },
    { path: '/audio-practice', label: 'Audio Practice', icon: SpeakerWaveIcon },
    { path: '/writing-practice', label: 'Writing Practice', icon: PencilSquareIcon },
  ]

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-800 shadow-lg">
      <nav className="flex-1 p-6 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive(path)
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}