import React from 'react'
import { useGetTransactionsQuery, useDeleteTransactionMutation } from '../api/transactionsApi'

export default function TransactionList({ filters = {} }) {
  const params = Object.fromEntries(Object.entries(filters || {}).filter(([k,v]) => v !== ''))
  const { data, isLoading } = useGetTransactionsQuery(params)
  const [deleteTx] = useDeleteTransactionMutation()
  const list = data?.data || []

  if (isLoading) return <div className="p-4 bg-white rounded-2xl shadow-md">Loading...</div>

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Transaction History</h3>
      
      {list.length === 0 && <p className="text-gray-600">No transactions found.</p>}

      <ul className="space-y-3">
        {list.map(tx => (
          <li key={tx._id} className="flex justify-between items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition border">
            <div>
              <div className="font-semibold">{tx.category} — <span className="text-xs">{tx.type}</span></div>
              <div className="text-xs text-gray-500">{tx.description}</div>
            </div>

            <div className="text-right">
              <div className={`${tx.type === 'income' ? 'text-green-600' : 'text-red-500'} font-semibold`}>
                ₹ {Number(tx.amount).toFixed(2)}
              </div>
              <div className="text-xs text-gray-500">{new Date(tx.date).toLocaleDateString()}</div>

              <button onClick={() => deleteTx(tx._id)}
                className="text-xs text-red-500 hover:text-red-700 mt-1">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
