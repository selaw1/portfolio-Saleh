import PageHeader from '../components/PageHeader';

export default function NotFoundPage() {
  return (
    <PageHeader eyebrow="Page not found" title="This page doesn't exist.">
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a href="/" className="pill-light">
          Go to the homepage
        </a>
        <a href="/blog" className="pill-ghost">
          Read the blog
        </a>
      </div>
    </PageHeader>
  );
}
