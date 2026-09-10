import React, { useState, useEffect, useRef } from 'react'
import { Plus, ArrowRight, Play, Pause } from 'lucide-react'
import { getLocalJourneyData, fetchJourneyData, subscribeToJourneyData } from '../lib/websiteDataService.js'

const DEFAULT_LEVEL_DETAILS = [
  {
    id: '00',
    title: 'Foundations',
    tab: '00_foundations.cpp',
    tag: 'LEVEL 00 • SYNTAX & LOGIC',
    codeLines: [
      { num: 1, content: <><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;iostream&gt;</span></> },
      { num: 2, content: <><span className="text-[#c084fc]">using namespace</span> <span className="text-slate-200">std;</span></> },
      { num: 3, content: <span>&nbsp;</span> },
      { num: 4, content: <><span className="text-[#c084fc]">int</span> <span className="text-[#60a5fa]">main</span>() &#123;</> },
      { num: 5, content: <><span className="text-[#64748b] pl-4">&#47;&#47; Step 1: Fast I/O & Variables</span></> },
      { num: 6, content: <><span className="text-slate-300 pl-4">cin.tie(</span><span className="text-[#38bdf8]">nullptr</span><span className="text-slate-300">)-&gt;sync_with_stdio(</span><span className="text-[#38bdf8]">false</span><span className="text-slate-300">);</span></> },
      { num: 7, content: <><span className="text-[#c084fc] pl-4">long long</span> <span className="text-[#f5ba13]">a</span>, <span className="text-[#f5ba13]">b</span>; cin &gt;&gt; a &gt;&gt; b;</> },
      { num: 8, content: <><span className="text-slate-300 pl-4">cout &lt;&lt; </span><span className="text-[#38bdf8]">&quot;Sum: &quot;</span><span className="text-slate-300"> &lt;&lt; (a + b) &lt;&lt; </span><span className="text-[#38bdf8]">&quot;\n&quot;</span><span className="text-slate-300">;</span></> },
      { num: 9, content: <><span className="text-[#c084fc] pl-4">return</span> <span className="text-[#38bdf8]">0</span>;</> },
      { num: 10, content: <span>&#125;</span> },
    ],
    handNotes: ['Start', 'Strong', 'Master', 'Syntax_'],
    badgeNotes: ['input_ready', 'logic_check', 'test_passed', 'next_level_'],
  },
  {
    id: '01',
    title: 'Problem Solving',
    tab: '01_stl_vectors.cpp',
    tag: 'LEVEL 01 • STL & SEARCHING',
    codeLines: [
      { num: 1, content: <><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;vector&gt;</span></> },
      { num: 2, content: <><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;algorithm&gt;</span></> },
      { num: 3, content: <span>&nbsp;</span> },
      { num: 4, content: <><span className="text-[#c084fc]">void</span> <span className="text-[#60a5fa]">solve</span>() &#123;</> },
      { num: 5, content: <><span className="text-[#64748b] pl-4">&#47;&#47; Step 2: Two Pointers & Binary Search</span></> },
      { num: 6, content: <><span className="text-slate-300 pl-4">vector&lt;</span><span className="text-[#c084fc]">int</span><span className="text-slate-300">&gt; v = &#123;</span><span className="text-[#38bdf8]">4, 2, 9, 1, 7</span><span className="text-slate-300">&#125;;</span></> },
      { num: 7, content: <><span className="text-[#60a5fa] pl-4">sort</span><span className="text-slate-300">(v.begin(), v.end());</span></> },
      { num: 8, content: <><span className="text-[#c084fc] pl-4">auto</span> <span className="text-[#f5ba13]">it</span> = <span className="text-[#60a5fa]">lower_bound</span>(v.begin(), v.end(), <span className="text-[#38bdf8]">5</span>);</> },
      { num: 9, content: <><span className="text-slate-300 pl-4">cout &lt;&lt; </span><span className="text-[#38bdf8]">&quot;Index: &quot;</span><span className="text-slate-300"> &lt;&lt; (it - v.begin());</span></> },
      { num: 10, content: <span>&#125;</span> },
    ],
    handNotes: ['Think', 'Faster', 'Vector', 'BinarySearch_'],
    badgeNotes: ['sort_nlogn', 'two_pointers', 'freq_array', 'stl_mastered_'],
  },
  {
    id: '02',
    title: 'Algorithms',
    tab: '02_graph_bfs.cpp',
    tag: 'LEVEL 02 • GRAPHS & TREES',
    codeLines: [
      { num: 1, content: <><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;queue&gt;</span></> },
      { num: 2, content: <><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;vector&gt;</span></> },
      { num: 3, content: <span>&nbsp;</span> },
      { num: 4, content: <><span className="text-[#c084fc]">void</span> <span className="text-[#60a5fa]">bfs</span>(<span className="text-[#c084fc]">int</span> <span className="text-[#f5ba13]">src</span>, <span className="text-slate-300">vector&lt;vector&lt;</span><span className="text-[#c084fc]">int</span><span className="text-slate-300">&gt;&gt;&amp; adj) &#123;</span></> },
      { num: 5, content: <><span className="text-[#64748b] pl-4">&#47;&#47; Step 3: Graph Traversal & Shortest Path</span></> },
      { num: 6, content: <><span className="text-slate-300 pl-4">queue&lt;</span><span className="text-[#c084fc]">int</span><span className="text-slate-300">&gt; q; vector&lt;</span><span className="text-[#c084fc]">bool</span><span className="text-slate-300">&gt; vis(adj.size());</span></> },
      { num: 7, content: <><span className="text-slate-300 pl-4">q.push(src); vis[src] = </span><span className="text-[#38bdf8]">true</span><span className="text-slate-300">;</span></> },
      { num: 8, content: <><span className="text-[#c084fc] pl-4">while</span> <span className="text-slate-300">(!q.empty()) &#123;</span></> },
      { num: 9, content: <><span className="text-[#c084fc] pl-8">int</span> <span className="text-[#f5ba13]">u</span> = q.front(); q.pop();</> },
      { num: 10, content: <><span className="text-slate-300 pl-4">&#125;</span></> },
      { num: 11, content: <span>&#125;</span> },
    ],
    handNotes: ['Graphs', 'Trees', 'DP_State', 'Greedy_'],
    badgeNotes: ['bfs_traversal', 'memoize_state', 'dijkstra_ready', 'optimizing_'],
  },
  {
    id: '03',
    title: 'Competitive',
    tab: '03_contest_dp.cpp',
    tag: 'LEVEL 03 • BITMASK DP & CONTESTS',
    codeLines: [
      { num: 1, content: <><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;bits/stdc++.h&gt;</span></> },
      { num: 2, content: <><span className="text-[#c084fc]">const int</span> <span className="text-[#f5ba13]">MOD</span> = <span className="text-[#38bdf8]">1e9 + 7</span>;</> },
      { num: 3, content: <span>&nbsp;</span> },
      { num: 4, content: <><span className="text-[#c084fc]">long long</span> <span className="text-[#60a5fa]">solveDP</span>(<span className="text-[#c084fc]">int</span> <span className="text-[#f5ba13]">mask</span>, <span className="text-[#c084fc]">int</span> <span className="text-[#f5ba13]">i</span>, <span className="text-[#c084fc]">auto</span>&amp; memo) &#123;</> },
      { num: 5, content: <><span className="text-[#64748b] pl-4">&#47;&#47; Step 4: Bitmask Memoization & ICPC Logic</span></> },
      { num: 6, content: <><span className="text-[#c084fc] pl-4">if</span> (mask == (<span className="text-[#38bdf8]">1</span> &lt;&lt; <span className="text-[#38bdf8]">16</span>) - <span className="text-[#38bdf8]">1</span>) <span className="text-[#c084fc]">return</span> <span className="text-[#38bdf8]">1</span>;</> },
      { num: 7, content: <><span className="text-[#c084fc] pl-4">if</span> (memo[mask][i] != -<span className="text-[#38bdf8]">1</span>) <span className="text-[#c084fc]">return</span> memo[mask][i];</> },
      { num: 8, content: <><span className="text-[#c084fc] pl-4">return</span> memo[mask][i] = (solveDP(mask | (<span className="text-[#38bdf8]">1</span> &lt;&lt; i), i + <span className="text-[#38bdf8]">1</span>, memo)) % MOD;</> },
      { num: 9, content: <span>&#125;</span> },
    ],
    handNotes: ['Gold', 'Medal', 'ICPC', 'Finals_'],
    badgeNotes: ['sub_100ms', 'accepted_verdict', 'rank_up', 'world_finals_'],
  },
]

export default function TheJourney() {
  const [activeLevel, setActiveLevel] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [journeyData, setJourneyData] = useState(() => getLocalJourneyData())

  useEffect(() => {
    fetchJourneyData().then((data) => {
      if (data) setJourneyData(data)
    }).catch(() => {})
    const unsub = subscribeToJourneyData((data) => {
      if (data) setJourneyData(data)
    })
    return () => unsub()
  }, [])

  const rawLevels = journeyData.levels || [
    { id: '00', title: 'Foundations' },
    { id: '01', title: 'Problem Solving' },
    { id: '02', title: 'Algorithms' },
    { id: '03', title: 'Competitive' },
  ]

  // Auto cycle active level every 3.8s when not paused by hover
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveLevel((prev) => (prev + 1) % rawLevels.length)
    }, 3800)

    return () => clearInterval(interval)
  }, [isPaused, rawLevels.length])

  const currentLevelDetail = DEFAULT_LEVEL_DETAILS[activeLevel % DEFAULT_LEVEL_DETAILS.length] || DEFAULT_LEVEL_DETAILS[0]

  const headlineText = journeyData.headline || 'From fundamentals\nto real competition.'
  const headlineParts = headlineText.split('\n')

  const codeTabName = currentLevelDetail.tab
  const handNoteLines = currentLevelDetail.handNotes
  const badgeNoteLines = currentLevelDetail.badgeNotes

  return (
    <section 
      id="training" 
      className="relative py-20 md:py-28 overflow-hidden bg-[#050811]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-4 mb-14">
          <div className="flex items-center gap-3">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
              {journeyData.tag || 'THE JOURNEY'}
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-[10px] font-mono text-slate-400">
              {isPaused ? (
                <>
                  <Pause className="w-2.5 h-2.5 text-[#f5ba13]" />
                  <span>Paused</span>
                </>
              ) : (
                <>
                  <Play className="w-2.5 h-2.5 text-[#38bdf8] animate-pulse" />
                  <span>Auto Playing</span>
                </>
              )}
            </div>
          </div>

          <h2 className="font-pixel text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-normal leading-[1.2]">
            {headlineParts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {part}
              </React.Fragment>
            ))}
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
            {journeyData.description || 'A clear training path designed to help you grow step by step, at your own pace.'}
          </p>
          <div className="w-9 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_10px_#f5ba13] animate-glow-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Level List */}
          <div className="lg:col-span-5 space-y-0 pl-2">
            {rawLevels.map((lvl, index) => {
              const isActive = index === activeLevel
              return (
                <div 
                  key={lvl.id || index} 
                  className={`relative flex items-center group cursor-pointer transition-all duration-300 rounded-xl px-3 py-1 ${
                    isActive ? 'bg-[#0e1628]/60 border border-[#f5ba13]/30 shadow-[0_0_20px_rgba(245,186,19,0.08)]' : 'hover:bg-[#090e1a]/40'
                  }`} 
                  onClick={() => {
                    setActiveLevel(index)
                  }}
                >
                  
                  {index < rawLevels.length - 1 && (
                    <div className="absolute left-[23px] top-9 bottom-0 w-[2px] bg-slate-800 transition-colors duration-300 group-hover:bg-[#f5ba13]/30 h-10" />
                  )}

                  <div className="relative z-10 flex-shrink-0 mr-5">
                    {isActive ? (
                      <div className="w-6 h-6 rounded-full bg-[#f5ba13] flex items-center justify-center shadow-[0_0_14px_#f5ba13] transition-transform duration-300 scale-110">
                        <div className="w-2 h-2 rounded-full bg-black animate-ping" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-700 bg-transparent flex items-center justify-center transition-all group-hover:border-slate-500 group-hover:scale-105">
                        <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                      </div>
                    )}
                  </div>

                  <div className="py-3.5 flex items-center justify-between flex-1">
                    <div className="flex items-center gap-5 sm:gap-8">
                      <span className={`font-mono text-sm sm:text-base font-bold transition-colors duration-200 ${
                        isActive ? 'text-[#f5ba13]' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        Level {lvl.id || `0${index}`}
                      </span>
                      <span className={`font-sans text-sm sm:text-base font-semibold transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        {lvl.title}
                      </span>
                    </div>

                    {isActive && (
                      <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#f5ba13]/10 text-[#f5ba13] border border-[#f5ba13]/30 animate-pulse">
                        ACTIVE
                      </span>
                    )}
                  </div>

                </div>
              )
            })}

            <div className="pt-6">
              <a
                href="#roadmap"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f5ba13]/10 hover:bg-[#f5ba13]/20 border border-[#f5ba13]/40 text-[#f5ba13] font-mono text-xs font-bold transition-all duration-200 group"
              >
                <span>View Full 36-Week Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Dynamic Code Editor Panel */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            
            <div className="relative w-full max-w-lg">
              
              {/* Handwritten Note Accent */}
              <div className="absolute -top-10 -right-2 sm:right-2 hidden sm:block select-none pointer-events-none z-20">
                <div 
                  key={`hand-${activeLevel}`}
                  className="font-hand text-xl sm:text-2xl text-[#fde047] drop-shadow-[0_0_12px_rgba(245,186,19,0.5)] rotate-[-2deg] tracking-wide leading-tight animate-float transition-all duration-500"
                >
                  {handNoteLines.map((line, i) => {
                    const isLast = i === handNoteLines.length - 1
                    const hasCursor = isLast && line.endsWith('_')
                    const displayText = hasCursor ? line.slice(0, -1) : line
                    const mlClass = i === 0 ? '' : i === 1 ? 'ml-1.5' : i === 2 ? 'ml-3' : 'ml-4.5'
                    return (
                      <div key={i} className={mlClass}>
                        {displayText}
                        {hasCursor && <span className="text-[#38bdf8] animate-blink">_</span>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Code Window */}
              <div className="relative rounded-2xl bg-[#090e1a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-white/20">
                
                {/* Editor Top Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-4 py-1 rounded-md bg-[#162138] border border-white/5 text-xs font-mono text-slate-200 flex items-center gap-2">
                      <span className="text-[#f5ba13] font-bold">&gt;</span>
                      <span className="text-white font-medium">{codeTabName}</span>
                    </div>
                    <button 
                      aria-label="Next code demo" 
                      onClick={() => setActiveLevel((prev) => (prev + 1) % rawLevels.length)}
                      className="p-1 text-slate-400 hover:text-white rounded border border-white/5 bg-[#162138]/50 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="w-12 text-right">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">C++20</span>
                  </div>
                </div>

                {/* Editor Body */}
                <div 
                  key={`code-${activeLevel}`}
                  className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[290px] transition-opacity duration-300 animate-fadeIn"
                >
                  {currentLevelDetail.codeLines.map((line, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-slate-600 select-none pr-6 text-right w-6 flex-shrink-0 font-mono text-xs">
                        {line.num}
                      </span>
                      <div className="font-mono">{line.content}</div>
                    </div>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between px-4 py-1.5 bg-[#070b14] border-t border-white/5 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Compiled OK
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="text-slate-400">{currentLevelDetail.tag}</span>
                  </div>
                  <div className="text-slate-500 text-[10px]">
                    Step {activeLevel + 1}/{rawLevels.length}
                  </div>
                </div>

              </div>

              {/* Bottom Right Floating Badge Note */}
              <div 
                key={`badge-${activeLevel}`}
                className="absolute -bottom-6 -right-3 sm:-right-6 z-20 bg-[#090e1a]/95 border border-white/10 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:border-[#f5ba13]/50 animate-fadeIn"
              >
                <div className="font-mono text-xs font-bold space-y-1.5">
                  {badgeNoteLines.map((line, i) => {
                    const isLast = i === badgeNoteLines.length - 1
                    const hasCursor = isLast && line.endsWith('_')
                    const displayText = hasCursor ? line.slice(0, -1) : line
                    return (
                      <div key={i} className="flex items-center gap-2 text-slate-200">
                        <span className="text-[#f5ba13]">&gt;</span>
                        <span>
                          {displayText}
                          {hasCursor && <span className="text-[#f5ba13] animate-blink">_</span>}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
