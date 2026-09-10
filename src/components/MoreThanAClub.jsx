import React from 'react'

function BookOpenIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function CubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  )
}

function FlagIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  )
}

export default function MoreThanAClub() {
  const pillars = [
    {
      icon: BookOpenIcon,
      iconColor: 'text-[#38bdf8]',
      title: 'Learn',
      desc: 'Build your foundations',
    },
    {
      icon: CubeIcon,
      iconColor: 'text-[#f5ba13]',
      title: 'Practice',
      desc: 'Solve, learn, improve',
    },
    {
      icon: FlagIcon,
      iconColor: 'text-[#f5ba13]',
      title: 'Compete',
      desc: 'Take part in contests and grow together',
    },
  ]

  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 overflow-hidden bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
              <img
                src="/assets/more tha a club.png"
                alt="ICPC HIMIT Community"
                className="w-full h-[260px] sm:h-[380px] lg:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-4 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-[#f5ba13]/40 max-w-[calc(100%-2rem)]">
                <div className="flex flex-col">
                  <div className="grid grid-cols-3 gap-1 w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                    <div />
                    <div className="bg-[#5c4a1e] border border-[#f5ba13]/25 rounded-xs" />
                    <div />

                    <div className="bg-[#5c4a1e] border border-[#f5ba13]/25 rounded-xs" />
                    <div />
                    <div className="bg-[#f5ba13] rounded-xs shadow-[0_0_12px_rgba(245,186,19,0.7)]" />

                    <div />
                    <div className="bg-[#5c4a1e] border border-[#f5ba13]/25 rounded-xs" />
                    <div />
                  </div>

                  <div className="flex items-stretch gap-2.5 mt-2 pl-3 sm:pl-4">
                    <div className="w-[1.5px] bg-white/20 self-stretch min-h-[44px]" />
                    <div className="font-mono text-[9px] sm:text-[11px] font-bold tracking-widest text-slate-300 leading-tight">
                      <div>PEOPLE —</div>
                      <div>PROBLEMS</div>
                      <div>PROGRESS</div>
                      <div>TOGETHER</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
              MORE THAN A CLUB
            </div>

            <h2 className="font-pixel text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-normal leading-[1.2]">
              Same passion.<br />
              A stronger community.
            </h2>

            <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
              We bring together students who are passionate about problem solving, algorithms, and teamwork to achieve more.
            </p>

            <div className="w-9 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_10px_#f5ba13] animate-glow-gold" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              {pillars.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div key={idx} className="space-y-2.5 group transition-transform duration-300 hover:-translate-y-1">
                    <div className="h-7 flex items-center mb-1">
                      <Icon className={`w-6 h-6 ${item.iconColor} drop-shadow-[0_0_8px_currentColor] transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                    <h3 className="font-sans text-lg font-bold text-white tracking-tight group-hover:text-[#f5ba13] transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-400 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
