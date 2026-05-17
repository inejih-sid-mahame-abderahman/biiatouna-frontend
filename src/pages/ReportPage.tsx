import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ReportPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    location: '',
    severity: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('تم إرسال البلاغ بنجاح! شكرًا لك')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="text-green-600 hover:text-green-700"
          >
            ← العودة للرئيسية
          </button>
          <h1 className="text-xl font-bold text-gray-800">إرسال بلاغ جديد</h1>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          {/* عنوان البلاغ */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              عنوان البلاغ *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="مثال: تلوث في نهر السنغال"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          {/* وصف المشكلة */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              وصف المشكلة *
            </label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="اشرح المشكلة بالتفصيل..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          {/* نوع التلوث */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              نوع التلوث *
            </label>
            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">اختر النوع</option>
              <option value="مياه">تلوث مياه</option>
              <option value="هواء">تلوث هواء</option>
              <option value="نفايات">نفايات</option>
              <option value="صناعي">تلوث صناعي</option>
            </select>
          </div>

          {/* الموقع */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الموقع *
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="مثال: نواكشوط، تيارت"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          {/* درجة الخطورة */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              درجة الخطورة *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="منخفض"
                  checked={formData.severity === 'منخفض'}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                  required
                />
                <span>منخفض</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="متوسط"
                  checked={formData.severity === 'متوسط'}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                />
                <span>متوسط</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="مرتفع"
                  checked={formData.severity === 'مرتفع'}
                  onChange={(e) => setFormData({...formData, severity: e.target.value})}
                />
                <span>مرتفع</span>
              </label>
            </div>
          </div>

          {/* أزرار الإجراء */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              إرسال البلاغ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}