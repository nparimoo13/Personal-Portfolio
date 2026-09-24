import React, { useState, FormEvent } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { PORTFOLIO_DATA } from '../data/portfolioData'

interface ContactFormProps {
  onSuccess: (message: string) => void
  onError: (message: string) => void
}

type FormStatus = 'idle' | 'submitting' | 'success'

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, onError }) => {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!accessKey) {
      onError('Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to .env.local.')
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          message,
          subject: `Portfolio message from ${name}`,
        }),
      })

      const data = (await res.json()) as { success?: boolean; message?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? 'Something went wrong. Please try again.')
      }

      setName('')
      setEmail('')
      setMessage('')
      setStatus('success')
      onSuccess('Message sent — thanks for reaching out.')
    } catch (err) {
      setStatus('idle')
      onError(err instanceof Error ? err.message : 'Failed to send message.')
    }
  }

  const { contact } = PORTFOLIO_DATA.personal

  return (
    <footer id="contact" className="bg-[#05070a] border-t border-slate-800 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="text-lg font-semibold text-white">Contact</h2>
        <p className="mt-2 text-sm text-slate-400">
          Send a message below. You can also find me on{' '}
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
          >
            LinkedIn
          </a>{' '}
          or{' '}
          <a href={contact.github} target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300">
            GitHub
          </a>
          .
        </p>

        {status === 'success' ? (
          <p className="mt-6 text-sm text-emerald-400">Thanks — your message was sent.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs text-slate-500 mb-1.5">
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-700"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs text-slate-500 mb-1.5">
                  Your email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-700"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs text-slate-500 mb-1.5">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-700 resize-y min-h-[120px]"
                placeholder="What would you like to discuss?"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-semibold text-sm cursor-pointer transition-colors"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send message
                </>
              )}
            </button>
          </form>
        )}

        <p className="mt-10 text-xs text-slate-600">{contact.location}</p>
      </div>
    </footer>
  )
}
