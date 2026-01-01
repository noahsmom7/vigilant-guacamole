'use client'

import { useEffect, useMemo, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ProposalData } from '../components/types'
import PhaseSchedule from '../components/PhaseSchedule'
import { computeTotals, formatUSD } from '../components/utils'

const initial: ProposalData = {
  meta: { client: 'IHOP District (Sherry)', project: 'Sprinkler TI & Backflow', date: new Date().toLocaleDateString(), preparedBy: 'Cave Fire Protection' },
  executiveSummary: 'We propose a code-compliant, smoothly phased TI with clear milestones, proactive communication, and pristine workmanship. Our schedule and allowances reflect AHJ coordination windows and site access constraints.',
  tasks: [
    { id: 't1', name: 'Fire sprinkler interiors (OH1 areas)', qty: 1, unit: 'lot', unitPrice: 20000 },
    { id: 't2', name: 'Backflow & shut-down coordination', qty: 1, unit: 'lot', unitPrice: 2500 },
    { id: 't3', name: 'As-builts & final closeout', qty: 1, unit: 'lot', unitPrice: 1750 }
  ],
  retainagePercent: 10,
  contingencyPercent: 10,
  paymentKind: '50/40/10'
}

export default function Page() {
  const [data, setData] = useState<ProposalData>(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('cave-proposal')
      if (raw) return JSON.parse(raw)
    }
    return initial
  })

  useEffect(() => {
    localStorage.setItem('cave-proposal', JSON.stringify(data))
  }, [data])

  const totals = useMemo(() => computeTotals(data), [data])

  function onExport() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proposal-${data.meta.project.replace(/\s+/g,'-').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function onImport(f: File) {
    const reader = new FileReader()
    reader.onload = () => {
      try { setData(JSON.parse(String(reader.result))) }
      catch { alert('Invalid JSON') }
    }
    reader.readAsText(f)
  }

  function onPrint() {
    window.print()
  }

  return (
    <div className="min-h-screen">
      <header className="print:hidden px-6 lg:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-700 shadow-card"></div>
          <div>
            <h1 className="font-semibold text-xl">Cave Proposal Generator</h1>
            <p className="text-sm opacity-70">Exquisite • Fast • Client‑ready</p>
          </div>
        </div>
        <a className="text-sm opacity-80 hover:opacity-100 underline" href="#" onClick={(e)=>{e.preventDefault(); localStorage.removeItem('cave-proposal'); setData(initial)}}>Reset</a>
      </header>

      <main className="px-4 lg:px-10 pb-16">
        <div className="mx-auto max-w-[1200px] grid lg:grid-cols-[360px_1fr] gap-6">
          <Sidebar data={data} setData={setData} onExport={onExport} onImport={onImport} onPrint={onPrint} />

          <section className="rounded-2xl border border-white/10 bg-white/70 dark:bg-slate-900/40 shadow-card overflow-hidden">
            <div className="relative h-44 md:h-56 bg-gradient-to-br from-brand-900 to-brand-700">
              <div className="absolute inset-0 opacity-20" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #ffffff 1px, transparent 1px)', backgroundSize:'16px 16px'}}/>
              <div className="absolute bottom-3 left-4 md:left-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-white drop-shadow">Proposal</h2>
                <p className="text-white/80">{data.meta.client} • {data.meta.project}</p>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl p-4 bg-white/80 dark:bg-slate-900/50 border border-white/20">
                  <div className="text-xs opacity-70">Client</div>
                  <div className="font-medium">{data.meta.client}</div>
                </div>
                <div className="rounded-xl p-4 bg-white/80 dark:bg-slate-900/50 border border-white/20">
                  <div className="text-xs opacity-70">Project</div>
                  <div className="font-medium">{data.meta.project}</div>
                </div>
                <div className="rounded-xl p-4 bg-white/80 dark:bg-slate-900/50 border border-white/20">
                  <div className="text-xs opacity-70">Date</div>
                  <div className="font-medium">{data.meta.date}</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Executive Summary</h3>
                <p className="opacity-90 leading-relaxed">{data.executiveSummary}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Scope & Costs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left opacity-70">
                      <tr><th className="py-2">Item</th><th>Qty</th><th>Unit</th><th>Unit Price</th><th>Total</th></tr>
                    </thead>
                    <tbody>
                      {data.tasks.map(t => (
                        <tr key={t.id} className="border-t border-white/10">
                          <td className="py-2">{t.name}</td>
                          <td>{t.qty}</td>
                          <td>{t.unit}</td>
                          <td>{formatUSD(t.unitPrice)}</td>
                          <td className="font-semibold">{formatUSD(t.qty * t.unitPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <PhaseSchedule data={data} />
                <div className="rounded-2xl border border-white/10 bg-white/60 dark:bg-slate-900/40 shadow-card p-6">
                  <h3 className="text-lg font-semibold mb-3">Totals</h3>
                  <div className="text-sm grid grid-cols-2 gap-y-1">
                    <span className="opacity-70">Subtotal</span><span className="text-right">{formatUSD(totals.subtotal)}</span>
                    <span className="opacity-70">Contingency ({data.contingencyPercent}%)</span><span className="text-right">{formatUSD(totals.contingency)}</span>
                    <span className="opacity-70">Retainage ({data.retainagePercent}%)</span><span className="text-right">{formatUSD(totals.retainage)}</span>
                    <span className="opacity-70">Total</span><span className="text-right font-semibold">{formatUSD(totals.total)}</span>
                  </div>
                </div>
              </div>

              <div className="opacity-70 text-xs">
                <p>Notes: All work scheduled with AHJ and building operations. Submittals, as‑builts, and closeout included.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
