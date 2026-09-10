import React, { useState, useEffect, useRef } from 'react'
import { getLocalWebsiteData, fetchWebsiteData, subscribeToWebsiteData } from '../lib/websiteDataService.js'

function UsersIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function DocumentIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

function CodeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function TrophyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
      <path d="M6 4h12a2 2 0 0 1 2 2v3a6 6 0 0 1-6 6h0a6 6 0 0 1-6-6V6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

function AnimatedCounter({ value, duration = 1800 }) {
  const [displayValue, setDisplayValue] = useState('0')
  const [isDone, setIsDone] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    // Parse number and suffix from string e.g. "15,000+" -> number: 15000, suffix: "+"
    const cleaned = String(value || '0').trim()
    const numericMatch = cleaned.replace(/,/g, '').match(/[\d.]+/)
    const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0
    const prefix = cleaned.startsWith('+') ? '+' : ''
    const suffix = cleaned.endsWith('+') ? '+' : cleaned.endsWith('%') ? '%' : ''

    let hasStarted = false
    let animationFrameId

    const startCounting = () => {
      if (hasStarted) return
      hasStarted = true
      setIsDone(false)
      const startTime = performance.now()

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // Cubic ease out for smooth decelerating counter
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const currentNum = Math.floor(easeOut * targetNumber)

        const formatted = currentNum.toLocaleString('en-US')
        setDisplayValue(`${prefix}${formatted}${suffix}`)

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setDisplayValue(cleaned)
          setIsDone(true)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Use IntersectionObserver to start counting when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounting()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [value, duration])

  return (
    <span 
      ref={elementRef}
      className={`inline-block tabular-nums transition-all duration-300 ${
        isDone ? 'scale-100' : 'animate-pulse'
      }`}
    >
      {displayValue}
    </span>
  )
}

export default function Impact() {
  const [websiteData, setWebsiteData] = useState(() => getLocalWebsiteData())

  useEffect(() => {
    fetchWebsiteData().then((data) => {
      if (data) setWebsiteData(data)
    }).catch(() => {})

    const unsub = subscribeToWebsiteData((data) => {
      if (data) setWebsiteData(data)
    })
    return () => unsub()
  }, [])

  const stats = [
    {
      icon: UsersIcon,
      iconColor: 'text-[#f5ba13]',
      value: websiteData.stats?.membersCount || '250+',
      label1: 'Active',
      label2: 'Members',
    },
    {
      icon: DocumentIcon,
      iconColor: 'text-[#38bdf8]',
      value: websiteData.stats?.trainingSessions || '80+',
      label1: 'Training',
      label2: 'Sessions',
    },
    {
      icon: CodeIcon,
      iconColor: 'text-[#f5ba13]',
      value: websiteData.stats?.problemsSolved || '15,000+',
      label1: 'Problems',
      label2: 'Solved',
    },
    {
      icon: TrophyIcon,
      iconColor: 'text-[#f5ba13]',
      value: websiteData.stats?.contestsWon || '12+',
      label1: 'Contests &',
      label2: 'Podiums',
    },
  ]

  return (
    <section className="relative py-14 sm:py-20 bg-[#050811] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs font-semibold tracking-widest text-[#38bdf8] uppercase animate-glow-blue">
              OUR IMPACT &gt;
            </div>
            
            <h2 className="font-pixel text-2xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-normal leading-[1.2]">
              A growing<br className="hidden sm:inline" />
              {' '}community of<br className="hidden sm:inline" />
              {' '}problem solvers.
            </h2>

            <div className="w-9 h-1 bg-[#f5ba13] rounded-sm shadow-[0_0_10px_#f5ba13] animate-glow-gold" />
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 sm:divide-x divide-white/10">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon
                return (
                  <div 
                    key={idx} 
                    className={`flex flex-col items-start space-y-2.5 p-3.5 sm:p-0 sm:py-0 transition-all duration-300 transform hover:-translate-y-1 group bg-[#080d18]/50 sm:bg-transparent rounded-xl sm:rounded-none border border-white/5 sm:border-0 ${
                      idx === 0 ? 'sm:pr-6 sm:pl-0' : 'sm:px-6'
                    }`}
                  >
                    <div className="h-8 flex items-center">
                      <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 ${stat.iconColor} drop-shadow-[0_0_8px_currentColor] transition-transform duration-300 group-hover:scale-110`} />
                    </div>
                    
                    <div className="font-pixel text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-normal group-hover:text-[#f5ba13] transition-colors duration-300">
                      <AnimatedCounter value={stat.value} duration={1600 + idx * 250} />
                    </div>

                    <div className="text-xs sm:text-sm font-sans text-slate-400 font-medium leading-snug">
                      <div>{stat.label1}</div>
                      <div>{stat.label2}</div>
                    </div>
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

