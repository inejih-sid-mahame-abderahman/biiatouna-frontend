interface ReportFormProps {
  onNext: () => void
}

export function ReportForm({ onNext }: ReportFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">معلومات البلاغ</h2>
      <input
        type="text"
        placeholder="عنوان البلاغ"
        className="w-full p-3 border rounded-lg"
      />
      <textarea
        placeholder="وصف المشكلة"
        rows={4}
        className="w-full p-3 border rounded-lg"
      />
      <select className="w-full p-3 border rounded-lg">
        <option>نوع التلوث</option>
        <option>تلوث مياه</option>
        <option>تلوث هواء</option>
        <option>نفايات</option>
      </select>
      <button onClick={onNext} className="w-full bg-primary-600 text-white p-3 rounded-lg">
        التالي
      </button>
    </div>
  )
}