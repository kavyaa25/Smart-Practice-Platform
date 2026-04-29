import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import StatCard from '../components/StatCard'
import SubmissionTable from '../components/SubmissionTable'
import Loader from '../components/Loader'
import { SparklesIcon, CheckCircleIcon, ArrowTrendingUpIcon , FireIcon } from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, submissionsRes] = await Promise.all([
          fetch('http://localhost:5000/api/dashboard/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch('http://localhost:5000/api/dashboard/submissions', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ])

        const statsData = await statsRes.json()
        const submissionsData = await submissionsRes.json()

        if (statsData.success) {
          setStats(statsData.stats)
        }

        if (submissionsData.success) {
          setSubmissions(submissionsData.submissions)

          const chartData = submissionsData.submissions
            .slice(0, 7)
            .reverse()
            .map((sub, idx) => ({
              name: `Day ${idx + 1}`,
              score: sub.score,
            }))
          setChartData(chartData)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [token])

  if (loading) {
    return (
      <div className="p-8">
        <Loader />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Here's your learning progress and performance summary
        </p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={SparklesIcon}
            label="Total Attempts"
            value={stats.totalAttempts || 0}
            color="blue"
          />
          <StatCard
            icon={CheckCircleIcon}
            label="Average Score"
            value={`${Math.round(stats.avgScore || 0)}%`}
            color="purple"
          />
          <StatCard
            icon={ArrowTrendingUpIcon }
            label="Highest Score"
            value={`${stats.highestScore || 0}%`}
            color="green"
          />
          <StatCard
            icon={FireIcon}
            label="Streak"
            value={stats.streak || 0}
            color="orange"
          />
        </div>
      )}

      {/* Charts and Recent Submissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Score Progress</h2>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 text-center py-8">No data yet</p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-blue-200">Audio Tasks</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {submissions.filter(s => s.type === 'audio').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-purple-200">Writing Tasks</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">
                {submissions.filter(s => s.type === 'writing').length}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
              <span className="text-sm font-medium text-slate-700 dark:text-green-200">Best Score</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                {stats?.highestScore || 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Submissions</h2>
        <SubmissionTable submissions={submissions.slice(0, 5)} loading={false} />
      </div>
    </div>
  )
}