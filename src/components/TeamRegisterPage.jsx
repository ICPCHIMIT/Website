import React, { useState } from 'react'
import { 
  Users, User, Mail, Phone, Code2, CheckCircle2, 
  ArrowRight, ArrowLeft, AlertCircle, ShieldCheck, 
  Trophy, RotateCcw, Building2
} from 'lucide-react'

export default function TeamRegisterPage({ onNavigateHome }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState({
    teamName: '',
    institution: 'HIMIT (Higher Institute of Management & Technology)',
    customInstitution: '',
    l1Name: '',
    l1Email: '',
    l1Phone: '',
    l1Codeforces: '',
    m2Name: '',
    m2Email: '',
    m2Phone: '',
    m2Codeforces: '',
    m3Name: '',
    m3Email: '',
    m3Phone: '',
    m3Codeforces: ''
  })

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrorMessage('')
  }

  const validateStep1 = () => {
    if (!formData.teamName.trim() || formData.teamName.trim().length < 2) {
      setErrorMessage('Team name must be at least 2 characters.')
      return false
    }
    if (!formData.l1Name.trim() || formData.l1Name.trim().length < 3) {
      setErrorMessage('Leader 1 full name is required (at least 3 characters).')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.l1Email.trim())) {
      setErrorMessage('Invalid email address for Leader 1.')
      return false
    }
    const phoneRegex = /^01[0125][0-9]{8}$/
    if (!phoneRegex.test(formData.l1Phone.trim().replace(/\s+/g, ''))) {
      setErrorMessage('Please enter a valid 11-digit phone number for Leader 1 (e.g. 01xxxxxxxxx).')
      return false
    }
    if (!formData.l1Codeforces.trim() || formData.l1Codeforces.trim().length < 2) {
      setErrorMessage('Codeforces handle for Leader 1 is required.')
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (!formData.m2Name.trim() || formData.m2Name.trim().length < 3) {
      setErrorMessage('Member 2 full name is required (at least 3 characters).')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.m2Email.trim())) {
      setErrorMessage('Invalid email address for Member 2.')
      return false
    }
    const phoneRegex = /^01[0125][0-9]{8}$/
    if (!phoneRegex.test(formData.m2Phone.trim().replace(/\s+/g, ''))) {
      setErrorMessage('Please enter a valid 11-digit phone number for Member 2 (e.g. 01xxxxxxxxx).')
      return false
    }
    if (!formData.m2Codeforces.trim() || formData.m2Codeforces.trim().length < 2) {
      setErrorMessage('Codeforces handle for Member 2 is required.')
      return false
    }
    return true
  }

  const validateStep3 = () => {
    if (!formData.m3Name.trim() || formData.m3Name.trim().length < 3) {
      setErrorMessage('Member 3 full name is required (at least 3 characters).')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.m3Email.trim())) {
      setErrorMessage('Invalid email address for Member 3.')
      return false
    }
    const phoneRegex = /^01[0125][0-9]{8}$/
    if (!phoneRegex.test(formData.m3Phone.trim().replace(/\s+/g, ''))) {
      setErrorMessage('Please enter a valid 11-digit phone number for Member 3 (e.g. 01xxxxxxxxx).')
      return false
    }
    if (!formData.m3Codeforces.trim() || formData.m3Codeforces.trim().length < 2) {
      setErrorMessage('Codeforces handle for Member 3 is required.')
      return false
    }
    return true
  }

  const handleNextStep = (e) => {
    e?.preventDefault()
    if (currentStep === 1) {
      if (!validateStep1()) return
    } else if (currentStep === 2) {
      if (!validateStep2()) return
    }
    setErrorMessage('')
    setCurrentStep(prev => prev + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePrevStep = (e) => {
    e?.preventDefault()
    setErrorMessage('')
    setCurrentStep(prev => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateStep3()) return
    setIsSubmitting(true)

    setTimeout(() => {
      const teamId = `TEAM-${Math.floor(100000 + Math.random() * 900000)}`
      const inst = formData.institution === 'Other' ? formData.customInstitution : formData.institution

      const record = {
        id: teamId,
        team_name: formData.teamName.trim(),
        institution: inst,
        leader_name: formData.l1Name.trim(),
        leader_email: formData.l1Email.trim(),
        leader_phone: formData.l1Phone.trim(),
        leader_codeforces: formData.l1Codeforces.trim(),
        member2_name: formData.m2Name.trim(),
        member2_email: formData.m2Email.trim(),
        member2_phone: formData.m2Phone.trim(),
        member2_codeforces: formData.m2Codeforces.trim(),
        member3_name: formData.m3Name.trim(),
        member3_email: formData.m3Email.trim(),
        member3_phone: formData.m3Phone.trim(),
        member3_codeforces: formData.m3Codeforces.trim(),
        status: 'Official Roster',
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      }

      try {
        const saved = JSON.parse(localStorage.getItem('icpc_teams') || '[]')
        saved.unshift(record)
        localStorage.setItem('icpc_teams', JSON.stringify(saved))
      } catch (err) {}

      setSubmittedData(record)
      setIsSubmitting(false)
      setCurrentStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1200)
  }

  const handleReset = () => {
    setFormData({
      teamName: '',
      institution: 'HIMIT (Higher Institute of Management & Technology)',
      customInstitution: '',
      l1Name: '',
      l1Email: '',
      l1Phone: '',
      l1Codeforces: '',
      m2Name: '',
      m2Email: '',
      m2Phone: '',
      m2Codeforces: '',
      m3Name: '',
      m3Email: '',
      m3Phone: '',
      m3Codeforces: ''
    })
    setSubmittedData(null)
    setErrorMessage('')
    setCurrentStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const stepsList = [
    { num: 1, title: 'Team & Leader 1' },
    { num: 2, title: 'Member 2 Details' },
    { num: 3, title: 'Member 3 Details' }
  ]

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 py-10 sm:py-16 md:py-20 bg-stars">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5ba13]/10 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-bold tracking-wider uppercase shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-[#f5ba13]" />
            <span>ICPC Team Registration • Official Roster</span>
          </div>

          <h1 className="font-pixel text-2xl sm:text-5xl font-bold tracking-normal text-white leading-tight">
            Register Your 3-Member Team<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              ICPC HIMIT Contests
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Form your competitive programming trio. Register complete profile handles for Leader 1, Member 2, and Member 3.
          </p>

          <div className="w-12 h-1 bg-[#f5ba13] mx-auto rounded-sm shadow-[0_0_12px_#f5ba13] animate-glow-gold" />
        </div>

        {currentStep < 4 && (
          <div className="p-3.5 sm:p-6 rounded-2xl bg-[#080d1a] border border-white/10 shadow-xl space-y-4 sm:space-y-6">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
              {stepsList.map(step => {
                const isActive = currentStep === step.num
                const isDone = currentStep > step.num
                return (
                  <div 
                    key={step.num}
                    className={`flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 p-2 sm:p-3 rounded-xl border transition-all duration-300 text-center sm:text-left ${
                      isActive 
                        ? 'bg-[#0f172a] border-[#f5ba13] shadow-[0_0_15px_rgba(245,186,19,0.2)]'
                        : isDone
                        ? 'bg-[#0a1224] border-emerald-500/40 text-emerald-400'
                        : 'bg-[#070b16] border-white/5 text-slate-500'
                    }`}
                  >
                    <div 
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center font-mono text-[11px] sm:text-xs font-bold flex-shrink-0 ${
                        isActive 
                          ? 'bg-[#f5ba13] text-black shadow-[0_0_10px_#f5ba13]'
                          : isDone
                          ? 'bg-emerald-500 text-black font-extrabold'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : step.num}
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 leading-none">
                        Step {step.num}
                      </div>
                      <div className={`font-sans text-[10px] sm:text-xs font-bold truncate mt-0.5 ${isActive ? 'text-white' : isDone ? 'text-slate-200' : 'text-slate-500'}`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="w-full bg-[#0e1628] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#f5ba13] to-[#38bdf8] h-full transition-all duration-500 rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center gap-3 text-red-200 font-sans text-xs sm:text-sm animate-fade-in shadow-lg">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {currentStep === 1 && (
          <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#f5ba13]/10 border border-[#f5ba13]/30 font-mono text-[11px] font-bold text-[#f5ba13] uppercase tracking-wider">
                Step 1 of 3
              </div>
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal pt-1">
                Team Name &amp; Leader 1 Profile
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Choose a unique team name and provide contact information for the primary team leader.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="p-4 sm:p-5 rounded-2xl bg-[#070b16] border border-white/10 space-y-4">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#f5ba13] flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#f5ba13]" />
                  <span>Team Identity</span>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Official Team Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Code Knights / Algorithmic Aces"
                    value={formData.teamName}
                    onChange={(e) => updateField('teamName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Building2 className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Institution / University</span>
                  </label>
                  <select
                    value={formData.institution}
                    onChange={(e) => updateField('institution', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                  >
                    <option value="HIMIT (Higher Institute of Management & Technology)">HIMIT (Higher Institute of Management &amp; Technology)</option>
                    <option value="HIET (Higher Institute of Engineering & Technology)">HIET (Higher Institute of Engineering &amp; Technology)</option>
                    <option value="Kafr Elsheikh University">Kafr Elsheikh University</option>
                    <option value="Cairo University">Cairo University</option>
                    <option value="Ain Shams University">Ain Shams University</option>
                    <option value="Other">Other Institution...</option>
                  </select>
                </div>

                {formData.institution === 'Other' && (
                  <div className="space-y-2 animate-fade-in">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Custom Institution Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alexandria University"
                      value={formData.customInstitution}
                      onChange={(e) => updateField('customInstitution', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-[#070b16] border border-white/10 space-y-5">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#38bdf8]" />
                  <span>Leader 1 Details</span>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Leader 1 Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leader Full Name"
                    value={formData.l1Name}
                    onChange={(e) => updateField('l1Name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>Leader 1 Email *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="leader@example.com"
                      value={formData.l1Email}
                      onChange={(e) => updateField('l1Email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>Leader 1 Phone *</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="01012345678"
                      value={formData.l1Phone}
                      onChange={(e) => updateField('l1Phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Leader 1 Codeforces Handle *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. tourist"
                    value={formData.l1Codeforces}
                    onChange={(e) => updateField('l1Codeforces', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-sky-400 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={onNavigateHome}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 font-sans font-semibold text-xs transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,186,19,0.35)] transition-all cursor-pointer"
              >
                <span>Continue to Member 2</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#38bdf8]/10 border border-[#38bdf8]/30 font-mono text-[11px] font-bold text-[#38bdf8] uppercase tracking-wider">
                Step 2 of 3
              </div>
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal pt-1">
                Member 2 Profile
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Enter contact and Codeforces handles for the second contestant in your team trio.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#070b16] border border-white/10 space-y-5">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-2">
                <User className="w-4 h-4 text-[#38bdf8]" />
                <span>Member 2 Details</span>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  Member 2 Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Member 2 Full Name"
                  value={formData.m2Name}
                  onChange={(e) => updateField('m2Name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Member 2 Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="member2@example.com"
                    value={formData.m2Email}
                    onChange={(e) => updateField('m2Email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Member 2 Phone *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    value={formData.m2Phone}
                    onChange={(e) => updateField('m2Phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Member 2 Codeforces Handle *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. member2_cf"
                  value={formData.m2Codeforces}
                  onChange={(e) => updateField('m2Codeforces', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-sky-400 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-sans font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,186,19,0.35)] transition-all cursor-pointer"
              >
                <span>Continue to Member 3</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 font-mono text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                Step 3 of 3
              </div>
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal pt-1">
                Member 3 Profile &amp; Finalize
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Complete the roster with Member 3 information to register the full 3-member team.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#070b16] border border-white/10 space-y-5">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-2">
                <User className="w-4 h-4 text-[#38bdf8]" />
                <span>Member 3 Details</span>
              </div>

              <div className="space-y-2">
                <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  Member 3 Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Member 3 Full Name"
                  value={formData.m3Name}
                  onChange={(e) => updateField('m3Name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Member 3 Email *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="member3@example.com"
                    value={formData.m3Email}
                    onChange={(e) => updateField('m3Email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span>Member 3 Phone *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    value={formData.m3Phone}
                    onChange={(e) => updateField('m3Phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Member 3 Codeforces Handle *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. member3_cf"
                  value={formData.m3Codeforces}
                  onChange={(e) => updateField('m3Codeforces', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-sky-400 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                  required
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-sans font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Registering Trio Team...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Team Registration</span>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {currentStep === 4 && submittedData && (
          <div className="p-6 sm:p-12 rounded-3xl bg-[#090e1a]/95 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] space-y-8 text-center animate-fade-in">
            
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                <span>TEAM REGISTRATION CONFIRMED</span>
              </div>

              <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
                Team {submittedData.team_name} Registered!
              </h2>

              <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                Your 3-member team has been registered for official ICPC training sheets and contest sheets.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#060a14] border border-white/10 max-w-lg mx-auto text-left space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-slate-400">Team Reference ID:</span>
                <span className="text-[#f5ba13] font-bold">{submittedData.id}</span>
              </div>

              <div className="space-y-2 pb-3 border-b border-white/5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Team Members:
                </div>
                
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#f5ba13]/20 text-[#f5ba13] font-bold">L1</span>
                    <span className="text-white font-semibold">{submittedData.leader_name}</span>
                  </div>
                  <span className="text-sky-400">{submittedData.leader_codeforces}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#38bdf8]/20 text-[#38bdf8] font-bold">M2</span>
                    <span className="text-white font-semibold">{submittedData.member2_name}</span>
                  </div>
                  <span className="text-sky-400">{submittedData.member2_codeforces}</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#38bdf8]/20 text-[#38bdf8] font-bold">M3</span>
                    <span className="text-white font-semibold">{submittedData.member3_name}</span>
                  </div>
                  <span className="text-sky-400">{submittedData.member3_codeforces}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">{submittedData.status}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Back to Home
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,186,19,0.35)] transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-black" />
                <span>Register Another Team</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

