// AdminDashboardPage - لوحة التحكم الرئيسية للمشرف
// Developer: TODO - Implement dashboard with statistics cards, charts, and recent reports
// Based on the HTML/CSS/JS code provided

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم الرئيسية</h1>
        <p className="text-gray-600 mt-1">مراقبة شاملة لحالة التلوث البيئي</p>
      </div>

      {/* TODO: Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Reports Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm">إجمالي البلاغات</p>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span>📊</span>
            </div>
          </div>
          <p className="text-white/60 text-xs mt-4">+12% من الأسبوع الماضي</p>
        </div>

        {/* Critical Cases Card */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80 text-sm">حالات حرجة</p>
              <p className="text-3xl font-bold mt-2">0</p>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span>⚠️</span>
            </div>
          </div>
          <p className="text-white/60 text-xs mt-4">تحتاج لمتابعة فورية</p>
        </div>

        {/* Most Polluted Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">أعلى منطقة تلوثًا</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">-</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span>📍</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">0 بلاغ</p>
        </div>

        {/* Success Rate Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-600 text-sm">معالجة ناجحة</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">0%</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span>✅</span>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-4">نسبة النجاح</p>
        </div>
      </div>

      {/* TODO: Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع أنواع التلوث</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">مخطط دائري - قيد التطوير</p>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">توزيع البلاغات حسب المناطق</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">مخطط شريطي - قيد التطوير</p>
          </div>
        </div>
      </div>

      {/* TODO: Recent Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">آخر البلاغات المستقبلة</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">عنوان البلاغ</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">النوع</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">المنطقة</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">الخطورة</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">التاريخ</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">لا توجد بلاغات</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}