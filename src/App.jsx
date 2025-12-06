import React, { useState, useEffect } from 'react';
import { Mail, Github, FileText, Moon, Sun, Award, Briefcase, GraduationCap, BookOpen, Flame, MapPin, Twitter, Compass } from 'lucide-react';

// --- DATA SOURCE ---

const PROFILE = {
  name: "Yang Zhang",
  titleAndDept: "Ph.D. Student", 
  university: "Tsinghua University",
  emailDisplay: "breezeyoung9470 (at) gmail.com", 
  emailLink: "breezeyoung9470@gmail.com",
  github: "https://github.com/breez3young",
  scholar: "https://scholar.google.com/citations?user=2NxmmZwAAAAJ&hl",
  twitter: "https://x.com/yang_zhang_",
  bio: "I am a Ph.D. student in Automation at Tsinghua University. I received my Bachelor's degree in Automation at Tsinghua University in June 2021. Currently, I am working closely with Dr. Chenjia Bai as an intern at Embodied AI Center at TeleAI. My research aims to develop a general world model that empowers agents with intelligent, generalizable, and interpretable decision-making capabilities.",
};

const RESEARCH_INTERESTS = [
  "Robotic Foundation Models",
  "World Models",
  "Generative Modeling",
  "Multi-Agent Systems",
  "Reinforcement Learning"
];

const EDUCATION = [
  {
    school: "Tsinghua University",
    degree: "Ph.D. in Automation",
    date: "Sep 2021 - Present",
    location: "Beijing, China"
  },
  {
    school: "Tsinghua University",
    degree: "B.E. in Automation",
    date: "Aug 2017 - June 2021",
    location: "Beijing, China"
  }
];

const NEWS = [
  { date: "Oct. 2025", content: "Blank" },
];

const EXPERIENCE = [
  {
    role: "Top Talent Intern (Foundation Models in Robotic Manipulation)",
    company: "Institute of Artificial Intelligence (TeleAI)",
    date: "Dec 2025 - Present",
    mentor: "Dr. Chenjia Bai",
    desc: "Co-lead the Rhodes Team. Focusing on pioneering topics on Vision-Language-Action models, covering pre-training (PRTS) to efficient post-training (ATE)."
  },
  {
    role: "Regular Research Intern (Foundation Models in Robotic Manipulation)",
    company: "Institute of Artificial Intelligence (TeleAI)",
    date: "Sep 2024 - Nov 2025",
    mentor: "Dr. Chenjia Bai",
    desc: "Co-founded and co-lead the Rhodes Team. Focusing on pioneering topics on Vision-Language-Action models, covering pre-training (PRTS) to efficient post-training (ATE)."
  },
  {
    role: "Regular Research Intern (Multi-Agent World Modeling)",
    company: "Shanghai AI Laboratory",
    date: "Sep 2023 - Sep 2024",
    mentor: "Dr. Chenjia Bai",
    desc: "Built the first Transformer-based multi-agent world model (MARIE) and proposed a principle feedback mechanism (ReAd) for grounding LLMs. Highlighted in MIT Technology Review."
  },
  {
    role: "Undergraduate Research Assistant",
    company: "iVision Group, Tsinghua University",
    date: "Feb 2020 - Jul 2020",
    mentor: "Prof. Jiwen Lu",
    desc: "Developed a closed-loop visual grasping system based on Deep Learning. Achieved full grade (4.0) in SRT course."
  }
];

const PUBLICATIONS = [
  {
    title: "Steering Vision-Language-Action Models as Anti-Exploration: A Test-Time Scaling Approach",
    authors: ["Siyuan Yang*", "Yang Zhang*†", "Haoran He", "Ling Pan", "Xiu Li", "Chenjia Bai"],
    venue: "arXiv Preprint",
    year: "2025",
    tags: ["Under Review", "#3 Paper on Huggingface Daily"],
    tldr: "We introduce TACO, a training-free test-time scaling framework improving VLA models via Anti-Exploration principles.",
    links: { paper: null, code: null }
  },
  {
    title: "Align-Then-stEer: Adapting the Vision-Language Action Models through Unified Latent Guidance",
    authors: ["Yang Zhang*", "Chenwei Wang*", "Ouyang Lu*", "Chi Zhang", "Chenjia Bai", "Xuelong Li"],
    venue: "arXiv Preprint",
    year: "2025",
    tags: ["Under Review"],
    tldr: "A method using unified latent space and guidance mechanism to efficiently adapt pre-trained VLA models to new robots.",
    links: { paper: null, code: null }
  },
  {
    title: "Enhancing Dexterous Diffusion Policy with Predictive 3D Representations",
    authors: ["Siyuan Yang", "Yang Zhang", "Chenwei Wang", "Ouyang Lu", "Chi Zhang", "Chenjia Bai", "Xuelong Li"],
    venue: "IEEE Transactions on Cybernetics",
    year: "2025",
    tags: ["Under Review"],
    tldr: "DP3R: A novel framework leveraging predictive latent representation to improve long-horizon action generation.",
    links: { paper: null, code: null }
  },
  {
    title: "Revisiting Multi-Agent World Modeling from a Diffusion-Inspired Perspective",
    authors: ["Yang Zhang", "Xinran Li", "Jianing Ye", "Delin Qu", "Chongjie Zhang", "Xiu Li", "Chenjia Bai"],
    venue: "NeurIPS 2025",
    year: "2025",
    tags: ["Conference"],
    tldr: "Introducing DIMA, a sample-efficient Diffusion-Inspired Multi-Agent world model for control environments.",
    links: { paper: null, code: null }
  },
  {
    title: "Pre-Trained Video Generative Models as World Simulators",
    authors: ["Haoran He", "Yang Zhang", "Liang Lin", "Zhongwen Xu", "Ling Pan"],
    venue: "AAAI 2026",
    year: "2026",
    tags: ["Conference"],
    tldr: "Dynamic World Simulation (DWS) transforms video generative models into controllable world simulators.",
    links: { paper: null, code: null }
  },
  {
    title: "Online Preference Alignment for Language Models via Count-based Exploration",
    authors: ["Chenjia Bai", "Yang Zhang", "Shuang Qiu", "Qiaosheng Zhang", "Kang Xu", "Xuelong Li"],
    venue: "ICLR 2025",
    year: "2025",
    tags: ["Spotlight"],
    tldr: "Proposed count-based online preference optimization for LLM alignment using coin-flip counting.",
    links: { paper: null, code: null }
  },
  {
    title: "Task-agnostic Pre-training and Task-guided Fine-tuning for Versatile Diffusion Planner",
    authors: ["Chenyou Fan", "Chenjia Bai", "Zhao Shan", "Haoran He", "Yang Zhang", "Zhen Wang"],
    venue: "ICML 2025",
    year: "2025",
    tags: ["Conference"],
    tldr: "A framework for multi-agent collaboration introducing Reinforced Advantage feedback (ReAd).",
    links: { paper: null, code: null }
  },
  {
    title: "Online Iterative Self-Alignment for Radiology Report Generation",
    authors: ["Ting Xiao", "Lei Shi", "Yang Zhang", "HaoFeng Yang", "Zhe Wang", "Chenjia Bai"],
    venue: "ACL 2025",
    year: "2025",
    tags: ["Conference"],
    tldr: "Online iterative self-alignment method for radiology report generation aligned with multiple objectives.",
    links: { paper: null, code: null }
  },
  {
    title: "Towards Efficient LLM Grounding for Embodied Multi-Agent Collaboration",
    authors: ["Yang Zhang*†", "Shixin Yang*", "Chenjia Bai", "Fei Wu", "Xiu Li", "Zhen Wang", "Xuelong Li"],
    venue: "ACL 2025",
    year: "2025",
    tags: ["Conference"],
    tldr: "Novel framework for multi-agent collaboration introducing Reinforced Advantage feedback.",
    links: { paper: null, code: null }
  },
  {
    title: "Decentralized Transformers with Centralized Aggregation are Sample-Efficient Multi-Agent World Models",
    authors: ["Yang Zhang", "Chenjia Bai", "Bin Zhao", "Junchi Yan", "Xiu Li", "Xuelong Li"],
    venue: "TMLR 2025",
    year: "2025",
    tags: ["Journal"],
    tldr: "First Transformer backbone-based multi-agent world model for sample-efficient policy learning.",
    links: { paper: null, code: null }
  },
  {
    title: "Contrastive representation for data filtering in cross-domain offline reinforcement learning",
    authors: ["Xiaoyu Wen", "Chenjia Bai", "Kang Xu", "Xudong Yu", "Yang Zhang", "Xuelong Li", "Zhen Wang"],
    venue: "ICML 2024",
    year: "2024",
    tags: ["Conference"],
    tldr: "Measuring dynamics gap based on contrastive representation for cross-domain offline RL.",
    links: { paper: null, code: null }
  },
  {
    title: "Multi-agent Exploration with Sub-state Entropy Estimation",
    authors: ["Jian Tao", "Yangkun Chen", "Yang Zhang", "Kai Yang", "Xiu Li"],
    venue: "IJCNN 2024",
    year: "2024",
    tags: ["Conference"],
    tldr: "Plug-and-play intrinsic motivation module for collaborative exploration.",
    links: { paper: null, code: null }
  }
];

const AWARDS = [
  { year: "2021", title: "Science and Technology Innovation Excellence Award", issuer: "Tsinghua University" },
  { year: "2018", title: "HAGE Scholarship", issuer: "Department of Automation, Tsinghua University" },
  { year: "2017", title: "Yuantian Zhang Scholarship", issuer: "Guangxi Province" }
];

const SERVICE = [
  { date: "2025 - present", role: "Reviewer in CVPR, NeurIPS" },
  { date: "2024 - present", role: "Reviewer in ICLR" },
  { date: "Fall, 2022", role: "Teaching Assistant @ Machine Learning", desc: "Department of Automation, Tsinghua University" },
];


// --- COMPONENTS ---

// Visitor Widget (MapMyVisitors)
const VisitorWidget = () => {
    useEffect(() => {
        // Check if script already exists to prevent duplicate loading
        if (document.getElementById('mapmyvisitors')) return;

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.id = 'mapmyvisitors';
        // Your specific script URL
        script.src = '//mapmyvisitors.com/map.js?d=402TLUQV8l9TGjp6PKvN7_bT87R4t-aPIWDx6-pueM4&cl=ffffff&w=a';
        script.async = true; 

        const container = document.getElementById('map-container');
        if (container) {
            container.appendChild(script);
        }
    }, []);

    return (
        // Container for the map
        <div id="map-container" className="flex justify-center items-center my-4 max-w-[200px] mx-auto min-h-[50px] overflow-hidden">
            {/* The script will inject the map here */}
        </div>
    );
};

// Modified Badge Component to accept className for custom sizing
const Badge = ({ children, type = "default", className = "" }) => {
  const styles = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    spotlight: "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
    highlight: "bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    // Special style for Research Interest Tags
    tag: "bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
  };

  let selectedStyle = styles.default;
  if (type === "tag") selectedStyle = styles.tag;
  else if (children.toLowerCase().includes("spotlight")) selectedStyle = styles.spotlight;
  else if (children.toLowerCase().includes("#3")) selectedStyle = styles.highlight;
  
  // Default size is text-xs unless overridden in className
  const defaultSize = className.includes('text-') ? '' : 'text-xs';

  return (
    <span className={`px-2 py-0.5 rounded font-medium ${type === "tag" ? "px-3 py-1 rounded-full" : "mr-2"} ${selectedStyle} ${defaultSize} ${className}`}>
      {children}
    </span>
  );
};

const PaperCard = ({ paper }) => {
  // --- New Helper to render author name with proper superscript ---
  const renderAuthorName = (authorString) => {
    // Regex matches text followed by * or † at the end
    const match = authorString.match(/^(.+?)([*†]+)$/);
    if (match) {
        return (
            <>
                {match[1]}<sup className="ml-0.5">{match[2]}</sup>
            </>
        );
    }
    return authorString;
  };

  return (
    <div className="mb-6 group">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {paper.title}
        </h3>
        
        {/* Links: Paper & Code */}
        <div className="flex gap-2 mt-2 sm:mt-0 shrink-0">
          {paper.links?.paper && (
            <a href={paper.links.paper} className="text-xs font-medium px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors">
              [Paper]
            </a>
          )}
          {paper.links?.code && (
            <a href={paper.links.code} className="text-xs font-medium px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors">
              [Code]
            </a>
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {paper.authors.map((author, idx) => (
          <span key={idx} className={author.includes("Yang Zhang") ? "font-bold text-gray-900 dark:text-white" : ""}>
            {/* Call the new helper here */}
            {renderAuthorName(author)}
            {idx < paper.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-sm font-medium italic text-gray-800 dark:text-gray-200">
          {paper.venue}
        </span>
        {paper.tags.map((tag, idx) => (
          <Badge key={idx}>{tag}</Badge>
        ))}
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 pl-3 border-l-2 border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-xs uppercase tracking-wider text-gray-400 mr-2">TL;DR</span>
        {paper.tldr}
      </div>
    </div>
  );
};

const SectionTitle = ({ icon: Icon, title }) => (
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
    {title}
  </h2>
);

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950' : 'bg-gray-50'}`}>
      
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-10 space-y-8">
              
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800 text-center lg:text-left">
                <div className="w-32 h-32 mx-auto lg:mx-0 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 mb-6 overflow-hidden flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-md">
                   <img src="profile.jpg" alt="Yang Zhang" className="w-full h-full object-cover" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  {PROFILE.name}
                </h1>
                
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <p className="font-medium">
                    {PROFILE.titleAndDept}
                    </p>
                    <p className="font-medium">
                    {PROFILE.university}
                    </p>
                    <p className="font-mono text-gray-500 pt-1">
                    {PROFILE.emailDisplay}
                    </p>
                </div>

                <div className="flex justify-center lg:justify-start gap-3 mt-6">
                  <a href={`mailto:${PROFILE.emailLink}`} className="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href={PROFILE.github} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={PROFILE.scholar} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </a>
                  <a href={PROFILE.twitter} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-blue-400 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">Education</h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx}>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">{edu.school}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{edu.degree}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{edu.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-12">
            
            {/* About Me */}
            <section>
              <SectionTitle icon={FileText} title="About Me" />
              
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-md">
                <p className="text-red-700 dark:text-red-300 font-medium text-sm sm:text-base">
                  I am actively seeking visiting student or research intern positions starting in <span className="font-bold">May 2026 or later</span>, with a strong aspiration to contribute to industry-leading companies such as <span className="font-bold">Google, Meta, or NVIDIA</span>. I am deeply motivated to engage in cutting-edge research in these environments. Please feel free to reach out.
                </p>
              </div>

              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{PROFILE.bio}</p>
              </div>
            </section>
            
            {/* Research Interests (Separate Section with Icon) */}
             <section>
                <SectionTitle icon={Compass} title="Research Interests" />
                <div className="flex flex-wrap gap-3">
                    {RESEARCH_INTERESTS.map((interest, idx) => (
                        <Badge key={idx} type="tag" className="text-base">{interest}</Badge>
                    ))}
                </div>
            </section>

            {/* News Section */}
            <section>
              <SectionTitle icon={Flame} title="News" />
              <div className="space-y-4">
                {NEWS.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="font-bold text-gray-800 dark:text-gray-200 w-24 shrink-0 whitespace-nowrap">
                      [{item.date}]
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.content}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800">
                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Publications
                 </h2>
                 <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    * Equal Contribution, † Project Lead
                 </span>
              </div>
              
              <div className="space-y-2">
                {PUBLICATIONS.map((paper, idx) => (
                  <PaperCard key={idx} paper={paper} />
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <SectionTitle icon={Briefcase} title="Research Experience" />
              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-10">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className="relative pl-8">
                    {/* Timeline Dot */}
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500"></span>
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">{exp.date}</span>
                    </div>
                    <div className="text-md font-medium text-gray-700 dark:text-gray-300 mb-1">{exp.company}</div>
                    {exp.mentor && <div className="text-sm text-gray-500 mb-2">Mentor: {exp.mentor}</div>}
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Honors & Service (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <section>
                    <SectionTitle icon={Award} title="Honors & Awards" />
                    <ul className="space-y-4">
                        {AWARDS.map((award, idx) => (
                            <li key={idx} className="flex gap-3 items-start">
                                <span className="font-mono text-sm text-blue-600 dark:text-blue-400 mt-0.5">{award.year}</span>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{award.title}</div>
                                    <div className="text-xs text-gray-500">{award.issuer}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section>
                    <SectionTitle icon={GraduationCap} title="Academic Service" />
                    <ul className="space-y-4">
                        {SERVICE.map((item, idx) => (
                            <li key={idx} className="flex gap-3 items-start">
                                <span className="font-mono text-sm text-blue-600 dark:text-blue-400 mt-0.5 w-20 shrink-0">{item.date}</span>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white text-sm">{item.role}</div>
                                    <div className="text-xs text-gray-500">{item.desc}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

            </div>

            {/* Footer with Visitor Widget */}
            <footer className="pt-10 mt-10 border-t border-gray-200 dark:border-gray-800 text-center">
                
                {/* Specific MapMyVisitors Widget */}
                <VisitorWidget />

                <div className="text-sm text-gray-500 pb-8">
                    <p>&copy; {new Date().getFullYear()} Yang Zhang. Last updated: December 2025.</p>
                    <p className="mt-1">Designed with React & Tailwind CSS.</p>
                </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
}