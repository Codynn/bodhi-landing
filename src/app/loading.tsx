export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Navbar skeleton ── */}
      <div className="w-full h-16 sm:h-20 border-b border-gray-100 px-4 sm:px-8 flex items-center justify-between animate-pulse">
        <div className="w-32 sm:w-40 h-8 bg-gray-200 rounded-lg" />
        <div className="hidden md:flex items-center gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-16 h-4 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="w-24 h-9 bg-gray-200 rounded-full" />
      </div>

      {/* ── Hero skeleton ── */}
      <div className="flex-1 px-4 sm:px-8 pt-12 pb-16 flex flex-col items-center gap-6 animate-pulse">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-3 bg-gray-200 rounded" />
          <div className="w-2 h-3 bg-gray-100 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>

        {/* Page title */}
        <div className="w-48 sm:w-64 h-10 sm:h-12 bg-gray-200 rounded-xl" />

        {/* Tag */}
        <div className="w-32 h-3 bg-[#8F3648]/20 rounded" />

        {/* Heading */}
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <div className="w-full h-6 bg-gray-200 rounded" />
          <div className="w-4/5 h-6 bg-gray-200 rounded" />
          <div className="w-3/5 h-6 bg-gray-200 rounded" />
        </div>

        {/* Paragraphs */}
        <div className="flex flex-col gap-2 w-full max-w-2xl mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-4 bg-gray-100 rounded ${i === 3 ? 'w-2/3' : 'w-full'}`} />
          ))}
        </div>

        {/* CTA button */}
        <div className="w-36 h-11 bg-[#8F3648]/20 rounded-full mt-2" />

        {/* Image placeholder */}
        <div className="w-full max-w-3xl aspect-[16/7] bg-gray-200 rounded-2xl mt-6" />
      </div>

    </div>
  )
}