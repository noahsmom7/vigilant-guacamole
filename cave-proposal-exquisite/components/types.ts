export type Task = {
  id: string;
  name: string;
  qty: number;
  unit: string;
  unitPrice: number;
};

export type PaymentKind = '40/40/20' | '50/40/10' | '30/60/10' | 'Monthly' | 'Custom';

export type ProposalData = {
  meta: {
    client: string;
    project: string;
    date: string;
    preparedBy: string;
  };
  executiveSummary: string;
  tasks: Task[];
  retainagePercent: number;
  contingencyPercent: number;
  paymentKind: PaymentKind;
  customPhases?: { label: string; percent: number }[];
};
