import React from 'react'
import { Building2, Handshake, ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react'

export default function Sponsors() {
  const sponsors = [
    {
      name: 'HIMIT',
      fullName: 'Higher Institute of Management & Information Technology',
      role: 'ACADEMIC & INSTITUTIONAL PARTNER',
      logo: '/assets/himit.png',
      accent: '#f5ba13',
      description: 'Providing modern computer laboratories, official contest hosting facilities, and dedicated institutional sponsorship for our ECPC and ACPC teams.',
      perks: ['Lab Facilities & Hardware', 'Official Contest Sponsorship', 'Academic Accreditation']
    },
    {
      name: 'Hirfa',
      fullName: 'Hirfa Tech & Craftsmanship Community',
      role: 'OFFICIAL COMMUNITY SPONSOR',
      logo: '/assets/hirfa.png',
      accent: '#38bdf8',
      description: 'Empowering students with practical tech workshops, skill acceleration, career opportunities, and innovative industry mentorship.',
      perks: ['Industry Mentorship', 'Career Growth & Internships', 'Technical Workshops']
    }
  ]

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#050811] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5ba13]/10 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-bold tracking-wider uppercase">
            <Handshake className="w-3.5 h-3.5 text-[#f5ba13]" />
            <span>PARTNERSHIPS &amp; SPONSORSHIPS</span>
          </div>

          <h2 className="font-pixel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-normal leading-tight">
            Our Proud Sponsors<br />
            <span className="text-[#f5ba13] drop-shadow-[0_0_20px_rgba(245,186,19,0.35)]">
              Backing Better Problem Solvers
            </span>
          </h2>

          <p className="font-sans text-slate-400 text-xs sm:text-sm md:text-base leading-relaxed">
            We are honored to collaborate with leading educational institutions and industry partners who empower our students with resources, mentorship, and opportunities.
          </p>

          <div className="w-12 h-1 bg-[#f5ba13] mx-auto rounded-sm shadow-[0_0_12px_#f5ba13] animate-glow-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-8 rounded-3xl bg-[#090e1a]/90 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] hover:border-white/25 transition-all duration-300 hover:-translate-y-1.5 group overflow-hidden"
            >
              <div 
                className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl pointer-events-none opacity-15 transition-opacity duration-300 group-hover:opacity-30"
                style={{ backgroundColor: sponsor.accent }}
              />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between gap-4">
                  <div className="p-4 rounded-2xl bg-[#050811] border border-white/10 flex items-center justify-center h-20 w-36 sm:w-44 shadow-md group-hover:border-white/20 transition-colors">
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-h-14 max-w-full object-contain filter brightness-105"
                    />
                  </div>

                  <span 
                    className="font-mono text-[10px] sm:text-[11px] font-bold tracking-wider px-3 py-1 rounded-md border text-right"
                    style={{ 
                      color: sponsor.accent, 
                      borderColor: `${sponsor.accent}40`,
                      backgroundColor: `${sponsor.accent}10`
                    }}
                  >
                    {sponsor.role}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-normal group-hover:text-[#f5ba13] transition-colors">
                    {sponsor.name}
                  </h3>
                  <div className="font-mono text-xs text-slate-400">
                    {sponsor.fullName}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                    {sponsor.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/5">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Key Contributions:
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {sponsor.perks.map((perk, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-center gap-2.5 text-xs text-slate-300 font-sans"
                      >
                        <ShieldCheck 
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: sponsor.accent }}
                        />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#080d18] border border-white/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-pixel text-lg font-bold text-white">
              Interested in becoming an official sponsor?
            </h4>
            <p className="font-sans text-xs text-slate-400">
              Partner with ICPC HIMT to connect with top algorithmic talent and support tech education.
            </p>
          </div>
          <a
            href="mailto:contact@icpchimit.dev"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs transition-colors flex-shrink-0 cursor-pointer"
          >
            Contact Partnerships
          </a>
        </div>

      </div>
    </section>
  )
}

