// Number helpers shared by the calculator pages

export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

// Accepts "12,500", "$12500" or "12500.50"; anything else counts as 0
export const toNumber = (value: string) => {
  const n = parseFloat(value.replace(/[$,%\s]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : 0;
};
