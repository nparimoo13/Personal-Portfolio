import React, { useState } from 'react'
import { X, Download, FileText, Check, Copy, ExternalLink, Briefcase, GraduationCap, Code2, Award } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  onCopyEmail: () => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onCopyEmail }) => {
  const [viewTab, setViewTab] = useState<'structured' | 'raw'>('structured')
  const [copiedRaw, setCopiedRaw] = useState(false)

  if (!isOpen) return null

  const rawResumeText = `Neal Parimoo
949-532-7440 | nparimoo13@gmail.com | https://www.linkedin.com/in/nparimoo
Location: Costa Mesa / Irvine, CA

EDUCATION
University of California, San Diego (UCSD) — La Jolla, CA
Bachelor of Science in Computer Engineering (2020 – 2024)

EXPERIENCE
Zero Impact Energy — Costa Mesa, CA
C# .NET Developer (September 2024 – Present)
• Developed the EVOLV Platform, supporting 1,000+ concurrent WebSocket connections across 300+ live sites, enabling real time monitoring and control of EV chargers with site specific configurations for users and organization administrators, developed with a C# .NET Core backend.
• Built monitoring and maintenance tools for EV charging stations by parsing JSON-based OCPP messages, with robust exception handling to ensure reliability and automated email alerts for disconnected chargers.
• Improved code quality by increasing test coverage and reducing cyclomatic complexity by 40% across the main repository; secured all API and GraphQL endpoints against vulnerabilities with authentication requirements and optimized LINQ queries to reduce latency and improve performance.
• Tested and validated newly developed platform features across unit, integration, and system levels, supporting iterative releases while maintaining backward compatibility and system reliability.

Tutors and Friends — La Jolla, CA
Technical Mentor (Aug 2023 – May 2024)
• Tutored students from middle school through college in multiple subjects, with an emphasis on computer science and programming fundamentals.
• Developed a curriculum ranging from basic topics such as data types to data structures and algorithms delving into topics such as graph theory and greedy algorithms.

First American — Santa Ana, CA
Azure DevOps Intern (June – September 2022)
• Developed a script that optimized the costs of AWS DynamoDB tables used by over 100 people in a developer environment via a YAML script in Azure Pipeline, saving DynamoDB costs by 78%.
• Implemented automated pipeline scripts to audit and report recently updated AWS Lambda functions within defined time windows, improving deployment visibility and operational tracking.
• Worked with Git-based workflows in Azure Repos, following branching strategies and contributing to code reviews integrated into pipeline execution.

PROJECTS
HelpSphere | C#, .NET, Entity Framework Core, React, AWS RDS/S3
• Built a full-stack support ticketing system with a .NET Web API backend and React frontend, integrating secure user authentication.
• Implemented a rule-based smart-triage engine that automatically categorizes tickets by severity and department, reducing manual sorting and improving first-response times.

Rec League AI Analyzer | HTML, CSS, JavaScript, Cheerio, OpenAI API
• Developed a Fantasy Football analytics platform that integrates with Yahoo, ESPN, and Sleeper APIs to import team data, evaluate rosters, and generate AI-based performance scores.
• Created an AI-powered Trade Analyzer leveraging the OpenAI API to evaluate proposed trades and provide commentary and fairness scores.

TECHNICAL SKILLS
Languages: C#, .NET, Python, JavaScript, TypeScript, React, HTML, CSS, SQL
Developer Tools: Visual Studio 2022, VS Code, Git, GitHub, Azure DevOps, Cursor, Postman`

  const handleCopyRaw = () => {
    navigator.clipboard.writeText(rawResumeText)
    setCopiedRaw(true)
    setTimeout(() => setCopiedRaw(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl rounded-2xl border border-slate-700 bg-[#0a0d14] shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Neal Parimoo — Resume
                <span className="text-xs font-mono font-normal text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  PDF Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">B.S. Computer Engineering • UC San Diego</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <a
              href="/Neal_Parimoo_Resume.pdf"
              download="Neal_Parimoo_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold font-mono transition-all shadow-md shadow-cyan-950"
            >
              <Download className="h-3.5 w-3.5" />
              Download PDF
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center justify-between px-5 py-2.5 bg-slate-950/80 border-b border-slate-800/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewTab('structured')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                viewTab === 'structured'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Formatted View
            </button>
            <button
              onClick={() => setViewTab('raw')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                viewTab === 'raw'
                  ? 'bg-slate-800 text-cyan-300 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Plain Text / ATS
            </button>
          </div>

          {viewTab === 'raw' && (
            <button
              onClick={handleCopyRaw}
              className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 cursor-pointer"
            >
              {copiedRaw ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              {copiedRaw ? 'Copied' : 'Copy All Text'}
            </button>
          )}
        </div>

        {/* Resume Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-300">
          {viewTab === 'raw' ? (
            <pre className="font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 overflow-x-auto text-slate-300 leading-relaxed whitespace-pre-wrap">
              {rawResumeText}
            </pre>
          ) : (
            <div className="space-y-8 max-w-3xl mx-auto">
              {/* Header Details */}
              <div className="border-b border-slate-800 pb-5">
                <h1 className="text-2xl font-bold text-white tracking-tight">Neal Parimoo</h1>
                <p className="text-cyan-400 font-mono text-sm mt-0.5">Software Engineer — C# .NET, WebSockets & Distributed Systems</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs font-mono text-slate-400">
                  <span>949-532-7440</span>
                  <span>•</span>
                  <button onClick={onCopyEmail} className="text-slate-300 hover:text-cyan-400 underline underline-offset-2 cursor-pointer">
                    nparimoo13@gmail.com
                  </button>
                  <span>•</span>
                  <a href={PORTFOLIO_DATA.personal.contact.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
                    linkedin.com/in/nparimoo <ExternalLink className="h-3 w-3" />
                  </a>
                  <span>•</span>
                  <span>Costa Mesa / Irvine, CA</span>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                  <span>Work Experience</span>
                </div>

                <div className="space-y-6">
                  {PORTFOLIO_DATA.experiences.map((exp) => (
                    <div key={exp.company} className="space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <div>
                          <span className="font-bold text-white text-base">{exp.role}</span>
                          <span className="text-cyan-400 font-medium ml-2">@ {exp.company}</span>
                        </div>
                        <div className="text-xs font-mono text-slate-400">
                          {exp.period} • {exp.location}
                        </div>
                      </div>

                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs text-slate-300 leading-relaxed">
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.technologies.map((t) => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                  <GraduationCap className="h-4 w-4 text-emerald-400" />
                  <span>Education</span>
                </div>

                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-white text-base">{PORTFOLIO_DATA.personal.education.school}</span>
                    <p className="text-slate-300 text-xs mt-0.5">{PORTFOLIO_DATA.personal.education.degree}</p>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {PORTFOLIO_DATA.personal.education.years} • {PORTFOLIO_DATA.personal.education.location}
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800/80 pb-1">
                  <Code2 className="h-4 w-4 text-amber-400" />
                  <span>Technical Skills</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="font-mono text-cyan-300 font-semibold block mb-1">Languages & Runtimes:</span>
                    <p className="text-slate-300 font-mono text-[11px]">C#, .NET Core 8, Python, TypeScript, JavaScript, SQL, HTML5/CSS3</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="font-mono text-cyan-300 font-semibold block mb-1">Frameworks & Protocols:</span>
                    <p className="text-slate-300 font-mono text-[11px]">WebSockets, OCPP 1.6-J / 2.0.1, ASP.NET Web API, GraphQL, React, Next.js, Entity Framework Core</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="font-mono text-cyan-300 font-semibold block mb-1">Cloud & Infrastructure:</span>
                    <p className="text-slate-300 font-mono text-[11px]">Azure DevOps & Pipelines, AWS (DynamoDB, Lambda, RDS, S3), Docker, Git</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                    <span className="font-mono text-cyan-300 font-semibold block mb-1">Developer Tools & Testing:</span>
                    <p className="text-slate-300 font-mono text-[11px]">xUnit, Vitest, Postman, Visual Studio 2022, VS Code, Cursor, Linux/Bash</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-950 border-t border-slate-800 text-xs font-mono text-slate-400">
          <span>Official resume verified & updated for 2026 roles</span>
          <a
            href="/Neal_Parimoo_Resume.pdf"
            download="Neal_Parimoo_Resume.pdf"
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <Download className="h-3.5 w-3.5" /> Download PDF (118 KB)
          </a>
        </div>
      </div>
    </div>
  )
}
