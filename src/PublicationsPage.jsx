import { useEffect } from 'react';
import { ExternalLink, FullPublication, SiteHeader } from './siteComponents.jsx';
import { lastUpdated, profile, publications } from './siteData.js';

const publicationsByDate = [...publications].sort((left, right) => {
  const yearOrder = right.year.localeCompare(left.year);
  if (yearOrder) return yearOrder;
  const leftDate = left.preprintDate || `${left.year}-01-01`;
  const rightDate = right.preprintDate || `${right.year}-01-01`;
  return rightDate.localeCompare(leftDate);
});

export default function PublicationsPage() {
  useEffect(() => {
    // The initial fragment target becomes available after React renders the list.
    const paperId = window.location.hash.slice(1);
    if (!paperId) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(paperId)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <a className="skip-link" href="#publications-page-title">Skip to publications</a>
      <SiteHeader />

      <main className="publications-page">
        <section aria-labelledby="publications-page-title">
          <div className="publications-page-heading">
            <h1 id="publications-page-title">Full publications</h1>
            <ExternalLink href={profile.scholar}>Full list on Google Scholar</ExternalLink>
          </div>
          <p className="publications-page-intro">
            Published and accepted papers, preprints, and manuscripts, ordered by year.
          </p>
          <p className="publication-legend">* Equal contribution · † Project lead</p>
        </section>

        <section className="publications-page-list" aria-label={`${publicationsByDate.length} publications`}>
          {publicationsByDate.map(paper => <FullPublication paper={paper} key={paper.id} />)}
        </section>
      </main>

      <footer>
        <p>Last updated: {lastUpdated}</p>
      </footer>
    </>
  );
}
