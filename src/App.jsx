import { createElement, useEffect, useRef, useState } from 'react';
import { Github, GraduationCap, Mail, Twitter } from 'lucide-react';
import { lastUpdated, profile, publications } from './siteData.js';
import { ExternalLink, FullPublication, SiteHeader } from './siteComponents.jsx';

const news = [
  ['2026.09', <>We release <ExternalLink href="https://arxiv.org/abs/2609.37250">V-JEPA Policy</ExternalLink>, an effective world-action model directly learned from scratch on predictive visual latents. <ExternalLink href="https://github.com/breez3young/VJEPA-Policy">Code is available.</ExternalLink></>],
  ['2026.09', <>Two papers have been accepted to <strong>CoRL 2026</strong>: <ExternalLink href="https://rhodes-team-prts.github.io/">
PRTS: A Primitive Reasoning and Tasking System via Contrastive Representations</ExternalLink> and <a href="/publications/#gr-bc">
Graph-Reweighted Behavior Cloning with Human Interventions for Precise Robotic Manipulation</a>. <ExternalLink href="https://rhodes-team-prts.github.io/">PRTS</ExternalLink> was selected for a <strong>Spotlight presentation</strong>!</>],
  ['2026.08', <><ExternalLink href="https://rhodes-team-prts.github.io/">PRTS</ExternalLink> ranked <strong>#4 overall</strong> and <strong>#2 on Composite-Unseen tasks</strong> on the <strong>RoboCasa365</strong> leaderboard as of August 21, with success rates of 39.6% and 18.8%, respectively.</>],
  ['2026.07', <>Our <ExternalLink href="https://arxiv.org/abs/2607.19876">KineBench: Benchmarking Embodied World Models via IDM-Free Kinematic Grounding</ExternalLink> paper has been accepted to <strong>ECCV 2026</strong>!</>],
  ['2026.06', <><ExternalLink href="https://rhodes-team-prts.github.io/">PRTS</ExternalLink> ranked <strong>#4</strong> on the <strong>MolmoSpaces All Combined</strong> leaderboard as of June 30.</>],
  ['2026.06', <><ExternalLink href="https://rhodes-team-prts.github.io/">PRTS</ExternalLink> ranked <strong>#3</strong> on the <strong>MolmoSpaces Combined</strong> leaderboard as of June 1.</>],
  ['2026.06', <>Our <ExternalLink href="https://rhodes-team-prts.github.io/">PRTS</ExternalLink> paper has been accepted to the <strong>SemRob</strong> and <strong>WCBM</strong> workshops at <strong>RSS 2026</strong>!</>],
  ['2026.01', <>Our <ExternalLink href="https://align-then-steer.github.io/">Align-Then-stEer: Adapting the Vision-Language-Action Models through Unified Latent Guidance</ExternalLink> paper has been accepted to <strong>ICLR 2026</strong>!</>],
  ['2025.12', <><ExternalLink href="https://vla-anti-exploration.github.io/">TACO</ExternalLink> was selected as the #3 Paper of the Day on Hugging Face Daily Papers.</>],
  ['2025.09', <>Our <ExternalLink href="https://arxiv.org/abs/2505.20922">Revisiting Multi-Agent World Modeling from a Diffusion-Inspired Perspective</ExternalLink> paper has been accepted to <strong>NeurIPS 2025</strong>!</>],
];

const selectedPublicationIds = ['prts', 'vjepa-policy', 'ate', 'kinebench', 'taco', 'dima', 'read', 'marie'];
const selectedPublications = selectedPublicationIds
  .map(id => publications.find(paper => paper.id === id))
  .filter(Boolean)
  .filter(paper => /(?:co-)?first author/i.test(paper.authorship));

const experience = [
  ['Sep 2024 - present', 'Top Talent Research Intern', 'TeleAI, China Telecom', 'Co-founded and co-lead the Rhodes Team on general-purpose robotic foundation models, from pre-training to efficient post-training.'],
  ['Nov 2024 - May 2025', 'Research Assistant Intern', 'Machine Intelligence Group, Washington University in St. Louis', 'Reframed multi-agent world modeling through a diffusion-inspired perspective for efficient embodied control.'],
  ['Sep 2023 - Sep 2024', 'Research Intern', 'Shanghai AI Laboratory', 'Built multi-agent world models and a principle-based feedback mechanism for grounding language models in embodied collaboration.'],
  ['Feb 2020 - Jul 2020', 'Student Researcher', 'iVision Group, Tsinghua University', 'Developed a closed-loop visual grasping system through the Students Research Training course.'],
];

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
    script.id = 'mapmyvisitors';
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

function SectionHeader({ title, children }) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function HomeHero() {
  return (
    <>
      <a className="skip-link" href="#about">Skip to about</a>
      <SiteHeader home />
      <section className="home-hero" id="top" aria-labelledby="hero-title">
        <figure className="hero-figure">
          <div className="hero-stage">
            <picture className="hero-artwork">
              <source
                type="image/webp"
                srcSet="/images/school-of-embodiment-960.webp 960w, /images/school-of-embodiment.webp 1774w"
                sizes="100vw"
              />
              <img
                src="/images/school-of-embodiment.png"
                width="1774"
                height="887"
                alt="The School of Embodiment: robed robots gather in a Renaissance hall; a group on the right carefully studies how to grasp an orange."
                fetchPriority="high"
              />
            </picture>



            <div className="hero-copy">
              <h1 id="hero-title">Yang Zhang</h1>
              <p>World models · Robot learning · <span>Physical intelligence</span></p>
            </div>
          </div>
        </figure>
      </section>
    </>
  );
}

export default function App() {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    if (!sectionId) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <HomeHero />

      <main>
        <section className="intro" id="about" aria-labelledby="about-title">
          <aside className="profile-column">
            <img src="/profile.jpg" alt="Yang Zhang" loading="lazy" width="210" height="245" />
            <div className="profile-links" aria-label="Profile links">
              <ProfileLink href={`mailto:${profile.email}`} icon={Mail} external={false}>{profile.email}</ProfileLink>
              <ProfileLink href={profile.scholar} icon={GraduationCap}>Google Scholar</ProfileLink>
              <ProfileLink href={profile.github} icon={Github}>GitHub</ProfileLink>
              <ProfileLink href={profile.twitter} icon={Twitter}>X / Twitter</ProfileLink>
            </div>
          </aside>

          <div className="intro-content">
            <h2 className="about-title" id="about-title">About me</h2>
            <p className="bio">
              I am a Ph.D. Candidate in Automation at Tsinghua University. During my Ph.D., I have been fortunate to work closely with{' '}
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
          <SectionHeader title="Featured publications">
            <a href="/publications/">Full publication list →</a>
          </SectionHeader>
          <p className="publication-legend">
            * Equal contribution · † Project lead
          </p>
          <div className="publication-list">
            {selectedPublications.map(paper => <FullPublication paper={paper} key={paper.id} />)}
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
        <p>Last updated: {lastUpdated}</p>
        <VisitorWidget />
      </footer>
    </>
  );
}
