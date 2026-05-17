interface ImageUploadProps {
  onNext: () => void
  onBack: () => void
}

export function ImageUpload({ onNext, onBack }: ImageUploadProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">رفع الصور</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500">اسحب الصور هنا أو انقر للاختيار</p>
      </div>
      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 border border-gray-300 p-3 rounded-lg">
          السابق
        </button>
        <button onClick={onNext} className="flex-1 bg-primary-600 text-white p-3 rounded-lg">
          التالي
        </button>
      </div>
    </div>
  )
}