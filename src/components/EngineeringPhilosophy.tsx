import React from 'react'
import { Terminal, Shield, Cpu, Activity, Compass, Flame } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

export const EngineeringPhilosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 sm:py-28 border-b border-slate-800/80 bg-[#090c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
            <span>[05] Engineering Convictions</span>
            <span className="text-slate-600">/</span>
            <span>How I Build & Operate</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Principles
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Core tenets developed from debugging stateful socket drops in the field, optimizing high-traffic database queries,
            and shipping production services.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.principles.map((p) => (
            <div
              key={p.number}
              className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/40 hover:border-slate-700/80 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/60">
                    PRINCIPIO // {p.number}
                  </span>
                  <span className="text-[11px] font-mono text-slate-600">SYSTEM PRINCIPLE</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-3">
                  {p.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {p.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified in production</span>
                <span className="text-emerald-400 font-semibold">Active Tenet</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
