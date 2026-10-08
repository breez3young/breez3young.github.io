import { useEffect, useState } from 'react';
import { publicationVenueLabel } from './siteData.js';

export function SiteHeader({ home = false }) {
  const [compact, setCompact] = useState(!home);

  useEffect(() => {
    if (!home) return undefined;
    const hero = document.querySelector('.home-hero');
    if (!hero) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      setCompact(!entry.isIntersecting);
    }, { rootMargin: '-160px 0px 0px 0px', threshold: 0 });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [home]);

  return (
    <div className={`site-masthead${compact ? ' is-compact' : ''}${home ? ' on-home' : ''}`}>
      <header className="site-header art-header">
        <a className="site-name" href={home ? '#top' : '/'} aria-label="Yang Zhang, home">YZ<span aria-hidden="true">.</span></a>
        <nav aria-label="Primary navigation">
          <a href={home ? '#about' : '/#about'}>About</a>
          <a href={home ? '#news' : '/#news'}>News</a>
          <a href="/publications/" aria-current={home ? undefined : 'page'}>Publications</a>
          <a href={home ? '#experience' : '/#experience'}>Experience</a>
        </nav>
      </header>
    </div>
  );
}

export function ExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export function AuthorList({ children }) {
  const parts = children.split('Yang Zhang');
  return parts.map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && <strong>Yang Zhang</strong>}
      {part}
    </span>
  ));
}

export function PublicationVenue({ paper }) {
  return (
    <div className="publication-venue">
      <span>{publicationVenueLabel(paper)}</span>
      <span className="publication-year">{paper.year}</span>
      {paper.status === 'Spotlight' && <span className="publication-distinction">Spotlight</span>}
    </div>
  );
}

export function FullPublication({ paper }) {
  return (
    <article className="publication" id={paper.id}>
      <div className="publication-sidebar">
        <PublicationVenue paper={paper} />
      </div>
      <div className="publication-content">
        <h3>{paper.title}</h3>
        <p className="authors"><AuthorList>{paper.authors}</AuthorList></p>
        <ul className="publication-tags" aria-label="Research topics">
          {paper.tags?.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
        <p className="publication-note"><span className="tldr-label">TL;DR</span> {paper.note}</p>
        {Object.keys(paper.links).length > 0 && (
          <div className="publication-links">
            {Object.entries(paper.links).map(([label, href]) => <ExternalLink href={href} key={label}>{label}</ExternalLink>)}
          </div>
        )}
      </div>
    </article>
  );
}
