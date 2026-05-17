import { Routes, Route } from 'react-router-dom'
import { PublicLayout } from '@layouts/PublicLayout'
import { AdminLayout } from '@layouts/AdminLayout'
import { LandingPage } from '@pages/LandingPage'
import { ReportPage } from '@pages/ReportPage'
import { SuccessPage } from '@pages/SuccessPage'
import { TrackingPage } from '@pages/TrackingPage'
import { AwarenessPage } from '@pages/AwarenessPage'
import { AdminLoginPage } from '@pages/admin/AdminLoginPage'
import { AdminDashboardPage } from '@pages/admin/AdminDashboardPage'
import { AdminReportsPage } from '@pages/admin/AdminReportsPage'
import { AdminAnalyticsPage } from '@pages/admin/AdminAnalyticsPage'
import { AdminHeatmapPage } from '@pages/admin/AdminHeatmapPage'
import { AdminUsersPage } from '@pages/admin/AdminUsersPage'
import { ProtectedRoute } from '@components/common/ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
        <Route path="/awareness" element={<AwarenessPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          <Route path="/admin/heatmap" element={<AdminHeatmapPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Route>
    </Routes>
  )
}