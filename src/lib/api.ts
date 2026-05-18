import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://144.91.117.253:8001'

const AUTH_TOKEN_KEY = 'biiatouna_auth_token'
const AUTH_USER_KEY = 'biiatouna_auth_user'

export interface User {
  id: number
  email: string
  name: string
  phone_number: string
  is_staff: boolean
  points: number
  total_reports: number
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ReportAnalysis {
  incident_title?: string
  summary?: string
  waste_or_pollutant_type?: string
  waste_composition?: string
  physical_state?: string
  estimated_quantity?: string
  spread_scale?: string
  surface_condition?: string
  location_context?: string
  probable_source?: string
  visible_scene?: string
  visible_evidence?: string[]
  affected_elements?: string[]
  direct_risks?: string[]
  environmental_impacts?: string[]
  urgency_reasons?: string[]
  recommended_actions?: string[]
  confidence?: string
  uncertainties?: string[]
}

export interface AnalyzeResponse {
  is_valid_report_image: boolean
  type?: string
  severity?: string
  description?: string
  authority?: string
  message?: string
  guidance?: string[]
  analysis?: ReportAnalysis
}

export interface ReportResponse {
  id: number
  reporter_email?: string
  reporter_name?: string
  location_name: string
  type: string
  severity: string
  description: string
  authority: string
  formal_report: string
  latitude: number | null
  longitude: number | null
  image: string
  created_at: string
}

export interface AdminReportResponse extends ReportResponse {
  analysis_payload: AnalyzeResponse | Record<string, unknown>
}

export interface AdminDashboardResponse {
  summary: {
    total_reports: number
    critical_reports: number
    total_users: number
    total_points_awarded: number
  }
  top_locations: Array<{
    location_name: string
    total: number
  }>
  reports_by_type: Array<{
    name: string
    value: number
  }>
  reports_by_severity: Array<{
    name: string
    value: number
  }>
  reports_by_day: Array<{
    date: string
    count: number
  }>
  recent_reports: AdminReportResponse[]
}

export interface AdminUserResponse {
  id: number
  name: string
  email: string
  phone_number: string
  is_staff: boolean
  total_reports: number
  points: number
  joined_at: string
}

export const api = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setAuthSession(auth: AuthResponse) {
  localStorage.setItem(AUTH_TOKEN_KEY, auth.token)
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(auth.user))
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(AUTH_USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as User
  } catch {
    clearAuthSession()
    return null
  }
}

export async function registerUser(payload: { name: string; email: string; phone_number: string; password: string }) {
  const response = await api.post<AuthResponse>('/api/auth/register/', payload)
  setAuthSession(response.data)
  return response.data
}

export async function loginUser(payload: { identifier: string; password: string }) {
  const response = await api.post<AuthResponse>('/api/auth/login/', payload)
  setAuthSession(response.data)
  return response.data
}

export async function fetchMe() {
  const response = await api.get<User>('/api/auth/me/')
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(response.data))
  return response.data
}

export async function logoutUser() {
  try {
    await api.post('/api/auth/logout/')
  } finally {
    clearAuthSession()
  }
}

export async function analyzeImage(image: File) {
  const formData = new FormData()
  formData.append('image', image)

  const response = await api.post<AnalyzeResponse>('/api/analyze/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export async function createReport(payload: {
  locationName: string
  type: string
  severity: string
  description: string
  authority: string
  image: File
  analysisPayload?: AnalyzeResponse
}) {
  const formData = new FormData()
  formData.append('location_name', payload.locationName)
  formData.append('type', payload.type)
  formData.append('severity', payload.severity)
  formData.append('description', payload.description)
  formData.append('authority', payload.authority)
  formData.append('image', payload.image)

  if (payload.analysisPayload) {
    formData.append('analysis_payload', JSON.stringify(payload.analysisPayload))
  }

  const response = await api.post<ReportResponse>('/api/reports/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export async function fetchMyReports() {
  const response = await api.get<ReportResponse[]>('/api/reports/')
  return response.data
}

export async function fetchAdminDashboard() {
  const response = await api.get<AdminDashboardResponse>('/api/admin/dashboard/')
  return response.data
}

export async function fetchAdminReports(params?: { search?: string; severity?: string; type?: string }) {
  const response = await api.get<AdminReportResponse[]>('/api/admin/reports/', { params })
  return response.data
}

export async function fetchAdminAnalysis() {
  const response = await api.get<AdminReportResponse[]>('/api/admin/analysis/')
  return response.data
}

export async function fetchAdminUsers() {
  const response = await api.get<AdminUserResponse[]>('/api/admin/users/')
  return response.data
}
