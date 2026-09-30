import React, { useState, useEffect } from 'react'
import { getLocalWebsiteData, fetchWebsiteData, subscribeToWebsiteData } from '../lib/websiteDataService'

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.3z"/>
    </svg>
  )
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function MailIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

export default function Footer({ onNavigate }) {
  const [websiteData, setWebsiteData] = useState(() => getLocalWebsiteData())

  useEffect(() => {
    fetchWebsiteData().then(setWebsiteData)
    const unsubscribe = subscribeToWebsiteData(setWebsiteData)
    return unsubscribe
  }, [])

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Committees', id: 'committees' },
  ]

  const socials = [
    { 
      name: 'WhatsApp Community', 
      icon: WhatsAppIcon, 
      href: websiteData.links?.whatsappCommunity || 'https://chat.whatsapp.com' 
    },
    { 
      name: 'Facebook', 
      icon: FacebookIcon, 
      href: websiteData.links?.facebookPage || 'https://facebook.com' 
    },
    { 
      name: 'Email Support', 
      icon: MailIcon, 
      href: `mailto:${websiteData.links?.contactEmail || 'icpc.himit@gmail.com'}` 
    },
  ]

  return (
    <footer className="bg-[#04060c] border-t border-white/5 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/5">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <button 
              onClick={() => onNavigate && onNavigate('home')}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <img 
                src="/assets/logo.png" 
                alt="ICPC HIMIT Logo" 
                className="w-9 h-9 object-contain drop-shadow-[0_0_8px_rgba(245,186,19,0.3)] transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm leading-tight tracking-wider text-white">ICPC</span>
                <span className="font-bold text-xs leading-tight tracking-widest text-slate-300">HIMIT</span>
              </div>
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href || '#'}
                onClick={(e) => {
                  if (onNavigate && (link.id === 'home' || link.id === 'about' || link.id === 'roadmap' || link.id === 'committees')) {
                    e.preventDefault()
                    onNavigate(link.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-[#f5ba13] transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="text-slate-300 hover:text-[#f5ba13] transition-all duration-200 p-1.5 hover:scale-115"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-2">
          <div>
            For better problem solvers.
          </div>
          <div>
            Made by problem solvers, for problem solvers.
          </div>
        </div>

      </div>
    </footer>
  )
}
