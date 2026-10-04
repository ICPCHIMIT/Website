import { supabase } from './supabase'

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

// In-memory cache for active session
let inMemoryControlsCache = null

export async function fetchFormControls() {
  try {
    const { data: rpcData, error: rpcError } = await supabase.rpc('get_public_website_settings')
    if (!rpcError && rpcData?.form_controls_data) {
      inMemoryControlsCache = {
        ...DEFAULT_FORM_CONTROLS,
        ...rpcData.form_controls_data
      }
      return inMemoryControlsCache
    }

    const { data, error } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'form_controls_data')
      .maybeSingle()

    if (!error && data?.value) {
      inMemoryControlsCache = {
        ...DEFAULT_FORM_CONTROLS,
        ...data.value
      }
      return inMemoryControlsCache
    }
  } catch (err) {
    console.warn('Form controls fetch notice, using default configuration:', err)
  }

  return inMemoryControlsCache || DEFAULT_FORM_CONTROLS
}

export function getFormControl(formId) {
  if (inMemoryControlsCache && inMemoryControlsCache[formId]) {
    return inMemoryControlsCache[formId]
  }
  return DEFAULT_FORM_CONTROLS[formId] || { isOpen: true, options: {} }
}

export function subscribeToFormControls(callback) {
  fetchFormControls().then(callback).catch(() => {})
  return () => {}
}
