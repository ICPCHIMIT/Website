import React, { useState, useEffect } from 'react'
import { Calendar, Clock, ArrowRight, MapPin } from 'lucide-react'
import { getLocalUpcomingEventData, fetchUpcomingEventData, subscribeToUpcomingEventData } from '../lib/websiteDataService'

export default function UpcomingEvent() {
  const [eventData, setEventData] = useState(getLocalUpcomingEventData)
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    fetchUpcomingEventData().then(data => {
      if (data) setEventData(data)
    })

    const unsubscribe = subscribeToUpcomingEventData(data => {
      if (data) setEventData(data)
    })

    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  useEffect(() => {
    const updateCountdown = () => {
      if (!eventData?.starts_at) {
        setTimeLeft(eventData?.time || '02:00:00')
        return
      }

      const target = new Date(eventData.starts_at).getTime()
      const now = Date.now()
      const diff = target - now

      if (isNaN(target)) {
        setTimeLeft(eventData?.time || '02:00:00')
        return
      }

      if (diff <= 0) {
        setTimeLeft('LIVE NOW')
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeLeft(`${days}d ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
      } else {
        setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [eventData])

  const titleParts = (eventData?.title || 'ICPC HIMIT\nContest #04').split('\n')

  const formattedDate = eventData?.starts_at
    ? new Date(eventData.starts_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
    : (eventData?.date || 'APR 24, 2026')

  const sideLines = Array.isArray(eventData?.sideNoteLines) && eventData.sideNoteLines.length > 0
    ? eventData.sideNoteLines
    : ['A', 'BIGGER', 'TOMORROW', 'AWAITS_']

  return (
    <section id="contests" className="relative py-14 sm:py-20 md:py-28 overflow-hidden bg-[#050811]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-4 space-y-5 sm:space-y-7">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
              {eventData?.tag || 'UPCOMING EVENT'}
            </div>

            <h2 className="font-pixel text-2xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-normal leading-[1.2]">
              {titleParts.map((part, pIdx) => (
                <React.Fragment key={pIdx}>
                  {part}
                  {pIdx < titleParts.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>

            {eventData?.description && (
              <p className="font-sans text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm line-clamp-2">
                {eventData.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <div className="flex items-center gap-2.5 text-slate-300 font-mono text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-[#f5ba13]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 font-mono text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-[#38bdf8]" />
                <span>{timeLeft || eventData?.time || '02:00:00'}</span>
              </div>
              {eventData?.location && (
                <div className="flex items-center gap-2 text-slate-300 font-mono text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="truncate max-w-[180px]">{eventData.location}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href={eventData?.buttonLink || '#contests'}
                className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-6 py-3 rounded-lg bg-[#4ca1ff] hover:bg-[#38bdf8] text-[#050b18] font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(76,161,255,0.35)] hover:shadow-[0_0_30px_rgba(76,161,255,0.6)] group transform hover:-translate-y-0.5"
              >
                <span>{eventData?.buttonText || 'View Details'}</span>
                <ArrowRight className="w-4 h-4 text-[#050b18] transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full rounded-xl p-1 group">
              
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#38bdf8]/80 rounded-tl pointer-events-none transition-all duration-300 group-hover:scale-110" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#38bdf8]/80 rounded-tr pointer-events-none transition-all duration-300 group-hover:scale-110" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#38bdf8]/80 rounded-bl pointer-events-none transition-all duration-300 group-hover:scale-110" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#38bdf8]/80 rounded-br pointer-events-none transition-all duration-300 group-hover:scale-110" />

              <div className="rounded-lg overflow-hidden border border-[#38bdf8]/30 bg-[#060b17] shadow-[0_0_35px_rgba(56,189,248,0.2)] transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src={eventData?.image || '/assets/upcoming events.png'}
                  alt={eventData?.title || 'ICPC HIMIT Upcoming Contest'}
                  className="w-full h-auto object-cover max-h-[300px]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 hidden lg:flex flex-col justify-center items-start pl-6 space-y-3">
            <div className="font-mono text-xs font-bold tracking-widest text-slate-300 leading-snug">
              {sideLines.map((line, sIdx) => {
                const isLast = sIdx === sideLines.length - 1
                return (
                  <div key={sIdx}>
                    {isLast ? (
                      <>
                        {line.replace(/_$/, '')}
                        <span className="text-[#f5ba13] animate-blink">_</span>
                      </>
                    ) : (
                      line
                    )}
                  </div>
                )
              })}
            </div>
            <div className="w-8 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_8px_#f5ba13] animate-glow-gold" />
          </div>

        </div>
      </div>
    </section>
  )
}
