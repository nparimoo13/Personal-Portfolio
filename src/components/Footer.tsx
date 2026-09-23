import React, { useState } from 'react'
import { Mail, Phone, ExternalLink, Download, Terminal, Copy, Check, ArrowUp, Heart, ShieldCheck } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface FooterProps {
  onOpenTerminal: () => void
  onOpenResume: () => void
  onCopyEmail: () => void
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume, onCopyEmail }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    onCopyEmail()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="bg-[#05070a] border-t border-slate-800 text-slate-400">
      {/* Contact Hero CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-b border-slate-900">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-[#0a0d14] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
              <span>[06] Get in Touch</span>
              <span className="text-slate-600">/</span>
              <span className="text-emerald-400 font-semibold">Available Immediately</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Looking for a software engineer who builds resilient systems?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              I am actively interviewing for full-time Software Engineer positions across backend (.NET / Python),
              distributed systems, and full-stack web applications. Whether you have an open position or want to talk
              systems architecture, I’d love to connect.
            </p>

            {/* Direct Contact Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Email */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <Mail className="h-3.5 w-3.5 text-cyan-400" /> Direct Email
                  </div>
                  <div className="font-mono text-xs font-semibold text-white truncate">
                    {PORTFOLIO_DATA.personal.contact.email}
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="mt-3 w-full py-1.5 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-300 hover:bg-cyan-900 text-xs font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied to Clipboard' : 'Copy Email'}</span>
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <Phone className="h-3.5 w-3.5 text-emerald-400" /> Mobile / Text
                  </div>
                  <div className="font-mono text-xs font-semibold text-white">
                    {PORTFOLIO_DATA.personal.contact.phone}
                  </div>
                </div>
                <a
                  href={`tel:${PORTFOLIO_DATA.personal.contact.phone}`}
                  className="mt-3 w-full py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Direct Call / SMS</span>
                </a>
              </div>

              {/* LinkedIn */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                    <ExternalLink className="h-3.5 w-3.5 text-blue-400" /> Professional Profile
                  </div>
                  <div className="font-mono text-xs font-semibold text-white truncate">
                    linkedin.com/in/nparimoo
                  </div>
                </div>
                <a
                  href={PORTFOLIO_DATA.personal.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 w-full py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 hover:bg-slate-800 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Resume action inside card */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>View & Download Official Resume (PDF)</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-cyan-300 font-mono text-xs transition-colors cursor-pointer"
              >
                <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                <span>Launch NP-SYS Shell (Ctrl+K)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="font-bold text-slate-200">Neal Parimoo</span>
            <span className="text-slate-700">|</span>
            <span>B.S. Computer Engineering, UC San Diego '24</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-900 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-600">
          <span>Engineered with React 19, TypeScript, Vite & Tailwind CSS. Zero template bloat.</span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Verified Production Spec
          </span>
        </div>
      </div>
    </footer>
  )
}
