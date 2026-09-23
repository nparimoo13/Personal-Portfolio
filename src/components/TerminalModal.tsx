import React, { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface TerminalModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenResume: () => void
  onCopyEmail: () => void
}

interface CommandOutput {
  command: string
  output: React.ReactNode
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onCopyEmail,
}) => {
  const [inputVal, setInputVal] = useState('')
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">NP-SYS Terminal v2.4 [Neal Parimoo — Systems & Full-Stack Engineer]</p>
          <p className="text-slate-400">Type <span className="text-amber-400 font-bold">help</span> to view available system commands, or try <span className="text-cyan-300">projects</span>, <span className="text-cyan-300">skills</span>, <span className="text-cyan-300">resume</span>.</p>
        </div>
      ),
    },
  ])
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number>(-1)
  const [pastCommands, setPastCommands] = useState<string[]>(['welcome'])

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  if (!isOpen) return null

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setPastCommands((prev) => [...prev, cmd])
    setCmdHistoryIndex(-1)

    let outNode: React.ReactNode = null

    switch (trimmed) {
      case 'help':
        outNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold mb-1">AVAILABLE COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
              <div><span className="text-amber-400 font-semibold">projects</span> - View production & open-source systems</div>
              <div><span className="text-amber-400 font-semibold">skills</span> - Display technical competency matrix</div>
              <div><span className="text-amber-400 font-semibold">experience</span> - View career history & achievements</div>
              <div><span className="text-amber-400 font-semibold">ocpp</span> - Inspect OCPP 1.6-J telemetry specs</div>
              <div><span className="text-amber-400 font-semibold">resume</span> - Open full resume viewer & download</div>
              <div><span className="text-amber-400 font-semibold">contact</span> - Display contact details & copy email</div>
              <div><span className="text-amber-400 font-semibold">education</span> - UCSD Computer Engineering details</div>
              <div><span className="text-amber-400 font-semibold">clear</span> - Clear terminal output</div>
              <div><span className="text-amber-400 font-semibold">exit</span> - Close terminal window</div>
            </div>
          </div>
        )
        break

      case 'projects':
        outNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold">PRODUCTION & DISTRIBUTED SYSTEMS:</p>
            {PORTFOLIO_DATA.projects.map((p) => (
              <div key={p.id} className="border-l-2 border-cyan-500/50 pl-2.5 py-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-100 font-semibold">{p.title}</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1 py-0.5 rounded">{p.status}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{p.summary}</p>
                <p className="text-slate-500 text-[10px] mt-0.5">Stack: {p.tags.join(', ')}</p>
              </div>
            ))}
          </div>
        )
        break

      case 'skills':
        outNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold">CORE TECHNICAL COMPETENCIES:</p>
            {PORTFOLIO_DATA.skills.map((cat) => (
              <div key={cat.title} className="text-slate-300">
                <span className="text-amber-400 font-semibold">{cat.title}: </span>
                <span className="text-slate-400">{cat.skills.map((s) => s.name).join(' • ')}</span>
              </div>
            ))}
          </div>
        )
        break

      case 'experience':
      case 'exp':
        outNode = (
          <div className="space-y-2 text-xs font-mono">
            <p className="text-cyan-400 font-bold">CAREER HISTORY:</p>
            {PORTFOLIO_DATA.experiences.map((exp) => (
              <div key={exp.company} className="border-l-2 border-slate-700 pl-2.5 py-1">
                <div className="flex items-center justify-between text-slate-200">
                  <span className="font-semibold">{exp.role} @ {exp.company}</span>
                  <span className="text-slate-500 text-[10px]">{exp.period}</span>
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">{exp.description[0]}</p>
              </div>
            ))}
          </div>
        )
        break

      case 'education':
      case 'edu':
        outNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">EDUCATION:</p>
            <p className="text-slate-100 font-semibold">{PORTFOLIO_DATA.personal.education.school}</p>
            <p className="text-slate-300">{PORTFOLIO_DATA.personal.education.degree}</p>
            <p className="text-slate-500">{PORTFOLIO_DATA.personal.education.years} • {PORTFOLIO_DATA.personal.education.location}</p>
          </div>
        )
        break

      case 'ocpp':
        outNode = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded border border-slate-800">
            <p className="text-cyan-400 font-bold">[OCPP 1.6-J TELEMETRY SPECIFICATION]</p>
            <p className="text-slate-300">Protocol: JSON-RPC 2.0 over Secure WebSockets (WSS)</p>
            <p className="text-slate-400">Concurrency: 1,000+ active connections on .NET Core backend</p>
            <p className="text-emerald-400">Heartbeat Interval: 60s • Ping/Pong Latency: ~18ms</p>
            <p className="text-slate-400">Fault recovery: Automatic NOC email alerts on dropped sockets</p>
          </div>
        )
        break

      case 'resume':
        outNode = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">RESUME LAUNCHER:</p>
            <p>Opening full resume viewer modal...</p>
            <a
              href="/Neal_Parimoo_Resume.pdf"
              download
              className="inline-block mt-1 text-amber-400 underline hover:text-amber-300"
            >
              Direct Download: Neal_Parimoo_Resume.pdf
            </a>
          </div>
        )
        onOpenResume()
        break

      case 'contact':
        outNode = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-cyan-400 font-bold">CONTACT INFO:</p>
            <p>Email: <span className="text-slate-100 font-semibold">{PORTFOLIO_DATA.personal.contact.email}</span></p>
            <p>Phone: <span className="text-slate-100">{PORTFOLIO_DATA.personal.contact.phone}</span></p>
            <p>LinkedIn: <a href={PORTFOLIO_DATA.personal.contact.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{PORTFOLIO_DATA.personal.contact.linkedin}</a></p>
            <p>Location: <span className="text-slate-400">{PORTFOLIO_DATA.personal.contact.location}</span></p>
            <button
              onClick={onCopyEmail}
              className="mt-1 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 hover:bg-cyan-900 cursor-pointer text-[11px]"
            >
              Copy Email to Clipboard
            </button>
          </div>
        )
        break

      case 'clear':
        setHistory([])
        setInputVal('')
        return

      case 'exit':
      case 'quit':
        onClose()
        setInputVal('')
        return

      default:
        outNode = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: <span className="font-semibold text-slate-200">"{cmd}"</span>. Type <span className="text-amber-400 font-bold">help</span> for command directory.
          </div>
        )
    }

    setHistory((prev) => [...prev, { command: cmd, output: outNode }])
    setInputVal('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (pastCommands.length > 0) {
        const nextIndex = cmdHistoryIndex + 1 < pastCommands.length ? cmdHistoryIndex + 1 : cmdHistoryIndex
        setCmdHistoryIndex(nextIndex)
        setInputVal(pastCommands[pastCommands.length - 1 - nextIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (cmdHistoryIndex > 0) {
        const nextIndex = cmdHistoryIndex - 1
        setCmdHistoryIndex(nextIndex)
        setInputVal(pastCommands[pastCommands.length - 1 - nextIndex])
      } else if (cmdHistoryIndex === 0) {
        setCmdHistoryIndex(-1)
        setInputVal('')
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-2xl border border-cyan-500/30 bg-[#070a0f] shadow-2xl shadow-cyan-950/40 flex flex-col overflow-hidden max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono select-none">
          <div className="flex items-center gap-2 text-slate-300">
            <TerminalIcon className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-slate-200">neal@systems-core:~</span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">interactive shell</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-500">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">ESC</kbd> to exit
            </span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-100 p-1 rounded-md hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command !== 'welcome' && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-cyan-400">neal@systems:~$</span>
                  <span className="text-slate-100 font-semibold">{item.command}</span>
                </div>
              )}
              <div className="pl-0">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs font-semibold shrink-0">neal@systems:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'skills', 'resume'..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded bg-cyan-950 border border-cyan-800/80 text-cyan-400 hover:bg-cyan-900 transition-colors cursor-pointer"
            title="Execute"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <span className="text-slate-500 text-[10px] uppercase">Quick click:</span>
          {['help', 'projects', 'skills', 'experience', 'ocpp', 'resume', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-700/80 hover:text-cyan-300 text-slate-400 transition-colors cursor-pointer text-[10px]"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
