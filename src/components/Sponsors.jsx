import React, { useState, useEffect } from 'react'
import { Handshake } from 'lucide-react'
import { getLocalSponsorsData, fetchSponsorsData, subscribeToSponsorsData, getLocalWebsiteData, fetchWebsiteData, subscribeToWebsiteData } from '../lib/websiteDataService.js'

export default function Sponsors() {
  const [sponsorsData, setSponsorsData] = useState(() => getLocalSponsorsData())
  const [websiteData, setWebsiteData] = useState(() => getLocalWebsiteData())

  useEffect(() => {
    fetchSponsorsData().then((data) => {
      if (data) setSponsorsData(data)
    }).catch(() => {})
    const unsubSponsors = subscribeToSponsorsData((data) => {
      if (data) setSponsorsData(data)
    })

    fetchWebsiteData().then((data) => {
      if (data) setWebsiteData(data)
    }).catch(() => {})
    const unsubWebsite = subscribeToWebsiteData((data) => {
      if (data) setWebsiteData(data)
    })

    return () => {
      unsubSponsors()
      unsubWebsite()
    }
  }, [])

  const contactEmail = websiteData.links?.contactEmail || 'icpc.himit@gmail.com'

  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#050811] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5ba13]/10 border border-[#f5ba13]/30 text-[#f5ba13] font-mono text-xs font-bold tracking-wider uppercase">
            <Handshake className="w-3.5 h-3.5 text-[#f5ba13]" />
            <span>{sponsorsData.title || "PARTNERSHIPS & SPONSORSHIPS"}</span>
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

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 max-w-4xl mx-auto">
          {sponsorsData?.sponsors?.map((sponsor, idx) => (
            <a
              key={sponsor.id || idx}
              href={sponsor.website || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 sm:p-8 rounded-2xl bg-[#090e1a]/80 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.alt || sponsor.name}
                className="h-16 sm:h-20 lg:h-24 max-w-[200px] object-contain filter brightness-105 transition-transform duration-300 group-hover:scale-110"
              />
            </a>
          ))}
        </div>

        <div className="p-6 rounded-2xl bg-[#080d18] border border-white/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-pixel text-lg font-bold text-white">
              Interested in becoming an official sponsor?
            </h4>
            <p className="font-sans text-xs text-slate-400">
              Partner with ICPC HIMIT to connect with top algorithmic talent and support tech education.
            </p>
          </div>
          <a
            href={`mailto:${contactEmail}`}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-bold text-xs transition-colors flex-shrink-0 cursor-pointer"
          >
            Contact Partnerships
          </a>
        </div>

      </div>
    </section>
  )
}
