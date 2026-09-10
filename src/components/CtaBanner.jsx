import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function CtaBanner() {
  return (
    <section 
      className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] bg-[#050811] bg-no-repeat bg-center bg-cover flex flex-col justify-between overflow-hidden border-t border-white/5"
      style={{ backgroundImage: "url('/assets/footer.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#050811]/40 via-transparent to-[#050811]/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 sm:pt-16 pb-20 relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          <div className="lg:col-span-4 hidden lg:block" />

          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#f5ba13] fill-[#f5ba13] drop-shadow-[0_0_8px_#f5ba13] animate-twinkle">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-white tracking-tight leading-[1.18]">
              Your next problem<br />
              is waiting.
            </h2>

            <p className="text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-md">
              Start training, meet amazing people, and take your place in the ICPC HIMT journey.
            </p>

            <div className="pt-2">
              <a
                href="#join"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-lg bg-[#f5ba13] hover:bg-[#eab308] text-black font-extrabold text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(245,186,19,0.35)] hover:shadow-[0_0_30px_rgba(245,186,19,0.6)] group transform hover:-translate-y-0.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center space-y-4 pt-6 lg:pt-0">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#93c5fd] fill-[#93c5fd] drop-shadow-[0_0_12px_#38bdf8] animate-twinkle">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            <div className="font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-300 text-left lg:text-right leading-tight">
              <div>Solve</div>
              <div>Improve</div>
              <div>Belong<span className="text-[#38bdf8] animate-blink">_</span></div>
            </div>

            <div className="w-8 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_8px_#f5ba13] animate-glow-gold" />
          </div>

        </div>
      </div>
    </section>
  )
}
