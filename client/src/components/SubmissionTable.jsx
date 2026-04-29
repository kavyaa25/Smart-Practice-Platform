import React from 'react'
import Loader from './Loader'

export default function SubmissionTable({ submissions, loading }) {
  if (loading) return <Loader />

  if (!submissions || submissions.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        No submissions yet. Start practicing!
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-100 dark:bg-slate-700">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Date</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Score</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Word Count</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-slate-700">
          {submissions.map((sub) => (
            <tr key={sub._id} className="hover:bg-slate-50 dark:hover:bg-slate-700 transition">
              <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                {new Date(sub.timestamp).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sub.type === 'audio' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {sub.type === 'audio' ? 'Audio' : 'Writing'}
                </span>
              </td>
              <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">{sub.score}%</td>
              <td className="px-4 py-3 text-slate-900 dark:text-slate-100">{sub.wordCount || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}