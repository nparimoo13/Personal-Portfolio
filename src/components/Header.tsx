import React, { useState } from 'react'
import { FileText, Menu, X, ExternalLink } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface HeaderProps {
  onOpenResume: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-[#07090e]/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <a href="#" className="font-semibold text-slate-100 text-sm hover:text-white">
          Neal Parimoo
        </a>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-400">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-cyan-300 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PORTFOLIO_DATA.personal.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300"
          >
            LinkedIn
            <ExternalLink className="h-3 w-3" />
          </a>
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-800/60 bg-cyan-950/40 text-cyan-200 text-xs font-medium cursor-pointer hover:bg-cyan-900/40"
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 text-slate-400"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="sm:hidden border-t border-slate-800 px-4 py-3 flex flex-col gap-2 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href={PORTFOLIO_DATA.personal.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-cyan-400"
          >
            LinkedIn
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenResume()
            }}
            className="py-2 text-left text-cyan-400"
          >
            Open resume
          </button>
        </nav>
      )}
    </header>
  )
}
