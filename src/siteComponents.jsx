import { publicationVenueLabel } from './siteData.js';

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

export function FullPublication({ paper }) {
  return (
    <article className="publication">
      <div className="publication-venue">
        <span>{publicationVenueLabel(paper)}</span>
        <span>{paper.year}</span>
      </div>
      <div className="publication-content">
        <h3>{paper.title}</h3>
        <p className="authors"><AuthorList>{paper.authors}</AuthorList></p>
        <p className="publication-note">{paper.note}</p>
        {Object.keys(paper.links).length > 0 && (
          <div className="publication-links">
            {Object.entries(paper.links).map(([label, href]) => <ExternalLink href={href} key={label}>{label}</ExternalLink>)}
          </div>
        )}
      </div>
    </article>
  );
}
