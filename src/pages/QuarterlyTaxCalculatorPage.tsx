import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { AmountInput, CalculatorFooter, Choice, Panel, ResultCard } from '../components/calculator';
import { money, toNumber } from '../lib/numbers';

// 2026 federal figures (IRS Rev. Proc. 2025-32, SSA)
const STANDARD_DEDUCTION = { single: 16100, joint: 32200 };
const BRACKETS = {
  single: [
    [12400, 0.1],
    [50400, 0.12],
    [105700, 0.22],
    [201775, 0.24],
    [256225, 0.32],
    [640600, 0.35],
    [Infinity, 0.37],
  ],
  joint: [
    [24800, 0.1],
    [100800, 0.12],
    [211400, 0.22],
    [403550, 0.24],
    [512450, 0.32],
    [768700, 0.35],
    [Infinity, 0.37],
  ],
} as const;
const SOCIAL_SECURITY_WAGE_BASE = 184500;
// Qualified business income deduction: the full 20% applies below these taxable incomes;
// above them it can be limited by business type and wages paid, so the calculator leaves it out
const QBI_THRESHOLD = { single: 201750, joint: 403500 };

type Status = 'single' | 'joint';

function incomeTax(taxable: number, status: Status) {
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of BRACKETS[status]) {
    if (taxable <= lower) break;
    tax += (Math.min(taxable, upper) - lower) * rate;
    lower = upper;
  }
  return tax;
}

// Self-employment tax on net profit: 15.3% of 92.35% of profit, with Social Security capped at the wage base
function selfEmploymentTax(profit: number, wages: number) {
  const base = profit * 0.9235;
  if (base < 400) return 0;
  const socialSecurity = Math.min(base, Math.max(0, SOCIAL_SECURITY_WAGE_BASE - wages)) * 0.124;
  return socialSecurity + base * 0.029;
}

const dueDates = ['April 15, 2026', 'June 15, 2026', 'September 15, 2026', 'January 15, 2027'];

function Calculator() {
  const [status, setStatus] = useState<Status>('single');
  const [v, setV] = useState<Record<string, string>>({});
  const [highIncome, setHighIncome] = useState<'no' | 'yes'>('no');
  const set = (k: string) => (val: string) => setV((s) => ({ ...s, [k]: val }));
  const n = (k: string) => toNumber(v[k] ?? '');

  const profit = n('profit');
  const wages = n('wages');
  const withheld = n('withheld');
  const lastYear = n('lastYear');

  const seTax = selfEmploymentTax(profit, wages);
  const agi = Math.max(0, profit + wages - seTax / 2);
  const beforeQbi = Math.max(0, agi - STANDARD_DEDUCTION[status]);
  const qbiApplies = beforeQbi <= QBI_THRESHOLD[status];
  // 20% of business income (profit less the deductible half of self-employment tax), capped at 20% of taxable income
  const qbi = qbiApplies ? Math.min(0.2 * Math.max(0, profit - seTax / 2), 0.2 * beforeQbi) : 0;
  const taxable = beforeQbi - qbi;
  const fedTax = incomeTax(taxable, status);
  const total = seTax + fedTax;
  const stillOwed = Math.max(0, total - withheld);
  const quarterly = stillOwed / 4;

  const safeHarborYear = lastYear * (highIncome === 'yes' ? 1.1 : 1);
  const safeHarborQuarter = Math.max(0, safeHarborYear - withheld) / 4;

  const hasResult = profit > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="space-y-5 lg:col-span-7">
        <Panel title="1. Filing status">
          <Choice
            name="Filing status"
            value={status}
            onChange={setStatus}
            options={[
              { value: 'single', label: 'Single' },
              { value: 'joint', label: 'Married filing jointly' },
            ]}
          />
        </Panel>
        <Panel title="2. This year's income" intro="Your best estimate for all of 2026.">
          <div className="grid gap-5 sm:grid-cols-2">
            <AmountInput id="qt-profit" label="Net self-employment profit" hint="1099 and business income minus expenses" value={v.profit ?? ''} onChange={set('profit')} />
            <AmountInput id="qt-wages" label="W-2 wages" hint="From a job, if you have one" value={v.wages ?? ''} onChange={set('wages')} />
            <AmountInput id="qt-withheld" label="Federal tax withheld" hint="Taken from W-2 paychecks this year" value={v.withheld ?? ''} onChange={set('withheld')} />
          </div>
        </Panel>
        <Panel title="3. Safe harbor (optional)" intro="Paying at least last year's tax, spread over the four quarters, avoids an underpayment penalty.">
          <div className="grid gap-5 sm:grid-cols-2">
            <AmountInput id="qt-last" label="Last year's total tax" hint="The total tax line on your 2025 return" value={v.lastYear ?? ''} onChange={set('lastYear')} />
          </div>
          <p className="mt-6 text-[15px] font-medium">Was last year's adjusted gross income over $150,000?</p>
          <div className="mt-3">
            <Choice
              name="Income over 150,000"
              value={highIncome}
              onChange={setHighIncome}
              options={[
                { value: 'no', label: 'No (pay 100%)' },
                { value: 'yes', label: 'Yes (pay 110%)' },
              ]}
            />
          </div>
        </Panel>
      </div>

      <div className="lg:col-span-5">
        <ResultCard
          tone={hasResult ? 'good' : 'neutral'}
          badge="Pay this each quarter"
          label="Estimated payment per quarter"
          headline={money(quarterly)}
          rows={[
            ['Self-employment tax', money(seTax)],
            ['Business income deduction', qbiApplies ? `−${money(qbi)}` : 'Not included'],
            ['Federal income tax', money(fedTax)],
            ['Less tax withheld', money(withheld)],
            ['Estimated tax for 2026', money(stillOwed)],
            ...(lastYear > 0 ? ([['Safe harbor per quarter', money(safeHarborQuarter)]] as [string, string][]) : []),
          ]}
          note={
            <>
              <p>Due {dueDates.join(', ')}.</p>
              {hasResult && !qbiApplies && (
                <p className="mt-2">
                  Your income is above the level where the business income deduction is simple to work out, so it is left out and the estimate may be high.
                </p>
              )}
              {lastYear > 0 && (
                <p className="mt-2">
                  Paying the safe harbor amount on time protects you from penalties, even if you end up owing more when you file.
                </p>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}

export default function QuarterlyTaxCalculatorPage() {
  return (
    <>
      <PageHeader eyebrow={<a href="/calculators/" className="link-draw hover:text-porcelain">Calculators</a>} title="Quarterly estimated tax calculator">
        <p className="lede mt-8 max-w-[52ch] text-porcelain/70">
          Estimate how much to pay the IRS each quarter on 1099 or self-employment income in 2026, and the safe harbor
          amount that avoids a penalty.
        </p>
      </PageHeader>
      <section className="bg-mist/60">
        <div className="wrap py-16 md:py-24">
          <Calculator />
        </div>
      </section>
      <CalculatorFooter
        heading="How the estimate works"
        related={[
          { href: '/blog/how-to-pay-quarterly-taxes-on-1099-income/', label: 'How to pay quarterly estimated taxes on 1099 income' },
          { href: '/blog/llc-vs-s-corp-texas/', label: 'LLC vs S corp in Texas' },
        ]}
        cta="I've worked in accounting for 38 years and help self-employed people and small business owners plan their tax during the year, working online from Weatherford, Texas."
        sources={[
          { href: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf', label: 'IRS: Revenue Procedure 2025-32 (2026 tax brackets, standard deduction, business income deduction limits)' },
          { href: 'https://www.ssa.gov/oact/cola/cbb.html', label: 'Social Security Administration: contribution and benefit base' },
          { href: 'https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes', label: 'IRS: Self-employment tax (Social Security and Medicare taxes)' },
          { href: 'https://www.irs.gov/newsroom/qualified-business-income-deduction', label: 'IRS: Qualified business income deduction' },
          { href: 'https://www.irs.gov/forms-pubs/about-form-1040-es', label: 'IRS: About Form 1040-ES, Estimated Tax for Individuals' },
        ]}
        disclaimer="This calculator gives a general estimate for 2026 using IRS tax brackets, standard deductions and the Social Security wage base. It assumes all your self-employment profit qualifies for the qualified business income deduction, and leaves out credits, itemized deductions, retirement contributions and the additional Medicare tax, so your actual tax may be lower or higher. It is not tax advice."
      >
        <ol>
          <li>Self-employment tax is 15.3% of 92.35% of your net profit. The Social Security part stops at the 2026 wage base of $184,500, counting any W-2 wages first.</li>
          <li>Half of the self-employment tax is deducted from your income, and so is the 2026 standard deduction ($16,100 single, $32,200 married filing jointly).</li>
          <li>
            The qualified business income deduction takes off 20% of your business profit (less the deductible half of
            self-employment tax), up to 20% of your taxable income. It is included when taxable income is under $201,750
            ($403,500 married filing jointly); above that it can be limited, so it is left out.
          </li>
          <li>Federal income tax is figured on what's left using the 2026 tax brackets.</li>
          <li>Tax already withheld from W-2 pay is subtracted, and the rest is split into four payments.</li>
        </ol>
        <p>
          Texas has no state income tax, so these are federal payments only.
        </p>
      </CalculatorFooter>
    </>
  );
}
