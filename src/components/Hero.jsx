import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      className="relative w-full min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] xl:min-h-[660px] bg-[#05070d] bg-no-repeat bg-center bg-contain lg:bg-[length:1100px_auto] xl:bg-[length:1200px_auto] flex flex-col justify-between overflow-hidden" 
      style={{ backgroundImage: "url('/assets/hero.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070d]/70 via-transparent to-transparent pointer-events-none lg:block hidden" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12 lg:pt-16 pb-12 relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 max-w-lg animate-fade-in">
            
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
              <span>THINK</span>
              <span className="text-slate-500">&gt;</span>
              <span>CODE</span>
              <span className="text-slate-500">&gt;</span>
              <span>COMPETE</span>
            </div>

            <div className="space-y-1">
              <h1 className="font-pixel text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-normal leading-[1.2]">
                <span className="text-white block">Build your logic.</span>
                <span className="text-[#f5ba13] block drop-shadow-[0_0_15px_rgba(245,186,19,0.3)]">Compete at</span>
                <span className="text-[#f5ba13] block drop-shadow-[0_0_15px_rgba(245,186,19,0.3)]">your level.</span>
              </h1>
            </div>

            <p className="text-slate-300/90 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
              A competitive programming community at HIMT where students learn, practice, and compete together.
            </p>

            <div className="pt-2">
              <a
                href="#training"
                className="relative inline-flex items-center gap-3 px-6 py-3 bg-[#070b14]/90 hover:bg-[#f5ba13]/15 text-[#f5ba13] font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(245,186,19,0.15)] hover:shadow-[0_0_30px_rgba(245,186,19,0.5)] group border border-[#f5ba13] rounded-lg transform hover:-translate-y-0.5"
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#f5ba13] transition-all group-hover:scale-125" />
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#f5ba13] transition-all group-hover:scale-125" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#f5ba13] transition-all group-hover:scale-125" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#f5ba13] transition-all group-hover:scale-125" />

                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 text-[#f5ba13] transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </div>

          </div>

          <div className="lg:col-span-6 relative h-full min-h-[260px] lg:min-h-[400px] flex items-center justify-end">
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left space-y-3 max-w-[160px] hidden md:block select-none animate-fade-in">
              
              <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-300 leading-tight">
                <div>SAME</div>
                <div>LOGIC</div>
                <div>BRIGHTER</div>
                <div>FUTURE<span className="text-[#f5ba13] animate-blink">_</span></div>
              </div>

              <div className="w-6 h-[2.5px] bg-[#f5ba13] shadow-[0_0_8px_#f5ba13] animate-glow-gold" />

              <div className="text-[10px] sm:text-[11px] font-sans text-slate-400 font-medium leading-snug">
                <div>Solving problems</div>
                <div>today for a</div>
                <div>brighter tomorrow.</div>
              </div>

              <div className="w-4 h-[2px] bg-[#f5ba13] shadow-[0_0_6px_#f5ba13]" />

            </div>

          </div>

        </div>
      </div>

      <div className="w-full h-8 bg-gradient-to-t from-[#05070d] to-transparent pointer-events-none" />

    </section>
  )
}
