import React, { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectsSection } from './components/ProjectsSection'
import { ExperienceTimeline } from './components/ExperienceTimeline'
import { ResumeSection } from './components/ResumeSection'
import { ContactForm } from './components/ContactForm'
import { ResumeModal } from './components/ResumeModal'
import { Toast } from './components/Toast'

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current))
    }, 3200)
  }

  const openResume = () => setIsResumeOpen(true)

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 antialiased font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header onOpenResume={openResume} />

      <main>
        <Hero onOpenResume={openResume} />
        <ProjectsSection />
        <ExperienceTimeline onOpenResume={openResume} />
        <ResumeSection onOpenResume={openResume} />
      </main>

      <ContactForm
        onSuccess={triggerToast}
        onError={triggerToast}
      />

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  )
}

export default App
