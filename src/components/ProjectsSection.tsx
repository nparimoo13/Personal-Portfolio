import React, { useState } from 'react'
import {
  Code,
  Layers,
  ChevronDown,
  ChevronUp,
  Server,
  Activity,
  Shield,
  Zap,
  CheckCircle,
  ExternalLink,
  Cpu,
  Globe,
  Database,
  SlidersHorizontal,
} from 'lucide-react'
import { PORTFOLIO_DATA, Project } from '../data/portfolioData'

export const ProjectsSection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'case-studies' | 'matrix'>('case-studies')
  const [expandedSnippetId, setExpandedSnippetId] = useState<string | null>('evolv-platform')

  const filterOptions = [
    { id: 'all', label: 'All Systems' },
    { id: 'distributed', label: 'Distributed & IoT (.NET)' },
    { id: 'spatial', label: 'Geospatial & AI (PostGIS)' },
    { id: 'fullstack', label: 'Full-Stack (React/Next.js)' },
    { id: 'devops', label: 'DevOps & Cloud (Azure/AWS)' },
  ]

  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    if (selectedFilter === 'all') return true
    return project.category === selectedFilter
  })

  const toggleSnippet = (id: string) => {
    setExpandedSnippetId(expandedSnippetId === id ? null : id)
  }

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
              <span>[01] Portfolio Systems</span>
              <span className="text-slate-600">/</span>
              <span>Production & Engineering Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-2xl">
              Real-world systems spanning high-concurrency .NET WebSocket gateways, deterministic geospatial compute,
              and full-stack platforms with auditable architectures.
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-slate-900/90 p-1 rounded-xl border border-slate-800 font-mono text-xs">
            <button
              onClick={() => setViewMode('case-studies')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'case-studies'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Deep Case Studies</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'matrix'
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Architecture Matrix</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-6 pb-8">
          {filterOptions.map((opt) => {
            const count =
              opt.id === 'all'
                ? PORTFOLIO_DATA.projects.length
                : PORTFOLIO_DATA.projects.filter((p) => p.category === opt.id).length
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all cursor-pointer border ${
                  selectedFilter === opt.id
                    ? 'border-cyan-500/60 bg-cyan-950/60 text-cyan-200 font-semibold shadow-sm'
                    : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{opt.label}</span>
                <span className="ml-1.5 text-[10px] opacity-70">({count})</span>
              </button>
            )
          })}
        </div>

        {/* View Mode 1: Deep Case Studies */}
        {viewMode === 'case-studies' && (
          <div className="space-y-10">
            {filteredProjects.map((project, index) => {
              const isSnippetOpen = expandedSnippetId === project.id
              return (
                <div
                  key={project.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden hover:border-slate-700/80 transition-all shadow-xl"
                >
                  {/* Project Top Bar */}
                  <div className="px-5 sm:px-7 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-500">
                        SYS-{String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="h-3 w-px bg-slate-700" />
                      <span className="font-mono text-xs font-semibold text-cyan-400">
                        {project.categoryLabel}
                      </span>
                      {project.organization && (
                        <>
                          <span className="text-slate-600 hidden sm:inline">•</span>
                          <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                            {project.organization}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">{project.period}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Main Project Content */}
                  <div className="p-5 sm:p-8 space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {project.title}
                      </h3>
                      <p className="mt-1 font-mono text-xs sm:text-sm text-cyan-300/90">
                        {project.subtitle}
                      </p>
                      <p className="mt-3 text-slate-300 text-sm leading-relaxed max-w-4xl">
                        {project.summary}
                      </p>
                    </div>

                    {/* Metric Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      {project.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                            {m.label}
                          </div>
                          <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300 mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* The Engineering Challenge vs The Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                      <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-400 font-semibold mb-2">
                          <Zap className="h-3.5 w-3.5" />
                          <span>The Engineering Problem</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{project.problem}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
                        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>The Architectural Solution</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Architecture Key Points */}
                    <div className="space-y-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                        Architecture & Implementation Highlights:
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                        {project.architectureHighlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="flex items-start gap-2 bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/50">
                            <span className="text-cyan-400 font-mono mt-0.5">›</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Code Snippet Drawer (if provided) */}
                    {project.codeSnippet && (
                      <div className="rounded-xl border border-slate-800 bg-[#07090e] overflow-hidden">
                        <button
                          onClick={() => toggleSnippet(project.id)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-slate-900/70 hover:bg-slate-900 transition-colors text-xs font-mono text-slate-300 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-cyan-400" />
                            <span className="font-semibold text-slate-200">
                              {project.codeSnippet.title}
                            </span>
                            <span className="text-[11px] text-slate-500 hidden sm:inline">
                              (Click to {isSnippetOpen ? 'collapse' : 'view'} code architecture)
                            </span>
                          </div>
                          {isSnippetOpen ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </button>

                        {isSnippetOpen && (
                          <div className="p-4 font-mono text-xs overflow-x-auto text-slate-300 border-t border-slate-800 bg-[#06080d] leading-relaxed">
                            <pre className="text-cyan-300/90 selection:bg-cyan-900/50">
                              <code>{project.codeSnippet.code}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-2">
                        Tech Stack:
                      </span>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* View Mode 2: Architecture Matrix Table */}
        {viewMode === 'matrix' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/30 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400">
                  <th className="py-3 px-4 uppercase text-[11px]">System / Project</th>
                  <th className="py-3 px-4 uppercase text-[11px]">Role & Context</th>
                  <th className="py-3 px-4 uppercase text-[11px]">Scale & Throughput</th>
                  <th className="py-3 px-4 uppercase text-[11px]">Key Tech Stack</th>
                  <th className="py-3 px-4 uppercase text-[11px]">Engineering Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{p.title}</div>
                      <div className="text-[10px] text-cyan-400 font-normal">{p.categoryLabel}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{p.role}</div>
                      <div className="text-[11px] text-slate-500">{p.organization || 'Independent'}</div>
                    </td>
                    <td className="py-3.5 px-4 text-cyan-300">
                      {p.metrics[0]?.value} {p.metrics[0]?.label}
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-300">
                      {p.tags.slice(0, 4).join(', ')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-[11px] max-w-xs truncate">
                      {p.metrics[1]?.value} — {p.metrics[1]?.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
