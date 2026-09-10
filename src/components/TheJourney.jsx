import React, { useState } from 'react'
import { Plus, ArrowRight } from 'lucide-react'

export default function TheJourney() {
  const [activeLevel, setActiveLevel] = useState(0)

  const levels = [
    { id: '00', title: 'Foundations' },
    { id: '01', title: 'Problem Solving' },
    { id: '02', title: 'Algorithms' },
    { id: '03', title: 'Competitive' },
  ]

  return (
    <section id="training" className="relative py-20 md:py-28 overflow-hidden bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="space-y-4 mb-14">
          <div className="font-mono text-xs font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
            THE JOURNEY
          </div>
          <h2 className="font-pixel text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-normal leading-[1.2]">
            From fundamentals<br />
            to real competition.
          </h2>
          <p className="font-sans text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
            A clear training path designed to help you grow step by step, at your own pace.
          </p>
          <div className="w-9 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_10px_#f5ba13] animate-glow-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-0 pl-2">
            {levels.map((lvl, index) => {
              const isActive = index === activeLevel
              return (
                <div 
                  key={lvl.id} 
                  className="relative flex items-center group cursor-pointer" 
                  onClick={() => setActiveLevel(index)}
                >
                  
                  {index < levels.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-slate-800 transition-colors duration-300 group-hover:bg-[#f5ba13]/30 h-10" />
                  )}

                  <div className="relative z-10 flex-shrink-0 mr-6">
                    {isActive ? (
                      <div className="w-6 h-6 rounded-full bg-[#f5ba13] flex items-center justify-center shadow-[0_0_12px_#f5ba13] transition-transform duration-300 scale-105">
                        <div className="w-2 h-2 rounded-full bg-black" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-700 bg-transparent flex items-center justify-center transition-all group-hover:border-slate-500 group-hover:scale-105">
                        <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                      </div>
                    )}
                  </div>

                  <div className="py-4 flex items-center gap-6 sm:gap-10">
                    <span className={`font-mono text-sm sm:text-base font-bold transition-colors duration-200 ${
                      isActive ? 'text-[#f5ba13]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      Level {lvl.id}
                    </span>
                    <span className={`font-sans text-sm sm:text-base font-semibold transition-colors duration-200 ${
                      isActive ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-200'
                    }`}>
                      {lvl.title}
                    </span>
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

          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
            
            <div className="relative w-full max-w-lg">
              
              <div className="absolute -top-10 -right-2 sm:right-2 hidden sm:block select-none pointer-events-none z-20">
                <div className="font-hand text-xl sm:text-2xl text-slate-400/90 rotate-[-2deg] tracking-wide leading-tight animate-float">
                  <div>Same</div>
                  <div className="ml-1.5">Logic</div>
                  <div className="ml-3">Brighter</div>
                  <div className="ml-4.5">Future<span className="text-[#38bdf8] animate-blink">_</span></div>
                </div>
              </div>

              <div className="relative rounded-2xl bg-[#090e1a] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-300 hover:border-white/20">
                
                <div className="flex items-center justify-between px-4 py-3 bg-[#0d1424] border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
                    <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-4 py-1 rounded-md bg-[#162138] border border-white/5 text-xs font-mono text-slate-200 flex items-center gap-2">
                      <span>solution.cpp</span>
                    </div>
                    <button aria-label="New tab" className="p-1 text-slate-400 hover:text-white rounded border border-white/5 bg-[#162138]/50">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="w-12" />
                </div>

                <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">1</span>
                    <span><span className="text-[#c084fc]">#include</span> <span className="text-[#38bdf8]">&lt;bits/stdc++.h&gt;</span></span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">2</span>
                    <span><span className="text-[#c084fc]">using namespace</span> <span className="text-slate-200">std;</span></span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">3</span>
                    <span>&nbsp;</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">4</span>
                    <span><span className="text-[#c084fc]">int</span> <span className="text-[#60a5fa]">main</span>() &#123;</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">5</span>
                    <span className="text-[#64748b] pl-6">&#47;&#47; Think.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">6</span>
                    <span className="text-[#64748b] pl-6">&#47;&#47; Plan.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">7</span>
                    <span className="text-[#64748b] pl-6">&#47;&#47; Code.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">8</span>
                    <span className="text-[#64748b] pl-6">&#47;&#47; Improve.</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">9</span>
                    <span className="pl-6"><span className="text-[#c084fc]">return</span> <span className="text-[#38bdf8]">0</span>;</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-slate-600 select-none pr-6 text-right w-6">10</span>
                    <span>&#125;</span>
                  </div>
                </div>

              </div>

              <div className="absolute -bottom-6 -right-3 sm:-right-6 z-20 bg-[#090e1a]/95 border border-white/10 rounded-xl p-4 shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-all duration-300 hover:border-[#f5ba13]/50">
                <div className="font-mono text-xs font-bold space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="text-[#f5ba13]">&gt;</span>
                    <span>better</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="text-[#f5ba13]">&gt;</span>
                    <span>problem</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="text-[#f5ba13]">&gt;</span>
                    <span>solvers</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="text-[#f5ba13]">&gt;</span>
                    <span>together<span className="text-[#f5ba13] animate-blink">_</span></span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

