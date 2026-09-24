export interface Project {
  id: string
  title: string
  summary: string
  tags: string[]
  githubUrl: string
}

export interface Experience {
  company: string
  role: string
  location: string
  period: string
  highlight: string
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Neal Parimoo',
    title: 'Software Engineer',
    tagline: 'Backends, real-time systems, and full-stack apps.',
    photoUrl: '/neal-parimoo.jpg',
    contact: {
      location: 'Irvine, CA · Open to remote',
      linkedin: 'https://www.linkedin.com/in/nparimoo/',
      github: 'https://github.com/nparimoo13',
    },
  },

  projects: [
    {
      id: 'terranomics',
      title: 'TerraNomics',
      summary:
        'Turns natural-language site criteria into deterministic PostGIS analysis over demographics, zoning, and competitors.',
      tags: ['Python', 'FastAPI', 'PostGIS', 'PostgreSQL', 'Redis', 'MapLibre'],
      githubUrl: 'https://github.com/nparimoo13/TerraNomics',
    },
    {
      id: 'rec-league-ai',
      title: 'Rec League AI Analyzer',
      summary:
        'Fantasy football app that pulls Sleeper, ESPN, and Yahoo data for player ratings, trades, and AI roster insights.',
      tags: ['Node.js', 'Express', 'Convex', 'OpenAI', 'Tailwind'],
      githubUrl: 'https://github.com/nparimoo13/Rec-League-Fantasy-AI-Analayzer',
    },
    {
      id: 'showdown-support',
      title: 'ShowdownSupport',
      summary:
        'Chrome extension that suggests moves and switches in Pokémon Showdown using local damage calc—no server calls.',
      tags: ['TypeScript', 'Chrome MV3', '@smogon/calc', 'Vite'],
      githubUrl: 'https://github.com/nparimoo13/ShowdownSupport',
    },
  ] as Project[],

  experiences: [
    {
      company: 'Zero Impact Energy',
      role: 'Software Engineer',
      location: 'Costa Mesa, CA',
      period: 'September 2024 – Present',
      highlight:
        'EVOLV platform on C# .NET Core: 1,000+ WebSockets across 300+ sites, OCPP fault logging and alerts, secured APIs/GraphQL, and grid demand-response / time-of-use charging logic.',
    },
    {
      company: 'Tutors and Friends',
      role: 'Computer Science Tutor',
      location: 'La Jolla, CA',
      period: 'Aug 2023 – May 2024',
      highlight:
        'Tutored CS from fundamentals through data structures and algorithms; built curriculum and guided Python/C# exercises from theory to implementation.',
    },
    {
      company: 'First American',
      role: 'Software Engineer Intern',
      location: 'Santa Ana, CA',
      period: 'June – September 2022',
      highlight:
        'Azure Pipeline YAML that optimized DynamoDB tables for 100+ developers, cutting non-prod spend 78%; automated Lambda audits and Git/PR workflows in Azure Repos.',
    },
  ] as Experience[],

  skillTags: [
    'C# / .NET',
    'Python',
    'JavaScript',
    'React',
    'SQL',
    'GraphQL',
    'RESTful API',
    'Postman',
    'AI',
    'Docker',
    'Kubernetes',
    'Azure',
    'Git / GitHub',
    'AWS Certified Cloud Practitioner',
  ],
}
