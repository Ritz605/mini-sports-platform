export default function FilterBar({ active, setActive, children }) {
  const filters = ["All", "Cricket", "Football", "Tennis", "Favorites"];

  return (
    <div className="bg-white px-6 py-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        
        {/* Search bar (from parent) */}
        {children}

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  active === filter
                    ? "bg-black text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
