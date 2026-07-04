'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import emailjs from '@emailjs/browser'

const stepVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const Contact = () => {
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const hasMountedRef = useRef(false)

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }
    if (step === 3 && textareaRef.current) {
      textareaRef.current.focus({ preventScroll: true })
      return
    }
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [step])

  const nextStep = () => {
    if (step === 1 && name.trim()) setStep(2)
    else if (step === 2 && email.trim()) setStep(3)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 3) {
      e.preventDefault()
      nextStep()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
      { from_name: name, from_email: email, message },
      process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!
    )
      .then(() => setStep(4))
      .catch((error) => console.error('Email failed:', error))
  }

  const inputClass = 'flex-1 min-w-[260px] p-0 pb-[10px] border-0 border-b-2 border-brand-dark bg-transparent text-[#111] font-sans outline-none text-[clamp(1.2rem,2.2vw,1.5rem)] font-semibold placeholder-[#b7b1a6] max-[768px]:min-w-full max-[768px]:text-[1.4rem] max-[520px]:text-[1.2rem]'
  const buttonClass = 'border-0 bg-[#111] text-white px-7 py-[14px] rounded-[6px] cursor-pointer text-[0.95rem] font-semibold transition-[background-color,transform,opacity] duration-[250ms] ease-out min-h-[44px] hover:not-disabled:bg-[#333] hover:not-disabled:-translate-y-px disabled:opacity-45 disabled:cursor-not-allowed max-[520px]:w-full max-[520px]:justify-center'

  return (
    <section className="bg-[#f5f2ec] py-20 px-8 font-sans box-border max-[768px]:py-[84px] max-[768px]:px-5 max-[520px]:py-[72px] max-[520px]:px-4" id="contact">
      <div className="w-full max-w-layout mx-auto">
        <div className="max-w-[640px] mx-auto p-9 bg-white border border-[#e6e2da] rounded-3xl shadow-[0_18px_40px_rgba(0,0,0,0.04)] max-[768px]:p-8 max-[768px]:px-6 max-[768px]:rounded-[20px] max-[520px]:p-6 max-[520px]:px-[18px]">

          {/* Header */}
          <div className="mb-9 max-[768px]:mb-7">
            <p className="m-0 mb-[10px] text-[0.9rem] font-semibold tracking-[0.08em] uppercase text-[#8b8478]">Contact</p>
            <h2 className="m-0 mb-6 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-extrabold text-[#111] max-[520px]:text-[clamp(1.8rem,9vw,2.4rem)]">
              Let&apos;s start a conversation
            </h2>
            <div className="flex gap-[10px] items-center" aria-label={`Step ${step} of 3`}>
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`w-[10px] h-[10px] rounded-full transition-[background-color,transform] duration-[250ms] ease-out ${
                    step >= n ? 'bg-[#111] scale-[1.05]' : 'bg-[#d9d3c8]'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                className="min-h-[180px] flex flex-col justify-start"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <p className="m-0 mb-7 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.3] font-semibold text-[#171717] max-[520px]:text-[1.3rem]">
                  What should I call you?
                </p>
                <div className="flex items-baseline gap-4 mb-9 flex-wrap max-[768px]:gap-[10px] max-[768px]:mb-7">
                  <span className="text-[clamp(1.25rem,2.2vw,1.8rem)] italic text-[#9c9c9c] shrink-0 max-[768px]:text-[1.15rem]">I&apos;m</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <button type="button" className={buttonClass} onClick={nextStep} disabled={!name.trim()}>
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                className="min-h-[180px] flex flex-col justify-start"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <p className="m-0 mb-2 text-base font-medium text-[#7d766a]">Nice to meet you, {name}</p>
                <p className="m-0 mb-7 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.3] font-semibold text-[#171717] max-[520px]:text-[1.3rem]">
                  Where can I reach you?
                </p>
                <div className="flex items-baseline gap-4 mb-9 flex-wrap max-[768px]:gap-[10px] max-[768px]:mb-7">
                  <span className="text-[clamp(1.25rem,2.2vw,1.8rem)] italic text-[#9c9c9c] shrink-0 max-[768px]:text-[1.15rem]">Email me at</span>
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="flex gap-[14px] flex-wrap max-[520px]:flex-col">
                  <button type="button" className="border-0 bg-[#ece7de] text-[#2b2823] px-7 py-[14px] rounded-[6px] cursor-pointer text-[0.95rem] font-semibold transition-[background-color,transform] duration-[250ms] ease-out min-h-[44px] hover:bg-[#e0dacd] max-[520px]:w-full" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="button" className={buttonClass} onClick={nextStep} disabled={!email.trim()}>
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form
                key="step-3"
                className="min-h-[180px] flex flex-col justify-start"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
              >
                <p className="m-0 mb-7 text-[clamp(1.5rem,3vw,2.1rem)] leading-[1.3] font-semibold text-[#171717] max-[520px]:text-[1.3rem]">
                  What would you like to discuss?
                </p>
                <div className="flex flex-col items-start gap-4 mb-9 max-[768px]:gap-[10px] max-[768px]:mb-7">
                  <span className="text-[clamp(1.25rem,2.2vw,1.8rem)] italic text-[#9c9c9c] shrink-0 max-[768px]:text-[1.15rem]">I would like to...</span>
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full min-h-[150px] p-3 pb-0 pt-3 border-0 border-b-2 border-brand-dark bg-transparent text-[#111] font-sans outline-none resize-y text-[1.05rem] leading-[1.8] font-medium placeholder-[#b7b1a6] max-[520px]:text-[0.98rem] max-[520px]:leading-[1.7]"
                    placeholder="Please share a few details about your project, role, or inquiry."
                    rows={5}
                  />
                </div>
                <div className="flex gap-[14px] flex-wrap max-[520px]:flex-col">
                  <button type="button" className="border-0 bg-[#ece7de] text-[#2b2823] px-7 py-[14px] rounded-[6px] cursor-pointer text-[0.95rem] font-semibold transition-[background-color,transform] duration-[250ms] ease-out min-h-[44px] hover:bg-[#e0dacd] max-[520px]:w-full" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button type="submit" className={buttonClass} disabled={!message.trim()}>
                    Send Message
                  </button>
                </div>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                className="min-h-[180px] flex flex-col justify-center"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4 }}
              >
                <p className="m-0 mb-[14px] text-[clamp(1.8rem,3vw,2.4rem)] font-bold text-[#111]">Message Sent ✓</p>
                <p className="m-0 text-[1.05rem] leading-[1.8] text-[#5d574d]">
                  Thanks {name},<br />I&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default Contact
