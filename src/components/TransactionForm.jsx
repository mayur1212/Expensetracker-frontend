import React, { useState } from 'react'
import { useCreateTransactionMutation } from '../api/transactionsApi'

export default function TransactionForm() {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().slice(0, 10),
  })

  const [createTx, { isLoading }] = useCreateTransactionMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.amount || !form.category) return alert('Amount + Category required')

    try {
      await createTx({
        ...form,
        amount: Number(form.amount),
        date: new Date(form.date).toISOString(),
      }).unwrap()
      setForm({ type: 'expense', amount: '', description: '', category: '', date: new Date().toISOString().slice(0,10) })
    } catch (err) {
      alert('Failed to add')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Add Transaction</h3>

      <div className="grid gap-3">
        <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}
          className="p-2.5 border rounded-xl bg-gray-50 focus:ring focus:ring-indigo-300">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input type="number" placeholder="Amount" value={form.amount}
          onChange={(e) => setForm({...form, amount: e.target.value})}
          className="p-2.5 border rounded-xl bg-gray-50 focus:ring focus:ring-indigo-300" />

        <input placeholder="Category" value={form.category}
          onChange={(e) => setForm({...form, category: e.target.value})}
          className="p-2.5 border rounded-xl bg-gray-50 focus:ring focus:ring-indigo-300" />

        <input type="date" value={form.date}
          onChange={(e) => setForm({...form, date: e.target.value})}
          className="p-2.5 border rounded-xl bg-gray-50" />

        <input placeholder="Description" value={form.description}
          onChange={(e) => setForm({...form, description: e.target.value})}
          className="p-2.5 border rounded-xl bg-gray-50 focus:ring focus:ring-indigo-300" />
      </div>

      <button
        disabled={isLoading}
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl transition-all font-semibold">
        {isLoading ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  )
}
