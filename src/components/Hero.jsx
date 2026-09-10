import React, { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, Megaphone } from 'lucide-react'
import { getLocalWebsiteData, fetchWebsiteData, subscribeToWebsiteData } from '../lib/websiteDataService.js'

export default function Hero() {
  const [websiteData, setWebsiteData] = useState(() => getLocalWebsiteData())

  useEffect(() => {
    fetchWebsiteData().then(data => {
      if (data) setWebsiteData(data)
    })
    const unsub = subscribeToWebsiteData(data => {
      if (data) setWebsiteData(data)
    })
    return unsub
  }, [])

  // Format headline for rendering
  const renderHeadline = () => {
    const rawHeadline = websiteData.headline || "Build your logic.\nCompete at\nyour level."
    const lines = rawHeadline.split('\n').filter(l => l.trim().length > 0)

    if (lines.length === 1) {
      // Single line headline - e.g. "WHERE CODE SHAPES CHAMPIONS"
      const text = lines[0]
      const words = text.split(' ')
      if (words.length > 2) {
        const firstPart = words.slice(0, Math.ceil(words.length / 2)).join(' ')
        const secondPart = words.slice(Math.ceil(words.length / 2)).join(' ')
        return (
          <>
            <span className="text-white block">{firstPart}</span>
            <span className="text-[#f5ba13] block drop-shadow-[0_0_15px_rgba(245,186,19,0.35)]">
              {secondPart}
            </span>
          </>
        )
      }
      return (
        <span className="text-[#f5ba13] block drop-shadow-[0_0_15px_rgba(245,186,19,0.35)]">
          {text}
        </span>
      )
    }

    // Multi-line headline
    return lines.map((line, idx) => {
      const isFirst = idx === 0
      return (
        <span 
          key={idx} 
          className={`block ${isFirst ? 'text-white' : 'text-[#f5ba13] drop-shadow-[0_0_15px_rgba(245,186,19,0.35)]'}`}
        >
          {line}
        </span>
      )
    })
  }

  return (
    <section 
      className="relative w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] bg-[#05070d] flex flex-col justify-between overflow-hidden" 
    >
      {/* Background Hero Image */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-right-top transition-all duration-700 pointer-events-none"
        style={{ backgroundImage: "url('/assets/hero.png')" }}
      />

      {/* Layered Gradient Overlays for Contrast & Ambient Depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070d] via-[#05070d]/85 to-[#05070d]/40 sm:from-[#05070d] sm:via-[#05070d]/75 sm:to-transparent lg:from-[#05070d] lg:via-[#05070d]/70 lg:to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#05070d]/90 via-[#05070d]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-transparent pointer-events-none" />

      {/* Subtle Brand Glow Accents */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#f5ba13]/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 sm:pt-12 lg:pt-16 pb-12 relative z-10 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 max-w-xl animate-fade-in">
            
            {/* Optional Announcement Pill from CRM */}
            {websiteData.bannerEnabled && websiteData.bannerText && (
              <div className="animate-fade-in">
                <a
                  href={websiteData.bannerLink || "#join"}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5ba13]/10 hover:bg-[#f5ba13]/20 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(245,186,19,0.15)] group"
                >
                  <Megaphone className="w-3.5 h-3.5 text-[#f5ba13] flex-shrink-0 animate-bounce" />
                  <span className="truncate max-w-[280px] sm:max-w-md">{websiteData.bannerText}</span>
                  <ArrowRight className="w-3 h-3 text-[#f5ba13] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            )}

            {/* Tagline */}
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
              <span>THINK</span>
              <span className="text-slate-500">&gt;</span>
              <span>CODE</span>
              <span className="text-slate-500">&gt;</span>
              <span>COMPETE</span>
            </div>

            {/* Dynamic Headline */}
            <div className="space-y-1">
              <h1 className="font-pixel text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-normal leading-[1.2]">
                {renderHeadline()}
              </h1>
            </div>

            {/* Dynamic Subheadline */}
            <p className="text-slate-300/90 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
              {websiteData.subheadline || "The official competitive programming community at HIMIT. From your first line of code to regional podiums."}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
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

          <div className="lg:col-span-5 relative h-full min-h-[220px] lg:min-h-[400px] flex items-center justify-end">
            
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-left space-y-3 max-w-[160px] hidden md:block select-none animate-fade-in bg-[#05070d]/60 p-4 rounded-xl border border-white/5 backdrop-blur-xs">
              
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

      <div className="w-full h-8 bg-gradient-to-t from-[#05070d] to-transparent pointer-events-none relative z-10" />

    </section>
  )
}
