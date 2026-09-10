import React from 'react'
import { Code2, Trophy, Users, Target, ArrowRight, CheckCircle2, ShieldCheck, Flame } from 'lucide-react'

export default function AboutPage({ onNavigateHome, onOpenJoinModal }) {
  const pillars = [
    {
      icon: Code2,
      accent: '#38bdf8',
      title: 'Algorithmic Mastery',
      desc: 'We cultivate deep intuitive problem-solving skills across data structures, graph algorithms, dynamic programming, and mathematics.'
    },
    {
      icon: Users,
      accent: '#f5ba13',
      title: 'Peer Mentorship',
      desc: 'Experienced senior contestants guide beginners step by step, sharing contest strategies, editorial breakdowns, and code reviews.'
    },
    {
      icon: Trophy,
      accent: '#c084fc',
      title: 'Contest Readiness',
      desc: 'We host weekly mock contests under official ICPC rules, helping students master time pressure, stress management, and team dynamics.'
    },
    {
      icon: Flame,
      accent: '#f43f5e',
      title: 'Collaborative Spirit',
      desc: 'Competitive programming is a team sport. We foster lifelong friendships, intellectual curiosity, and healthy sportsmanship.'
    }
  ]

  const pathway = [
    {
      step: '01',
      title: 'Foundations & Practice',
      desc: 'Mastering C++ syntax, standard template libraries (STLs), basic algorithms, and daily problem-solving habits.'
    },
    {
      step: '02',
      title: 'Institutional Contests',
      desc: 'Participating in local HIMT qualification rounds, internal rankings, and technical training camps.'
    },
    {
      step: '03',
      title: 'National Qualifications (ECPC)',
      desc: 'Forming 3-person teams to compete against top engineering and computer science universities nationwide.'
    },
    {
      step: '04',
      title: 'Regional & World Finals',
      desc: 'Representing HIMIT at the ACPC regional championship and striving for the prestigious ICPC World Finals.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 py-10 sm:py-16 md:py-20 bg-stars">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 md:space-y-20">
        
        <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto animate-fade-in">
          <h1 className="font-pixel text-2xl sm:text-5xl lg:text-6xl font-bold tracking-normal text-white leading-tight">
            About ICPC HIMIT<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.4)]">
              For Better Problem Solvers
            </span>
          </h1>

          <p className="font-sans text-slate-400 text-xs sm:text-base md:text-lg leading-relaxed">
            The official competitive programming community at the Higher Institute of Management and Technology, dedicated to building problem-solving instincts, technical excellence, and championship teams.
          </p>

          <div className="w-12 h-1 bg-[#f5ba13] mx-auto rounded-sm shadow-[0_0_12px_#f5ba13] animate-glow-gold" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
              <img
                src="/assets/more tha a club.png"
                alt="ICPC HIMIT Community Lab"
                className="w-full h-[260px] sm:h-[380px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-4 rounded-xl bg-black/60 backdrop-blur-sm border border-white/10 max-w-[calc(100%-2rem)]">
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
            <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-normal leading-tight">
              Our Vision &amp; Mission
            </h2>

            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed">
              ICPC HIMIT was founded by students who believe that competitive programming is the most effective vehicle to master computer science fundamentals, algorithm design, and computational thinking.
            </p>

            <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed">
              We empower learners from day one — starting from basic syntax and logic up to complex graph theory, dynamic programming, and mathematics. Through weekly problem-solving rounds, mentorship, and mock contests, we prepare teams to proudly represent our institute on regional and global stages.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0b101c] border border-white/5 space-y-1">
                <div className="font-pixel text-2xl font-bold text-[#f5ba13]">04+ Years</div>
                <div className="text-xs text-slate-400 font-sans">Active Community History</div>
              </div>
              <div className="p-4 rounded-xl bg-[#0b101c] border border-white/5 space-y-1">
                <div className="font-pixel text-2xl font-bold text-[#38bdf8]">500+</div>
                <div className="text-xs text-slate-400 font-sans">Students Trained</div>
              </div>
            </div>
          </div>

        </div>

        <div className="space-y-10">
          <div className="text-center space-y-3">
            <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-normal">
              Our Core Pillars
            </h2>
            <p className="font-sans text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
              The guiding principles that shape our training sessions and define our community culture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#080d18] border border-white/10 shadow-lg hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-4">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: `${pillar.accent}15`, 
                        borderColor: `${pillar.accent}40`,
                        boxShadow: `0 0 15px ${pillar.accent}25`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: pillar.accent }} />
                    </div>

                    <h3 className="font-pixel text-lg font-bold text-white tracking-normal group-hover:text-[#f5ba13] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="font-sans text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-[#090e1a]/90 border border-white/10 shadow-2xl space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-normal">
              The ICPC Journey Pathway
            </h2>
            <p className="font-sans text-slate-400 text-xs sm:text-sm">
              How students advance from absolute beginners to national and regional contest contenders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathway.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-[#0e1628]/60 border border-white/5 space-y-3 relative overflow-hidden"
              >
                <div className="font-mono text-3xl font-black text-[#f5ba13]/30 select-none">
                  {item.step}
                </div>
                <h3 className="font-pixel text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#090d18] via-[#0d1424] to-[#090d18] border border-white/10 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-pixel text-2xl sm:text-4xl font-bold text-white">
              Ready to grow with us?
            </h2>
            <p className="font-sans text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
              Whether you are writing your first lines of C++ or preparing for the national contest, you will find your place among fellow problem solvers.
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
                <span>Join Us Today</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

