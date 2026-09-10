import { roadmapLevels as defaultRoadmapLevels } from '../data/roadmapData'

const WEBSITE_STORAGE_KEY = 'icpc_website_content_cache'
const ROADMAP_STORAGE_KEY = 'icpc_roadmap_content_cache'
const JOURNEY_STORAGE_KEY = 'icpc_journey_content_cache'
const SPONSORS_STORAGE_KEY = 'icpc_sponsors_content_cache'
const UPCOMING_EVENT_STORAGE_KEY = 'icpc_upcoming_event_content_cache'
const WEBSITE_EVENT = 'icpc_website_content_updated'
const ROADMAP_EVENT = 'icpc_roadmap_content_updated'
const JOURNEY_EVENT = 'icpc_journey_content_updated'
const SPONSORS_EVENT = 'icpc_sponsors_content_updated'
const UPCOMING_EVENT_EVENT = 'icpc_upcoming_event_content_updated'

export const DEFAULT_WEBSITE_DATA = {
  headline: "WHERE CODE SHAPES CHAMPIONS",
  subheadline: "The official competitive programming community at HIMIT. From your first line of code to regional podiums.",
  bannerEnabled: true,
  bannerText: "Registration for the upcoming training cycle is now OPEN!",
  bannerLink: "#join",
  stats: {
    membersCount: "250+",
    problemsSolved: "15,000+",
    trainingSessions: "80+",
    contestsWon: "12+"
  },
  links: {
    whatsappCommunity: "https://chat.whatsapp.com/ICPC-HIMIT-Official",
    discordServer: "https://discord.gg/icpc-himit",
    facebookPage: "https://facebook.com/icpc.himit",
    contactEmail: "icpc.himit@gmail.com"
  }
}

export const DEFAULT_JOURNEY_DATA = {
  tag: "THE JOURNEY",
  headline: "From fundamentals\nto real competition.",
  description: "A clear training path designed to help you grow step by step, at your own pace.",
  levels: [
    { id: "00", title: "Foundations" },
    { id: "01", title: "Problem Solving" },
    { id: "02", title: "Algorithms" },
    { id: "03", title: "Competitive" }
  ],
  codeTab: "solution.cpp",
  codeCommentLines: ["Think.", "Plan.", "Code.", "Improve."],
  handNoteLines: ["Same", "Logic", "Brighter", "Future_"],
  badgeNoteLines: ["better", "problem", "solvers", "together_"]
}

export const DEFAULT_SPONSORS_DATA = {
  title: "OUR SPONSORS & PARTNERS",
  sponsors: [
    {
      id: "himit",
      name: "HIMIT",
      logo: "/assets/himit.png",
      alt: "HIMIT - Higher Institute of Management & Information Technology",
      website: "https://himit-kfs.edu.eg/"
    },
    {
      id: "hirfa",
      name: "Hirfa",
      logo: "/assets/hirfa.png",
      alt: "Hirfa - Official Community Sponsor",
      website: "https://gethirfa.com"
    }
  ]
}

export const DEFAULT_UPCOMING_EVENT_DATA = {
  eventId: "792f4b5a-0c6b-443c-9e94-4e2fcddb6f62",
  tag: "UPCOMING EVENT",
  title: "ICPC HIMIT Contest #04",
  date: "APR 24, 2026",
  time: "02:00:00",
  starts_at: "2026-04-24T14:00:00Z",
  ends_at: "2026-04-24T16:00:00Z",
  location: "Lab 03 & Online Codeforces",
  description: "Official qualifications and practice contest for ICPC HIMIT teams.",
  buttonText: "View Details",
  buttonLink: "#contests",
  image: "/assets/upcoming events.png",
  sideNoteLines: ["A", "BIGGER", "TOMORROW", "AWAITS_"]
}

export function getLocalWebsiteData() {
  try {
    const saved = localStorage.getItem(WEBSITE_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...DEFAULT_WEBSITE_DATA,
        ...parsed,
        stats: {
          ...DEFAULT_WEBSITE_DATA.stats,
          ...(parsed.stats || {})
        },
        links: {
          ...DEFAULT_WEBSITE_DATA.links,
          ...(parsed.links || {})
        }
      }
    }
  } catch (e) {}
  return DEFAULT_WEBSITE_DATA
}

export function getLocalRoadmapData() {
  try {
    const saved = localStorage.getItem(ROADMAP_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (e) {}
  return defaultRoadmapLevels
}

export async function fetchWebsiteData() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return getLocalWebsiteData()
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/system_settings?key=eq.website_data&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (res.ok) {
      const rows = await res.json()
      if (Array.isArray(rows) && rows.length > 0 && rows[0]?.value) {
        const value = rows[0].value
        const merged = {
          ...DEFAULT_WEBSITE_DATA,
          ...value,
          stats: {
            ...DEFAULT_WEBSITE_DATA.stats,
            ...(value.stats || {})
          },
          links: {
            ...DEFAULT_WEBSITE_DATA.links,
            ...(value.links || {})
          }
        }
        try {
          localStorage.setItem(WEBSITE_STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(WEBSITE_EVENT, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }
  } catch (err) {}

  return getLocalWebsiteData()
}

export async function fetchRoadmapData() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return getLocalRoadmapData()
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/system_settings?key=eq.roadmap_data&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (res.ok) {
      const rows = await res.json()
      if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0]?.value) && rows[0].value.length > 0) {
        const val = rows[0].value
        try {
          localStorage.setItem(ROADMAP_STORAGE_KEY, JSON.stringify(val))
          window.dispatchEvent(new CustomEvent(ROADMAP_EVENT, { detail: val }))
        } catch (e) {}
        return val
      }
    }
  } catch (err) {}

  return getLocalRoadmapData()
}

export function subscribeToWebsiteData(callback) {
  const handler = (e) => {
    if (e.detail) {
      callback(e.detail)
    } else {
      callback(getLocalWebsiteData())
    }
  }

  window.addEventListener(WEBSITE_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(WEBSITE_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function subscribeToRoadmapData(callback) {
  const handler = (e) => {
    if (e.detail) {
      callback(e.detail)
    } else {
      callback(getLocalRoadmapData())
    }
  }

  window.addEventListener(ROADMAP_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(ROADMAP_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function getLocalJourneyData() {
  try {
    const saved = localStorage.getItem(JOURNEY_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...DEFAULT_JOURNEY_DATA,
        ...parsed,
        levels: Array.isArray(parsed.levels) && parsed.levels.length > 0 ? parsed.levels : DEFAULT_JOURNEY_DATA.levels,
        codeCommentLines: Array.isArray(parsed.codeCommentLines) && parsed.codeCommentLines.length > 0 ? parsed.codeCommentLines : DEFAULT_JOURNEY_DATA.codeCommentLines,
        handNoteLines: Array.isArray(parsed.handNoteLines) && parsed.handNoteLines.length > 0 ? parsed.handNoteLines : DEFAULT_JOURNEY_DATA.handNoteLines,
        badgeNoteLines: Array.isArray(parsed.badgeNoteLines) && parsed.badgeNoteLines.length > 0 ? parsed.badgeNoteLines : DEFAULT_JOURNEY_DATA.badgeNoteLines
      }
    }
  } catch (e) {}
  return DEFAULT_JOURNEY_DATA
}

export function getLocalSponsorsData() {
  try {
    const saved = localStorage.getItem(SPONSORS_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...DEFAULT_SPONSORS_DATA,
        ...parsed,
        sponsors: Array.isArray(parsed.sponsors) && parsed.sponsors.length > 0 ? parsed.sponsors : DEFAULT_SPONSORS_DATA.sponsors
      }
    }
  } catch (e) {}
  return DEFAULT_SPONSORS_DATA
}

export async function fetchJourneyData() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return getLocalJourneyData()
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/system_settings?key=eq.journey_data&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (res.ok) {
      const rows = await res.json()
      if (Array.isArray(rows) && rows.length > 0 && rows[0]?.value) {
        const val = rows[0].value
        const merged = {
          ...DEFAULT_JOURNEY_DATA,
          ...val,
          levels: Array.isArray(val.levels) && val.levels.length > 0 ? val.levels : DEFAULT_JOURNEY_DATA.levels,
          codeCommentLines: Array.isArray(val.codeCommentLines) && val.codeCommentLines.length > 0 ? val.codeCommentLines : DEFAULT_JOURNEY_DATA.codeCommentLines,
          handNoteLines: Array.isArray(val.handNoteLines) && val.handNoteLines.length > 0 ? val.handNoteLines : DEFAULT_JOURNEY_DATA.handNoteLines,
          badgeNoteLines: Array.isArray(val.badgeNoteLines) && val.badgeNoteLines.length > 0 ? val.badgeNoteLines : DEFAULT_JOURNEY_DATA.badgeNoteLines
        }
        try {
          localStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(JOURNEY_EVENT, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }
  } catch (err) {}

  return getLocalJourneyData()
}

export async function fetchSponsorsData() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return getLocalSponsorsData()
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/system_settings?key=eq.sponsors_data&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (res.ok) {
      const rows = await res.json()
      if (Array.isArray(rows) && rows.length > 0 && rows[0]?.value) {
        const val = rows[0].value
        const merged = {
          ...DEFAULT_SPONSORS_DATA,
          ...val,
          sponsors: Array.isArray(val.sponsors) && val.sponsors.length > 0 ? val.sponsors : DEFAULT_SPONSORS_DATA.sponsors
        }
        try {
          localStorage.setItem(SPONSORS_STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(SPONSORS_EVENT, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }
  } catch (err) {}

  return getLocalSponsorsData()
}

export function subscribeToJourneyData(callback) {
  const handler = (e) => {
    if (e.detail) {
      callback(e.detail)
    } else {
      callback(getLocalJourneyData())
    }
  }

  window.addEventListener(JOURNEY_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(JOURNEY_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function subscribeToSponsorsData(callback) {
  const handler = (e) => {
    if (e.detail) {
      callback(e.detail)
    } else {
      callback(getLocalSponsorsData())
    }
  }

  window.addEventListener(SPONSORS_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(SPONSORS_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export function getLocalUpcomingEventData() {
  try {
    const saved = localStorage.getItem(UPCOMING_EVENT_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...DEFAULT_UPCOMING_EVENT_DATA,
        ...parsed,
        sideNoteLines: Array.isArray(parsed.sideNoteLines) && parsed.sideNoteLines.length > 0 ? parsed.sideNoteLines : DEFAULT_UPCOMING_EVENT_DATA.sideNoteLines
      }
    }
  } catch (e) {}
  return DEFAULT_UPCOMING_EVENT_DATA
}

export async function fetchUpcomingEventData() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return getLocalUpcomingEventData()
  }

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/system_settings?key=eq.upcoming_event_data&select=value`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (res.ok) {
      const rows = await res.json()
      if (Array.isArray(rows) && rows.length > 0 && rows[0]?.value) {
        const val = rows[0].value
        const merged = {
          ...DEFAULT_UPCOMING_EVENT_DATA,
          ...val,
          sideNoteLines: Array.isArray(val.sideNoteLines) && val.sideNoteLines.length > 0 ? val.sideNoteLines : DEFAULT_UPCOMING_EVENT_DATA.sideNoteLines
        }
        try {
          localStorage.setItem(UPCOMING_EVENT_STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(UPCOMING_EVENT_EVENT, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }

    const calRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/calendar_events?select=*&order=starts_at.asc&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (calRes.ok) {
      const events = await calRes.json()
      if (Array.isArray(events) && events.length > 0) {
        const ev = events[0]
        const merged = {
          ...DEFAULT_UPCOMING_EVENT_DATA,
          eventId: ev.id,
          tag: ev.event_type ? `UPCOMING ${ev.event_type.toUpperCase()}` : 'UPCOMING EVENT',
          title: ev.title || DEFAULT_UPCOMING_EVENT_DATA.title,
          date: ev.starts_at ? new Date(ev.starts_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase() : DEFAULT_UPCOMING_EVENT_DATA.date,
          time: ev.starts_at ? new Date(ev.starts_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) : DEFAULT_UPCOMING_EVENT_DATA.time,
          starts_at: ev.starts_at,
          ends_at: ev.ends_at,
          location: ev.location || DEFAULT_UPCOMING_EVENT_DATA.location,
          description: ev.description || DEFAULT_UPCOMING_EVENT_DATA.description
        }
        try {
          localStorage.setItem(UPCOMING_EVENT_STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(UPCOMING_EVENT_EVENT, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }
  } catch (err) {}

  return getLocalUpcomingEventData()
}

export function subscribeToUpcomingEventData(callback) {
  const handler = (e) => {
    if (e.detail) {
      callback(e.detail)
    } else {
      callback(getLocalUpcomingEventData())
    }
  }

  window.addEventListener(UPCOMING_EVENT_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(UPCOMING_EVENT_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

export async function fetchCommittees() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/committees?select=*&order=name.asc`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) return data
      }
    } catch (e) {}
  }
  return null
}

