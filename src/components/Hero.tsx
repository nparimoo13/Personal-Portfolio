import React from 'react'
import { ExternalLink, Download } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface HeroProps {
  onOpenResume: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { personal } = PORTFOLIO_DATA

  return (
    <section className="border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-start gap-8 text-center sm:text-left">
          <img
            src={personal.photoUrl}
            alt={`${personal.name} profile`}
            className="mx-auto sm:mx-0 w-32 h-40 sm:w-36 sm:h-44 rounded-2xl object-cover object-[center_78%] border border-slate-700 shadow-lg shrink-0"
            width={144}
            height={176}
          />

          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-400">{personal.contact.location}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {personal.name}
            </h1>
            <p className="mt-1 text-cyan-400 font-medium">{personal.title}</p>
            <p className="mt-4 text-slate-300 text-base leading-relaxed max-w-xl mx-auto sm:mx-0">
              {personal.tagline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors"
              >
                View projects
              </a>
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm transition-colors cursor-pointer"
              >
                <Download className="h-4 w-4 text-cyan-400" />
                Resume
              </button>
              <a
                href={personal.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-4 py-2.5 rounded-lg text-slate-400 hover:text-cyan-300 text-sm"
              >
                LinkedIn
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-4 py-2.5 rounded-lg text-slate-400 hover:text-slate-200 text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
