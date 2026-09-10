const SERVICE_ROLE_KEY_FALLBACK = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6eHZyeWZlY3puY3R6aGZiaXhoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzMwMDQ3NywiZXhwIjoyMTAyODc2NDc3fQ.tO3oP3MCqilobIjzX2TYRqAYIOuMrkChRr7yHUEz_FI'
const SUPABASE_URL_FALLBACK = 'https://yzxvryfecznctzhfbixh.supabase.co'
const STORAGE_KEY = 'icpc_website_form_controls'
const EVENT_NAME = 'icpc_form_controls_updated'

export const DEFAULT_FORM_CONTROLS = {
  member_registration: {
    id: 'member_registration',
    name: 'Member Registration Form',
    path: '/member-register',
    isOpen: true,
    closedTitle: 'Member Registration Closed',
    closedMessage: 'Member registration for the current cycle is currently closed. Thank you for your interest in ICPC HIMIT!',
    bannerMessage: '',
    deadline: '',
    allowMultipleSubmissions: false,
    options: {
      requireProblemChallenge: false,
      problemTitle: 'Codeforces 4A - Watermelon Challenge',
      problemUrl: 'https://codeforces.com/problemset/problem/4/A',
      problemDescription: 'Solve the problem on Codeforces and paste your solution code or submission URL below.',
      requireNationalId: true,
      requireProfileImage: true,
      requireUniversityId: false,
      allowTrackPreference: true,
      allowLinkedinLink: true,
      allowExperienceField: true,
      autoApproveMembers: false,
      maxApplicantsLimit: 0,
      confirmationMessage: 'Your member application has been received! Join our official community channels to stay updated.',
      communityWhatsappLink: 'https://chat.whatsapp.com/ICPC-HIMIT-Official',
      communityDiscordLink: 'https://discord.gg/icpc-himit'
    }
  },
  team_registration: {
    id: 'team_registration',
    name: 'Team Registration Form',
    path: '/team-register',
    isOpen: true,
    closedTitle: 'Team Registration Closed',
    closedMessage: 'Team registration is currently closed. Please check back for upcoming contest announcements.',
    bannerMessage: '',
    deadline: '',
    allowMultipleSubmissions: true,
    options: {
      contestDivision: 'Division 1 (Official ICPC Qualifiers)',
      maxTeamLimit: 100,
      allowCrossInstitution: true,
      allowTeamMotto: true,
      requireVjudgeHandles: true,
      requireNationalId: false,
      requireLeaderPhone: true,
      allowMemberPhones: true,
      allowCoachDetails: false,
      confirmationMessage: 'Your 3-member team has been registered! Join our official contest groups to get arena credentials and schedule details.',
      communityWhatsappLink: 'https://chat.whatsapp.com/ICPC-HIMIT-Teams',
      communityDiscordLink: 'https://discord.gg/icpc-himit'
    }
  },
  volunteer_registration: {
    id: 'volunteer_registration',
    name: 'Volunteer Application Form',
    path: '/volunteer-register',
    isOpen: true,
    closedTitle: 'Volunteer Recruitment Closed',
    closedMessage: 'Volunteer applications are currently closed. Follow our official channels for next recruitment call.',
    bannerMessage: '',
    deadline: '',
    allowMultipleSubmissions: false,
    options: {
      allowCommitteeSelection: true,
      allowSecondCommitteeChoice: true,
      requireNationalId: true,
      requireProfileImage: true,
      requireCodeforces: false,
      requirePortfolioLink: false,
      allowExperienceField: true,
      allowWhyJoinField: true,
      allowAvailabilityField: true,
      interviewInstructions: 'Shortlisted candidates will be contacted via WhatsApp/Phone for a 15-minute interview on campus or Google Meet.',
      confirmationMessage: 'Thank you for applying to volunteer at ICPC HIMIT! Our HR committee will review your application and contact you soon.',
      communityWhatsappLink: 'https://chat.whatsapp.com/ICPC-HIMIT-Volunteers',
      communityDiscordLink: 'https://discord.gg/icpc-himit'
    }
  },
  public_attendance: {
    id: 'public_attendance',
    name: 'Session Attendance Form',
    path: '/attendance',
    isOpen: true,
    closedTitle: 'Session Attendance Closed',
    closedMessage: 'Self-attendance logging is currently closed or the active session has ended.',
    bannerMessage: '',
    deadline: '',
    allowMultipleSubmissions: false,
    options: {
      sessionTitle: 'Active Training Session',
      sessionNumber: 1,
      sessionType: 'regular',
      checkpointNumber: 1,
      requirePinCode: false,
      pinCode: '1234',
      requirePhone: true,
      requireEmail: true,
      requireCodeforces: true,
      requireAcademicDetails: true,
      allowNotesField: true,
      preventDuplicateDevice: true,
      autoMatchMember: true,
      confirmationMessage: 'Attendance verified and recorded! Great job attending today session.',
      communityWhatsappLink: 'https://chat.whatsapp.com/ICPC-HIMIT-Official',
      communityDiscordLink: 'https://discord.gg/icpc-himit'
    }
  }
}

export function getLocalFormControls() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...DEFAULT_FORM_CONTROLS,
        ...parsed,
        member_registration: {
          ...DEFAULT_FORM_CONTROLS.member_registration,
          ...(parsed.member_registration || {}),
          options: {
            ...DEFAULT_FORM_CONTROLS.member_registration.options,
            ...(parsed.member_registration?.options || {})
          }
        },
        team_registration: {
          ...DEFAULT_FORM_CONTROLS.team_registration,
          ...(parsed.team_registration || {}),
          options: {
            ...DEFAULT_FORM_CONTROLS.team_registration.options,
            ...(parsed.team_registration?.options || {})
          }
        },
        volunteer_registration: {
          ...DEFAULT_FORM_CONTROLS.volunteer_registration,
          ...(parsed.volunteer_registration || {}),
          options: {
            ...DEFAULT_FORM_CONTROLS.volunteer_registration.options,
            ...(parsed.volunteer_registration?.options || {})
          }
        },
        public_attendance: {
          ...DEFAULT_FORM_CONTROLS.public_attendance,
          ...(parsed.public_attendance || {}),
          options: {
            ...DEFAULT_FORM_CONTROLS.public_attendance.options,
            ...(parsed.public_attendance?.options || {})
          }
        }
      }
    }
  } catch (e) {}
  return DEFAULT_FORM_CONTROLS
}

export function getFormControl(formId) {
  const all = getLocalFormControls()
  return all[formId] || DEFAULT_FORM_CONTROLS[formId]
}

export async function fetchFormControls() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || SERVICE_ROLE_KEY_FALLBACK

  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/form_controls?select=id,config`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })

    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        const merged = { ...getLocalFormControls() }
        for (const row of data) {
          if (row.id && row.config) {
            const def = DEFAULT_FORM_CONTROLS[row.id] || {}
            merged[row.id] = {
              ...def,
              ...row.config,
              options: {
                ...(def.options || {}),
                ...(row.config.options || {})
              }
            }
          }
        }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }

    const settingsRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/system_settings?key=eq.form_controls_data&select=*`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })
    if (settingsRes.ok) {
      const settingsData = await settingsRes.json()
      if (Array.isArray(settingsData) && settingsData[0]?.value) {
        const merged = { ...getLocalFormControls(), ...settingsData[0].value }
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: merged }))
        } catch (e) {}
        return merged
      }
    }
  } catch (err) {}

  return getLocalFormControls()
}

export function subscribeToFormControls(callback) {
  const handler = (e) => {
    if (e.detail) {
      callback(e.detail)
    } else {
      callback(getLocalFormControls())
    }
  }

  window.addEventListener(EVENT_NAME, handler)
  window.addEventListener('storage', handler)

  const timer = setInterval(() => {
    fetchFormControls().then(callback).catch(() => {})
  }, 3000)

  return () => {
    window.removeEventListener(EVENT_NAME, handler)
    window.removeEventListener('storage', handler)
    clearInterval(timer)
  }
}
