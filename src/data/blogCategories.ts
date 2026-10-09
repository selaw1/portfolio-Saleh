// Blog categories, in the order they appear on the blog page. Each post names one
// in its front matter (category: payroll). Each category links to its service page.

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
  // Service page this category's posts relate to
  service: { name: string; href: string };
};

export const blogCategories: BlogCategory[] = [
  {
    slug: 'accounting-setup',
    name: 'Accounting setup',
    description: 'Setting up business banking, software, a chart of accounts and a routine that keeps the books clean.',
    service: { name: 'Accounting system setup', href: '/accounting-system-setup/' },
  },
  {
    slug: 'bookkeeping',
    name: 'Bookkeeping',
    description: 'What bookkeeping costs, when to outsource it, and how to catch up when you fall behind.',
    service: { name: 'Bookkeeping services', href: '/bookkeeping/' },
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    description: 'Choosing a pay schedule and following the Texas Payday Law.',
    service: { name: 'Payroll services', href: '/payroll/' },
  },
  {
    slug: 'texas-taxes',
    name: 'Small business taxes',
    description: 'Texas franchise tax and sales tax, federal estimated taxes, deadlines and penalties for small businesses.',
    service: { name: 'Tax preparation and planning', href: '/tax-preparation/' },
  },
  {
    slug: 'quickbooks',
    name: 'QuickBooks',
    description: 'Step-by-step guides to tasks in QuickBooks Online, such as filing 1099s.',
    service: { name: 'QuickBooks services', href: '/quickbooks/' },
  },
];
