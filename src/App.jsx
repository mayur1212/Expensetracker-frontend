import React, { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import Dashboard from './components/Dashboard'
import Filters from './components/Filters'

export default function App() {
  const [filters, setFilters] = useState({})
  const normalized = Object.fromEntries(Object.entries(filters || {}).filter(([k,v]) => v !== ''))

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <TransactionForm />
          <Filters onChange={setFilters} />
        </div>

        <div className="md:col-span-2 space-y-4">
          <Dashboard filters={normalized} />
          <TransactionList filters={normalized} />
        </div>
      </div>
    </div>
  )
}
