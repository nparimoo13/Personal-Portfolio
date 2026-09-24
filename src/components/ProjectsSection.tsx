import React from 'react'
import { ExternalLink } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-14 sm:py-16 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-white">Projects</h2>
        <p className="mt-1 text-sm text-slate-400">Open-source work with links to the repos.</p>

        <ul className="mt-8 space-y-6">
          {PORTFOLIO_DATA.projects.map((project) => (
            <li
              key={project.id}
              className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300"
                >
                  GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">{project.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
