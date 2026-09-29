const SERVICE_ROLE_KEY_FALLBACK = ''
const SUPABASE_URL_FALLBACK = 'https://yzxvryfecznctzhfbixh.supabase.co'

export async function submitMemberApplication(formData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || SERVICE_ROLE_KEY_FALLBACK
  const apiUrl = import.meta.env.VITE_API_URL

  const id = `MEM-${Math.floor(100000 + Math.random() * 900000)}`
  const now = new Date().toISOString()
  const displayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const payload = {
    full_name: (formData.fullName || formData.name || '').trim(),
    email: (formData.email || '').trim(),
    phone_number: (formData.phone || '').trim(),
    national_id: (formData.nationalId || '').trim() || '00000000000000',
    university: (formData.university === 'Other' ? formData.customUniversity : formData.university) || 'HIMIT',
    major: (formData.major === 'Others' ? formData.customMajor : formData.major) || 'Computer Science',
    academic_year: (formData.academicYear || '').trim(),
    codeforces_handle: (formData.codeforcesHandle || formData.codeforces || '').trim() || null,
    linkedin_link: (formData.linkedinLink || '').trim() || null,
    why_join: (formData.whyJoin || formData.trackPreference || formData.track || '').trim() || null,
    experience: formData.experience || formData.trackPreference || null,
    image: formData.image || null,
    problem_solution: (formData.problemSolution || '').trim() || null,
    status: 'pending',
    created_at: now
  }

  let dbSuccess = false
  let dbError = null

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/member_applications`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        dbSuccess = true
      } else {
        dbError = await res.text()
      }
    } catch (e) {
      dbError = e.message
    }
  }

  if (!dbSuccess && apiUrl) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/member-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) dbSuccess = true
    } catch (e) {}
  }

  const localRecord = {
    id,
    name: payload.full_name,
    email: payload.email,
    phone: payload.phone_number,
    nationalId: payload.national_id,
    university: payload.university,
    major: payload.major,
    academicYear: payload.academic_year,
    codeforces: payload.codeforces_handle,
    linkedin: payload.linkedin_link,
    whyJoin: payload.why_join,
    createdAt: displayDate,
    status: 'Active Member',
    synced: dbSuccess
  }

  try {
    const saved = JSON.parse(localStorage.getItem('icpc_member_apps') || '[]')
    saved.unshift(localRecord)
    localStorage.setItem('icpc_member_apps', JSON.stringify(saved))
  } catch (err) {}

  return {
    success: true,
    id,
    data: localRecord,
    synced: dbSuccess,
    error: dbError
  }
}

export async function submitVolunteerApplication(formData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || SERVICE_ROLE_KEY_FALLBACK
  const apiUrl = import.meta.env.VITE_API_URL

  const id = `VOL-${Math.floor(100000 + Math.random() * 900000)}`
  const now = new Date().toISOString()
  const displayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const university = (formData.university === 'Other' ? formData.customUniversity : formData.university) || 'HIMIT'
  const major = (formData.major === 'Others' ? formData.customMajor : formData.major) || 'Computer Science'
  const academicYearNum = formData.academicYear === 'Graduate' ? 5 : Number((formData.academicYear || '').replace('Year ', '')) || 1

  const payload = {
    name: (formData.name || formData.fullName || '').trim(),
    email: (formData.email || '').trim(),
    phone_number: (formData.phone || '').trim(),
    national_id: (formData.nationalId || '').trim() || null,
    university,
    major,
    academic_year: academicYearNum,
    codeforces_handle: (formData.codeforces || '').trim() || null,
    committee_preference: formData.committee || 'General Volunteer',
    image: formData.image || null,
    national_id_front: formData.nationalIdFront || null,
    national_id_back: formData.nationalIdBack || null,
    custom_answers: formData.committeeAnswers || {},
    status: 'pending',
    created_at: now,
    legacy_reference: id
  }

  let dbSuccess = false
  let dbError = null

  if (supabaseUrl && supabaseKey) {
    try {
      const tableRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/volunteer_applications`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      })
      if (tableRes.ok) {
        dbSuccess = true
      } else {
        dbError = await tableRes.text()
      }
    } catch (e) {
      dbError = e.message
    }
  }

  if (!dbSuccess && apiUrl) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/volunteer-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) dbSuccess = true
    } catch (e) {}
  }

  const localRecord = {
    id,
    name: payload.name,
    email: payload.email,
    phone: payload.phone_number,
    nationalId: payload.national_id,
    university: payload.university,
    major: payload.major,
    academicYear: formData.academicYear || 'Year 1',
    committee: payload.committee_preference,
    codeforces: payload.codeforces_handle,
    createdAt: displayDate,
    status: 'Pending Review',
    synced: dbSuccess
  }

  try {
    const saved = JSON.parse(localStorage.getItem('icpc_volunteer_apps') || '[]')
    saved.unshift(localRecord)
    localStorage.setItem('icpc_volunteer_apps', JSON.stringify(saved))
  } catch (err) {}

  return {
    success: true,
    id,
    data: localRecord,
    synced: dbSuccess,
    error: dbError
  }
}

export async function submitTeamApplication(formData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || SERVICE_ROLE_KEY_FALLBACK
  const apiUrl = import.meta.env.VITE_API_URL

  const id = `TEAM-${Math.floor(100000 + Math.random() * 900000)}`
  const now = new Date().toISOString()
  const displayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const institution = formData.institution === 'Other' ? formData.customInstitution : formData.institution

  const payload = {
    team_name: (formData.teamName || '').trim(),
    institution: institution || 'HIMIT',
    member1_name: (formData.l1Name || '').trim(),
    member1_email: (formData.l1Email || '').trim(),
    member1_role: 'Leader',
    member2_name: (formData.m2Name || '').trim(),
    member2_email: (formData.m2Email || '').trim(),
    member2_role: 'Member 2',
    member3_name: (formData.m3Name || '').trim(),
    member3_email: (formData.m3Email || '').trim(),
    member3_role: 'Member 3',
    status: 'pending',
    created_at: now
  }

  let dbSuccess = false
  let dbError = null

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/team_applications`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        dbSuccess = true
      } else {
        dbError = await res.text()
      }

      const teamRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/teams`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          name: payload.team_name,
          institution: payload.institution
        })
      })

      if (teamRes.ok) {
        const teamRows = await teamRes.json()
        const insertedTeamId = teamRows?.[0]?.id
        if (insertedTeamId) {
          await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/team_members`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify([
              { team_id: insertedTeamId, name: payload.member1_name, email: payload.member1_email, role: 'Leader' },
              { team_id: insertedTeamId, name: payload.member2_name, email: payload.member2_email, role: 'Member 2' },
              { team_id: insertedTeamId, name: payload.member3_name, email: payload.member3_email, role: 'Member 3' }
            ])
          })
        }
      }
    } catch (e) {
      dbError = e.message
    }
  }

  if (!dbSuccess && apiUrl) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/team-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) dbSuccess = true
    } catch (e) {}
  }

  const localRecord = {
    id,
    teamName: payload.team_name,
    institution: payload.institution,
    l1Name: payload.member1_name,
    l1Email: payload.member1_email,
    l1Phone: formData.l1Phone || '',
    l1Codeforces: formData.l1Codeforces || '',
    m2Name: payload.member2_name,
    m2Email: payload.member2_email,
    m2Phone: formData.m2Phone || '',
    m2Codeforces: formData.m2Codeforces || '',
    m3Name: payload.member3_name,
    m3Email: payload.member3_email,
    m3Phone: formData.m3Phone || '',
    m3Codeforces: formData.m3Codeforces || '',
    createdAt: displayDate,
    status: 'Active Team',
    synced: dbSuccess
  }

  try {
    const saved = JSON.parse(localStorage.getItem('icpc_teams') || '[]')
    saved.unshift(localRecord)
    localStorage.setItem('icpc_teams', JSON.stringify(saved))
  } catch (err) {}

  return {
    success: true,
    id,
    data: localRecord,
    synced: dbSuccess,
    error: dbError
  }
}

export async function fetchCommittees() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || SERVICE_ROLE_KEY_FALLBACK
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

export async function submitAttendanceRecord(formData) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL_FALLBACK
  const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || SERVICE_ROLE_KEY_FALLBACK

  const id = `ATT-${Date.now()}`
  const now = new Date().toISOString()
  const todayDate = now.split('T')[0]
  const displayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const studentName = (formData.name || '').trim()
  const studentEmail = (formData.email || '').trim().toLowerCase()
  const studentPhone = (formData.phone || '').trim().replace(/\D/g, '')
  const studentHandle = (formData.codeforces || '').trim()
  const sessionNum = parseInt(formData.sessionNumber) || 1
  const sessionType = (formData.sessionType || 'regular').toLowerCase()
  const sessionTitle = (formData.sessionTitle || 'Active Session').trim()

  let matchedMemberId = null
  let matchedName = studentName

  if (supabaseUrl && supabaseKey) {
    try {
      let filterQuery = ''
      if (studentEmail) {
        filterQuery = `Email=eq.${encodeURIComponent(studentEmail)}`
      } else if (studentPhone && studentPhone.length >= 8) {
        filterQuery = `Phone%20number=like.*${encodeURIComponent(studentPhone.slice(-8))}`
      } else if (studentHandle) {
        filterQuery = `Codeforces%20Handle=eq.${encodeURIComponent(studentHandle)}`
      }

      if (filterQuery) {
        const memRes = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/Members?${filterQuery}&select=id,"Full Name",Email,"Phone number"&limit=1`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        })
        if (memRes.ok) {
          const memData = await memRes.json()
          if (Array.isArray(memData) && memData.length > 0) {
            matchedMemberId = memData[0].id
            matchedName = memData[0]['Full Name'] || studentName
          }
        }
      }
    } catch (e) {}

    try {
      const attPayload = {
        session_number: sessionNum,
        session_type: sessionType,
        status: 'present',
        date: todayDate,
        event_name: sessionTitle,
        notes: (formData.notes || '').trim() || null
      }
      if (matchedMemberId) {
        attPayload.member_id = matchedMemberId
      }

      await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/attendance`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(attPayload)
      })
    } catch (e) {}
  }

  const localRecord = {
    id,
    member_id: matchedMemberId || id,
    member_name: matchedName,
    name: studentName,
    email: studentEmail,
    phone: studentPhone,
    codeforces: studentHandle,
    session_number: sessionNum,
    session_type: sessionType,
    session_title: sessionTitle,
    status: 'present',
    date: todayDate,
    created_at: now,
    display_date: displayDate,
    notes: (formData.notes || '').trim()
  }

  try {
    const localRecords = JSON.parse(localStorage.getItem('local_attendance_records') || '[]')
    localRecords.unshift(localRecord)
    localStorage.setItem('local_attendance_records', JSON.stringify(localRecords))
  } catch (e) {}

  try {
    const sessionKey = `icpc_att_${sessionType}_s${sessionNum}`
    localStorage.setItem(sessionKey, JSON.stringify({
      id,
      timestamp: Date.now(),
      name: matchedName
    }))
  } catch (e) {}

  return {
    success: true,
    id,
    matched: Boolean(matchedMemberId),
    data: localRecord
  }
}

