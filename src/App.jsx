import { createElement, useEffect, useRef, useState } from 'react';
import { Github, GraduationCap, Mail, Twitter } from 'lucide-react';
import { profile, publicationVenueLabel, publications } from './siteData.js';
import { AuthorList, ExternalLink } from './siteComponents.jsx';

const news = [
  ['2026.08', <>PRTS ranked <strong>#4 overall</strong> among 13 evaluated policies on the <strong>RoboCasa365</strong> leaderboard as of August 21.</>],
  ['2026.07', <>KineBench was accepted to <strong>ECCV 2026</strong>. I served as co-first author and Project Lead.</>],
  ['2026.06', <>PRTS ranked <strong>#4</strong> on the <strong>MolmoSpaces All Combined</strong> leaderboard as of June 30.</>],
  ['2026.06', <>PRTS ranked <strong>#3</strong> on the <strong>MolmoSpaces Combined</strong> leaderboard as of June 1.</>],
  ['2026.06', <>PRTS was accepted to the <strong>SemRob</strong> and <strong>WCBM</strong> workshops at RSS 2026.</>],
  ['2026.01', <>Align-Then-stEer was accepted to <strong>ICLR 2026</strong>.</>],
  ['2025.12', <>TACO was selected as the #3 Paper of the Day on Hugging Face Daily Papers.</>],
  ['2025.05', <>DIMA was accepted to <strong>NeurIPS 2025</strong>.</>],
];

const selectedPublicationIds = ['prts', 'kinebench', 'ate', 'read', 'marie', 'dima', 'taco'];
const selectedPublications = selectedPublicationIds
  .map(id => publications.find(paper => paper.id === id))
  .filter(Boolean)
  .filter(paper => /(?:co-)?first author/i.test(paper.authorship))
  .sort((left, right) => {
    if (left.id === 'prts' && right.id === 'kinebench') return -1;
    if (left.id === 'kinebench' && right.id === 'prts') return 1;
    return right.preprintDate.localeCompare(left.preprintDate);
  });

const experience = [
  ['Sep 2024 - present', 'Top Talent Research Intern', 'TeleAI, China Telecom', 'Co-founded and co-lead the Rhodes Team on general-purpose robotic foundation models, from pre-training to efficient post-training.'],
  ['Nov 2024 - May 2025', 'Research Assistant Intern', 'Machine Intelligence Group, Washington University in St. Louis', 'Reframed multi-agent world modeling through a diffusion-inspired perspective for efficient embodied control.'],
  ['Sep 2023 - Sep 2024', 'Research Intern', 'Shanghai AI Laboratory', 'Built multi-agent world models and a principle-based feedback mechanism for grounding language models in embodied collaboration.'],
  ['Feb 2020 - Jul 2020', 'Student Researcher', 'iVision Group, Tsinghua University', 'Developed a closed-loop visual grasping system through the Students Research Training course.'],
];

function Publication({ paper }) {
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
        <div className="publication-links">
          {Object.entries(paper.links).map(([label, href]) => <ExternalLink href={href} key={label}>{label}</ExternalLink>)}
        </div>
      </div>
    </article>
  );
}

function VisitorWidget() {
  const containerRef = useRef(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let active = true;
    container.replaceChildren();

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://mapmyvisitors.com/map.js?d=402TLUQV8l9TGjp6PKvN7_bT87R4t-aPIWDx6-pueM4&cl=ffffff&w=a';
    script.async = true;

    const hasWidget = () => Boolean(container.querySelector('#mapmyvisitors-widget'));
    const observer = new MutationObserver(() => {
      if (active && hasWidget()) setStatus('ready');
    });

    observer.observe(container, { childList: true, subtree: true });
    script.onerror = () => { if (active) setStatus('error'); };
    container.appendChild(script);

    const timeout = window.setTimeout(() => {
      if (active && !hasWidget()) setStatus('error');
    }, 15000);

    return () => {
      active = false;
      observer.disconnect();
      window.clearTimeout(timeout);
      script.remove();
    };
  }, []);

  return (
    <div className="visitor-widget">
      <div ref={containerRef} className="visitor-map" aria-label="Visitor count and map" />
      {status === 'loading' && <p>Loading visitor count...</p>}
      {status === 'error' && <p>Visitor count is temporarily unavailable.</p>}
    </div>
  );
}

function ProfileLink({ href, icon, children, external = true }) {
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {createElement(icon, { size: 15, strokeWidth: 1.8, 'aria-hidden': true })}
      <span>{children}</span>
    </a>
  );
}

function SectionHeader({ title }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
    </div>
  );
}

export default function App() {
  return (
    <>
      <header className="site-header" id="top">
        <a className="site-name" href="/">Yang Zhang</a>
        <nav aria-label="Primary navigation">
          <a href="/#about">About</a>
          <a href="/publications/">Publications</a>
        </nav>
      </header>

      <main>
        <section className="intro" id="about">
          <aside className="profile-column">
            <img src="/profile.jpg" alt="Yang Zhang" />
            <div className="profile-links" aria-label="Profile links">
              <ProfileLink href={`mailto:${profile.email}`} icon={Mail} external={false}>{profile.email}</ProfileLink>
              <ProfileLink href={profile.scholar} icon={GraduationCap}>Google Scholar</ProfileLink>
              <ProfileLink href={profile.github} icon={Github}>GitHub</ProfileLink>
              <ProfileLink href={profile.twitter} icon={Twitter}>X / Twitter</ProfileLink>
            </div>
          </aside>

          <div className="intro-content">
            <p className="role">Ph.D. student in Automation at Tsinghua University</p>
            <h1>Yang Zhang</h1>
            <p className="bio">
              I am a Ph.D. student in Automation at Tsinghua University. During my Ph.D., I have been fortunate to work closely with{' '}
              <a href="https://baichenjia.cn/">Dr. Chenjia Bai</a> at{' '}
              <a href="https://www.teleai.com.cn/">TeleAI, China Telecom</a>, and with{' '}
              <a href="https://engineering.washu.edu/faculty/Chongjie-Zhang.html">Prof. Chongjie Zhang</a> at Washington University in St. Louis. At TeleAI, I co-founded and now co-lead the{' '}
              <a href="https://github.com/TeleHuman">Rhodes Team</a>, which focuses on general-purpose manipulation foundation models. Previously, I was a research intern at{' '}
              <a href="https://www.shlab.org.cn/">Shanghai AI Laboratory</a> and a (remote) research assistant with the{' '}
              <a href="https://mig-ai.github.io/">Machine Intelligence Group</a> at Washington University in St. Louis.
            </p>
            <p className="research-statement">
              My long-term goal is to pursue general physical intelligence by building general-purpose robot foundation
              models that endow embodied agents with generalizable, deliberative, and self-evolving decision-making in
              the open physical world. My research focuses on robotic foundation models, vision-language-action models,
              world models, robot learning, and reinforcement learning.
            </p>
            <p className="opportunity">
              I am considering industry and academic (postdoctoral) opportunities for 2027. Please feel free to contact me at{' '}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>.
            </p>

          </div>
        </section>

        <section className="page-section" id="news">
          <SectionHeader title="News" />
          <ul className="news-list">
            {news.map(([date, text], index) => (
              <li key={`${date}-${index}`}>
                <time dateTime={date.replace('.', '-')}>{date}</time>
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-section" id="publications">
          <SectionHeader title="Selected publications" />
          <p className="publication-legend">
            * Equal contribution · † Project lead
          </p>
          <div className="publication-list">
            {selectedPublications.map(paper => <Publication paper={paper} key={paper.title} />)}
          </div>
        </section>

        <section className="page-section" id="experience">
          <SectionHeader title="Experience" />
          <div className="experience-list">
            {experience.map(([date, role, place, description]) => (
              <article key={`${date}-${role}`}>
                <time>{date}</time>
                <div>
                  <h3>{role}</h3>
                  <p className="place">{place}</p>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <p>Last updated: August 2026</p>
        <VisitorWidget />
      </footer>
    </>
  );
}
