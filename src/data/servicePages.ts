// One page per service, published at /<slug>/. The homepage service list links to these.

export type ServicePage = {
  slug: string;
  name: string;
  // Shown in Google results and the browser tab
  seoTitle: string;
  description: string;
  heading: string;
  intro: string;
  included: { title: string; body: string }[];
  // Optional numbered walkthrough of how the work is done
  steps?: { title: string; body: string }[];
  forWho: string[];
  faqs: { q: string; a: string }[];
  // Blog post slugs to link at the bottom of the page
  relatedPosts: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: 'accounting-system-setup',
    name: 'Accounting system setup',
    seoTitle: 'Accounting System Setup for Small Business | Saleh Ahmad',
    description:
      'A complete accounting system set up for your business: separate business banking, QuickBooks, a chart of accounts built around how you sell, inventory tracking, internal controls, a bookkeeping routine and clear Excel reports. Simple, scalable and ready for tax filing from day one.',
    heading: 'An accounting system built around your business',
    intro:
      'Most businesses never get a real accounting system. They get software and a habit. I set up the whole system, from the bank accounts to the monthly reports, so it is simple to run, grows with you and is ready for tax filing from day one.',
    included: [
      {
        title: 'Every transaction, A to Z',
        body: 'Each cycle set up: sales and invoicing, collections, purchasing, bills and payments, payroll and inventory, through to the monthly close and financial statements.',
      },
      {
        title: 'Chart of accounts built around how you sell',
        body: 'Income split by sales channel (your online store, marketplaces like Amazon, wholesale, distributors) and costs split by product line, so you can see what actually makes money.',
      },
      {
        title: 'Inventory tracking',
        body: 'Products set up with SKUs, so purchases, sales, cost of goods sold and stock on hand are tracked properly instead of estimated.',
      },
      {
        title: 'Internal controls and approvals',
        body: 'Clear rules for who records, who approves and who pays, with review points so errors and fraud are caught early. Built on years of internal audit experience.',
      },
      {
        title: 'Procedures manual',
        body: 'Written step-by-step procedures for the weekly, monthly and quarterly routine, so the work is done the same way every time and new staff can be trained quickly.',
      },
      {
        title: 'Clear Excel reports',
        body: 'Well-designed Excel workbooks with charts and summaries for sales, costs, cash and profit, plus a 12-month reporting template and budget. Where your software allows it, the routine updates are automated so reporting takes less manual work.',
      },
    ],
    steps: [
      {
        title: 'Separate business banking',
        body: 'A business checking account, a business credit card and, if useful, a savings account. Personal and business money are never mixed.',
      },
      {
        title: 'The right software',
        body: 'Usually QuickBooks Online, set up with bank connections, sales tax tracking, inventory where needed, and links to sales platforms like Shopify or Amazon.',
      },
      {
        title: 'Chart of accounts',
        body: 'Assets, liabilities, equity, income by channel, cost of goods sold by product, and expenses such as marketing, platform fees, payroll and rent.',
      },
      {
        title: 'Inventory',
        body: 'Each product with its own SKU and cost, tracking beginning inventory, purchases, sales and ending inventory.',
      },
      {
        title: 'A bookkeeping routine',
        body: 'Weekly: categorize transactions, record sales, upload receipts. Monthly: reconcile bank and card accounts, review inventory and the profit and loss. Quarterly: sales tax filings and an estimated tax review.',
      },
      {
        title: 'Key reports',
        body: 'A monthly profit and loss (revenue, cost of goods, gross profit, expenses, net profit), balance sheet and cash flow statement.',
      },
      {
        title: 'Budget and KPIs',
        body: 'A monthly budget by category, and the numbers worth watching: revenue, gross margin, net profit margin, inventory turnover, average order value, customer acquisition cost and repeat purchase rate.',
      },
      {
        title: 'Organized documents',
        body: 'A simple digital folder structure for bank statements, sales tax, receipts, inventory purchases, payroll, insurance, contracts and tax returns.',
      },
    ],
    forWho: [
      'New businesses that want to start with a proper system instead of fixing one later',
      'Product businesses selling online, on marketplaces or wholesale, with inventory to track',
      'Growing businesses that have outgrown a spreadsheet or a bank-feed-only setup',
      'Owners preparing for investors or lenders who will ask for reliable financial statements',
    ],
    faqs: [
      {
        q: 'How is this different from bookkeeping?',
        a: 'Bookkeeping records the transactions each month. System setup designs how those transactions flow, who approves them, how they are checked and how the results are reported. A good system makes monthly bookkeeping faster and more reliable.',
      },
      {
        q: 'What do the Excel reports look like?',
        a: 'Clean, easy-to-read workbooks with charts and summaries of the numbers you care about, such as sales by channel, gross margin, expenses against budget and cash. What can be automated, such as refreshing from exported reports, is automated. The rest is kept simple to update.',
      },
      {
        q: 'Which software do you recommend?',
        a: 'For most growing businesses, QuickBooks Online, especially if you hold inventory or sell through several channels. For very small or early-stage businesses, a simpler setup can be enough to start. We will pick what fits on the intro call.',
      },
      {
        q: 'Can you keep running the system after it is set up?',
        a: 'Yes. Many clients continue with monthly bookkeeping, so the system is maintained by the person who designed it.',
      },
    ],
    relatedPosts: ['accounting-system-setup-guide', 'catch-up-bookkeeping'],
  },
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping',
    seoTitle: 'Bookkeeping Services for Small Business | Online & Remote | Saleh Ahmad',
    description:
      'Bookkeeping services for small business, done online: bank reconciliation, payables and receivables, and monthly financial statements. Outsource your bookkeeping to a remote bookkeeper with 38 years of experience, based in Texas.',
    heading: 'Bookkeeping services for small businesses',
    intro:
      'Every transaction recorded, every account reconciled, and a clear set of financial statements at the end of each month. You always know where your business stands, and your tax return starts from numbers you can trust.',
    included: [
      {
        title: 'Bank and card reconciliation',
        body: 'Every bank and credit card account matched to its statement each month, so nothing is missing, duplicated or miscategorized.',
      },
      {
        title: 'Transaction categorization',
        body: 'Income and expenses recorded to the right accounts, with personal spending, loan payments and transfers handled correctly.',
      },
      {
        title: 'Payables and receivables',
        body: 'Bills you owe and invoices customers owe you tracked, so you can see what is due and what is overdue.',
      },
      {
        title: 'Monthly financial statements',
        body: 'A profit and loss statement, balance sheet and cash flow statement delivered every month.',
      },
      {
        title: 'Catch-up and cleanup',
        body: 'Months or years behind? Past periods brought up to date and reconciled before the monthly routine begins.',
      },
      {
        title: 'Sales tax tracking',
        body: 'Sales tax collected recorded as a liability and reconciled, ready for your Texas sales tax returns.',
      },
    ],
    forWho: [
      'Small business owners who are doing their own books and falling behind',
      'Businesses whose bookkeeping is months or years out of date',
      'Owners who want reliable monthly numbers for decisions, lenders or investors',
      'Businesses in Texas or anywhere else that prefer to work fully online',
    ],
    faqs: [
      {
        q: 'Do you work as a remote bookkeeper for businesses outside Weatherford?',
        a: "No. I'm based in Weatherford, Texas, but all of the work is done online, so I work with businesses across Texas, the rest of the US and abroad.",
      },
      {
        q: 'What software do you use?',
        a: "Mostly QuickBooks Online and QuickBooks Desktop. If you already use one of them, I work in your file. If you don't have accounting software yet, I'll set it up for you.",
      },
      {
        q: 'My books are a mess. Can you still help?',
        a: 'Yes. Catch-up and cleanup work is one of the most common jobs I do. Past months are reconciled first, then we move to a regular monthly close.',
      },
      {
        q: 'What do I need to get started?',
        a: "Access to your bank and credit card statements, your accounting software if you have it, and last year's tax return. We'll go through the rest on a short intro call.",
      },
    ],
    relatedPosts: ['catch-up-bookkeeping', 'accounting-system-setup-guide'],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    seoTitle: 'Payroll Services for Small Business | Online Payroll | Saleh Ahmad',
    description:
      'Online payroll services for small business: payroll processing with QuickBooks Payroll, pay runs, wage records, payroll reports and year-end records, for employers in Texas and across the US.',
    heading: 'Payroll services for small businesses, done on time',
    intro:
      'Your team paid correctly and on schedule, with payroll recorded in your books and the records kept ready for year-end. You approve the hours; I handle the rest.',
    included: [
      {
        title: 'Regular pay runs',
        body: 'Salaries and hourly wages processed on your schedule, whether weekly, every two weeks, twice a month or monthly.',
      },
      {
        title: 'QuickBooks Payroll setup',
        body: 'Employees, pay rates, deductions and benefits set up correctly from the start, or an existing setup reviewed and fixed.',
      },
      {
        title: 'Payroll recorded in your books',
        body: 'Wages, employer taxes and deductions posted to the right accounts, so your financial statements show your true labor cost.',
      },
      {
        title: 'Payroll reports',
        body: 'Payroll summaries and wage records for each period, ready for you, your lender or your tax preparer.',
      },
      {
        title: 'Year-end records',
        body: 'Payroll records reconciled through the year, so year-end forms are prepared from accurate totals.',
      },
    ],
    forWho: [
      'Businesses hiring their first employees',
      'Owners who are running payroll themselves and want it off their plate',
      'Businesses already on QuickBooks Payroll that need it set up or cleaned up',
      'Employers in Texas or anywhere in the US',
    ],
    faqs: [
      {
        q: 'Does Texas have state income tax withholding?',
        a: "No. Texas has no state income tax, so there is no state withholding from employees' pay. Employers still withhold federal income tax, Social Security and Medicare, and most employers pay Texas unemployment tax to the Texas Workforce Commission.",
      },
      {
        q: 'What payroll software do you use?',
        a: 'QuickBooks Payroll, which connects directly to your QuickBooks books.',
      },
      {
        q: 'Can you take over payroll partway through the year?',
        a: "Yes. Year-to-date totals are brought over so every employee's records stay complete for the year.",
      },
      {
        q: 'Do you work with businesses outside Texas?',
        a: 'Yes. Payroll is handled online, so location is not a barrier.',
      },
    ],
    relatedPosts: ['catch-up-bookkeeping'],
  },
  {
    slug: 'tax-preparation',
    name: 'Tax preparation and planning',
    seoTitle: 'Small Business Accountant & Tax Preparer in Texas | Saleh Ahmad',
    description:
      'A small business accountant for tax preparation and planning in Texas and across the US: returns prepared from clean books, deductions claimed, and Texas franchise tax and sales tax filings kept on schedule.',
    heading: 'Tax preparation and planning for small businesses',
    intro:
      'A tax return is only as good as the books behind it. I prepare returns from reconciled records, make sure the deductions you are entitled to are claimed, and plan ahead so tax season holds no surprises.',
    included: [
      {
        title: 'Tax return preparation',
        body: 'Returns prepared from clean, reconciled books, with the supporting records organized in case questions come up later.',
      },
      {
        title: 'Tax planning',
        body: 'A look ahead during the year at what you are likely to owe, so you can set money aside and make decisions with the tax effect in mind.',
      },
      {
        title: 'Deductions claimed',
        body: 'Business expenses properly categorized through the year, so legitimate deductions are not missed at filing time.',
      },
      {
        title: 'Texas franchise tax',
        body: 'Your annual franchise tax report or Public Information Report filed by May 15, so your business stays in good standing.',
      },
      {
        title: 'Texas sales tax',
        body: 'Sales tax collected tracked in your books and returns filed on your monthly, quarterly or annual schedule.',
      },
    ],
    forWho: [
      'Small business owners who want their return prepared from accurate books',
      'Texas businesses that need franchise tax and sales tax filings kept on schedule',
      'Owners who want to know what they will owe before the deadline, not after',
      'Businesses whose books need catching up before taxes can be filed',
    ],
    faqs: [
      {
        q: 'Does Texas have a state income tax?',
        a: 'No. But most Texas LLCs and corporations are subject to the Texas franchise tax, and businesses that sell taxable goods or services must collect and file sales tax.',
      },
      {
        q: 'My books are behind. Can you still prepare my taxes?',
        a: 'Yes. The books are brought up to date first, then the return is prepared from them. Filing from incomplete records usually means missed deductions or errors.',
      },
      {
        q: 'When should I contact you before the tax deadline?',
        a: 'The earlier the better. Planning during the year gives you options that are no longer available once the year has closed.',
      },
      {
        q: 'Do you work with clients outside Texas?',
        a: 'Yes. Everything is handled online, so I work with clients across the US and abroad.',
      },
    ],
    relatedPosts: ['texas-franchise-tax-guide', 'texas-sales-tax-guide'],
  },
  {
    slug: 'quickbooks',
    name: 'QuickBooks',
    seoTitle: 'QuickBooks Help: Setup, Cleanup & Bookkeeping | Saleh Ahmad',
    description:
      'QuickBooks help from an accountant with 38 years of experience: QuickBooks Online setup, cleanup of messy files, QuickBooks bookkeeping and training. Serving small businesses in Texas and across the US online.',
    heading: 'QuickBooks help: set up, cleaned up and understood',
    intro:
      "QuickBooks is only useful when it's set up to match how your business actually runs. I set up new files, fix messy ones, and show you and your team how to use it with confidence.",
    included: [
      {
        title: 'Setup and customization',
        body: 'QuickBooks Online or Desktop set up with a chart of accounts, products and services, and sales tax settings that fit your business.',
      },
      {
        title: 'Catch-up and cleanup',
        body: 'Uncategorized transactions sorted, duplicates removed, accounts reconciled and opening balances corrected.',
      },
      {
        title: 'Bank feeds and rules',
        body: 'Bank and card accounts connected, with rules that categorize recurring transactions automatically and correctly.',
      },
      {
        title: 'Training',
        body: 'You and your team shown how to record sales, pay bills, run reports and keep the file clean, in plain language.',
      },
      {
        title: 'Point of Sale',
        body: 'Store sales from your point-of-sale system brought into QuickBooks correctly, so revenue, sales tax and inventory match.',
      },
    ],
    forWho: [
      'Businesses starting with QuickBooks for the first time',
      'Owners whose QuickBooks file has hundreds of transactions "for review"',
      'Teams who use QuickBooks every day but were never properly shown how',
      'Businesses on QuickBooks Online or Desktop, in Texas or anywhere online',
    ],
    faqs: [
      {
        q: 'QuickBooks Online or Desktop: which should I use?',
        a: "It depends on how your business works and what you already use. Most new small businesses choose QuickBooks Online. We'll go through the options for your situation on the intro call.",
      },
      {
        q: 'Can you fix a QuickBooks file someone else set up?',
        a: 'Yes. Cleaning up existing files is a large part of the work. Problems are fixed at the source, so they do not come back.',
      },
      {
        q: 'Is training done in person?',
        a: 'Training is done online over screen share, which works well because we work in your actual QuickBooks file.',
      },
      {
        q: 'Can you keep my QuickBooks up to date after the cleanup?',
        a: 'Yes. Many clients move from a cleanup straight into monthly bookkeeping, so the file stays clean.',
      },
    ],
    relatedPosts: ['catch-up-bookkeeping', 'texas-sales-tax-guide'],
  },
];
