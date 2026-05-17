export type PollutionType = 
  | 'air'
  | 'water'
  | 'soil'
  | 'noise'
  | 'waste'
  | 'industrial'
  | 'agricultural'

export type ReportStatus = 
  | 'pending'
  | 'processing'
  | 'verified'
  | 'resolved'
  | 'rejected'

export type Severity = 'low' | 'medium' | 'high' | 'critical'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'moderator'
  createdAt: Date
  phone?: string
  location?: GeoLocation
}

export interface GeoLocation {
  lat: number
  lng: number
  address?: string
}

export interface Report {
  id: string
  title: string
  description: string
  pollutionType: PollutionType
  severity: Severity
  status: ReportStatus
  location: GeoLocation
  images: string[]
  createdAt: Date
  updatedAt: Date
  userId: string
  userName: string
  upvotes: number
  comments: Comment[]
}

export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  createdAt: Date
}

export interface AnalyticsData {
  totalReports: number
  resolvedReports: number
  pendingReports: number
  averageResponseTime: number
  pollutionTrends: {
    date: string
    count: number
    type: PollutionType
  }[]
  severityDistribution: {
    severity: Severity
    count: number
  }[]
  topLocations: {
    location: string
    reports: number
    lat: number
    lng: number
  }[]
}

export interface HeatmapPoint {
  lat: number
  lng: number
  intensity: number
  type: PollutionType
}