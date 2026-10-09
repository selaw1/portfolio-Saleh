import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';

// Commonly used nisab weights. Some scholars use slightly different figures (87.48 g gold, 612.36 g silver).
const GOLD_NISAB_GRAMS = 85;
const SILVER_NISAB_GRAMS = 595;
const ZAKAT_RATE = 0.025;
const GRAMS_PER_TROY_OUNCE = 31.1034768;

// Free spot price feed (USD per troy ounce), open to browser requests
const PRICE_URL = 'https://api.gold-api.com/price/';

type LivePrices = { gold: number; silver: number; updatedAt: string };

async function fetchPrices(): Promise<LivePrices> {
  const get = async (symbol: 'XAU' | 'XAG') => {
    const res = await fetch(PRICE_URL + symbol);
    if (!res.ok) throw new Error(`price ${symbol}: ${res.status}`);
    const data = (await res.json()) as { price: number; updatedAt: string };
    if (!(data.price > 0)) throw new Error(`price ${symbol}: no price`);
    return data;
  };
  const [gold, silver] = await Promise.all([get('XAU'), get('XAG')]);
  return {
    gold: gold.price / GRAMS_PER_TROY_OUNCE,
    silver: silver.price / GRAMS_PER_TROY_OUNCE,
    updatedAt: gold.updatedAt,
  };
}

type FieldKey =
  | 'cash'
  | 'gold'
  | 'silver'
  | 'investments'
  | 'owedToYou'
  | 'businessCash'
  | 'receivables'
  | 'inventory'
  | 'debts';

type Field = { key: FieldKey; label: string; hint: string };

const personalFields: Field[] = [
  { key: 'cash', label: 'Cash and bank balances', hint: 'Checking, savings and cash on hand' },
  { key: 'gold', label: 'Gold', hint: 'Current market value of gold you own' },
  { key: 'silver', label: 'Silver', hint: 'Current market value of silver you own' },
  { key: 'investments', label: 'Shares and investments', hint: 'Market value of shares and funds' },
  { key: 'owedToYou', label: 'Money owed to you', hint: 'Loans you expect to be repaid' },
];

const businessFields: Field[] = [
  { key: 'businessCash', label: 'Business cash and bank balances', hint: 'All business accounts' },
  { key: 'receivables', label: 'Accounts receivable', hint: 'Customer invoices you expect to collect' },
  { key: 'inventory', label: 'Inventory for sale', hint: 'Goods held for sale, at market value' },
];

const deductionFields: Field[] = [
  { key: 'debts', label: 'Debts and bills due now', hint: 'Personal and business amounts currently due' },
];

const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

const toNumber = (value: string) => {
  const n = parseFloat(value.replace(/[$,\s]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function AmountInput({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block text-[15px] font-medium">{label}</span>
      <span className="mt-0.5 block text-sm text-fog">{hint}</span>
      <span className="mt-2 flex items-center rounded-xl bg-white ring-1 ring-inset ring-ink/15 focus-within:ring-2 focus-within:ring-evergreen">
        <span className="pl-4 text-fog" aria-hidden="true">
          $
        </span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl bg-transparent px-2 py-3 text-[16px] outline-none"
        />
      </span>
    </label>
  );
}

function Calculator() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [goldPrice, setGoldPrice] = useState('');
  const [silverPrice, setSilverPrice] = useState('');
  const [basis, setBasis] = useState<'gold' | 'silver'>('silver');
  const [priceStatus, setPriceStatus] = useState<'loading' | 'live' | 'failed'>('loading');
  const [updatedAt, setUpdatedAt] = useState('');

  // Prefill today's prices; anything the visitor already typed is kept
  useEffect(() => {
    let cancelled = false;
    fetchPrices()
      .then((p) => {
        if (cancelled) return;
        setGoldPrice((v) => v || p.gold.toFixed(2));
        setSilverPrice((v) => v || p.silver.toFixed(2));
        setUpdatedAt(
          new Date(p.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
        );
        setPriceStatus('live');
      })
      .catch(() => !cancelled && setPriceStatus('failed'));
    return () => {
      cancelled = true;
    };
  }, []);

  const set = (key: string) => (value: string) => setValues((v) => ({ ...v, [key]: value }));
  const amount = (key: FieldKey) => toNumber(values[key] ?? '');

  const assets = [...personalFields, ...businessFields].reduce((sum, f) => sum + amount(f.key), 0);
  const debts = amount('debts');
  const zakatable = Math.max(0, assets - debts);

  const pricePerGram = toNumber(basis === 'gold' ? goldPrice : silverPrice);
  const nisab = pricePerGram * (basis === 'gold' ? GOLD_NISAB_GRAMS : SILVER_NISAB_GRAMS);
  const hasNisab = nisab > 0;
  const aboveNisab = hasNisab && zakatable >= nisab;
  const zakat = aboveNisab ? zakatable * ZAKAT_RATE : 0;

  const group = (title: string, fields: Field[]) => (
    <fieldset className="rounded-[24px] bg-porcelain p-6 ring-1 ring-inset ring-ink/10 sm:p-8">
      <legend className="sr-only">{title}</legend>
      <p className="text-xl font-medium tracking-tight">{title}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <AmountInput key={f.key} id={`zakat-${f.key}`} label={f.label} hint={f.hint} value={values[f.key] ?? ''} onChange={set(f.key)} />
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
      <div className="space-y-5 lg:col-span-7">
        <fieldset className="rounded-[24px] bg-porcelain p-6 ring-1 ring-inset ring-ink/10 sm:p-8">
          <legend className="sr-only">Nisab</legend>
          <p className="text-xl font-medium tracking-tight">1. Nisab (the minimum)</p>
          <p className="mt-2 text-[15px] leading-relaxed text-fog">
            {priceStatus === 'loading' && 'Loading today\'s gold and silver prices…'}
            {priceStatus === 'live' &&
              `Filled in with the live spot price per gram (updated ${updatedAt}). You can change them, for example to a local dealer's price.`}
            {priceStatus === 'failed' &&
              'Live prices couldn\'t be loaded right now. Enter today\'s price per gram from a gold dealer or financial site.'}{' '}
            Then choose which standard to use.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <AmountInput id="zakat-gold-price" label="Gold price per gram" hint="In US dollars" value={goldPrice} onChange={setGoldPrice} />
            <AmountInput id="zakat-silver-price" label="Silver price per gram" hint="In US dollars" value={silverPrice} onChange={setSilverPrice} />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row" role="radiogroup" aria-label="Nisab standard">
            {(['silver', 'gold'] as const).map((b) => (
              <label
                key={b}
                className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-[15px] ring-1 ring-inset ${
                  basis === b ? 'bg-evergreen text-porcelain ring-evergreen' : 'bg-white ring-ink/15'
                }`}
              >
                <input type="radio" name="nisab-basis" value={b} checked={basis === b} onChange={() => setBasis(b)} className="sr-only" />
                {b === 'silver' ? `Silver standard (${SILVER_NISAB_GRAMS} g)` : `Gold standard (${GOLD_NISAB_GRAMS} g)`}
              </label>
            ))}
          </div>
        </fieldset>
        {group('2. Personal wealth', personalFields)}
        {group('3. Business assets', businessFields)}
        {group('4. Deduct what you owe', deductionFields)}
      </div>

      <aside className="lg:sticky lg:top-24 lg:col-span-5" aria-live="polite">
        <div
          className={`rounded-[24px] p-6 text-porcelain transition-colors duration-500 sm:p-8 ${
            !hasNisab || zakatable === 0 ? 'bg-deep' : aboveNisab ? 'bg-[#13633f]' : 'bg-[#8a2424]'
          }`}
        >
          {hasNisab && zakatable > 0 && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-porcelain/15 px-3 py-1.5 text-sm font-medium">
              <span className={`h-2 w-2 rounded-full ${aboveNisab ? 'bg-[#7ee2a8]' : 'bg-[#ffb4a8]'}`} aria-hidden="true" />
              {aboveNisab ? 'Above nisab: zakat is due' : 'Below nisab: no zakat due'}
            </p>
          )}
          <p className="text-sm text-porcelain/70">Your zakat</p>
          <p className="mt-2 text-5xl font-medium tracking-tight">{money(zakat)}</p>
          <dl className="mt-8 space-y-3 border-t border-porcelain/10 pt-6 text-[15px]">
            <div className="flex justify-between gap-4">
              <dt className="text-porcelain/75">Total assets</dt>
              <dd>{money(assets)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-porcelain/75">Less debts due now</dt>
              <dd>{money(debts)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-porcelain/75">Zakatable wealth</dt>
              <dd>{money(zakatable)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-porcelain/75">Nisab ({basis} standard)</dt>
              <dd>{hasNisab ? money(nisab) : 'Enter a price'}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-porcelain/70">
            {!hasNisab
              ? 'Enter the price per gram for your chosen standard to see whether zakat is due.'
              : aboveNisab
                ? 'Your zakatable wealth is above the nisab, so zakat of 2.5% is due once a full lunar year (hawl) has passed.'
                : 'Your zakatable wealth is below the nisab, so no zakat is due on it this year.'}
          </p>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-fog">
          The calculator runs in your browser. Nothing you enter is sent or saved.
        </p>
      </aside>
    </div>
  );
}

const faqs = [
  {
    q: 'What is nisab?',
    a: `Nisab is the minimum amount of wealth a Muslim must own before zakat is due. It is set by the value of ${GOLD_NISAB_GRAMS} grams of gold or ${SILVER_NISAB_GRAMS} grams of silver. Many scholars recommend the silver standard because it is lower, so more people pay and more people in need benefit. Others use gold. Some scholars use slightly different weights, so follow the guidance you trust.`,
  },
  {
    q: 'What is the zakat rate?',
    a: 'Zakat on money, gold, silver, trade goods and similar wealth is 2.5% of the zakatable amount, paid once a full lunar year (hawl) has passed while your wealth stayed above the nisab. Some people who calculate on a solar year instead use a slightly higher rate to account for the longer year.',
  },
  {
    q: 'Which business assets count?',
    a: 'In the common approach, a business pays zakat on its cash, the customer invoices it expects to collect, and its inventory held for sale, valued at market price, minus debts currently due. Assets the business uses to operate, such as equipment, vehicles and buildings, are not counted.',
  },
  {
    q: 'What is not counted?',
    a: 'Your home, personal car, furniture, clothing and other things for personal use are not zakatable. Neither are business fixed assets used to run the business.',
  },
  {
    q: 'How are shares counted?',
    a: 'Scholars differ. Shares bought to trade are usually counted at their full market value. For long-term holdings, some scholars count only your share of the company\'s zakatable assets. If you are not sure, ask a scholar or an accountant familiar with zakat.',
  },
];

export default function ZakatCalculatorPage() {
  return (
    <>
      <PageHeader eyebrow="Free tool" title="Zakat calculator for personal and business wealth">
        <p className="lede mt-8 max-w-[52ch] text-porcelain/70">
          Work out the zakat due on your savings, gold, investments and business assets. Built by Saleh Ahmad, who
          holds a Zakat Accounting Diploma from Kuwait Zakat House and worked there as an internal auditor.
        </p>
      </PageHeader>

      <section className="bg-mist/60">
        <div className="wrap py-16 md:py-24">
          <Calculator />
        </div>
      </section>

      <section className="wrap py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="heading reveal max-w-[12ch]">How zakat is calculated</h2>
          </div>
          <div className="post-body lg:col-span-7">
            <p>
              Zakat is one of the five pillars of Islam: 2.5% of the wealth you have held for a full lunar year, once
              that wealth is above the nisab. The calculation has four steps:
            </p>
            <ol>
              <li>Add up your zakatable assets: cash, gold, silver, investments and money owed to you, plus business cash, receivables and inventory for sale.</li>
              <li>Subtract the debts and bills that are due now.</li>
              <li>Compare the result with the nisab, using today's price of gold or silver.</li>
              <li>If it is at or above the nisab, multiply it by 2.5%.</li>
            </ol>
            <p>
              For a business, the numbers come straight from the balance sheet, which is why clean books make zakat
              far easier. If your books aren't up to date, the figures you enter here are only as good as your
              records.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="wrap py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <h2 className="heading reveal lg:col-span-4">Questions</h2>
            <dl className="border-t border-ink/10 lg:col-span-7 lg:col-start-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="border-b border-ink/10 py-7">
                  <dt className="text-lg font-medium">{faq.q}</dt>
                  <dd className="mt-2 max-w-[60ch] leading-relaxed text-fog">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section data-tone="dark" className="bg-deep text-porcelain">
        <div className="wrap grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="heading max-w-[16ch]">Need zakat calculated for your business?</h2>
            <p className="lede mt-6 max-w-[46ch] text-porcelain/70">
              I've worked in accounting for 38 years, including nine years at Kuwait Zakat House, and I calculate
              zakat from a business's own books as part of my Islamic finance and Zakat accounting work. I work
              online from Weatherford, Texas.
            </p>
            <a href="/#book" className="pill-light mt-10">
              Book a call
            </a>
          </div>
        </div>
      </section>

      <section className="wrap py-10">
        <p className="max-w-[80ch] text-sm italic leading-relaxed text-fog">
          This calculator is a general guide based on commonly used methods, not a religious ruling. Scholars differ
          on some details, such as the nisab standard, shares and certain debts. For your own situation, consult a
          scholar you trust.
        </p>
      </section>
    </>
  );
}
