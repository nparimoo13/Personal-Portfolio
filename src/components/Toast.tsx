import React from 'react'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string | null
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-2xl shadow-cyan-950/50 text-slate-100 font-mono text-xs animate-in slide-in-from-bottom-4 duration-200">
      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-500 hover:text-slate-300 p-0.5 rounded cursor-pointer"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
