import React from 'react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface ExperienceTimelineProps {
  onOpenResume: () => void
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ onOpenResume }) => {
  return (
    <section id="experience" className="py-14 sm:py-16 border-b border-slate-800/80 bg-[#080b11]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">Experience</h2>
            <p className="mt-1 text-sm text-slate-400">Short overview — details are on the resume.</p>
          </div>
          <button
            onClick={onOpenResume}
            className="text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer"
          >
            Full resume →
          </button>
        </div>

        <ul className="mt-8 space-y-5">
          {PORTFOLIO_DATA.experiences.map((exp) => (
            <li key={exp.company} className="border-l-2 border-slate-800 pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="font-medium text-white">
                  {exp.role}
                  <span className="text-slate-400 font-normal"> · {exp.company}</span>
                </p>
                <span className="text-xs text-slate-500 shrink-0">{exp.period}</span>
              </div>
              <p className="mt-1 text-sm text-slate-400">{exp.highlight}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
