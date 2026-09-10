import React, { useState, useEffect } from 'react'
import { 
  User, Mail, Phone, CreditCard, Camera, UploadCloud, 
  GraduationCap, Building2, BookOpen, Code2, CheckCircle2, 
  ArrowRight, ArrowLeft, AlertCircle, Trash2, ShieldCheck, 
  ExternalLink, MessageCircle, Terminal, Megaphone
} from 'lucide-react'
import { submitMemberApplication } from '../lib/database.js'
import { getFormControl, fetchFormControls, subscribeToFormControls } from '../lib/formControlService.js'
import FormClosedNotice from './FormClosedNotice.jsx'

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.97 0 1.75-.79 1.75-1.76s-.78-1.75-1.75-1.75c-.97 0-1.76.78-1.76 1.75s.79 1.76 1.76 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
    </svg>
  )
}

export default function MemberRegisterPage({ onNavigateHome, onNavigateRoadmap }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [formControl, setFormControl] = useState(() => getFormControl('member_registration'))

  useEffect(() => {
    fetchFormControls().then((controls) => {
      if (controls?.member_registration) setFormControl(controls.member_registration)
    }).catch(() => {})

    const unsub = subscribeToFormControls((controls) => {
      if (controls?.member_registration) setFormControl(controls.member_registration)
    })
    return () => unsub()
  }, [])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinLink: '',
    nationalId: '',
    image: null,
    nationalIdFront: null,
    nationalIdBack: null,
    university: 'HIMIT',
    customUniversity: '',
    major: 'Computer Science',
    customMajor: '',
    academicYear: 'Year 1',
    trackPreference: 'Level 1: Novice (C++ Basics & Problem Solving Fundamentals)',
    experience: '',
    codeforcesHandle: '',
    problemSolution: ''
  })

  const [previews, setPreviews] = useState({
    image: null,
    nationalIdFront: null,
    nationalIdBack: null
  })

  const isEngineering = 
    formData.university === 'HIET' || 
    formData.university.toLowerCase().includes('engineering') || 
    (formData.university === 'Other' && formData.customUniversity.toLowerCase().includes('engineering'))

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrorMessage('')
  }

  const handleFileUpload = (field, file) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size exceeds 5MB limit.')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviews(prev => ({ ...prev, [field]: reader.result }))
      setFormData(prev => ({ ...prev, [field]: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const removeFile = (field) => {
    setPreviews(prev => ({ ...prev, [field]: null }))
    setFormData(prev => ({ ...prev, [field]: null }))
  }

  const validateStep1 = () => {
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      setErrorMessage('Please enter your full name (at least 3 characters).')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.')
      return false
    }
    const phoneRegex = /^01[0125][0-9]{8}$/
    if (!phoneRegex.test(formData.phone.trim().replace(/\s+/g, ''))) {
      setErrorMessage('Please enter a valid 11-digit Egyptian phone number (e.g. 01xxxxxxxxx).')
      return false
    }
    if (formControl.options?.requireNationalId !== false) {
      if (!formData.nationalId.trim() || formData.nationalId.trim().length !== 14 || !/^\d+$/.test(formData.nationalId.trim())) {
        setErrorMessage('National ID number must be exactly 14 digits.')
        return false
      }
      if (!formData.nationalIdFront) {
        setErrorMessage('Please upload your National ID front side photo.')
        return false
      }
      if (!formData.nationalIdBack) {
        setErrorMessage('Please upload your National ID back side photo.')
        return false
      }
    }
    if (formControl.options?.requireProfileImage !== false) {
      if (!formData.image) {
        setErrorMessage('Please upload your personal profile photo.')
        return false
      }
    }
    return true
  }

  const validateStep2 = () => {
    if (formData.university === 'Other' && !formData.customUniversity.trim()) {
      setErrorMessage('Please specify your university or institution name.')
      return false
    }
    if (formData.major === 'Others' && !formData.customMajor.trim()) {
      setErrorMessage('Please specify your faculty or major.')
      return false
    }
    if (!formData.academicYear) {
      setErrorMessage('Please select your current academic year.')
      return false
    }
    if (formControl.options?.allowTrackPreference !== false) {
      if (!formData.trackPreference) {
        setErrorMessage('Please select your preferred training track.')
        return false
      }
    }
    return true
  }

  const validateStep3 = () => {
    if (!formData.codeforcesHandle.trim()) {
      setErrorMessage('Please enter your Codeforces handle or username.')
      return false
    }
    if (formControl.options?.requireProblemChallenge === true) {
      if (!formData.problemSolution.trim() || formData.problemSolution.trim().length < 5) {
        setErrorMessage('Please paste your code solution or Codeforces submission URL.')
        return false
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep3()) return
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const res = await submitMemberApplication(formData)
      setSubmittedData(res.data)
      setIsSubmitting(false)
      setCurrentStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit application')
      setIsSubmitting(false)
    }
  }

  const stepsList = [
    { num: 1, title: 'Personal Credentials' },
    { num: 2, title: 'Academic Details' },
    { num: 3, title: 'Competitive Profile' }
  ]

  if (!formControl.isOpen && !submittedData) {
    return (
      <FormClosedNotice
        title={formControl.closedTitle}
        message={formControl.closedMessage}
        deadline={formControl.deadline}
        onNavigateHome={onNavigateHome}
      />
    )
  }

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 py-12 md:py-20 bg-stars">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {formControl.bannerMessage && (
          <div className="p-4 rounded-2xl bg-[#f5ba13]/10 border border-[#f5ba13]/30 flex items-center gap-3 text-xs sm:text-sm font-mono text-[#f5ba13] animate-fade-in shadow-[0_0_20px_rgba(245,186,19,0.1)]">
            <Megaphone className="w-5 h-5 flex-shrink-0 text-[#f5ba13]" />
            <span>{formControl.bannerMessage}</span>
          </div>
        )}

        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5ba13]/10 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-bold tracking-wider uppercase">
            <span>OFFICIAL TRAINEE REGISTRATION</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl font-bold tracking-normal text-white leading-tight">
            Member Registration<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              ICPC HIMIT Training Program
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Join the competitive programming track at HIMIT: weekly problem sheets, live editorial walkthroughs, mock contests, and national team qualifications.
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
          <div className="p-6 sm:p-10 rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal">
                Step 1: Personal Credentials &amp; Verification
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Please enter your real legal name and upload clear identity documents for contest team registration.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <User className="w-3.5 h-3.5 text-[#f5ba13]" />
                  <span>Full Legal Name (الاسم ثلاثي أو رباعي) *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Mohamed Hassan"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Mail className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. ahmed@example.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Phone className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Phone / WhatsApp Number *</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 01012345678"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {formControl.options?.requireNationalId !== false && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      <CreditCard className="w-3.5 h-3.5 text-[#f5ba13]" />
                      <span>14-Digit National ID (الرقم القومي) *</span>
                    </label>
                    <input
                      type="text"
                      maxLength={14}
                      placeholder="e.g. 30101011234567"
                      value={formData.nationalId}
                      onChange={(e) => updateField('nationalId', e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-mono tracking-wider focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                      required
                    />
                  </div>
                )}

                {formControl.options?.allowLinkedinLink !== false && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      <LinkedinIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
                      <span>LinkedIn / Portfolio (Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={formData.linkedinLink}
                      onChange={(e) => updateField('linkedinLink', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                    />
                  </div>
                )}
              </div>

              {(formControl.options?.requireProfileImage !== false || formControl.options?.requireNationalId !== false) && (
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#f5ba13]" />
                    <span>Required Verification Documents</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {formControl.options?.requireProfileImage !== false && (
                      <div className="p-4 rounded-2xl bg-[#070b16] border border-white/10 flex flex-col justify-between space-y-3">
                        <div className="font-mono text-[11px] font-bold text-slate-300">
                          Personal Photo *
                        </div>
                        {previews.image ? (
                          <div className="relative group w-full h-32 rounded-xl overflow-hidden border border-[#f5ba13]/50">
                            <img src={previews.image} alt="Profile preview" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeFile('image')}
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <label className="w-full h-32 rounded-xl border-2 border-dashed border-white/15 hover:border-[#f5ba13]/60 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10">
                            <UploadCloud className="w-6 h-6 text-slate-400 mb-1.5" />
                            <span className="font-sans text-[11px] font-semibold text-slate-300">Choose photo</span>
                            <span className="text-[9px] text-slate-500 font-mono mt-0.5">JPG, PNG (Max 5MB)</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('image', e.target.files[0])}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    )}

                    {formControl.options?.requireNationalId !== false && (
                      <>
                        <div className="p-4 rounded-2xl bg-[#070b16] border border-white/10 flex flex-col justify-between space-y-3">
                          <div className="font-mono text-[11px] font-bold text-slate-300">
                            National ID (Front) *
                          </div>
                          {previews.nationalIdFront ? (
                            <div className="relative group w-full h-32 rounded-xl overflow-hidden border border-[#f5ba13]/50">
                              <img src={previews.nationalIdFront} alt="ID Front preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeFile('nationalIdFront')}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <label className="w-full h-32 rounded-xl border-2 border-dashed border-white/15 hover:border-[#f5ba13]/60 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10">
                              <UploadCloud className="w-6 h-6 text-slate-400 mb-1.5" />
                              <span className="font-sans text-[11px] font-semibold text-slate-300">Upload Front</span>
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">JPG, PNG (Max 5MB)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload('nationalIdFront', e.target.files[0])}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>

                        <div className="p-4 rounded-2xl bg-[#070b16] border border-white/10 flex flex-col justify-between space-y-3">
                          <div className="font-mono text-[11px] font-bold text-slate-300">
                            National ID (Back) *
                          </div>
                          {previews.nationalIdBack ? (
                            <div className="relative group w-full h-32 rounded-xl overflow-hidden border border-[#f5ba13]/50">
                              <img src={previews.nationalIdBack} alt="ID Back preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => removeFile('nationalIdBack')}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <label className="w-full h-32 rounded-xl border-2 border-dashed border-white/15 hover:border-[#f5ba13]/60 flex flex-col items-center justify-center p-3 text-center cursor-pointer transition-colors bg-white/5 hover:bg-white/10">
                              <UploadCloud className="w-6 h-6 text-slate-400 mb-1.5" />
                              <span className="font-sans text-[11px] font-semibold text-slate-300">Upload Back</span>
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">JPG, PNG (Max 5MB)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileUpload('nationalIdBack', e.target.files[0])}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
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
                <span>Continue to Academic Info</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-6 sm:p-10 rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal">
                Step 2: Academic Details &amp; Training Level
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Choose your university and the training track that matches your algorithmic experience.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-[#f5ba13]" />
                  <span>University / Institution *</span>
                </label>
                <select
                  value={formData.university}
                  onChange={(e) => updateField('university', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                >
                  <option value="HIMIT">HIMIT (Higher Institute of Management &amp; Information Technology)</option>
                  <option value="HIET">HIET (Higher Institute of Engineering &amp; Technology)</option>
                  <option value="Kafr Elsheikh University">Kafr Elsheikh University</option>
                  <option value="Cairo University">Cairo University</option>
                  <option value="Ain Shams University">Ain Shams University</option>
                  <option value="Other">Other Institution...</option>
                </select>
              </div>

              {formData.university === 'Other' && (
                <div className="space-y-2 animate-fade-in">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Custom University / Institution Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zewail City of Science and Technology"
                    value={formData.customUniversity}
                    onChange={(e) => updateField('customUniversity', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Faculty / Major *</span>
                  </label>
                  <select
                    value={formData.major}
                    onChange={(e) => updateField('major', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                  >
                    {isEngineering ? (
                      <>
                        <option value="Computer & Systems Engineering">Computer &amp; Systems Engineering</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Artificial Intelligence & Data Science">Artificial Intelligence &amp; Data Science</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Electrical & Communications Engineering">Electrical &amp; Communications Engineering</option>
                        <option value="Mechanical & Mechatronics Engineering">Mechanical &amp; Mechatronics Engineering</option>
                        <option value="Architecture Engineering">Architecture Engineering</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Others">Others...</option>
                      </>
                    ) : (
                      <>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Systems">Information Systems</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Artificial Intelligence & Data Science">Artificial Intelligence &amp; Data Science</option>
                        <option value="Business Administration & MIS">Business Administration &amp; MIS</option>
                        <option value="Others">Others...</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <GraduationCap className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Academic Year *</span>
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => updateField('academicYear', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                  >
                    {isEngineering && <option value="Prep Year">Prep Year (Preparatory Year)</option>}
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Year 4">Year 4</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

              </div>

              {formData.major === 'Others' && (
                <div className="space-y-2 animate-fade-in">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Custom Major Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Biomedical Engineering"
                    value={formData.customMajor}
                    onChange={(e) => updateField('customMajor', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    required
                  />
                </div>
              )}

              {formControl.options?.allowTrackPreference !== false && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Preferred Training Track / Level *</span>
                  </label>
                  <select
                    value={formData.trackPreference}
                    onChange={(e) => updateField('trackPreference', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                  >
                    <option value="Level 1: Novice (C++ Basics & Problem Solving Fundamentals)">
                      Level 0 / 1: Novice (C++ Basics &amp; Problem Solving Fundamentals)
                    </option>
                    <option value="Level 2: Intermediate (Data Structures & Standard Algorithms)">
                      Level 1 / 2: Intermediate (Data Structures &amp; Standard Algorithms)
                    </option>
                    <option value="Level 3: Advanced Contestants & Upsolve">
                      Level 2 / 3: Advanced Contestants &amp; Upsolve (Graph, DP, Math)
                    </option>
                  </select>
                </div>
              )}

              {formControl.options?.allowExperienceField !== false && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <span>Prior Programming Experience (Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Completed CS50, solved 100 problems on Codeforces/LeetCode, proficient in C++ and OOP..."
                    value={formData.experience}
                    onChange={(e) => updateField('experience', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                  />
                </div>
              )}

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
                <span>Continue to Coding Profile</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal">
                Step 3: Competitive Profile &amp; Challenge
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Connect your Codeforces handle and submit your solution for the entry verification challenge.
              </p>
            </div>

            <div className="space-y-6">
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Codeforces Handle / Username *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. tourist / Mohamed_HIMIT"
                  value={formData.codeforcesHandle}
                  onChange={(e) => updateField('codeforcesHandle', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-sky-400 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                  required
                />
              </div>

              {formControl.options?.requireProblemChallenge === true && (
                <div className="p-5 sm:p-6 rounded-2xl bg-[#070b16] border border-[#38bdf8]/30 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-5 h-5 text-[#38bdf8]" />
                      <span className="font-pixel text-base font-bold text-white">
                        {formControl.options?.problemTitle || 'Codeforces 4A - Watermelon Challenge'}
                      </span>
                    </div>
                    {formControl.options?.problemUrl && (
                      <a
                        href={formControl.options.problemUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] font-mono text-xs font-semibold transition-colors w-fit"
                      >
                        <span>Open Problem</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>

                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {formControl.options?.problemDescription || 'Solve the problem on Codeforces and paste your C++ / Python / Java solution code or your submission link below:'}
                  </p>

                  <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                      Solution Code or Submission URL *
                    </label>
                    <textarea
                      rows={6}
                      placeholder={`#include <iostream>\nusing namespace std;\n\nint main() {\n    int w;\n    cin >> w;\n    if (w > 2 && w % 2 == 0) cout << "YES\\n";\n    else cout << "NO\\n";\n    return 0;\n}`}
                      value={formData.problemSolution}
                      onChange={(e) => updateField('problemSolution', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#04060c] border border-white/15 text-sky-300 placeholder:text-slate-600 text-xs font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                      required
                    />
                  </div>
                </div>
              )}

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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] disabled:opacity-50 text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,186,19,0.4)] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Member Application</span>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {currentStep === 4 && submittedData && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#090e1a]/95 border border-[#f5ba13]/30 shadow-[0_0_50px_rgba(245,186,19,0.15)] space-y-8 text-center animate-fade-in">
            
            <div className="w-20 h-20 rounded-2xl bg-[#f5ba13]/15 border border-[#f5ba13]/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(245,186,19,0.3)]">
              <ShieldCheck className="w-10 h-10 text-[#f5ba13]" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5ba13]/10 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-bold">
                <span>MEMBERSHIP CONFIRMED</span>
              </div>

              <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
                Welcome to ICPC HIMIT, {submittedData.name}!
              </h2>

              <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                {formControl.options?.confirmationMessage || `Your member registration has been registered. You are enrolled in ${submittedData.track}.`}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#060a14] border border-white/10 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Member ID:</span>
                <span className="text-[#f5ba13] font-bold">{submittedData.id}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Codeforces:</span>
                <span className="text-sky-400 font-bold">{submittedData.codeforces}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Institution:</span>
                <span className="text-slate-200">{submittedData.university}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Submission Date:</span>
                <span className="text-slate-200">{submittedData.createdAt}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">{submittedData.status}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1224] border border-white/10 max-w-lg mx-auto space-y-4 text-left">
              <div className="font-pixel text-base font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Next Step: Join Official Community Channels</span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                Join our training discussion groups to receive weekly problem sheets, lab session schedules, and live mentor announcements:
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
                onClick={onNavigateHome}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs sm:text-sm transition-all cursor-pointer"
              >
                Back to Home
              </button>

              <button
                type="button"
                onClick={onNavigateRoadmap}
                className="px-6 py-3 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,186,19,0.35)] transition-all cursor-pointer"
              >
                View 36-Week Roadmap
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
