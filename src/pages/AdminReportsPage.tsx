import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { fetchAdminReports, type AdminReportResponse } from '@/lib/api'

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const detail = error.response?.data?.detail
    if (typeof detail === 'string' && detail.trim()) {
      return detail
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return fallback
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar-MR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function exportReportPdf(report: AdminReportResponse) {
  const printWindow = window.open('', '_blank', 'width=900,height=700')
  if (!printWindow) {
    return
  }

  const fields = [
    ['رقم البلاغ', `#${report.id}`],
    ['اسم المبلغ', report.reporter_name || 'غير محدد'],
    ['البريد الإلكتروني', report.reporter_email || 'غير متوفر'],
    ['الموقع', report.location_name || 'غير محدد'],
    ['النوع', report.type],
    ['درجة الخطورة', report.severity],
    ['الجهة المختصة', report.authority],
    ['تاريخ الإنشاء', formatDate(report.created_at)],
    ['الوصف', report.description],
    ['البلاغ الرسمي', report.formal_report || 'غير متوفر'],
  ]

  const rows = fields
    .map(
      ([label, value]) => `
        <div class="row">
          <div class="label">${escapeHtml(label)}</div>
          <div class="value">${escapeHtml(value)}</div>
        </div>
      `,
    )
    .join('')

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8" />
        <title>بلاغ رقم ${report.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 32px;
            background: #f8fafc;
            color: #111827;
          }
          .sheet {
            max-width: 900px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 20px;
            padding: 32px;
          }
          h1 {
            margin: 0 0 8px;
            font-size: 28px;
          }
          .subtitle {
            margin: 0 0 24px;
            color: #4b5563;
          }
          .row {
            padding: 14px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .label {
            font-weight: 700;
            margin-bottom: 6px;
            color: #065f46;
          }
          .value {
            line-height: 1.8;
            white-space: pre-wrap;
          }
          @media print {
            body {
              background: #fff;
              padding: 0;
            }
            .sheet {
              border: none;
              border-radius: 0;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          <h1>تقرير البلاغ البيئي</h1>
          <p class="subtitle">نسخة مخصصة للإدارة وتشمل اسم المستخدم المسجل عند إنشاء الحساب.</p>
          ${rows}
        </div>
        <script>
          window.onload = function () {
            window.print();
          };
        </script>
      </body>
    </html>
  `)
  printWindow.document.close()
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<AdminReportResponse[]>([])
  const [search, setSearch] = useState('')
  const [severity, setSeverity] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')

    void fetchAdminReports({ search, severity })
      .then(setReports)
      .catch((loadError) => setError(getErrorMessage(loadError, 'تعذر تحميل البلاغات.')))
      .finally(() => setLoading(false))
  }, [search, severity])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة البلاغات</h1>
          <p className="text-gray-600 mt-1">عرض ومراجعة جميع البلاغات البيئية المرسلة من المستخدمين</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث باسم الموقع أو البريد..."
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-72 focus:outline-none focus:border-green-500"
          />
          <select
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
          >
            <option value="">جميع درجات الخطورة</option>
            <option value="منخفضة">منخفضة</option>
            <option value="متوسطة">متوسطة</option>
            <option value="حرجة">حرجة</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-600">جار تحميل البلاغات...</div>
        ) : error ? (
          <div className="p-6 text-red-700 bg-red-50 border-b border-red-200">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">رقم البلاغ</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">المستخدم</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">الموقع</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">النوع</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">الخطورة</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">الجهة</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">التاريخ</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">التنزيل</th>
                </tr>
              </thead>
              <tbody>
                {reports.length ? (
                  reports.map((report) => (
                    <tr key={report.id} className="border-t border-gray-100">
                      <td className="p-4 text-sm text-gray-800">#{report.id}</td>
                      <td className="p-4 text-sm text-gray-800">
                        <div className="font-semibold">{report.reporter_name || 'غير محدد'}</div>
                        <div className="text-gray-500">{report.reporter_email || ''}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-800">{report.location_name || 'غير محدد'}</td>
                      <td className="p-4 text-sm text-gray-800">{report.type}</td>
                      <td className="p-4 text-sm text-gray-800">{report.severity}</td>
                      <td className="p-4 text-sm text-gray-800">{report.authority}</td>
                      <td className="p-4 text-sm text-gray-800">{formatDate(report.created_at)}</td>
                      <td className="p-4 text-sm text-gray-800">
                        <button
                          type="button"
                          onClick={() => exportReportPdf(report)}
                          className="rounded-lg bg-green-50 px-3 py-2 font-semibold text-green-700 hover:bg-green-100"
                        >
                          PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-8">لا توجد بلاغات مطابقة.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
