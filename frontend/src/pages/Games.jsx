import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import GameCard from "../components/GameCard";
import { FiSearch } from "react-icons/fi";


export default function Games() {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 6;

  // ---------------- FETCH MATCHES ----------------
  
  const fetchGames = async (filter, pageNumber = 1) => {
  try {
    setLoading(true);
    setError("");

    const params = [];

    if (filter !== "All" && filter !== "Favorites") {
      params.push(`sport=${filter}`);
    }

    if (search) {
      params.push(`search=${search}`);
    }

    params.push(`page=${pageNumber}`);
    params.push("limit=6");

    const res = await api.get(`/matches?${params.join("&")}`);

    setGames(Array.isArray(res.data.data) ? res.data.data : []);

    setTotalPages(res.data.totalPages);
    setPage(pageNumber);
  } catch {
    setError("Failed to load games");
  } finally {
    setLoading(false);
  }
};


  // ---------------- FETCH FAVORITES ----------------
  const fetchFavorites = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const res = await api.get(
        `/favorites?page=${pageNumber}&limit=${PAGE_SIZE}`
      );

      setGames(Array.isArray(res.data.data) ? res.data.data : []);

      setTotalPages(res.data.totalPages);
      setPage(pageNumber);
    } catch {
      setError("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };


  // ---------------- TOGGLE FAVORITE ----------------
  const toggleFavorite = async (matchId) => {
    try {
      if (favorites.includes(matchId)) {
        await api.delete(`/favorites/${matchId}`);
        setFavorites((prev) => prev.filter((id) => id !== matchId));
      } else {
        await api.post(`/favorites/${matchId}`);
        setFavorites((prev) => [...prev, matchId]);
      }
    } catch (err) {
      alert("Unable to update favorites");
    }
  };

  // ---------------- EFFECTS ----------------
 

  useEffect(() => {
  const delay = setTimeout(() => {
    if (activeFilter === "Favorites") {
      fetchFavorites(1);
    } else {
      fetchGames(activeFilter, 1);
    }
  }, 400);

  return () => clearTimeout(delay);
}, [activeFilter, search]);


  // ---------------- FILTER FAVORITES ----------------
  const displayedGames = games;

  useEffect(() => {
  const loadFavorites = async () => {
    try {
      const res = await api.get(`/favorites?page=1&limit=100`);
      const favIds = res.data.data.map(game => game.id);
      setFavorites(favIds);
    } catch (err) {
      console.error("Failed to fetch favorite IDs");
    }
  };

  loadFavorites();
}, []);

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

     <FilterBar active={activeFilter} setActive={setActiveFilter}>
      {/* Search Input */}
      <div className="relative w-full md:w-80">
      <FiSearch className="absolute left-3 top-2.5 text-gray-400" size={18} />

      <input
        type="text"
        placeholder="Search by team, league or sport..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-1 focus:ring-black"
      />
    </div>

</FilterBar>

    
      
      <div className="p-6">
        {loading && (
          <p className="text-center text-gray-500">Loading games...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && displayedGames?.length === 0 && (
          <p className="text-center text-gray-500">No games found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGames?.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={favorites.includes(game.id)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
                  key={i}
                  onClick={() => {
                  if (activeFilter === "Favorites") {
                    fetchFavorites(i + 1);
                  } else {
                    fetchGames(activeFilter, i + 1);
                  }
                }}

              className={`px-3 py-1 rounded
                ${page === i + 1 ? "bg-black text-white" : "bg-gray-200"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}
