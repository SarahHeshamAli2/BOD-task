export function ProductImage({ row }) {
  return (
    <div className="flex items-center ">
      <div className="relative group">
        <img
        loading="lazy"
          src={row.image}
          alt={row.name.en || "Product image"}
          className="w-20 h-20 object-cover rounded-2xl shadow-lg border-3 border-white ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300"></div>
        <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
          <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}