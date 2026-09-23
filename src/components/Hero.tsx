import React, { useState } from 'react'
import { ArrowDown, Copy, Check, ExternalLink, Terminal, Shield, Zap, Sparkles, Download, Layers } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface HeroProps {
  onOpenTerminal: () => void
  onOpenResume: () => void
  onCopyEmail: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenResume, onCopyEmail }) => {
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopy = () => {
    onCopyEmail()
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2200)
  }

  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-800/80 overflow-hidden bg-grid-subtle">
      {/* Subtle ambient gradient overlay — restrained, industrial, not cheesy purple blob */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-900/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 h-72 w-72 rounded-full bg-blue-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 mb-6 shadow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-semibold">Available</span>
          <span className="text-slate-600">/</span>
          <span>Full-Stack & Backend SWE Roles</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-slate-400 hidden sm:inline">Irvine, CA & Remote</span>
        </div>

        {/* Main Title & Bio */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
            Engineering{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              distributed backends
            </span>
            , real-time protocols, and deterministic software.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl">
            Hi, I’m <span className="font-semibold text-white">Neal Parimoo</span> — Software Engineer & UC San Diego
            Computer Engineering graduate. Currently architecting the{' '}
            <span className="text-cyan-300 font-medium">EVOLV Platform</span> at Zero Impact Energy, managing{' '}
            <span className="text-white font-medium">1,000+ concurrent WebSockets</span> across 300+ commercial EV charging
            stations using C# .NET Core. I specialize in resilient event streams, PostGIS spatial computing, and scalable web apps.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm font-mono transition-all shadow-lg shadow-cyan-950/40 cursor-pointer"
            >
              <span>Explore Featured Systems</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-mono text-sm transition-all cursor-pointer"
            >
              <Download className="h-4 w-4 text-cyan-400" />
              <span>Resume PDF</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 hover:text-slate-100 font-mono text-xs transition-all cursor-pointer"
              title="Click to copy email address"
            >
              {emailCopied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-slate-400" />
                  <span>nparimoo13@gmail.com</span>
                </>
              )}
            </button>

            <a
              href={PORTFOLIO_DATA.personal.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-400 hover:text-cyan-300 font-mono text-xs transition-colors"
            >
              <span>LinkedIn</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Engineering Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PORTFOLIO_DATA.personal.coreMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-slate-800/90 bg-slate-900/50 backdrop-blur-sm hover:border-slate-700 transition-all group"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {metric.value}
              </div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300 mt-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono leading-tight">
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tech Anchor Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-500">Core Engineering Arsenal:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              'C# / .NET Core 8',
              'WebSockets (OCPP 1.6-J)',
              'PostGIS & Python',
              'React & Next.js 16',
              'GraphQL & REST',
              'Azure DevOps & AWS',
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-slate-300 text-[11px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
