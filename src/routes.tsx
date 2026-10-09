import type { ReactNode } from 'react';
import { SITE_URL } from './data/site';
import { posts } from './lib/blog';
import { ogImagePath } from './lib/og';
import { servicePages, type ServicePage as Service } from './data/servicePages';
import HomePage from './pages/HomePage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import ServicePage from './pages/ServicePage';
import ZakatCalculatorPage from './pages/ZakatCalculatorPage';
import CalculatorsPage from './pages/CalculatorsPage';
import QuarterlyTaxCalculatorPage from './pages/QuarterlyTaxCalculatorPage';
import SCorpCalculatorPage from './pages/SCorpCalculatorPage';
import SalesTaxCalculatorPage from './pages/SalesTaxCalculatorPage';

// What goes in each page's <head>: title, description, canonical URL, social previews and structured data
export type Head = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  // For sitemap.xml; pages without one use the build date
  lastModified?: string;
  jsonLd?: object[];
  // Text for this page's generated social preview image (scripts/og.mjs)
  card?: { eyebrow: string; title: string };
};

export type Page = { element: ReactNode; head: Head };

const author = { '@id': `${SITE_URL}/#saleh` };

const home: Page = {
  element: <HomePage />,
  head: {
    title: 'Bookkeeping & Accounting Services for Small Business | Saleh Ahmad',
    description:
      'Bookkeeping services, accounting services, payroll and tax preparation for small business from Saleh Ahmad, a small business accountant with 38 years of experience. Based in Weatherford, Texas, working online across the US.',
    path: '/',
  },
};

const blogIndex: Page = {
  element: <BlogIndexPage />,
  head: {
    title: 'Blog | Bookkeeping, Payroll & Tax Guides for Texas Businesses | Saleh Ahmad',
    description:
      'Plain-English guides to bookkeeping, payroll, Texas taxes and QuickBooks for small business owners, from accountant Saleh Ahmad.',
    path: '/blog/',
    card: { eyebrow: 'Blog', title: 'Bookkeeping, payroll and tax, explained plainly' },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog/#blog`,
        url: `${SITE_URL}/blog/`,
        name: 'Saleh Ahmad Blog',
        author,
        publisher: { '@id': `${SITE_URL}/#business` },
        blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}/` })),
      },
    ],
  },
};

function postPage(post: (typeof posts)[number]): Page {
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return {
    element: <BlogPostPage post={post} />,
    head: {
      title: `${post.title} | Saleh Ahmad`,
      description: post.description,
      path: `/blog/${post.slug}/`,
      type: 'article',
      card: { eyebrow: post.category.name, title: post.title },
      lastModified: post.updated ?? post.date,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          '@id': `${url}#article`,
          headline: post.title,
          description: post.description,
          url,
          mainEntityOfPage: url,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          image: `${SITE_URL}${ogImagePath(`/blog/${post.slug}/`)}`,
          articleSection: post.category.name,
          inLanguage: 'en',
          author,
          publisher: { '@id': `${SITE_URL}/#business` },
          isPartOf: { '@id': `${SITE_URL}/blog/#blog` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        },
      ],
    },
  };
}

function servicePage(service: Service): Page {
  const url = `${SITE_URL}/${service.slug}/`;
  return {
    element: <ServicePage service={service} />,
    head: {
      title: service.seoTitle,
      description: service.description,
      path: `/${service.slug}/`,
      card: { eyebrow: 'Services', title: service.heading },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${url}#service`,
          name: service.name,
          serviceType: service.name,
          description: service.description,
          url,
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: [
            { '@type': 'State', name: 'Texas' },
            { '@type': 'Country', name: 'United States' },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: service.name, item: url },
          ],
        },
      ],
    },
  };
}

const zakatCalculator: Page = {
  element: <ZakatCalculatorPage />,
  head: {
    title: 'Zakat Calculator for Personal and Business Wealth | Saleh Ahmad',
    description:
      'Free zakat calculator for savings, gold, silver, investments and business assets. Uses live gold and silver prices to check the nisab and show the 2.5% zakat due. By Saleh Ahmad, Zakat Accounting Diploma, Kuwait Zakat House.',
    path: '/zakat-calculator/',
    card: { eyebrow: 'Free calculator', title: 'Zakat calculator for personal and business wealth' },
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${SITE_URL}/zakat-calculator/#app`,
        name: 'Zakat calculator',
        url: `${SITE_URL}/zakat-calculator/`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        author,
        publisher: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Zakat calculator', item: `${SITE_URL}/zakat-calculator/` },
        ],
      },
    ],
  },
};

// A calculator page: a free tool, with breadcrumbs back to /calculators/
function toolPage(element: ReactNode, path: string, name: string, title: string, description: string): Page {
  const url = `${SITE_URL}${path}`;
  return {
    element,
    head: {
      title,
      description,
      path,
      card: { eyebrow: 'Free calculator', title: name },
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': `${url}#app`,
          name,
          url,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          author,
          publisher: { '@id': `${SITE_URL}/#business` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${SITE_URL}/calculators/` },
            { '@type': 'ListItem', position: 3, name, item: url },
          ],
        },
      ],
    },
  };
}

const calculatorsHub: Page = {
  element: <CalculatorsPage />,
  head: {
    title: 'Free Calculators for Small Business Owners | Saleh Ahmad',
    description:
      'Free calculators for zakat, quarterly estimated taxes, LLC vs S corp savings and Texas sales tax, from accountant Saleh Ahmad.',
    path: '/calculators/',
    card: { eyebrow: 'Free tools', title: 'Free calculators for small business owners' },
  },
};

const quarterlyTax = toolPage(
  <QuarterlyTaxCalculatorPage />,
  '/quarterly-tax-calculator/',
  'Quarterly estimated tax calculator',
  'Quarterly Estimated Tax Calculator for 1099 Income (2026) | Saleh Ahmad',
  'Free 2026 quarterly estimated tax calculator for 1099 and self-employment income: self-employment tax, federal income tax, the four due dates and the safe harbor amount.'
);

const sCorpSavings = toolPage(
  <SCorpCalculatorPage />,
  '/s-corp-tax-calculator/',
  'LLC vs S corp tax savings calculator',
  'LLC vs S Corp Tax Savings Calculator | Saleh Ahmad',
  'Free calculator comparing self-employment tax as an LLC with payroll taxes on a reasonable salary as an S corp, after the extra costs of an S corp.'
);

const salesTax = toolPage(
  <SalesTaxCalculatorPage />,
  '/texas-sales-tax-calculator/',
  'Texas sales tax calculator',
  'Texas Sales Tax Calculator (6.25% + Local) | Saleh Ahmad',
  'Free Texas sales tax calculator: add tax to a price or find the tax in a total, at the 6.25% state rate plus up to 2% local tax.'
);

export const notFound: Page = {
  element: <NotFoundPage />,
  head: {
    title: 'Page not found | Saleh Ahmad',
    description: 'This page does not exist.',
    path: '/404',
    noindex: true,
  },
};

export const pages: Page[] = [home, ...servicePages.map(servicePage), calculatorsHub, zakatCalculator, quarterlyTax, sCorpSavings, salesTax, blogIndex, ...posts.map(postPage)];

export function resolve(pathname: string): Page {
  // Every page lives at an address ending in a slash (/blog/), matching how the host serves folders
  const path = pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return pages.find((page) => page.head.path === path) ?? notFound;
}
