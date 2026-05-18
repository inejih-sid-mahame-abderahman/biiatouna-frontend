import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'

import { fetchAdminAnalysis, type AdminReportResponse, type AnalyzeResponse } from '@/lib/api'

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

function getAnalyzePayload(report: AdminReportResponse): AnalyzeResponse | null {
  const payload = report.analysis_payload
  if (!payload || Array.isArray(payload) || typeof payload !== 'object') {
    return null
  }
  return payload as AnalyzeResponse
}

export default function AdminAnalysisPage() {
  const [reports, setReports] = useState<AdminReportResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    void fetchAdminAnalysis()
      .then(setReports)
      .catch((loadError) => setError(getErrorMessage(loadError, 'تعذر تحميل التحليلات.')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">تحليل الذكاء الاصطناعي</h1>
        <p className="text-gray-600 mt-1">التحليلات التي تم إرسالها إلى الإدارة مع كل بلاغ</p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-8 text-center text-gray-600">جارٍ تحميل التحليلات...</div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
      ) : reports.length ? (
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report) => {
            const analysis = getAnalyzePayload(report)

            return (
              <article key={report.id} className="rounded-3xl bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm text-gray-500">بلاغ #{report.id}</p>
                    <h2 className="text-2xl font-bold text-gray-900">{report.location_name || 'موقع غير محدد'}</h2>
                    <p className="text-sm text-gray-500">{report.reporter_name || report.reporter_email || 'غير محدد'}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">{report.type}</span>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">{report.severity}</span>
                  </div>
                </div>

                {!analysis ? (
                  <div className="rounded-2xl bg-gray-50 p-4 text-gray-500">لا توجد تفاصيل تحليل محفوظة لهذا البلاغ.</div>
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-gray-700">ملخص التحليل</p>
                      <p className="text-sm leading-7 text-gray-700">{analysis.analysis?.summary || analysis.description || 'غير متوفر'}</p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-gray-700">الجهة المختصة المقترحة</p>
                      <p className="text-sm leading-7 text-gray-700">{analysis.authority || 'غير متوفر'}</p>
                      <p className="mt-4 mb-2 text-sm font-semibold text-gray-700">نسبة الثقة</p>
                      <p className="text-sm leading-7 text-gray-700">{analysis.analysis?.confidence || 'غير متوفر'}</p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4 lg:col-span-2">
                      <p className="mb-2 text-sm font-semibold text-gray-700">الأدلة المرئية</p>
                      <div className="flex flex-wrap gap-2">
                        {(analysis.analysis?.visible_evidence || []).length ? (
                          analysis.analysis?.visible_evidence?.map((item) => (
                            <span key={item} className="rounded-full bg-white px-3 py-1 text-sm text-gray-700 border border-gray-200">
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">غير متوفرة</span>
                        )}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-gray-700">المخاطر المباشرة</p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {(analysis.analysis?.direct_risks || []).length ? (
                          analysis.analysis?.direct_risks?.map((item) => <li key={item}>• {item}</li>)
                        ) : (
                          <li className="text-gray-500">غير متوفرة</li>
                        )}
                      </ul>
                    </div>
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="mb-2 text-sm font-semibold text-gray-700">الإجراءات الموصى بها</p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {(analysis.analysis?.recommended_actions || []).length ? (
                          analysis.analysis?.recommended_actions?.map((item) => <li key={item}>• {item}</li>)
                        ) : (
                          <li className="text-gray-500">غير متوفرة</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-8 text-center text-gray-500">لا توجد تحليلات متاحة حاليًا.</div>
      )}
    </div>
  )
}
