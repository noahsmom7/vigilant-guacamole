'use client'
import { ProposalData } from './types'
import { formatUSD, computePhases } from './utils'

export default function PhaseSchedule({ data }: { data: ProposalData }) {
  const phases = computePhases(data)
  return (
    <div className="rounded-2xl border border-white/10 bg-white/60 dark:bg-slate-900/40 shadow-card p-6">
      <h3 className="text-lg font-semibold mb-2">Payment Schedule</h3>
      <ul className="space-y-1">
        {phases.map((p, i) => (
          <li key={i} className="flex items-center justify-between">
            <span className="opacity-80">{p.label}</span>
            <span className="font-semibold">{formatUSD(p.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
