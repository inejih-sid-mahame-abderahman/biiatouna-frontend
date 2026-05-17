import { apiClient } from './api.config'
import type { Report, ReportStatus } from '@types/common.types'

// Mock data for development
const mockReports: Report[] = [
  {
    id: '1',
    title: 'تلوث في نهر السنغال',
    description: 'ملاحظة تلوث شديد في مياه النهر بالقرب من المناطق السكنية',
    pollutionType: 'water',
    severity: 'high',
    status: 'pending',
    location: { lat: 18.0735, lng: -15.9583, address: 'نهر السنغال' },
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user1',
    userName: 'أحمد محمد',
    upvotes: 5,
    comments: [],
  },
  {
    id: '2',
    title: 'نفايات صناعية في نواذيبو',
    description: 'تراكم النفايات الصناعية في المنطقة الحرة',
    pollutionType: 'industrial',
    severity: 'critical',
    status: 'processing',
    location: { lat: 20.9322, lng: -17.0439, address: 'نواذيبو' },
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 'user2',
    userName: 'فاطمة منت',
    upvotes: 12,
    comments: [],
  },
]

export const reportsService = {
  async getAllReports(): Promise<Report[]> {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockReports
  },

  async getReportById(id: string): Promise<Report | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockReports.find(r => r.id === id) || null
  },

  async createReport(report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>): Promise<Report> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newReport: Report = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: [],
    }
    mockReports.unshift(newReport)
    return newReport
  },

  async updateReportStatus(id: string, status: ReportStatus): Promise<Report> {
    await new Promise(resolve => setTimeout(resolve, 500))
    const report = mockReports.find(r => r.id === id)
    if (report) {
      report.status = status
      report.updatedAt = new Date()
      return report
    }
    throw new Error('Report not found')
  },

  async getReportsByLocation(bounds: any): Promise<Report[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockReports
  },
}