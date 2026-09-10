import React, { useState, useEffect } from 'react'
import { Code2, Users, PenTool, Megaphone, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'
import { committeesData } from '../data/committeesData'
import { fetchCommittees } from '../lib/websiteDataService'

function getCommitteeIcon(id) {
  switch (id) {
    case 'technical-training':
    case 'technical_lead':
      return Code2
    case 'organization-media':
    case 'media_lead':
      return Users
    case 'graphic-design':
    case 'design_lead':
      return PenTool
    case 'hr-pr-leadership':
    case 'pr_hr':
      return Megaphone
    default:
      return Sparkles
  }
}

export default function CommitteesPage({ onNavigateHome, onOpenJoinModal }) {
  const [committees, setCommittees] = useState(committeesData)

  useEffect(() => {
    fetchCommittees().then(data => {
      if (Array.isArray(data) && data.length > 0) {
        // Map database schema to display format if needed
        const mapped = data.map((item, idx) => {
          const fallback = committeesData.find(c => c.id === item.id || c.name.toLowerCase() === (item.name || '').toLowerCase())
          return {
            id: item.id || `committee-${idx}`,
            name: item.name || fallback?.name || "Committee",
            tag: item.tag || fallback?.tag || (item.name ? item.name.toUpperCase() : "TEAM"),
            description: item.description || fallback?.description || "Dedicated team supporting ICPC HIMIT.",
            accentColor: item.accent_color || fallback?.accentColor || (idx % 2 === 0 ? "#f5ba13" : "#38bdf8"),
            responsibilities: Array.isArray(item.responsibilities) && item.responsibilities.length > 0
              ? item.responsibilities
              : fallback?.responsibilities || [
                  "Organize community activities and sessions",
                  "Support students in competitive programming"
                ]
          }
        })
        setCommittees(mapped)
      }
    }).catch(() => {})
  }, [])
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 py-12 md:py-20 bg-stars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-6 max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>COMMUNITY LEADERSHIP</span>
          </div>

          <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-white leading-tight">
            Meet Our Teams<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              Behind ICPC HIMIT
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Each dedicated team contributes to making our problem-solving sessions, workshops, mock competitions, and community events an inspiring success.
          </p>

          <div className="w-12 h-1 bg-[#f5ba13] mx-auto rounded-sm shadow-[0_0_12px_#f5ba13] animate-glow-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {committees.map((committee) => {
            const IconComponent = getCommitteeIcon(committee.id)
            return (
              <div
                key={committee.id}
                className="relative flex flex-col justify-between p-8 rounded-3xl bg-[#090e1a]/90 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden"
              >
                <div 
                  className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 transition-opacity duration-300 group-hover:opacity-40"
                  style={{ backgroundColor: committee.accentColor }}
                />

                <div className="space-y-6 relative z-10">
                  
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundColor: `${committee.accentColor}18`,
                        borderColor: `${committee.accentColor}50`,
                        boxShadow: `0 0 20px ${committee.accentColor}30`
                      }}
                    >
                      <IconComponent 
                        className="w-7 h-7" 
                        style={{ color: committee.accentColor }}
                      />
                    </div>

                    <span 
                      className="font-mono text-[11px] font-bold tracking-wider px-3 py-1 rounded-md border"
                      style={{ 
                        color: committee.accentColor, 
                        borderColor: `${committee.accentColor}40`,
                        backgroundColor: `${committee.accentColor}10`
                      }}
                    >
                      {committee.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-normal group-hover:text-[#f5ba13] transition-colors duration-200">
                      {committee.name}
                    </h2>
                    <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {committee.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                      Key Responsibilities:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {committee.responsibilities.map((resp, rIdx) => (
                        <div
                          key={rIdx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-[#0e1628]/80 border border-white/5 text-xs text-slate-200 font-sans leading-snug"
                        >
                          <CheckCircle2 
                            className="w-4 h-4 flex-shrink-0 mt-0.5" 
                            style={{ color: committee.accentColor }}
                          />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )
          })}
        </div>

        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#090d18] via-[#0d1424] to-[#090d18] border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
              Want to join our committees?
            </h2>
            <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              We welcome motivated students who are eager to lead, organize contests, create content, or teach algorithms to peers.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
              >
                <span>Back to Home</span>
              </button>
              <a
                href="#join"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_20px_rgba(245,186,19,0.35)] hover:shadow-[0_0_25px_rgba(245,186,19,0.5)]"
              >
                <span>Apply to Join</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

