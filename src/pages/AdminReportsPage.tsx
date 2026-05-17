// AdminReportsPage - إدارة البلاغات للمشرف
// Developer: TODO - Implement reports table with search, filter, and CRUD operations

export default function AdminReportsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">إدارة البلاغات</h1>
          <p className="text-gray-600 mt-1">عرض وإدارة جميع البلاغات البيئية</p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="ابحث عن بلاغ..."
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:outline-none focus:border-green-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500">
            <option value="">جميع درجات الخطورة</option>
            <option value="منخفض">منخفض</option>
            <option value="متوسط">متوسط</option>
            <option value="مرتفع">مرتفع</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">رقم البلاغ</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">العنوان</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">النوع</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">المنطقة</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">الخطورة</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">الحالة</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">التاريخ</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-600">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-8">لا توجد بلاغات</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}