import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Impact from './components/Impact'
import MoreThanAClub from './components/MoreThanAClub'
import TheJourney from './components/TheJourney'
import UpcomingEvent from './components/UpcomingEvent'
import CommunityQuote from './components/CommunityQuote'
import Sponsors from './components/Sponsors'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'
import RoadmapPage from './components/RoadmapPage'
import CommitteesPage from './components/CommitteesPage'
import AboutPage from './components/AboutPage'
import JoinModal from './components/JoinModal'
import VolunteerRegisterPage from './components/VolunteerRegisterPage'
import MemberRegisterPage from './components/MemberRegisterPage'
import TeamRegisterPage from './components/TeamRegisterPage'
import AttendancePage from './components/AttendancePage'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const path = window.location.pathname
      if (hash === '#team-register' || path === '/team-register') {
        setActivePage('team-register')
      } else if (hash === '#about') {
        setActivePage('about')
      } else if (hash === '#roadmap') {
        setActivePage('roadmap')
      } else if (hash === '#committees') {
        setActivePage('committees')
      } else if (hash === '#volunteer-register') {
        setActivePage('volunteer-register')
      } else if (hash === '#member-register') {
        setActivePage('member-register')
      } else if (hash === '#attendance' || path === '/attendance' || path === '/public-attendance') {
        setActivePage('attendance')
      } else if (hash === '#join') {
        setIsJoinModalOpen(true)
      } else if (hash === '' || hash === '#home' || hash === '#') {
        setActivePage('home')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (pageId) => {
    setActivePage(pageId)
    if (pageId === 'team-register') {
      window.location.hash = 'team-register'
    } else if (pageId === 'about') {
      window.location.hash = 'about'
    } else if (pageId === 'roadmap') {
      window.location.hash = 'roadmap'
    } else if (pageId === 'committees') {
      window.location.hash = 'committees'
    } else if (pageId === 'volunteer-register') {
      window.location.hash = 'volunteer-register'
    } else if (pageId === 'member-register') {
      window.location.hash = 'member-register'
    } else if (pageId === 'attendance') {
      window.location.hash = 'attendance'
    } else if (pageId === 'home') {
      window.location.hash = ''
    }
  }

  const handleOpenJoinModal = () => {
    setIsJoinModalOpen(true)
  }

  const handleCloseJoinModal = () => {
    setIsJoinModalOpen(false)
    if (window.location.hash === '#join') {
      window.location.hash = activePage === 'home' ? '' : activePage
    }
  }

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col selection:bg-[#f5ba13] selection:text-black">
      <Navbar 
        activePage={activePage} 
        setActivePage={handleNavigate} 
        onOpenJoinModal={handleOpenJoinModal} 
      />
      
      <main className="flex-grow">
        {activePage === 'home' && (
          <>
            <Hero />
            <Impact />
            <MoreThanAClub />
            <TheJourney />
            <UpcomingEvent />
            <CommunityQuote />
            <Sponsors />
            <CtaBanner onOpenJoinModal={handleOpenJoinModal} />
          </>
        )}
        {activePage === 'about' && (
          <AboutPage 
            onNavigateHome={() => handleNavigate('home')} 
            onOpenJoinModal={handleOpenJoinModal} 
          />
        )}
        {activePage === 'roadmap' && (
          <RoadmapPage 
            onNavigateHome={() => handleNavigate('home')} 
            onOpenJoinModal={handleOpenJoinModal} 
          />
        )}
        {activePage === 'committees' && (
          <CommitteesPage 
            onNavigateHome={() => handleNavigate('home')} 
            onOpenJoinModal={handleOpenJoinModal} 
          />
        )}
        {activePage === 'volunteer-register' && (
          <VolunteerRegisterPage 
            onNavigateHome={() => handleNavigate('home')} 
            onNavigateCommittees={() => handleNavigate('committees')} 
          />
        )}
        {activePage === 'member-register' && (
          <MemberRegisterPage 
            onNavigateHome={() => handleNavigate('home')} 
            onNavigateRoadmap={() => handleNavigate('roadmap')} 
          />
        )}
        {activePage === 'team-register' && (
          <TeamRegisterPage 
            onNavigateHome={() => handleNavigate('home')} 
          />
        )}
        {activePage === 'attendance' && (
          <AttendancePage 
            onNavigateHome={() => handleNavigate('home')} 
            onNavigateRoadmap={() => handleNavigate('roadmap')} 
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={handleCloseJoinModal} 
        onNavigate={handleNavigate} 
      />
    </div>
  )
}
