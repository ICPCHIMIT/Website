import React, { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'

export default function Navbar({ activePage, setActivePage, onOpenJoinModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Roadmap', id: 'roadmap' },
    { name: 'Committees', id: 'committees' },
  ]

  const handleNavClick = (link) => {
    setActivePage(link.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#05070d]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <img 
                src="/assets/logo.png" 
                alt="ICPC HIMIT Logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(245,186,19,0.4)] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-sm leading-tight tracking-wider text-white">ICPC</span>
                <span className="font-bold text-xs leading-tight tracking-widest text-slate-300">HIMIT</span>
              </div>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isCurrent = activePage === link.id
              return (
                <a
                  key={link.name}
                  href={link.href || '#'}
                  onClick={(e) => {
                    if (link.id === 'home' || link.id === 'about' || link.id === 'roadmap' || link.id === 'committees') {
                      e.preventDefault()
                    }
                    handleNavClick(link)
                  }}
                  className={`relative py-1 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isCurrent
                      ? 'text-[#f5ba13]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isCurrent && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#f5ba13] rounded-full shadow-[0_0_8px_#f5ba13]" />
                  )}
                </a>
              )
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              aria-label="Search"
              onClick={() => {
                setActivePage('roadmap')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="p-2.5 rounded-lg bg-[#0b101c]/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-all duration-200 cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenJoinModal}
              className="px-6 py-2.5 rounded-lg bg-[#f5ba13] hover:bg-[#eab308] text-black font-extrabold text-sm transition-all duration-200 shadow-[0_0_15px_rgba(245,186,19,0.35)] hover:shadow-[0_0_20px_rgba(245,186,19,0.55)] transform hover:-translate-y-0.5 cursor-pointer"
            >
              Join Us
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button 
              aria-label="Search"
              onClick={() => {
                setActivePage('roadmap')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="p-2 rounded-lg bg-[#0b101c]/80 border border-slate-700/60 text-slate-300"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 p-2 rounded-md hover:bg-white/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e17] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const isCurrent = activePage === link.id
            return (
              <a
                key={link.name}
                href={link.href || '#'}
                onClick={(e) => {
                  if (link.id === 'home' || link.id === 'about' || link.id === 'roadmap' || link.id === 'committees') {
                    e.preventDefault()
                  }
                  handleNavClick(link)
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isCurrent
                    ? 'text-[#f5ba13] bg-[#f5ba13]/10 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            )
          })}
          <div className="pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenJoinModal) onOpenJoinModal()
              }}
              className="block text-center w-full py-2.5 rounded-md bg-[#f5ba13] text-black font-bold text-base shadow-md cursor-pointer"
            >
              Join Us
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
