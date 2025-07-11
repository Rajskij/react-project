import { Heart } from "lucide-react";
import { genres } from "@/lib/data.js";
import { useFavorites } from "@/hooks/useFavorites";
import { Link } from "react-router-dom";

export function MovieCard({ id, imgUrl, title, date, votes, overview, genreIds, state, dispatch }) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const localDate = new Date(date).toLocaleDateString('en-US', options);

    function handleClick(movieId, title) {
        if (state[movieId]) {
            dispatch({ type: 'REMOVE_FAVORITE', payload: { id: movieId, title } });
        } else {
            dispatch({ type: 'SAVE_FAVORITE', payload: { id: movieId, title } });
        }
    }

    return (
        <div key={id} className="flex flex-col md:flex-row bg-muted/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mt-3">
            <Link to={`/details/${id}`} >
                <img src={imgUrl} alt={title} className="w-full md:w-auto md:h-[300px] object-cover" />
            </Link>
            <div className="p-4 w-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <Link to={`/details/${id}`} >
                            <h2 className="text-xl font-bold">{title}</h2>
                        </Link>
                        {state && <Heart
                            onClick={() => handleClick(id, title)}
                            fill={state[id] ? 'var(--color-primary)' : 'var(--color-background)'}
                            className="text-primary cursor-pointer" />}
                    </div>
                    <p className="text-sm text-gray-500 mb-1">Released: {localDate}</p>
                    <p className="text-sm text-yellow-600 font-semibold">Average votes: {votes}</p>
                    <p className="text-sm mt-2 text-gray-700">{overview}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-1 text-xs text-white">
                    {genreIds.map(id => (
                        <span key={id} className="bg-primary px-2 py-1 rounded">
                            {genres.get(id) || 'Unknown'}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
