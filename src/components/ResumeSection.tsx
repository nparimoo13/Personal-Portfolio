import React from 'react'
import { Download, FileText } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface ResumeSectionProps {
  onOpenResume: () => void
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="resume" className="py-14 sm:py-16 border-b border-slate-800/80 bg-[#07090e]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-xl font-bold text-white">Resume</h2>
        <p className="mt-1 text-sm text-slate-400">
          PDF with experience, skills, and education. This site highlights projects; the resume has the rest.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={onOpenResume}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm cursor-pointer"
          >
            <FileText className="h-4 w-4" />
            Open resume
          </button>
          <a
            href="/Neal_Parimoo_Resume.pdf"
            download="Neal_Parimoo_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-900 text-sm"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            Download PDF
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {PORTFOLIO_DATA.skillTags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
