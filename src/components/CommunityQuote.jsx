import React from 'react'

export default function CommunityQuote() {
  const avatars = [
    { 
      name: 'Student 1', 
      src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&auto=format&fit=crop&q=80',
      activeRing: true 
    },
    { 
      name: 'Student 2', 
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      activeRing: false 
    },
    { 
      name: 'Student 3', 
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      activeRing: false 
    },
    { 
      name: 'Student 4', 
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      activeRing: false 
    },
  ]

  return (
    <section id="community" className="relative py-14 sm:py-20 md:py-28 overflow-hidden bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <h2 className="font-pixel text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-normal leading-[1.2]">
              &ldquo;You don&apos;t<br />
              compete alone.&rdquo;
            </h2>

            <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
              Be part of a community that shares your passion, challenges you, and helps you grow.
            </p>

            <div className="w-9 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_10px_#f5ba13] animate-glow-gold" />

            <div className="flex items-center gap-4 sm:gap-5 pt-2 sm:pt-4">
              <div className="flex -space-x-3 overflow-hidden py-1">
                {avatars.map((avatar, idx) => (
                  <div key={idx} className="relative transition-transform duration-300 hover:scale-115 hover:z-20">
                    <img
                      src={avatar.src}
                      alt={avatar.name}
                      className={`inline-block h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover shadow-md ${
                        avatar.activeRing
                          ? 'ring-2 ring-[#38bdf8] shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                          : 'ring-2 ring-[#050811]'
                      }`}
                    />
                  </div>
                ))}
              </div>

              <div className="text-xs sm:text-sm font-sans text-slate-400 font-medium leading-snug">
                <div>Join hundreds of</div>
                <div className="text-slate-300">student problem solvers.</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] group">
              <img
                src="/assets/you don't compete alone.jpeg"
                alt="You don't compete alone ICPC HIMIT"
                className="w-full h-[280px] sm:h-[340px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
