'use client'
import { ProposalData, PaymentKind, Task } from './types'
import { formatUSD, computeTotals } from './utils'
import { useRef } from 'react'

type Props = {
  data: ProposalData
  setData: (d: ProposalData) => void
  onExport: () => void
  onImport: (f: File) => void
  onPrint: () => void
}

const kinds: PaymentKind[] = ['40/40/20','50/40/10','30/60/10','Monthly','Custom']

export default function Sidebar({ data, setData, onExport, onImport, onPrint }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null)
  const totals = computeTotals(data)

  function update<K extends keyof ProposalData>(key: K, value: ProposalData[K]) {
    setData({ ...data, [key]: value })
  }

  function updateMeta<K extends keyof ProposalData['meta']>(key: K, value: ProposalData['meta'][K]) {
    update('meta', { ...data.meta, [key]: value })
  }

  function addTask() {
    const id = Math.random().toString(36).slice(2)
    const t: any = { id, name: 'New Item', qty: 1, unit: 'ea', unitPrice: 0 }
    update('tasks', [...data.tasks, t])
  }

  function removeTask(id: string) {
    update('tasks', data.tasks.filter(t => t.id !== id))
  }

  return (
    <aside className="print:hidden w-full lg:w-[360px] shrink-0">
      <div className="sticky top-0 p-4 lg:p-6 space-y-6 bg-white/70 dark:bg-slate-900/40 backdrop-blur rounded-2xl shadow-card border border-white/20">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Proposal Controls</h2>
          <button onClick={onPrint} className="px-3 py-1.5 rounded-lg bg-brand-700 text-white hover:bg-brand-800">Print / PDF</button>
        </div>

        <section className="space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">Meta</h3>
          <input className="input" value={data.meta.client} onChange={e=>updateMeta('client', e.target.value)} placeholder="Client name" />
          <input className="input" value={data.meta.project} onChange={e=>updateMeta('project', e.target.value)} placeholder="Project" />
          <input className="input" value={data.meta.date} onChange={e=>updateMeta('date', e.target.value)} placeholder="Date" />
          <input className="input" value={data.meta.preparedBy} onChange={e=>updateMeta('preparedBy', e.target.value)} placeholder="Prepared by" />
        </section>

        <section className="space-y-3">
          <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">Executive Summary</h3>
          <textarea className="input h-28" value={data.executiveSummary} onChange={e=>update('executiveSummary', e.target.value)} />
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">Payment Schedule</h3>
          <select className="input" value={data.paymentKind} onChange={e=>update('paymentKind', e.target.value as any)}>
            {kinds.map(k => <option key={k}>{k}</option>)}
          </select>
          {data.paymentKind === 'Custom' && (
            <p className="text-xs opacity-70">Custom phases can be added in code; we can expose a UI if you want.</p>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">Financials</h3>
          <label className="flex items-center gap-2">Retainage %
            <input type="number" className="input" value={data.retainagePercent} onChange={e=>update('retainagePercent', Number(e.target.value))}/>
          </label>
          <label className="flex items-center gap-2">Contingency %
            <input type="number" className="input" value={data.contingencyPercent} onChange={e=>update('contingencyPercent', Number(e.target.value))}/>
          </label>
          <div className="text-sm grid grid-cols-2 gap-2">
            <span className="opacity-70">Subtotal</span><span className="text-right font-semibold">{formatUSD(totals.subtotal)}</span>
            <span className="opacity-70">Contingency</span><span className="text-right">{formatUSD(totals.contingency)}</span>
            <span className="opacity-70">Retainage</span><span className="text-right">{formatUSD(totals.retainage)}</span>
            <span className="opacity-70">Total</span><span className="text-right text-brand-500 font-semibold">{formatUSD(totals.total)}</span>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm uppercase tracking-wider opacity-70">Tasks</h3>
            <button onClick={addTask} className="px-2 py-1 rounded-md bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700">+ Add</button>
          </div>
          <div className="space-y-2">
            {data.tasks.map(t => (
              <div key={t.id} className="grid grid-cols-12 gap-2 items-center">
                <input className="col-span-5 input" value={t.name} onChange={e=>update('tasks', data.tasks.map(x=>x.id===t.id?{...x,name:e.target.value}:x))} />
                <input className="col-span-2 input" type="number" value={t.qty} onChange={e=>update('tasks', data.tasks.map(x=>x.id===t.id?{...x,qty:Number(e.target.value)}:x))} />
                <input className="col-span-1 input" value={t.unit} onChange={e=>update('tasks', data.tasks.map(x=>x.id===t.id?{...x,unit:e.target.value}:x))} />
                <input className="col-span-3 input" type="number" value={t.unitPrice} onChange={e=>update('tasks', data.tasks.map(x=>x.id===t.id?{...x,unitPrice:Number(e.target.value)}:x))} />
                <button onClick={()=>removeTask(t.id)} className="col-span-1 text-xs text-red-600 hover:underline">Del</button>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center gap-2">
          <button onClick={onExport} className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700">Export JSON</button>
          <button onClick={()=>fileRef.current?.click()} className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700">Import JSON</button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={e=>{const f=e.target.files?.[0]; if(f) onImport(f)}}/>
        </section>
      </div>
      <style jsx global>{`
        .input { @apply w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/50 focus:outline-none focus:ring-2 focus:ring-brand-400; }
      `}</style>
    </aside>
  )
}
