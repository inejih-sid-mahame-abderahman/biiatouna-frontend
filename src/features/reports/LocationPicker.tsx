interface LocationPickerProps {
  onSubmit: () => void
  onBack: () => void
}

export function LocationPicker({ onSubmit, onBack }: LocationPickerProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">اختر الموقع</h2>
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">خريطة تفاعلية - قيد التطوير</p>
      </div>
      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 border border-gray-300 p-3 rounded-lg">
          السابق
        </button>
        <button onClick={onSubmit} className="flex-1 bg-primary-600 text-white p-3 rounded-lg">
          إرسال البلاغ
        </button>
      </div>
    </div>
  )
}