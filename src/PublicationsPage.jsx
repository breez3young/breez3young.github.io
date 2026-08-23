import { ExternalLink, FullPublication } from './siteComponents.jsx';
import { profile, publications } from './siteData.js';

const publicationsByDate = publications
  .filter(paper => !(
    /^corl$/i.test(paper.venue)
    && /under review/i.test(paper.status)
    && !paper.links.Paper
  ))
  .sort((left, right) => {
    const leftDate = left.preprintDate || `${left.year}-01-01`;
    const rightDate = right.preprintDate || `${right.year}-01-01`;
    return rightDate.localeCompare(leftDate);
  });

export default function PublicationsPage() {
  return (
    <>
      <header className="site-header" id="top">
        <a className="site-name" href="/">Yang Zhang</a>
        <nav aria-label="Publications navigation">
          <a href="/#about">About</a>
          <a href="/publications/">Publications</a>
        </nav>
      </header>

      <main className="publications-page">
        <section aria-labelledby="publications-page-title">
          <div className="publications-page-heading">
            <h1 id="publications-page-title">Full publications</h1>
            <ExternalLink href={profile.scholar}>Full list on Google Scholar</ExternalLink>
          </div>
          <p className="publications-page-intro">
            Peer-reviewed publications and current preprints, ordered from newest to oldest.
          </p>
          <p className="publication-legend">* Equal contribution · † Project lead</p>
        </section>

        <section className="publications-page-list" aria-label={`${publicationsByDate.length} publications`}>
          {publicationsByDate.map(paper => <FullPublication paper={paper} key={paper.id} />)}
        </section>
      </main>

      <footer>
        <p>Last updated: August 2026</p>
      </footer>
    </>
  );
}
