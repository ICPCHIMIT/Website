import { supabase } from './supabase'

/**
 * Submits a new trainee/member application.
 * Persists directly to the Supabase member_applications table.
 * Strictly throws if the server fails — zero fake local success.
 */
export async function submitMemberApplication(formData) {
  const payload = {
    full_name: (formData.fullName || formData.name || '').trim(),
    email: (formData.email || '').trim().toLowerCase(),
    phone_number: (formData.phone || '').trim(),
    national_id: (formData.nationalId || '').trim() || null,
    university: (formData.university === 'Other' ? formData.customUniversity : formData.university) || 'HIMIT',
    major: (formData.major === 'Others' ? formData.customMajor : formData.major) || 'Computer Science',
    academic_year: (formData.academicYear || '').trim(),
    codeforces_handle: (formData.codeforcesHandle || formData.codeforces || '').trim() || null,
    linkedin_link: (formData.linkedinLink || '').trim() || null,
    why_join: (formData.whyJoin || formData.trackPreference || formData.track || '').trim() || null,
    experience: formData.experience || formData.trackPreference || null,
    image: formData.image || null,
    national_id_front: formData.nationalIdFront || null,
    national_id_back: formData.nationalIdBack || null,
    problem_solution: (formData.problemSolution || '').trim() || null,
    status: 'pending',
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('member_applications')
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error('Member application persistence failure:', error)
    throw new Error(error.message || 'Failed to submit application to server.')
  }

  return {
    success: true,
    id: data.id,
    data
  }
}

/**
 * Submits a new volunteer recruitment application.
 * Persists directly to the Supabase volunteer_applications table.
 */
export async function submitVolunteerApplication(formData) {
  const university = (formData.university === 'Other' ? formData.customUniversity : formData.university) || 'HIMIT'
  const major = (formData.major === 'Others' ? formData.customMajor : formData.major) || 'Computer Science'
  const academicYearNum = formData.academicYear === 'Graduate' ? 5 : Number((formData.academicYear || '').replace('Year ', '')) || 1

  const payload = {
    name: (formData.name || formData.fullName || '').trim(),
    email: (formData.email || '').trim().toLowerCase(),
    phone_number: (formData.phone || '').trim(),
    national_id: (formData.nationalId || '').trim() || null,
    university,
    major,
    academic_year: academicYearNum,
    codeforces_handle: (formData.codeforces || '').trim() || null,
    committee_preference: formData.committee || 'General Volunteer',
    second_committee_preference: formData.secondCommittee || null,
    image: formData.image || null,
    national_id_front: formData.nationalIdFront || null,
    national_id_back: formData.nationalIdBack || null,
    why_join: formData.whyJoin || null,
    experience: formData.experience || null,
    availability_hours: formData.availabilityHours ? parseInt(formData.availabilityHours) : null,
    custom_answers: formData.committeeAnswers || {},
    status: 'pending',
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('volunteer_applications')
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error('Volunteer application persistence failure:', error)
    throw new Error(error.message || 'Failed to submit volunteer application to server.')
  }

  return {
    success: true,
    id: data.id,
    data
  }
}

/**
 * Submits a 3-member team application for ICPC contest tracks.
 */
export async function submitTeamApplication(formData) {
  const institution = formData.institution === 'Other' ? formData.customInstitution : formData.institution

  const payload = {
    team_name: (formData.teamName || '').trim(),
    institution: institution || 'HIMIT',
    member1_name: (formData.l1Name || '').trim(),
    member1_email: (formData.l1Email || '').trim().toLowerCase(),
    member1_role: 'Leader',
    member2_name: (formData.m2Name || '').trim(),
    member2_email: (formData.m2Email || '').trim().toLowerCase(),
    member2_role: 'Member 2',
    member3_name: (formData.m3Name || '').trim(),
    member3_email: (formData.m3Email || '').trim().toLowerCase(),
    member3_role: 'Member 3',
    status: 'pending',
    created_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('team_applications')
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error('Team application persistence failure:', error)
    throw new Error(error.message || 'Failed to submit team registration to server.')
  }

  return {
    success: true,
    id: data.id,
    data
  }
}

/**
 * Fetches the active departments / committees list from Supabase.
 */
export async function fetchCommittees() {
  const { data, error } = await supabase
    .from('departments')
    .select('id, name, description, lead_id, created_at')
    .order('name')

  if (error) {
    console.warn('Error fetching departments, falling back to committees table:', error)
    const { data: commData } = await supabase
      .from('committees')
      .select('*')
      .order('name')
    return commData || []
  }

  return data || []
}

/**
 * Submits an attendance check-in record.
 */
export async function submitAttendanceRecord(formData) {
  const now = new Date().toISOString()
  const todayDate = now.split('T')[0]
  const studentName = (formData.name || '').trim()
  const studentEmail = (formData.email || '').trim().toLowerCase()
  const sessionNum = parseInt(formData.sessionNumber) || 1
  const sessionType = (formData.sessionType || 'regular').toLowerCase()
  const sessionTitle = (formData.sessionTitle || 'Active Session').trim()

  const payload = {
    session_number: sessionNum,
    session_type: sessionType,
    status: 'present',
    date: todayDate,
    event_name: sessionTitle,
    notes: (formData.notes || `Self check-in by ${studentName} (${studentEmail})`).trim()
  }

  const { data, error } = await supabase
    .from('attendance')
    .insert([payload])
    .select()
    .single()

  if (error) {
    console.error('Attendance record persistence failure:', error)
    throw new Error(error.message || 'Failed to record attendance in server database.')
  }

  return {
    success: true,
    id: data.id,
    data
  }
}
