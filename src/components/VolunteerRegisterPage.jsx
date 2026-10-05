import React, { useState, useEffect } from 'react'
import { 
  User, Mail, Phone, CreditCard, Camera, UploadCloud, 
  GraduationCap, Building2, BookOpen, Code2, CheckCircle2, 
  ArrowRight, ArrowLeft, AlertCircle, Trash2, ShieldCheck, Users, PenTool, Megaphone,
  MessageCircle, Terminal, Clock
} from 'lucide-react'
import { submitVolunteerApplication, fetchCommittees } from '../lib/database.js'
import { getFormControl, fetchFormControls, subscribeToFormControls } from '../lib/formControlService.js'
import { processAndUploadImage } from '../lib/imageUploadService.js'
import FormClosedNotice from './FormClosedNotice.jsx'

export default function VolunteerRegisterPage({ onNavigateHome, onNavigateCommittees }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [formControl, setFormControl] = useState(() => getFormControl('volunteer_registration'))

  useEffect(() => {
    fetchFormControls().then((controls) => {
      if (controls?.volunteer_registration) setFormControl(controls.volunteer_registration)
    }).catch(() => {})

    const unsub = subscribeToFormControls((controls) => {
      if (controls?.volunteer_registration) setFormControl(controls.volunteer_registration)
    })
    return () => unsub()
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationalId: '',
    image: null,
    nationalIdFront: null,
    nationalIdBack: null,
    university: 'HIMIT',
    customUniversity: '',
    major: 'Computer Science',
    customMajor: '',
    academicYear: 'Year 1',
    committeeId: 'technical-training',
    secondCommitteeId: '',
    availabilityHours: '5 - 10 hours / week',
    codeforces: '',
    answers: {}
  })

  const [previews, setPreviews] = useState({
    image: null,
    nationalIdFront: null,
    nationalIdBack: null
  })

  const [uploadingFields, setUploadingFields] = useState({
    image: false,
    nationalIdFront: false,
    nationalIdBack: false
  })

  const committees = [
    {
      id: 'technical-training',
      name: 'Technical & Training',
      tag: 'ACADEMIC & CONTESTS',
      icon: Code2,
      accent: '#818cf8',
      desc: 'Problem solving sessions, algorithms workshops, mock contests, and mentorship.'
    },
    {
      id: 'organization-media',
      name: 'Organization & Media',
      tag: 'LOGISTICS & MEDIA',
      icon: Users,
      accent: '#2dd4bf',
      desc: 'Event planning, lab bookings, photography, video coverage, and announcements.'
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design & Materials',
      tag: 'VISUAL BRANDING',
      icon: PenTool,
      accent: '#f43f5e',
      desc: 'Poster artwork, presentation slides, social media visuals, and event identity.'
    },
    {
      id: 'hr-pr-leadership',
      name: 'HR, PR & Leadership',
      tag: 'COMMUNITY & SPONSORS',
      icon: Megaphone,
      accent: '#f5ba13',
      desc: 'Team coordination, student support, public relations, and partnerships.'
    }
  ]

  const isEngineering = 
    formData.university === 'HIET' || 
    formData.university.toLowerCase().includes('engineering') || 
    (formData.university === 'Other' && formData.customUniversity.toLowerCase().includes('engineering'))

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrorMessage('')
  }

  const updateAnswer = (questionId, label, answer) => {
    setFormData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: { label, answer }
      }
    }))
    setErrorMessage('')
  }

  const handleFileUpload = async (field, file) => {
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds 10MB limit.')
      return
    }
    setUploadingFields(prev => ({ ...prev, [field]: true }))
    setErrorMessage('')

    try {
      const res = await processAndUploadImage(file, {
        bucket: 'applications',
        folder: field === 'image' ? 'volunteers/photos' : 'volunteers/national_id'
      })
      if (res) {
        setPreviews(prev => ({ ...prev, [field]: res.preview }))
        setFormData(prev => ({ ...prev, [field]: res.value }))
      }
    } catch (err) {
      console.error('Volunteer file upload failed:', err)
      setErrorMessage('Failed to process image. Please try another photo.')
    } finally {
      setUploadingFields(prev => ({ ...prev, [field]: false }))
    }
  }

  const removeFile = (field) => {
    setPreviews(prev => ({ ...prev, [field]: null }))
    setFormData(prev => ({ ...prev, [field]: null }))
  }

  const validateStep1 = () => {
    if (!formData.name.trim() || formData.name.trim().length < 3) {
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
      setErrorMessage('Please specify your university/institution name.')
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
    return true
  }

  const validateStep3 = () => {
    const isCodeforcesRequired = Boolean(formControl.options?.requireCodeforces) || 
      (formData.committeeId === 'technical-training' && formControl.options?.allowCommitteeSelection !== false)
    if (isCodeforcesRequired) {
      if (!formData.codeforces.trim()) {
        setErrorMessage('Codeforces handle is required for this application.')
        return false
      }
    }
    if (formControl.options?.allowWhyJoinField !== false) {
      const motivation = formData.answers['motivation']?.answer || ''
      if (!motivation.trim() || motivation.trim().length < 5) {
        setErrorMessage('Please provide your motivation for volunteering (at least 5 characters).')
        return false
      }
    }
    if (formControl.options?.requirePortfolioLink) {
      const portfolio = formData.answers['portfolio']?.answer || ''
      if (!portfolio.trim()) {
        setErrorMessage('Portfolio or work link is required.')
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
      const committeeName = formControl.options?.allowCommitteeSelection === false
        ? 'HR Placement Pool'
        : (committees.find(c => c.id === formData.committeeId)?.name || 'Technical & Training')
      const secondCommitteeName = formData.secondCommitteeId
        ? (committees.find(c => c.id === formData.secondCommitteeId)?.name || formData.secondCommitteeId)
        : ''

      const enrichedAnswers = {
        ...formData.answers,
        ...(secondCommitteeName ? { second_committee: { label: 'Second Committee Choice', answer: secondCommitteeName } } : {}),
        ...(formData.availabilityHours ? { availability: { label: 'Weekly Availability', answer: formData.availabilityHours } } : {})
      }

      const res = await submitVolunteerApplication({
        ...formData,
        committee: committeeName,
        committeeAnswers: enrichedAnswers
      })
      setSubmittedData({
        ...res.data,
        secondCommittee: secondCommitteeName,
        availability: formData.availabilityHours
      })
      setIsSubmitting(false)
      setCurrentStep(4)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setErrorMessage(err.message || 'Failed to submit application')
      setIsSubmitting(false)
    }
  }

  const stepsList = [
    { num: 1, title: 'Personal Details' },
    { num: 2, title: 'Academic Info' },
    { num: 3, title: 'Committee & Skills' }
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
          <div className="p-4 rounded-2xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-center gap-3 text-xs sm:text-sm font-mono text-[#38bdf8] animate-fade-in shadow-[0_0_20px_rgba(56,189,248,0.1)]">
            <Megaphone className="w-5 h-5 flex-shrink-0 text-[#38bdf8]" />
            <span>{formControl.bannerMessage}</span>
          </div>
        )}

        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5ba13]/10 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-bold tracking-wider uppercase">
            <span>OFFICIAL VOLUNTEER REGISTRATION</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl font-bold tracking-normal text-white leading-tight">
            Volunteer Application<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              ICPC HIMIT Community
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Join our organizing committee and help shape the future of competitive programming, contests, and technical workshops at HIMIT.
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
                Step 1: Personal Identification
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Please provide accurate contact info and valid national identification documents.
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
                  placeholder="e.g. Mohamed Ahmed Ibrahim"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
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
                    placeholder="e.g. mohamed@example.com"
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

              {formControl.options?.requireNationalId !== false && (
                <div className="space-y-2 animate-fade-in">
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

              {(formControl.options?.requireNationalId !== false || formControl.options?.requireProfileImage !== false) && (
                <div className="space-y-4 pt-4 border-t border-white/5 animate-fade-in">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#f5ba13]" />
                    <span>Required Document Uploads</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    {formControl.options?.requireProfileImage !== false && (
                      <div className="p-4 rounded-2xl bg-[#070b16] border border-white/10 flex flex-col justify-between space-y-3">
                        <div className="font-mono text-[11px] font-bold text-slate-300">
                          Personal Photo *
                        </div>
                        {uploadingFields.image ? (
                          <div className="w-full h-32 rounded-xl border border-[#f5ba13]/30 bg-white/5 flex flex-col items-center justify-center p-3 text-center">
                            <div className="w-6 h-6 border-2 border-[#f5ba13] border-t-transparent rounded-full animate-spin mb-2" />
                            <span className="font-mono text-[11px] text-[#f5ba13] font-bold">Uploading Photo...</span>
                          </div>
                        ) : previews.image ? (
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
                            <span className="text-[9px] text-slate-500 font-mono mt-0.5">JPG, PNG (Max 10MB)</span>
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
                          {uploadingFields.nationalIdFront ? (
                            <div className="w-full h-32 rounded-xl border border-[#f5ba13]/30 bg-white/5 flex flex-col items-center justify-center p-3 text-center">
                              <div className="w-6 h-6 border-2 border-[#f5ba13] border-t-transparent rounded-full animate-spin mb-2" />
                              <span className="font-mono text-[11px] text-[#f5ba13] font-bold">Uploading Front...</span>
                            </div>
                          ) : previews.nationalIdFront ? (
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
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">JPG, PNG (Max 10MB)</span>
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
                          {uploadingFields.nationalIdBack ? (
                            <div className="w-full h-32 rounded-xl border border-[#f5ba13]/30 bg-white/5 flex flex-col items-center justify-center p-3 text-center">
                              <div className="w-6 h-6 border-2 border-[#f5ba13] border-t-transparent rounded-full animate-spin mb-2" />
                              <span className="font-mono text-[11px] text-[#f5ba13] font-bold">Uploading Back...</span>
                            </div>
                          ) : previews.nationalIdBack ? (
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
                              <span className="text-[9px] text-slate-500 font-mono mt-0.5">JPG, PNG (Max 10MB)</span>
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
                Step 2: Academic Background
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Tell us about your university, faculty, department, and current study year.
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
                  <option value="HIMIT">HIMIT (Management &amp; Tech Institute)</option>
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
                <span>Continue to Committee Selection</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl bg-[#090e1a]/95 border border-white/10 shadow-2xl space-y-8 animate-fade-in">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal">
                Step 3: Committee Preference &amp; Experience
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-400">
                Select your preferred team and demonstrate your relevant skills or portfolio.
              </p>
            </div>

            <div className="space-y-6">
              
              {formControl.options?.allowCommitteeSelection !== false ? (
                <div className="space-y-3">
                  <label className="font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    Select Your Preferred Committee *
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {committees.map(committee => {
                      const isSelected = formData.committeeId === committee.id
                      const Icon = committee.icon
                      return (
                        <div
                          key={committee.id}
                          onClick={() => updateField('committeeId', committee.id)}
                          className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 relative ${
                            isSelected
                              ? 'bg-[#0f172a] border-[#f5ba13] shadow-[0_0_20px_rgba(245,186,19,0.2)] ring-1 ring-[#f5ba13]'
                              : 'bg-[#070b16] border-white/10 hover:border-white/20 hover:bg-[#0b1122]'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-4 right-4">
                              <CheckCircle2 className="w-5 h-5 text-[#f5ba13]" />
                            </div>
                          )}

                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-xl flex items-center justify-center border"
                              style={{ 
                                backgroundColor: `${committee.accent}15`,
                                borderColor: `${committee.accent}30`
                              }}
                            >
                              <Icon className="w-5 h-5" style={{ color: committee.accent }} />
                            </div>
                            <div>
                              <div className="font-pixel text-base font-bold text-white leading-tight">
                                {committee.name}
                              </div>
                              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                                {committee.tag}
                              </div>
                            </div>
                          </div>

                          <p className="font-sans text-xs text-slate-400 leading-relaxed">
                            {committee.desc}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#f5ba13]/10 border border-[#f5ba13]/30 flex items-center gap-3 text-xs sm:text-sm font-sans text-amber-300">
                  <Users className="w-5 h-5 flex-shrink-0 text-[#f5ba13]" />
                  <span>
                    Committee assignments for this cycle will be determined by the HR team based on your background and screening interview.
                  </span>
                </div>
              )}

              {formControl.options?.allowSecondCommitteeChoice && formControl.options?.allowCommitteeSelection !== false && (
                <div className="space-y-2 pt-2 animate-fade-in">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Users className="w-3.5 h-3.5 text-[#f5ba13]" />
                    <span>Secondary Committee Preference (Backup Choice - Optional)</span>
                  </label>
                  <select
                    value={formData.secondCommitteeId}
                    onChange={(e) => updateField('secondCommitteeId', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                  >
                    <option value="">-- No second preference --</option>
                    {committees
                      .filter(c => c.id !== formData.committeeId)
                      .map(c => (
                        <option key={c.id} value={c.id}>{c.name} ({c.tag})</option>
                      ))}
                  </select>
                </div>
              )}

              <div className="space-y-2 pt-2">
                <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>
                    Codeforces Handle {
                      formControl.options?.requireCodeforces 
                        ? '(Required for All Applicants) *' 
                        : (formData.committeeId === 'technical-training' && formControl.options?.allowCommitteeSelection !== false) 
                          ? '(Required for Technical Team) *' 
                          : '(Optional)'
                    }
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. tourist / Mohamed_HIMIT"
                  value={formData.codeforces}
                  onChange={(e) => updateField('codeforces', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-sky-400 placeholder:text-slate-500 text-sm font-mono focus:outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all"
                  required={Boolean(formControl.options?.requireCodeforces) || (formData.committeeId === 'technical-training' && formControl.options?.allowCommitteeSelection !== false)}
                />
              </div>

              {formControl.options?.allowAvailabilityField !== false && (
                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Weekly Available Hours Commitment *</span>
                  </label>
                  <select
                    value={formData.availabilityHours}
                    onChange={(e) => updateField('availabilityHours', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070b16] border border-white/10 text-white text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all cursor-pointer"
                  >
                    <option value="5 - 10 hours / week">5 - 10 hours / week</option>
                    <option value="10 - 15 hours / week">10 - 15 hours / week</option>
                    <option value="15+ hours / week">15+ hours / week (High Commitment)</option>
                  </select>
                </div>
              )}

              <div className="space-y-4 p-5 rounded-2xl bg-[#070b16] border border-white/10">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#f5ba13] pb-2 border-b border-white/5 flex items-center justify-between">
                  <span>Committee Motivation &amp; Skills Assessment</span>
                </div>

                {formControl.options?.allowWhyJoinField !== false && (
                  <div className="space-y-2">
                    <label className="font-sans text-xs font-semibold text-slate-300">
                      Why do you want to volunteer, and what can you contribute to ICPC HIMIT? *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe your background, motivation, and why you are passionate about this role..."
                      value={formData.answers['motivation']?.answer || ''}
                      onChange={(e) => updateAnswer('motivation', 'Why join committee', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                      required
                    />
                  </div>
                )}

                {formControl.options?.allowExperienceField !== false && (
                  <div className="space-y-2 pt-2">
                    <label className="font-sans text-xs font-semibold text-slate-300">
                      Prior Extracurricular, Student Activity or Volunteering Experience (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="List any clubs, activities, student unions, or projects you previously took part in..."
                      value={formData.answers['experience']?.answer || ''}
                      onChange={(e) => updateAnswer('experience', 'Prior Experience', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    />
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <label className="font-sans text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Links to your Work / Portfolio / GitHub / LinkedIn / Designs</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formControl.options?.requirePortfolioLink ? '(Required) *' : '(Optional)'}
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/... or https://behance.net/..."
                    value={formData.answers['portfolio']?.answer || ''}
                    onChange={(e) => updateAnswer('portfolio', 'Portfolio link', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#050811] border border-white/10 text-slate-200 placeholder:text-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all"
                    required={Boolean(formControl.options?.requirePortfolioLink)}
                  />
                </div>
              </div>

              {formControl.options?.interviewInstructions && (
                <div className="p-4 rounded-2xl bg-[#0f172a] border border-[#38bdf8]/30 flex items-start gap-3 text-xs sm:text-sm font-sans text-sky-200 animate-fade-in">
                  <Terminal className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-1">
                      Recruitment &amp; Interview Guidelines
                    </div>
                    <p className="text-slate-300 leading-relaxed text-xs">
                      {formControl.options.interviewInstructions}
                    </p>
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Volunteer Application</span>
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {currentStep === 4 && submittedData && (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#090e1a]/95 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] space-y-8 text-center animate-fade-in">
            
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-10 h-10 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                <span>APPLICATION RECEIVED</span>
              </div>

              <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
                Thank You, {submittedData.name}!
              </h2>

              <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                {formControl.options?.confirmationMessage || `Your volunteer application for the ${submittedData.committee} team has been successfully recorded.`}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#060a14] border border-white/10 max-w-md mx-auto text-left space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Application ID:</span>
                <span className="text-[#f5ba13] font-bold">{submittedData.id}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-slate-400">Target Committee:</span>
                <span className="text-white font-semibold">{submittedData.committee}</span>
              </div>
              {submittedData.secondCommittee && (
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Secondary Preference:</span>
                  <span className="text-slate-200 font-semibold">{submittedData.secondCommittee}</span>
                </div>
              )}
              {submittedData.availability && (
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Weekly Commitment:</span>
                  <span className="text-emerald-400 font-semibold">{submittedData.availability}</span>
                </div>
              )}
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
                <span className="text-amber-400 font-bold">{submittedData.status}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b1224] border border-white/10 max-w-lg mx-auto space-y-4 text-left">
              <div className="font-pixel text-base font-bold text-white flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                <span>Join Official Community Channels</span>
              </div>
              <p className="font-sans text-xs text-slate-400">
                Join our community to stay updated on interview announcements, committee results, and upcoming events:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {formControl.options?.communityWhatsappLink && (
                  <a
                    href={formControl.options.communityWhatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-sans font-bold text-sm shadow-md transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-black" />
                    <span>Join Official WhatsApp Group</span>
                  </a>
                )}
              </div>
            </div>

            <p className="font-sans text-xs text-slate-400 max-w-md mx-auto">
              Our committee heads will review your submitted profile and contact you via WhatsApp / Phone to schedule an interview.
            </p>

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
                onClick={onNavigateCommittees}
                className="px-6 py-3 rounded-xl bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,186,19,0.35)] transition-all cursor-pointer"
              >
                Explore Committees
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

