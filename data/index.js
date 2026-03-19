export const TECHS = [
  { name: 'n8n',              icon: 'fa-solid fa-sitemap' },
  { name: 'Agentic AI',       icon: 'fa-solid fa-robot' },
  { name: 'MCP Server',       icon: 'fa-solid fa-server' },
  { name: 'Jira',             icon: 'fa-brands fa-atlassian' },
  { name: 'Python',           icon: 'fa-brands fa-python' },
  { name: 'Postman',          icon: 'fa-solid fa-flask' },
  { name: 'React.JS',         icon: 'fa-brands fa-react' },
  { name: 'Redux',            icon: 'fa-solid fa-layer-group' },
  { name: 'LangChain',        icon: 'fa-solid fa-link' },
  { name: 'LangGraph',        icon: 'fa-solid fa-diagram-project' },
  { name: 'FastAPI',          icon: 'fa-solid fa-bolt' },
  { name: 'LLM',              icon: 'fa-solid fa-microchip' },
  { name: 'Artificial Intelligence', icon: 'fa-solid fa-brain' },
  { name: 'SQL',              icon: 'fa-solid fa-database' },
  { name: 'OOPS',             icon: 'fa-solid fa-cubes' },
  { name: 'SDLC',             icon: 'fa-solid fa-arrows-spin' },
  { name: 'GitHub',           icon: 'fa-brands fa-github' },
  { name: 'C++',              icon: 'fa-solid fa-code' },
];

export const STACK_CATEGORIES = [
  {
    id: 'ai', label: 'AI & LLM', icon: 'fa-solid fa-brain', color: 'purple',
    chips: [
      { icon: 'fa-solid fa-robot',             label: 'Agentic AI' },
      { icon: 'fa-solid fa-link',              label: 'LangChain' },
      { icon: 'fa-solid fa-diagram-project',   label: 'LangGraph' },
      { icon: 'fa-solid fa-microchip',         label: 'LLM' },
      { icon: 'fa-solid fa-server',            label: 'MCP Server' },
      { icon: 'fa-solid fa-wand-magic-sparkles', label: 'AI' },
    ],
  },
  {
    id: 'backend', label: 'Backend', icon: 'fa-solid fa-server', color: 'blue',
    chips: [
      { icon: 'fa-brands fa-python',  label: 'Python' },
      { icon: 'fa-solid fa-bolt',     label: 'FastAPI' },
      { icon: 'fa-solid fa-database', label: 'SQL' },
      { icon: 'fa-solid fa-cubes',    label: 'OOPS' },
      { icon: 'fa-solid fa-code',     label: 'C++' },
      { icon: 'fa-solid fa-plug',     label: 'REST APIs' },
    ],
  },
  {
    id: 'frontend', label: 'Frontend', icon: 'fa-solid fa-palette', color: 'red',
    chips: [
      { icon: 'fa-brands fa-react',         label: 'React.JS' },
      { icon: 'fa-solid fa-layer-group',    label: 'Redux' },
      { icon: 'fa-brands fa-html5',         label: 'HTML5' },
      { icon: 'fa-brands fa-css3-alt',      label: 'CSS3' },
      { icon: 'fa-brands fa-js',            label: 'JavaScript' },
      { icon: 'fa-solid fa-mobile-screen',  label: 'Responsive' },
    ],
  },
  {
    id: 'tools', label: 'Tools & DevOps', icon: 'fa-solid fa-screwdriver-wrench', color: 'green',
    chips: [
      { icon: 'fa-brands fa-github',     label: 'GitHub' },
      { icon: 'fa-solid fa-flask',       label: 'Postman' },
      { icon: 'fa-brands fa-atlassian',  label: 'Jira' },
      { icon: 'fa-solid fa-sitemap',     label: 'n8n' },
      { icon: 'fa-solid fa-arrows-spin', label: 'SDLC' },
      { icon: 'fa-solid fa-terminal',    label: 'CLI' },
    ],
  },
];

export const SERVICES = [
  {
    icon: 'fa-solid fa-brain',
    title: 'AI Agent Development',
    desc: 'Building autonomous AI agents using LangChain, LangGraph & MCP Server. From RAG pipelines to multi-agent orchestration systems that think, plan, and act.',
  },
  {
    icon: 'fa-solid fa-bolt',
    title: 'Backend & API Engineering',
    desc: 'Designing fast, reliable REST APIs with FastAPI & Python. Clean architecture, SQL databases, OOPS principles, and thorough API testing via Postman.',
  },
  {
    icon: 'fa-brands fa-react',
    title: 'Frontend & UI Development',
    desc: 'Building performant React.JS applications with Redux state management. Pixel-perfect interfaces, smooth UX, and mobile-first responsive design.',
  },
];

export const PROJECTS = [
  {
    img: '/images/work-1.png',
    fallback: 'https://placehold.co/600x340/131320/ff004f?text=QuizNest',
    title: 'QuizNest',
    desc: 'Interactive quiz platform to test knowledge across multiple topics with dynamic scoring.',
    link: '#',
  },
  {
    img: '/images/work-2.png',
    fallback: 'https://placehold.co/600x340/131320/ff004f?text=Gemini+Clone',
    title: 'Gemini Clone',
    desc: 'AI-powered conversational interface built with LLM integration and real-time dynamic responses.',
    link: '#',
  },
  {
    img: '/images/work-3.png',
    fallback: 'https://placehold.co/600x340/131320/ff004f?text=Shopping+App',
    title: 'Online Shopping App',
    desc: 'Feature-rich mobile shopping app connecting users worldwide, available on Play Store.',
    link: '#',
  },
];

export const GLOBE_CATS = [
  { id: 'ai',       label: 'AI / LLM',  color: 0xa855f7, hex: '#a855f7' },
  { id: 'backend',  label: 'Backend',   color: 0x38bdf8, hex: '#38bdf8' },
  { id: 'frontend', label: 'Frontend',  color: 0xff004f, hex: '#ff004f' },
  { id: 'tools',    label: 'Tools',     color: 0x34d399, hex: '#34d399' },
];

export const GLOBE_NODES = [
  { label: 'LangChain',  cat: 'ai',       desc: 'LLM orchestration & chain framework',     r: 18 },
  { label: 'LangGraph',  cat: 'ai',       desc: 'Multi-agent stateful graph workflows',     r: 17 },
  { label: 'Agentic AI', cat: 'ai',       desc: 'Autonomous AI agent architecture',         r: 20 },
  { label: 'MCP Server', cat: 'ai',       desc: 'Model Context Protocol integration',       r: 14 },
  { label: 'LLM',        cat: 'ai',       desc: 'Large Language Model engineering',         r: 16 },
  { label: 'RAG',        cat: 'ai',       desc: 'Retrieval Augmented Generation',           r: 13 },
  { label: 'FastAPI',    cat: 'backend',  desc: 'High-performance Python REST APIs',        r: 18 },
  { label: 'Python',     cat: 'backend',  desc: 'Core language for AI & backend dev',       r: 22 },
  { label: 'SQL',        cat: 'backend',  desc: 'Relational DB design & queries',           r: 14 },
  { label: 'REST APIs',  cat: 'backend',  desc: 'API design & architecture patterns',       r: 15 },
  { label: 'OOPS',       cat: 'backend',  desc: 'Object-oriented design principles',        r: 13 },
  { label: 'C++',        cat: 'backend',  desc: 'Systems & algorithmic programming',        r: 12 },
  { label: 'React.JS',   cat: 'frontend', desc: 'Component-based UI framework',             r: 20 },
  { label: 'Redux',      cat: 'frontend', desc: 'Predictable state management',             r: 14 },
  { label: 'JavaScript', cat: 'frontend', desc: 'Core web scripting language',              r: 18 },
  { label: 'HTML5',      cat: 'frontend', desc: 'Semantic web structure & markup',          r: 13 },
  { label: 'CSS3',       cat: 'frontend', desc: 'Styling, animations & layouts',            r: 13 },
  { label: 'n8n',        cat: 'tools',    desc: 'Visual workflow automation platform',      r: 16 },
  { label: 'GitHub',     cat: 'tools',    desc: 'Version control & collaboration',          r: 17 },
  { label: 'Postman',    cat: 'tools',    desc: 'API testing & documentation',              r: 13 },
  { label: 'Jira',       cat: 'tools',    desc: 'Agile project management',                 r: 12 },
  { label: 'SDLC',       cat: 'tools',    desc: 'Software development lifecycle',           r: 12 },
];
