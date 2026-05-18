import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ReportPage from './pages/ReportPage'
import SuccessPage from './pages/SuccessPage'
import UserDashboardPage from './pages/UserDashboardPage'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminReportsPage from './pages/AdminReportsPage'
import AdminAnalysisPage from './pages/AdminAnalysisPage'
import AdminHeatmapPage from './pages/AdminHeatmapPage'
import AdminStatisticsPage from './pages/AdminStatisticsPage'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminLoginPage from './pages/auth/AdminLoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<UserDashboardPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/success" element={<SuccessPage />} />
        
        {/* Admin Routes with Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/analysis" element={<AdminAnalysisPage />} />
          <Route path="/admin/heatmap" element={<AdminHeatmapPage />} />
          <Route path="/admin/statistics" element={<AdminStatisticsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
