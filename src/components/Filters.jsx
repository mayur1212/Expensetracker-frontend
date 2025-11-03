import React, { useState } from 'react'

export default function Filters({ onChange }) {
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    startDate: '',
    endDate: ''
  })

  const apply = () => {
    const payload = {}
    if (filters.type) payload.type = filters.type
    if (filters.category) payload.category = filters.category
    if (filters.startDate) payload.startDate = filters.startDate
    if (filters.endDate) payload.endDate = filters.endDate
    onChange(payload)
  }

  const reset = () => {
    const empty = { type: '', category: '', startDate: '', endDate: '' }
    setFilters(empty)
    onChange({})
  }

  return (
    <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md mb-5 border border-gray-200">
      
      <h4 className="font-semibold mb-3 text-lg text-gray-800 flex items-center gap-2">
        🔍 Filter Transactions
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="border p-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          className="border p-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white"
        />

        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="border p-2.5 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>

      <div className="mt-4 flex gap-3">

        <button
          onClick={apply}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition-all duration-200"
        >
          ✅ Apply Filters
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 shadow transition-all duration-200"
        >
          ♻️ Reset
        </button>

      </div>

    </div>
  )
}
