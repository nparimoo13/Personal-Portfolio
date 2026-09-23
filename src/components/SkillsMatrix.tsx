import React, { useState } from 'react'
import { Server, Globe, Database, Terminal, Cpu, CheckCircle } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

export const SkillsMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0)

  const categoryIcons = [
    <Server className="h-4 w-4" />,
    <Globe className="h-4 w-4" />,
    <Database className="h-4 w-4" />,
    <Cpu className="h-4 w-4" />,
  ]

  return (
    <section id="skills" className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <span>[04] Architecture & Stack</span>
            <span className="text-slate-600">/</span>
            <span>Technical Competency Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Toolchain & Capabilities
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Technologies vetted through production deployment, stress-tested under real-time telemetry loads, and grounded in systems fundamentals.
          </p>
        </div>

        {/* Tab Controls for Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-800/80 pb-4">
          {PORTFOLIO_DATA.skills.map((category, idx) => (
            <button
              key={category.title}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs transition-all cursor-pointer border ${
                activeTab === idx
                  ? 'bg-cyan-950/70 text-cyan-300 border-cyan-500/60 font-semibold shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              <span className={activeTab === idx ? 'text-cyan-400' : 'text-slate-500'}>
                {categoryIcons[idx]}
              </span>
              <span>{category.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
          <div className="border-b border-slate-800/80 pb-4 mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {PORTFOLIO_DATA.skills[activeTab].title}
            </h3>
            <p className="text-xs sm:text-sm font-mono text-cyan-400/90 mt-1">
              {PORTFOLIO_DATA.skills[activeTab].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTFOLIO_DATA.skills[activeTab].skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`p-4 rounded-xl border transition-all ${
                  skill.highlight
                    ? 'border-cyan-500/40 bg-cyan-950/20 shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-sm font-bold text-white">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                      Core Prod
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 font-mono leading-relaxed">
                  {skill.context}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehensive Grid of All Skills (for fast scanning) */}
        <div className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/20 p-5 sm:p-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center justify-between">
            <span>Complete Technology Index</span>
            <span className="text-[11px] text-slate-500">Quick Reference</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              'C#',
              '.NET Core 8',
              'ASP.NET Web API',
              'WebSockets',
              'OCPP 1.6-J',
              'OCPP 2.0.1',
              'Python',
              'FastAPI',
              'PostGIS',
              'PostgreSQL',
              'SQL Server',
              'TypeScript',
              'React 19',
              'Next.js 16',
              'Tailwind CSS',
              'GraphQL',
              'REST APIs',
              'LINQ',
              'Entity Framework Core',
              'Azure DevOps',
              'Azure Pipelines (YAML)',
              'AWS DynamoDB',
              'AWS Lambda',
              'AWS RDS',
              'AWS S3',
              'Docker',
              'Git',
              'xUnit',
              'Vitest',
              'Postman',
              'Visual Studio 2022',
              'VS Code',
              'Cursor',
            ].map((item) => (
              <span
                key={item}
                className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 hover:border-cyan-500/50 hover:text-cyan-200 transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
