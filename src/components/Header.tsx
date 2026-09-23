import React, { useState, useEffect } from 'react'
import { Terminal, FileText, Menu, X, Radio, ArrowUpRight } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface HeaderProps {
  onOpenTerminal: () => void
  onOpenResume: () => void
  onCopyEmail: () => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenTerminal, onOpenResume, onCopyEmail }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Projects', href: '#projects', num: '01' },
    { label: 'Experience', href: '#experience', num: '02' },
    { label: 'OCPP Engine', href: '#telemetry', num: '03' },
    { label: 'Architecture', href: '#skills', num: '04' },
    { label: 'Philosophy', href: '#philosophy', num: '05' },
    { label: 'Contact', href: '#contact', num: '06' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top telemetry status bar */}
      <div className="w-full bg-[#05070a] border-b border-slate-900/80 px-4 py-1 text-[11px] font-mono text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">
              PROD WEBSOCKETS: <span className="text-cyan-400 font-semibold">1,000+</span>
            </span>
            <span className="text-slate-700 hidden md:inline">|</span>
            <span className="text-slate-400 hidden md:inline">
              STACK: <span className="text-slate-300">C# .NET 8 • PostGIS • React</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-cyan-300/90 font-medium hidden sm:inline">
              OPEN TO FULL-TIME SWE ROLES
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 font-mono">
              UCSD '24 CE
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 border-b ${
          scrolled
            ? 'bg-[#07090e]/95 backdrop-blur-md border-slate-800 shadow-lg shadow-black/40 py-3'
            : 'bg-[#07090e]/80 backdrop-blur-sm border-slate-800/80 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Brand Signature */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-cyan-500/80 flex items-center justify-center font-mono font-bold text-cyan-400 transition-colors">
              NP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base">
                  Neal Parimoo
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 hidden sm:inline">
                  SWE
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 -mt-0.5">
                Distributed Systems & Full-Stack
              </p>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
              >
                <span className="text-[10px] text-slate-600 group-hover:text-cyan-500 transition-colors">
                  {link.num}
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Terminal Trigger Button */}
            <button
              onClick={onOpenTerminal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 text-xs font-mono transition-all cursor-pointer shadow-sm"
              title="Launch interactive command terminal (or press Ctrl+K)"
            >
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Terminal</span>
              <kbd className="hidden md:inline px-1 py-0.2 rounded bg-slate-800 text-slate-500 border border-slate-700 text-[10px]">
                Ctrl+K
              </kbd>
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:border-cyan-400"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-400" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14] border-b border-slate-800 px-4 py-4 space-y-3 font-mono text-sm animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-xs"
              >
                <span className="text-cyan-500 text-[10px]">{link.num}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1 text-xs">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenTerminal()
              }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            >
              <span className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" /> Command Terminal
              </span>
              <span className="text-[10px] text-slate-500">Ctrl+K</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenResume()
              }}
              className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/80 text-cyan-300"
            >
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" /> View / Download Resume PDF
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
