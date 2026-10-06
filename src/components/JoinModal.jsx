import React, { useState, useEffect } from 'react'
import { X, Code2, Users, ArrowRight, CheckCircle2, Trophy, BookOpen, ShieldCheck, Layers, Lock } from 'lucide-react'
import { getFormControl, subscribeToFormControls, fetchFormControls } from '../lib/formControlService'

export const VOLUNTEER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSe7av0P0d_QrfZyYgLgm0vYmkrZudZ2BH98RQepXDAh1p0WoQ/viewform?usp=send_form'
export const MEMBER_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScvsNfpnXgzavKJrLpwEzbw7SGmAFXB3itDjY_sgu4AkQXVwA/viewform?usp=send_form'

export default function JoinModal({ isOpen, onClose, onNavigate }) {
  const [selectedRole, setSelectedRole] = useState('member')
  const [memberControl, setMemberControl] = useState(() => getFormControl('member_registration'))
  const [volunteerControl, setVolunteerControl] = useState(() => getFormControl('volunteer_registration'))

  useEffect(() => {
    fetchFormControls().then((controls) => {
      if (controls?.member_registration) setMemberControl(controls.member_registration)
      if (controls?.volunteer_registration) setVolunteerControl(controls.volunteer_registration)
    }).catch(() => {})

    const unsubscribe = subscribeToFormControls((controls) => {
      if (controls?.member_registration) setMemberControl(controls.member_registration)
      if (controls?.volunteer_registration) setVolunteerControl(controls.volunteer_registration)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#080d1a] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#0b1224] to-[#080d1a]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#f5ba13]/15 border border-[#f5ba13]/30 flex items-center justify-center shadow-[0_0_12px_rgba(245,186,19,0.2)]">
              <Layers className="w-5 h-5 text-[#f5ba13]" />
            </div>
            <div>
              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-normal leading-none">
                Join ICPC HIMIT
              </h2>
              <p className="font-sans text-xs text-slate-400 mt-1">
                Choose how you would like to be part of our community
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div
              onClick={() => setSelectedRole('member')}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 relative ${
                selectedRole === 'member'
                  ? 'bg-[#0f172a] border-[#f5ba13] shadow-[0_0_25px_rgba(245,186,19,0.15)] ring-1 ring-[#f5ba13]'
                  : 'bg-[#0a0f1d] border-white/10 hover:border-white/20 hover:bg-[#0c1324]'
              }`}
            >
              {selectedRole === 'member' && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-[#f5ba13]" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#f5ba13]/15 border border-[#f5ba13]/30 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-[#f5ba13]" />
                  </div>
                  {!memberControl.isOpen && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                      <Lock className="w-3 h-3" /> Closed
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#f5ba13] tracking-wider uppercase">
                    Trainee / Contestant
                  </div>
                  <h3 className="font-pixel text-lg font-bold text-white mt-0.5">
                    Join as Member
                  </h3>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Master algorithms, solve curated problem sheets, receive mentorship, and compete in local &amp; national contests.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">Roadmap Access</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">Weekly Contests</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">Peer Mentorship</span>
              </div>
            </div>

            <div
              onClick={() => setSelectedRole('volunteer')}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 relative ${
                selectedRole === 'volunteer'
                  ? 'bg-[#0f172a] border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.15)] ring-1 ring-[#38bdf8]'
                  : 'bg-[#0a0f1d] border-white/10 hover:border-white/20 hover:bg-[#0c1324]'
              }`}
            >
              {selectedRole === 'volunteer' && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-[#38bdf8]" />
                </div>
              )}

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/15 border border-[#38bdf8]/30 flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#38bdf8]" />
                  </div>
                  {!volunteerControl.isOpen && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30">
                      <Lock className="w-3 h-3" /> Closed
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#38bdf8] tracking-wider uppercase">
                    Organizer / Committee
                  </div>
                  <h3 className="font-pixel text-lg font-bold text-white mt-0.5">
                    Join as Volunteer
                  </h3>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Contribute to event organization, technical coaching, graphic design, media production, and community leadership.
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">Technical Roles</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">Media &amp; Design</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10">Leadership HR</span>
              </div>
            </div>

          </div>

          <div className="p-4 rounded-xl bg-[#050811] border border-white/10 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-[#f5ba13]" />
              <span>
                {selectedRole === 'member' ? 'Member Journey Perks:' : 'Volunteer Perks & Opportunities:'}
              </span>
            </div>

            {selectedRole === 'member' ? (
              <ul className="space-y-2 font-sans text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#f5ba13] flex-shrink-0" />
                  <span>Structured curriculum across 3 Levels (Syntax to Advanced Graph &amp; DP).</span>
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#f5ba13] flex-shrink-0" />
                  <span>Participation in official ECPC qualifications and institute team contests.</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f5ba13] flex-shrink-0" />
                  <span>Access to private community discussion channels and editorial walkthroughs.</span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-2 font-sans text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                  <span>Real-world leadership and event organization experience.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                  <span>Shape the community by training new batches and setting challenge problems.</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
                  <span>Official certificates of contribution and recognition from HIMIT leadership.</span>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="p-5 border-t border-white/10 bg-[#060a14] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 text-slate-300 font-sans font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {selectedRole === 'member' ? (
              <>
                <button
                  onClick={() => {
                    onClose()
                    onNavigate('roadmap')
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-sans font-bold text-xs border border-white/10 transition-colors cursor-pointer"
                >
                  Explore Roadmap
                </button>
                <button
                  onClick={() => {
                    window.open(MEMBER_FORM_URL, '_blank', 'noopener,noreferrer')
                    onClose()
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs shadow-[0_0_15px_rgba(245,186,19,0.35)] transition-all cursor-pointer"
                >
                  <span>Register as Member</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    onClose()
                    onNavigate('committees')
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-sans font-bold text-xs border border-white/10 transition-colors cursor-pointer"
                >
                  View Committees
                </button>
                <button
                  onClick={() => {
                    window.open(VOLUNTEER_FORM_URL, '_blank', 'noopener,noreferrer')
                    onClose()
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#38bdf8] hover:bg-[#0284c7] text-black font-sans font-extrabold text-xs shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-all cursor-pointer"
                >
                  <span>Apply as Volunteer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
