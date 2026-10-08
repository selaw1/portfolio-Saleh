import type { ReactNode } from 'react';
import { SITE_URL } from './data/site';
import { posts } from './lib/blog';
import { servicePages, type ServicePage as Service } from './data/servicePages';
import HomePage from './pages/HomePage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import NotFoundPage from './pages/NotFoundPage';
import ServicePage from './pages/ServicePage';

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
          image: `${SITE_URL}/og-image.png`,
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

export const notFound: Page = {
  element: <NotFoundPage />,
  head: {
    title: 'Page not found | Saleh Ahmad',
    description: 'This page does not exist.',
    path: '/404',
    noindex: true,
  },
};

export const pages: Page[] = [home, ...servicePages.map(servicePage), blogIndex, ...posts.map(postPage)];

export function resolve(pathname: string): Page {
  // Every page lives at an address ending in a slash (/blog/), matching how the host serves folders
  const path = pathname.replace(/index\.html$/, '').replace(/\/?$/, '/');
  return pages.find((page) => page.head.path === path) ?? notFound;
}
