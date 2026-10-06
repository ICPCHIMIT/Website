import React, { useState, useEffect } from 'react'
import { Search, BookOpen, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react'
import { getLocalRoadmapData, fetchRoadmapData, subscribeToRoadmapData } from '../lib/websiteDataService.js'

function YouTubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

export default function RoadmapPage({ onNavigateHome, onOpenJoinModal }) {
  const [levels, setLevels] = useState(() => getLocalRoadmapData())
  const [selectedLevelId, setSelectedLevelId] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchRoadmapData().then((data) => {
      if (data && Array.isArray(data) && data.length > 0) setLevels(data)
    }).catch(() => {})

    const unsub = subscribeToRoadmapData((data) => {
      if (data && Array.isArray(data) && data.length > 0) setLevels(data)
    })
    return () => unsub()
  }, [])

  const filteredLevels = levels.map(level => {
    if (selectedLevelId !== 'all' && level.id !== selectedLevelId) {
      return null
    }

    const filteredWeeks = level.weeks.filter(w => {
      if (!searchQuery.trim()) return true
      const query = searchQuery.toLowerCase()
      const titleMatch = w.title.toLowerCase().includes(query)
      const focusMatch = w.focus.toLowerCase().includes(query)
      const topicMatch = w.topics.some(t => t.toLowerCase().includes(query))
      return titleMatch || focusMatch || topicMatch
    })

    if (filteredWeeks.length === 0 && searchQuery.trim()) {
      return null
    }

    return {
      ...level,
      weeks: filteredWeeks
    }
  }).filter(Boolean)

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 py-10 sm:py-16 md:py-20 bg-stars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto mb-10 sm:mb-16 animate-fade-in">
          
          <h1 className="font-pixel text-2xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-white leading-tight">
            Competitive Programming<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              Curriculum &amp; Roadmap
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-base md:text-lg leading-relaxed">
            From foundations to ICPC regional level: A structured 36-week roadmap covering language basics, mathematics, graph algorithms, dynamic programming, and advanced data structures.
          </p>

          <div className="w-12 h-1 bg-[#f5ba13] mx-auto rounded-sm shadow-[0_0_12px_#f5ba13] animate-glow-gold" />

          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics (e.g. Binary Search, DP, Graphs, STLs, Math)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0b101d] border border-white/10 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#f5ba13] focus:ring-1 focus:ring-[#f5ba13] transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
            <button
              onClick={() => setSelectedLevelId('all')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all duration-200 cursor-pointer ${
                selectedLevelId === 'all'
                  ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
              }`}
            >
              All Levels (36 Weeks)
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  selectedLevelId === lvl.id
                    ? 'bg-[#f5ba13] text-black shadow-[0_0_15px_rgba(245,186,19,0.5)]'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <span>{lvl.level}:</span>
                <span className="font-sans">{lvl.phase}</span>
              </button>
            ))}
          </div>

        </div>

        <div className="space-y-16">
          {filteredLevels.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10 max-w-lg mx-auto p-8">
              <p className="font-pixel text-xl text-slate-300 mb-2">No matching topics found</p>
              <p className="text-xs text-slate-400 mb-4">Try searching for different keywords like "Recursion", "Trees", or "STLs".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-5 py-2 rounded-lg bg-[#f5ba13] text-black font-bold text-xs"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredLevels.map((level) => (
              <div key={level.id} className="space-y-8">
                
                <div className="p-6 sm:p-8 rounded-2xl bg-[#090e1a]/90 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
                  <div 
                    className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20"
                    style={{ backgroundColor: level.accentColor }}
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-3 py-1 rounded-md text-xs font-mono font-black border"
                          style={{ borderColor: level.accentColor, color: level.accentColor, backgroundColor: `${level.accentColor}15` }}
                        >
                          {level.badge}
                        </span>
                        <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-normal">
                          {level.level} — <span style={{ color: level.accentColor }}>{level.phase}</span>
                        </h2>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                        {level.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <BookOpen className="w-3.5 h-3.5 text-slate-300" />
                        <span>{level.weeks.length} Weeks Curriculum</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {level.weeks.map((weekItem, wIdx) => (
                    <div
                      key={wIdx}
                      className="flex flex-col justify-between p-6 rounded-2xl bg-[#080d18] border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span 
                            className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10"
                            style={{ color: level.accentColor }}
                          >
                            {weekItem.week}
                          </span>
                          
                          {weekItem.videoUrl && (
                            <a
                              href={weekItem.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-400 font-mono text-[11px] font-semibold transition-colors"
                            >
                              <YouTubeIcon className="w-3.5 h-3.5 text-red-400" />
                              <span>Watch Video</span>
                            </a>
                          )}
                        </div>

                        <div>
                          <h3 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-normal group-hover:text-[#f5ba13] transition-colors duration-200">
                            {weekItem.title}
                          </h3>
                          <p className="font-sans text-xs text-slate-400 leading-relaxed mt-1">
                            {weekItem.focus}
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-white/5">
                          <div className="text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wider">
                            Topics Covered:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {weekItem.topics.map((t, tIdx) => (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#0f172a] border border-white/5 text-[11px] text-slate-300 font-sans"
                              >
                                <CheckCircle2 className="w-2.5 h-2.5 text-slate-500 flex-shrink-0" />
                                <span>{t}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between gap-3">
                        <a
                          href={weekItem.practiceUrl || '#practice'}
                          {...(weekItem.practiceUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#f5ba13] hover:text-white transition-colors group/link"
                        >
                          <span>Practice</span>
                          <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))
          )}
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#090d18] via-[#0d1424] to-[#090d18] border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
              Ready to begin your journey?
            </h2>
            <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Join the ICPC HIMIT community to practice with fellow students, participate in mock contests, and receive guidance from senior competitive programmers.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer"
              >
                <span>Back to Home</span>
              </button>
              <button
                onClick={onOpenJoinModal}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-[#f5ba13] hover:bg-[#eab308] text-black font-sans font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-[0_0_20px_rgba(245,186,19,0.35)] hover:shadow-[0_0_25px_rgba(245,186,19,0.5)] cursor-pointer"
              >
                <span>Join Community</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
