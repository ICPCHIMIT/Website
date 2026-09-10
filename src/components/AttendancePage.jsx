import React, { useState, useEffect } from 'react'
import { 
  User, Mail, Phone, Code2, CheckCircle2, 
  ArrowRight, ArrowLeft, AlertCircle, ShieldCheck, 
  Calendar, KeyRound, Clock, Megaphone, MessageCircle, Terminal,
  BookOpen, Sparkles, HelpCircle, Check, RefreshCw
} from 'lucide-react'
import { submitAttendanceRecord } from '../lib/database.js'
import { getFormControl, fetchFormControls, subscribeToFormControls } from '../lib/formControlService.js'
import FormClosedNotice from './FormClosedNotice.jsx'

export default function AttendancePage({ onNavigateHome, onNavigateRoadmap }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [formControl, setFormControl] = useState(() => getFormControl('public_attendance'))
  const [deviceAlreadySubmitted, setDeviceAlreadySubmitted] = useState(null)
  const [forceOverrideDevice, setForceOverrideDevice] = useState(false)

  useEffect(() => {
    fetchFormControls().then((controls) => {
      if (controls?.public_attendance) setFormControl(controls.public_attendance)
    }).catch(() => {})

    const unsub = subscribeToFormControls((controls) => {
      if (controls?.public_attendance) setFormControl(controls.public_attendance)
    })
    return () => unsub()
  }, [])

  const currentSessionNum = formControl.options?.sessionNumber || 1
  const currentSessionType = formControl.options?.sessionType || 'regular'
  const currentSessionTitle = formControl.options?.sessionTitle || 'Active Training Session'

  useEffect(() => {
    try {
      const sessionKey = `icpc_att_${currentSessionType}_s${currentSessionNum}`
      const saved = localStorage.getItem(sessionKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        setDeviceAlreadySubmitted(parsed)
      } else {
        setDeviceAlreadySubmitted(null)
      }
    } catch (e) {}
  }, [currentSessionNum, currentSessionType])

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    codeforces: '',
    pinCode: '',
    university: 'HIMIT',
    customUniversity: '',
    major: 'Computer Science',
    academicYear: 'Year 1',
    notes: ''
  })

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrorMessage('')
  }

  const validateForm = () => {
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      setErrorMessage('Please enter your full name (at least 3 characters).')
      return false
    }

    if (formControl.options?.requirePhone !== false) {
      const phoneDigits = formData.phone.trim().replace(/\D/g, '')
      const phoneRegex = /^01[0125][0-9]{8}$/
      if (!phoneRegex.test(phoneDigits)) {
        setErrorMessage('Please enter a valid 11-digit Egyptian phone number (e.g. 01xxxxxxxxx).')
        return false
      }
    }

    if (formControl.options?.requireEmail !== false) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email.trim())) {
        setErrorMessage('Please enter a valid email address.')
        return false
      }
    }

    if (formControl.options?.requireCodeforces === true) {
      if (!formData.codeforces.trim() || formData.codeforces.trim().length < 2) {
        setErrorMessage('Please enter your Codeforces handle.')
        return false
      }
    }

    if (formControl.options?.requirePinCode === true) {
      const expectedPin = String(formControl.options?.pinCode || '').trim()
      const enteredPin = formData.pinCode.trim()
      if (!enteredPin) {
        setErrorMessage('Please enter the session PIN passcode provided by the instructor.')
        return false
      }
      if (expectedPin && enteredPin !== expectedPin) {
        setErrorMessage('Invalid session PIN passcode. Please ask your mentor or coach.')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const res = await submitAttendanceRecord({
        ...formData,
        sessionNumber: currentSessionNum,
        sessionType: currentSessionType,
        sessionTitle: currentSessionTitle
      })
      setSubmittedData(res.data)
      setIsSubmitting(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setErrorMessage(err.message || 'Failed to record attendance')
      setIsSubmitting(false)
    }
  }

  const handleResetForAnother = () => {
    setSubmittedData(null)
    setFormData({
      name: '',
      phone: '',
      email: '',
      codeforces: '',
      pinCode: '',
      university: 'HIMIT',
      customUniversity: '',
      major: 'Computer Science',
      academicYear: 'Year 1',
      notes: ''
    })
    setErrorMessage('')
    setForceOverrideDevice(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!formControl.isOpen && !submittedData) {
    return (
      <FormClosedNotice
        title={formControl.closedTitle || 'Session Attendance Closed'}
        message={formControl.closedMessage || 'Self-attendance logging is currently closed or the active session has ended.'}
        deadline={formControl.deadline}
        onNavigateHome={onNavigateHome}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 py-12 md:py-20 bg-stars">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {formControl.bannerMessage && (
          <div className="p-4 rounded-2xl bg-[#f5ba13]/10 border border-[#f5ba13]/30 flex items-center gap-3 text-xs sm:text-sm font-mono text-[#f5ba13] animate-fade-in shadow-[0_0_20px_rgba(245,186,19,0.1)]">
            <Megaphone className="w-5 h-5 flex-shrink-0 text-[#f5ba13]" />
            <span>{formControl.bannerMessage}</span>
          </div>
        )}

        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-mono text-xs font-bold tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5 text-[#10b981]" />
            <span>SESSION ATTENDANCE VERIFICATION</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl font-bold tracking-normal text-white leading-tight">
            Log Your Attendance<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              ICPC HIMIT Training
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Record your attendance for today's lecture or lab. Your presence will be matched with your member profile and counted towards qualifications.
          </p>

          <div className="w-12 h-1 bg-[#f5ba13] mx-auto rounded-sm shadow-[0_0_12px_#f5ba13] animate-glow-gold" />
        </div>

        <div className="p-5 sm:p-6 rounded-2xl bg-[#090e1a]/95 border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-[#f5ba13]/20 border border-[#f5ba13]/40 text-[#f5ba13] font-mono text-[11px] font-bold uppercase tracking-wider">
                SESSION #{currentSessionNum} · {currentSessionType.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-400 font-mono text-[11px]">
                CHECKPOINT #{formControl.options?.checkpointNumber || 1}
              </span>
            </div>
            <h3 className="font-pixel text-lg sm:text-xl font-bold text-white pt-1">
              {currentSessionTitle}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 sm:text-right">
            <Clock className="w-4 h-4 text-[#38bdf8]" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        {deviceAlreadySubmitted && !forceOverrideDevice && !submittedData && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-3 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <span>Attendance already logged on this browser</span>
            </div>
            <p className="text-xs text-amber-200/80 leading-relaxed font-sans">
              A check-in for <strong className="text-white">{deviceAlreadySubmitted.name}</strong> was already registered on this device for Session #{currentSessionNum}. If you are logging attendance for someone else, click below to proceed.
            </p>
            <button
              type="button"
              onClick={() => setForceOverrideDevice(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check-in a different attendee</span>
            </button>
          </div>
        )}

        {!submittedData && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-6 animate-fade-in">
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs sm:text-sm font-sans animate-fade-in">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {formControl.options?.requirePinCode === true && (
              <div className="p-5 rounded-2xl bg-[#070b16] border border-[#f5ba13]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f5ba13]">
                    <KeyRound className="w-4 h-4 text-[#f5ba13]" />
                    <span>Session Security Passcode *</span>
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">Given in Lecture</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter Passcode (e.g. 1234)"
                  value={formData.pinCode}
                  onChange={(e) => updateField('pinCode', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#04060c] border border-[#f5ba13]/40 text-[#f5ba13] placeholder:text-slate-600 text-center text-lg font-mono tracking-widest focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                  required
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <User className="w-3.5 h-3.5 text-[#f5ba13]" />
                  <span>Student Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mohamed Ahmed Ibrahim"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formControl.options?.requirePhone !== false && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-[#f5ba13]" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      type="tel"
                      maxLength={11}
                      placeholder="e.g. 01012345678"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                      required
                    />
                  </div>
                )}

                {formControl.options?.requireEmail !== false && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-[#f5ba13]" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. student@himit.edu.eg"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                      required
                    />
                  </div>
                )}
              </div>

              {formControl.options?.requireCodeforces === true && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Codeforces Handle *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. tourist / Mohamed_HIMIT"
                    value={formData.codeforces}
                    onChange={(e) => updateField('codeforces', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-sky-400 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>
              )}

              {formControl.options?.requireAcademicDetails === true && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Institution
                    </label>
                    <select
                      value={formData.university}
                      onChange={(e) => updateField('university', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#070b16] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#f5ba13] cursor-pointer"
                    >
                      <option value="HIMIT">HIMIT</option>
                      <option value="HIET">HIET</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Faculty / Major
                    </label>
                    <select
                      value={formData.major}
                      onChange={(e) => updateField('major', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#070b16] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#f5ba13] cursor-pointer"
                    >
                      <option value="Computer Science">Computer Science</option>
                      <option value="Information Systems">Information Systems</option>
                      <option value="Business Administration">Business Admin</option>
                      <option value="Accounting">Accounting</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Academic Year
                    </label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => updateField('academicYear', e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#070b16] border border-white/10 text-white text-xs font-sans focus:outline-none focus:border-[#f5ba13] cursor-pointer"
                    >
                      <option value="Prep Year">Prep Year</option>
                      <option value="Year 1">Year 1</option>
                      <option value="Year 2">Year 2</option>
                      <option value="Year 3">Year 3</option>
                      <option value="Year 4">Year 4</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                </div>
              )}

              {formControl.options?.allowNotesField !== false && (
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Session Notes or Questions for Mentors (Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any topics you want the mentors to cover or feedback on today's lecture..."
                    value={formData.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                  />
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={onNavigateHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 font-sans font-semibold text-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Recording Attendance...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm My Attendance</span>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {submittedData && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#090e1a]/95 border border-[#10b981]/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] space-y-8 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-[#10b981]/15 border border-[#10b981]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-10 h-10 text-[#10b981]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] font-mono text-xs font-bold">
                <span>ATTENDANCE RECORDED &amp; VERIFIED</span>
              </div>

              <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
                Thank You, {submittedData.member_name || submittedData.name}!
              </h2>

              <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                {formControl.options?.confirmationMessage || `Attendance has been verified for Session #${submittedData.session_number} (${submittedData.session_title}). Great job!`}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#060a14] border border-white/10 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Attendance ID:</span>
                <span className="text-[#f5ba13] font-bold">{submittedData.id}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Attendee:</span>
                <span className="text-white font-semibold">{submittedData.member_name || submittedData.name}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Session:</span>
                <span className="text-[#38bdf8] font-bold">Session #{submittedData.session_number} · {submittedData.session_type?.toUpperCase()}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Date:</span>
                <span className="text-slate-200">{submittedData.display_date || submittedData.date}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Verification Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> PRESENT
                </span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1224] border border-white/10 max-w-lg mx-auto space-y-4 text-left">
              <div className="font-pixel text-base font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Stay Connected with ICPC HIMIT</span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                Weekly problem sheets, lecture recordings, and editorial discussions are shared in our official channels:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={formControl.options?.communityWhatsappLink || 'https://chat.whatsapp.com/ICPC-HIMIT-Official'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-sans font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-black" />
                  <span>Join WhatsApp Group</span>
                </a>
                <a
                  href={formControl.options?.communityDiscordLink || 'https://discord.gg/icpc-himit'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-sans font-bold text-xs shadow-md transition-colors"
                >
                  <Terminal className="w-4 h-4 text-white" />
                  <span>Join Discord Server</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handleResetForAnother}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Log Another Student
              </button>

              <button
                type="button"
                onClick={onNavigateHome}
                className="px-6 py-3 rounded-xl bg-[#10b981] hover:bg-[#059669] text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

