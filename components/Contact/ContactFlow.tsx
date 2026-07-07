'use client'

import { useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ShoppingCart, UserRound, Sparkles, type LucideIcon } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { WHATSAPP_NUMBER } from '@/content/site/social-links'

// Reused from the old Contact.tsx step-transition pattern.
const stepVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

type Service = 'ecommerce' | 'portfolio' | 'other'

const SERVICE_OPTIONS: { id: Service; label: string; icon: LucideIcon }[] = [
  { id: 'ecommerce', label: 'E-commerce Platform', icon: ShoppingCart },
  { id: 'portfolio', label: 'Personal Portfolio', icon: UserRound },
  { id: 'other', label: 'Something else', icon: Sparkles },
]

// Human-readable service label used in both send paths.
function serviceLabel(service: Service | null, otherText: string): string {
  if (service === 'other') return otherText.trim() || 'something else'
  const opt = SERVICE_OPTIONS.find((o) => o.id === service)
  return opt ? opt.label : ''
}

// Single message builder — both WhatsApp and Email are assembled from the same
// collected state, so they never drift apart.
function buildMessage(state: {
  service: Service | null
  otherText: string
  name: string
  phone: string
  email: string
  note: string
}): string {
  const svc = serviceLabel(state.service, state.otherText)
  let msg = `Hi Sid, I'd like help with ${svc}. Name: ${state.name} / Phone: ${state.phone} / Email: ${state.email}.`
  if (state.note.trim()) msg += ` ${state.note.trim()}`
  return msg
}

const pillBase =
  'flex items-center gap-3 rounded-full border px-5 py-3.5 font-body text-[0.98rem] font-medium text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
const inputClass =
  'w-full rounded-xl border border-border bg-surface-2 px-4 py-3 font-body text-[1rem] text-text placeholder:text-muted outline-none transition-colors duration-200 focus-visible:border-accent-text focus-visible:ring-2 focus-visible:ring-accent-text/40'
const primaryBtn =
  'inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-body text-[0.95rem] font-semibold text-accent-ink transition-transform duration-200 hover:scale-[1.03] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg'
const ghostBtn =
  'inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-body text-[0.95rem] font-semibold text-text transition-colors duration-200 hover:border-accent-text hover:text-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

export default function ContactFlow() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState<Service | null>(null)
  const [otherText, setOtherText] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const detailsValid = name.trim() !== '' && phone.trim() !== '' && email.trim() !== ''

  const state = { service, otherText, name, phone, email, note }

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(state))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const sendEmail = async () => {
    setSending(true)
    setError('')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
        {
          // Existing template variables preserved so the EmailJS template still
          // renders without changes; the assembled message carries the new fields.
          from_name: name,
          from_email: email,
          message: buildMessage(state),
          // Extra params (harmless if unused by the template, available if added):
          phone,
          service: serviceLabel(service, otherText),
        },
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
      )
      setStep(4)
    } catch (err) {
      console.error('Email failed:', err)
      setError('Something went wrong sending your message. Please try WhatsApp or email me directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto max-w-[620px] rounded-3xl border border-border bg-surface p-8 max-[520px]:p-6">
      {/* Step dots */}
      {step < 4 && (
        <div className="mb-8 flex items-center gap-2.5" aria-label={`Step ${step} of 3`}>
          {[1, 2, 3].map((n) => (
            <span
              key={n}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                step >= n ? 'bg-accent' : 'bg-surface-2 border border-border'
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1 — service select */}
        {step === 1 && (
          <motion.div
            key="step-1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase leading-tight text-text">
              What would you like help with?
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {SERVICE_OPTIONS.map((opt) => {
                const selected = service === opt.id
                const Icon = opt.icon
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setService(opt.id)}
                    className={`${pillBase} ${
                      selected
                        ? 'border-accent bg-accent text-accent-ink'
                        : 'border-border text-muted hover:border-accent-text hover:text-text'
                    }`}
                  >
                    <Icon aria-hidden size={18} strokeWidth={1.75} className="shrink-0" />
                    {opt.label}
                  </button>
                )
              })}
            </div>

            {/* Optional elaboration when "Something else" chosen — never required */}
            <AnimatePresence>
              {service === 'other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    placeholder="Tell me briefly what you have in mind"
                    className={`${inputClass} mt-4`}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className={primaryBtn}
                onClick={() => setStep(2)}
                disabled={service === null}
              >
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 — details */}
        {step === 2 && (
          <motion.div
            key="step-2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase leading-tight text-text">
              Your details
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">Name</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} autoComplete="name" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">Phone number</span>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 ..." className={inputClass} autoComplete="tel" />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} autoComplete="email" />
              </label>
            </div>
            <div className="mt-8 flex justify-between gap-3">
              <button type="button" className={ghostBtn} onClick={() => setStep(1)}>
                ← Back
              </button>
              <button type="button" className={primaryBtn} onClick={() => setStep(3)} disabled={!detailsValid}>
                Continue →
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 — optional note + send */}
        {step === 3 && (
          <motion.div
            key="step-3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)] font-bold uppercase leading-tight text-text">
              Additional details
            </h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Anything else I should know? (optional)"
              rows={5}
              className={`${inputClass} mt-6 resize-y`}
            />

            {error && <p className="mt-4 font-body text-[0.9rem] text-red-400">{error}</p>}

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" className={`${primaryBtn} flex-1`} onClick={openWhatsApp}>
                  Send via WhatsApp
                </button>
                <button type="button" className={`${ghostBtn} flex-1`} onClick={sendEmail} disabled={sending}>
                  {sending ? 'Sending…' : 'Send via Email'}
                </button>
              </div>
              <button type="button" className={`${ghostBtn} self-start border-transparent px-0 hover:text-accent-text`} onClick={() => setStep(2)}>
                ← Back
              </button>
            </div>
          </motion.div>
        )}

        {/* SUCCESS */}
        {step === 4 && (
          <motion.div
            key="step-4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35 }}
          >
            <p className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold uppercase text-text">
              Message sent ✓
            </p>
            <p className="mt-4 font-body text-[1.05rem] leading-[1.7] text-muted">
              Thanks {name || 'there'} — I&apos;ll get back to you soon.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
