import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OcppInspector } from './components/OcppInspector'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { SkillsMatrix } from './components/SkillsMatrix'
import { EngineeringPhilosophy } from './components/EngineeringPhilosophy'
import { Footer } from './components/Footer'
import { TerminalModal } from './components/TerminalModal'
import { ResumeModal } from './components/ResumeModal'
import { Toast } from './components/Toast'
import { Radio, ArrowDown, Activity, Terminal } from 'lucide-react'
import { PORTFOLIO_DATA } from './data/portfolioData'

export function App() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsTerminalOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 3200)
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.contact.email)
    triggerToast(`Email copied: ${PORTFOLIO_DATA.personal.contact.email}`)
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Bar */}
      <Header
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenResume={() => setIsResumeOpen(true)}
          onCopyEmail={handleCopyEmail}
        />

        {/* Section: Live OCPP 1.6-J Protocol Inspector & Telemetry Console */}
        <section id="telemetry" className="py-16 sm:py-24 border-b border-slate-800/80 bg-[#080b11]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
                <span>[03] Interactive Telemetry</span>
                <span className="text-slate-600">/</span>
                <span>Production Protocol Ingestion</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Live OCPP 1.6-J Protocol Inspector
              </h2>
              <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                An interactive simulation of the communication protocol powering commercial EV charging networks.
                Click below to inject live <span className="text-cyan-300 font-mono">MeterValues</span>, observe JSON-RPC frame parsing,
                state machine transitions, and automated NOC alert dispatch when connection timeouts occur.
              </p>
            </div>

            <OcppInspector />
          </div>
        </section>

        {/* Section: Featured Projects & System Case Studies */}
        <ProjectsSection />

        {/* Section: Work Experience Timeline */}
        <ExperienceTimeline />

        {/* Section: Architecture & Technical Skills */}
        <SkillsMatrix />

        {/* Section: Engineering Philosophy */}
        <EngineeringPhilosophy />
      </main>

      {/* Footer & Contact */}
      <Footer
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Floating Interactive Quick Bar (Bottom-right) */}
      <div className="fixed bottom-6 left-6 z-30 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setIsTerminalOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 font-mono text-xs shadow-lg backdrop-blur-md transition-all cursor-pointer"
        >
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span>NP-SYS Terminal</span>
          <kbd className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[10px] border border-slate-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Interactive Command Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Resume Viewer & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Global Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  )
}

export default App
