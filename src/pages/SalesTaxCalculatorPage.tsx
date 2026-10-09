import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { AmountInput, CalculatorFooter, Choice, Panel, ResultCard } from '../components/calculator';
import { money, toNumber } from '../lib/numbers';

const STATE_RATE = 6.25;
const MAX_LOCAL_RATE = 2;

const pct = (n: number) => `${n.toFixed(n % 1 === 0 ? 0 : 2).replace(/0$/, '')}%`;

function Calculator() {
  const [mode, setMode] = useState<'add' | 'included'>('add');
  const [amount, setAmount] = useState('');
  const [local, setLocal] = useState('2');

  const value = toNumber(amount);
  const localRate = Math.min(toNumber(local), MAX_LOCAL_RATE);
  const rate = (STATE_RATE + localRate) / 100;

  const beforeTax = mode === 'add' ? value : value / (1 + rate);
  const tax = beforeTax * rate;
  const total = beforeTax + tax;
  const stateTax = beforeTax * (STATE_RATE / 100);
  const localTax = tax - stateTax;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="space-y-5 lg:col-span-7">
        <Panel title="1. What do you want to work out?">
          <Choice
            name="Calculation"
            value={mode}
            onChange={setMode}
            options={[
              { value: 'add', label: 'Add tax to a price' },
              { value: 'included', label: 'Price already includes tax' },
            ]}
          />
        </Panel>
        <Panel title="2. Amount and local rate">
          <div className="grid gap-5 sm:grid-cols-2">
            <AmountInput
              id="st-amount"
              label={mode === 'add' ? 'Price before tax' : 'Total including tax'}
              hint="In US dollars"
              value={amount}
              onChange={setAmount}
            />
            <AmountInput
              id="st-local"
              label="Local tax rate"
              hint="City, county and district combined, up to 2%"
              value={local}
              onChange={setLocal}
              unit="%"
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-fog">
            Not sure of your local rate? The Texas Comptroller has a{' '}
            <a href="https://comptroller.texas.gov/taxes/sales/" target="_blank" rel="noopener noreferrer" className="link-draw text-ink">
              rate lookup on its sales tax page
            </a>
            . Many Texas cities are at the full 2%.
          </p>
        </Panel>
      </div>
      <div className="lg:col-span-5">
        <ResultCard
          tone="neutral"
          label={mode === 'add' ? 'Total with tax' : 'Sales tax included'}
          headline={money(mode === 'add' ? total : tax)}
          rows={[
            ['Price before tax', money(beforeTax)],
            [`State tax (${pct(STATE_RATE)})`, money(stateTax)],
            [`Local tax (${pct(localRate)})`, money(localTax)],
            [`Total tax (${pct(STATE_RATE + localRate)})`, money(tax)],
            ['Total', money(total)],
          ]}
          note="Applies to taxable goods and services. Some items, such as most groceries and prescription drugs, are exempt from Texas sales tax."
        />
      </div>
    </div>
  );
}

export default function SalesTaxCalculatorPage() {
  return (
    <>
      <PageHeader eyebrow={<a href="/calculators/" className="link-draw hover:text-porcelain">Calculators</a>} title="Texas sales tax calculator">
        <p className="lede mt-8 max-w-[52ch] text-porcelain/70">
          Add Texas sales tax to a price, or find the tax inside a total, at the 6.25% state rate plus up to 2% local
          tax.
        </p>
      </PageHeader>
      <section className="bg-mist/60">
        <div className="wrap py-16 md:py-24">
          <Calculator />
        </div>
      </section>
      <CalculatorFooter
        heading="How Texas sales tax adds up"
        related={[
          { href: '/blog/texas-sales-tax-guide/', label: 'Texas sales tax for small businesses: permits, rates and deadlines' },
          { href: '/blog/how-to-file-texas-sales-tax-online/', label: 'How to file and pay Texas sales tax online' },
        ]}
        cta="I've worked in accounting for 38 years and handle Texas sales tax filings for small businesses as part of their monthly books, working online from Weatherford, Texas."
        disclaimer="This calculator applies the 6.25% Texas state rate plus the local rate you enter, capped at 2%. Whether an item is taxable, and which local rate applies, depends on what you sell and where. It is not tax advice."
      >
        <p>
          The Texas state sales tax rate is 6.25%. Cities, counties, transit authorities and special purpose
          districts can add up to 2% more, so the highest combined rate is 8.25%.
        </p>
        <p>
          To add tax, multiply the price by the combined rate. To find the tax already inside a total, divide the
          total by 1 plus the combined rate, and the difference is the tax.
        </p>
      </CalculatorFooter>
    </>
  );
}
