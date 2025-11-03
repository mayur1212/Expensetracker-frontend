import React, { useMemo } from 'react'
import { useGetTransactionsQuery } from '../api/transactionsApi'
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#4ade80', '#f87171']

export default function Dashboard({ filters = {} }) {
  const params = Object.fromEntries(Object.entries(filters || {}).filter(([k,v]) => v !== ''))
  const { data, isLoading } = useGetTransactionsQuery(params)

  const summary = useMemo(() => {
    const txs = data?.data || []
    let income = 0, expense = 0
    const byCategory = {}

    txs.forEach(tx => {
      if (tx.type === 'income') income += Number(tx.amount)
      else expense += Number(tx.amount)

      byCategory[tx.category] = (byCategory[tx.category] || 0) + Number(tx.amount)
    })
    return { income, expense, byCategory }
  }, [data])

  const pieData = [
    { name: 'Income', value: summary.income },
    { name: 'Expense', value: summary.expense },
  ]

  if (isLoading) return <div className="p-5 bg-white rounded-2xl shadow-md animate-pulse">Loading summary...</div>

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Financial Overview</h2>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-500">Total Income</p>
          <h3 className="text-3xl font-bold text-green-600">₹ {summary.income.toFixed(2)}</h3>
        </div>
        <div>
          <p className="text-gray-500">Total Expense</p>
          <h3 className="text-3xl font-bold text-red-500">₹ {summary.expense.toFixed(2)}</h3>
        </div>
      </div>

      <div style={{ height: 240 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={85} label className="font-medium">
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-2">Category Breakdown</h4>
      <div className="space-y-1">
        {Object.entries(summary.byCategory).map(([cat, val]) => (
          <div key={cat} className="flex justify-between text-sm py-1 border-b border-gray-100">
            <span className="font-medium text-gray-700">{cat}</span>
            <span className="text-gray-900 font-semibold">₹ {val.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
