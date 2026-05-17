export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-4">
            بيئتنا
          </h1>
          <p className="text-xl text-gray-600 mb-8">معًا من أجل موريتانيا أنظف</p>
          <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition">
            أبلغ الآن
          </button>
        </div>
      </div>
    </section>
  )
}