import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { AmountInput, CalculatorFooter, Panel, ResultCard } from '../components/calculator';
import { money, toNumber } from '../lib/numbers';

const SOCIAL_SECURITY_WAGE_BASE = 184500; // 2026
// FUTA: 6% on the first $7,000 of wages, less the 5.4% credit for paying state unemployment tax
const FUTA_WAGE_BASE = 7000;
const FUTA_RATE = 0.006;

// Social Security (12.4%) up to the wage base, plus Medicare (2.9%) on everything
const payrollTaxes = (amount: number) => Math.min(amount, SOCIAL_SECURITY_WAGE_BASE) * 0.124 + amount * 0.029;

function Calculator() {
  const [v, setV] = useState<Record<string, string>>({});
  const set = (k: string) => (val: string) => setV((s) => ({ ...s, [k]: val }));

  const profit = toNumber(v.profit ?? '');
  const salary = Math.min(toNumber(v.salary ?? ''), profit);
  const costs = toNumber(v.costs ?? '');

  const llcTax = profit * 0.9235 >= 400 ? payrollTaxes(profit * 0.9235) : 0;
  const sCorpTax = payrollTaxes(salary);
  const futa = Math.min(salary, FUTA_WAGE_BASE) * FUTA_RATE;
  const savings = llcTax - sCorpTax - futa - costs;
  const hasResult = profit > 0 && salary > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="space-y-5 lg:col-span-7">
        <Panel title="1. Your business" intro="Use a full year's numbers.">
          <div className="grid gap-5 sm:grid-cols-2">
            <AmountInput id="sc-profit" label="Net profit" hint="Business income minus expenses, before paying yourself" value={v.profit ?? ''} onChange={set('profit')} />
            <AmountInput id="sc-salary" label="Reasonable salary" hint="What you'd pay someone else to do your job" value={v.salary ?? ''} onChange={set('salary')} />
          </div>
        </Panel>
        <Panel title="2. Extra cost of an S corp" intro="Running payroll for yourself and filing a separate business return cost money each year.">
          <div className="grid gap-5 sm:grid-cols-2">
            <AmountInput id="sc-costs" label="Extra yearly costs" hint="Payroll service, Texas unemployment tax, extra tax return" value={v.costs ?? ''} onChange={set('costs')} />
          </div>
        </Panel>
      </div>
      <div className="lg:col-span-5">
        <ResultCard
          tone={!hasResult ? 'neutral' : savings > 0 ? 'good' : 'bad'}
          badge={savings > 0 ? 'An S corp could save you money' : 'An S corp likely costs more'}
          label="Estimated yearly savings as an S corp"
          headline={money(Math.max(0, savings))}
          rows={[
            ['Self-employment tax as an LLC', money(llcTax)],
            ['Payroll taxes on your salary', money(sCorpTax)],
            ['Federal unemployment tax', money(futa)],
            ['Extra S corp costs', money(costs)],
            ['Difference', `${savings < 0 ? '−' : ''}${money(Math.abs(savings))}`],
          ]}
          note={
            !hasResult
              ? 'Enter your profit and a reasonable salary to compare.'
              : savings > 0
                ? 'Distributions above your salary avoid Social Security and Medicare taxes. Check the salary is one you could defend to the IRS.'
                : 'At these numbers the payroll taxes and extra costs outweigh the savings, so staying a regular LLC is likely simpler and cheaper.'
          }
        />
      </div>
    </div>
  );
}

export default function SCorpCalculatorPage() {
  return (
    <>
      <PageHeader eyebrow={<a href="/calculators/" className="link-draw hover:text-porcelain">Calculators</a>} title="LLC vs S corp tax savings calculator">
        <p className="lede mt-8 max-w-[52ch] text-porcelain/70">
          See roughly how much self-employment tax an S corp election could save your LLC, after paying yourself a
          reasonable salary and covering the extra costs.
        </p>
      </PageHeader>
      <section className="bg-mist/60">
        <div className="wrap py-16 md:py-24">
          <Calculator />
        </div>
      </section>
      <CalculatorFooter
        heading="How the comparison works"
        related={[
          { href: '/blog/llc-vs-s-corp-texas/', label: 'LLC vs S corp in Texas: which is right for you?' },
          { href: '/blog/how-to-pay-yourself-from-an-llc/', label: "How to pay yourself from an LLC: owner's draw vs salary" },
        ]}
        cta="I've worked in accounting for 38 years and help small business owners decide on an S corp election with real numbers from their own books, working online from Weatherford, Texas."
        disclaimer="This is a simplified comparison of payroll taxes only, using 2026 rates and the $184,500 Social Security wage base. It leaves out income tax effects such as the deduction for half of self-employment tax and the qualified business income deduction. It is not tax advice."
      >
        <ol>
          <li>As a regular LLC, self-employment tax is 15.3% of 92.35% of your profit, with the Social Security part capped at $184,500 for 2026.</li>
          <li>As an S corp, Social Security and Medicare taxes (15.3% in total, employer and employee shares) apply only to the salary you pay yourself, plus federal unemployment tax of 0.6% on the first $7,000.</li>
          <li>Profit above the salary comes out as distributions, without those taxes.</li>
          <li>The extra cost of payroll, Texas unemployment tax and a separate business return is subtracted from the savings.</li>
        </ol>
        <p>
          Texas franchise tax applies to LLCs either way, so it doesn't change the comparison. The IRS expects the
          salary to be reasonable for the work you do; a salary set too low to save tax is a common reason S corp
          returns get questioned.
        </p>
      </CalculatorFooter>
    </>
  );
}
