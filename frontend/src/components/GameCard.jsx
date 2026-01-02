export default function GameCard({ game, isFavorite, toggleFavorite }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow relative">
      <button
        onClick={() => toggleFavorite(game.id)}
        className="absolute top-3 right-3 text-xl"
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <p className="text-xs text-gray-500">{game.sport}</p>
      <h3 className="text-lg font-semibold">{game.teams}</h3>
      <p className="text-sm text-gray-600">{game.league}</p>
      <p className="text-xs text-gray-400 mt-2">
        Starts at: {new Date(game.startTime).toLocaleString()}
      </p>
    </div>
  );
}
