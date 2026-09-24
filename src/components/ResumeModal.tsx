import React from 'react'
import { X, Download, FileText } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const pdfUrl = '/Neal_Parimoo_Resume.pdf'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-xl border border-slate-700 bg-[#0a0d14] shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-400" />
            <span className="font-semibold text-slate-100">{PORTFOLIO_DATA.personal.name} — Resume</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download="Neal_Parimoo_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-[60vh] bg-slate-950">
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full min-h-[60vh]"
            aria-label="Resume PDF"
          >
            <div className="p-8 text-center text-sm text-slate-400">
              <p>PDF preview is not available in this browser.</p>
              <a href={pdfUrl} download className="mt-4 inline-block text-cyan-400 hover:underline">
                Download Neal_Parimoo_Resume.pdf
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  )
}
