import { ProposalData } from './types'

export function formatUSD(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function computeTotals(data: ProposalData) {
  const subtotal = data.tasks.reduce((s, t) => s + t.qty * t.unitPrice, 0);
  const contingency = (data.contingencyPercent / 100) * subtotal;
  const retainage = (data.retainagePercent / 100) * subtotal;
  const total = subtotal + contingency;
  return { subtotal, contingency, retainage, total };
}

export function computePhases(data: ProposalData) {
  const { total } = computeTotals(data);
  if (data.paymentKind === '40/40/20') return [
    { label: 'Mobilization', amount: total * 0.4 },
    { label: 'Progress', amount: total * 0.4 },
    { label: 'Final', amount: total * 0.2 },
  ];
  if (data.paymentKind === '50/40/10') return [
    { label: 'Mobilization', amount: total * 0.5 },
    { label: 'Progress', amount: total * 0.4 },
    { label: 'Final', amount: total * 0.1 },
  ];
  if (data.paymentKind === '30/60/10') return [
    { label: 'Mobilization', amount: total * 0.3 },
    { label: 'Progress', amount: total * 0.6 },
    { label: 'Final', amount: total * 0.1 },
  ];
  if (data.paymentKind === 'Monthly') return [
    { label: 'Monthly progress billing', amount: total }
  ];
  const phases = (data.customPhases || []);
  const scale = phases.reduce((s, p) => s + p.percent, 0) || 100;
  return phases.map(p => ({ label: p.label, amount: total * (p.percent / scale) }));
}
