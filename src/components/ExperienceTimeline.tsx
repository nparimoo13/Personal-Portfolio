import React from 'react'
import { Briefcase, Calendar, MapPin, CheckCircle2, Award, Terminal } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#090c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <span>[02] Career History</span>
            <span className="text-slate-600">/</span>
            <span>Engineering Track Record</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Demonstrated engineering impact across high-concurrency production backends, cloud cost optimization pipelines,
            and algorithmic mentorship.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-slate-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-12">
          {PORTFOLIO_DATA.experiences.map((exp, index) => (
            <div key={exp.company} className="relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-cyan-400 shadow-sm group-hover:border-cyan-400 transition-colors">
                <Briefcase className="h-3.5 w-3.5" />
              </div>

              {/* Card Container */}
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/50 p-6 sm:p-7 hover:border-slate-700 transition-all shadow-md">
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-cyan-400 font-semibold font-mono text-sm mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 text-sm text-slate-300">
                  {exp.description.map((item, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed text-xs sm:text-sm">
                      <span className="text-cyan-400 font-mono text-xs mt-1 shrink-0">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Education Milestone Card */}
          <div className="relative group">
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-slate-700 bg-slate-950 text-emerald-400 shadow-sm group-hover:border-emerald-400 transition-colors">
              <Award className="h-3.5 w-3.5" />
            </div>

            <div className="rounded-2xl border border-slate-800/90 bg-slate-900/40 p-6 sm:p-7 hover:border-slate-700 transition-all shadow-md">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {PORTFOLIO_DATA.personal.education.school}
                  </h3>
                  <div className="text-emerald-400 font-mono text-sm mt-0.5">
                    {PORTFOLIO_DATA.personal.education.degree}
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {PORTFOLIO_DATA.personal.education.years} • {PORTFOLIO_DATA.personal.education.location}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rigorous computer engineering coursework and lab systems covering operating systems, data structures & algorithms,
                computer networks, computer architecture, digital system design, and distributed software engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
