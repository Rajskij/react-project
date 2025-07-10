import { Heart } from "lucide-react";
import { genres } from "@/lib/data.js";

export function MovieCard( {id, imgUrl, title, date, votes, overview, genreIds, selectedMovies, handleClick} ) {   
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    const localDate = new Date(date).toLocaleDateString('en-US', options);
    return (
        <div key={id} className="flex flex-col md:flex-row bg-muted/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mt-3">
            <img src={imgUrl} alt={title} className="w-full md:w-auto md:h-[300px] object-cover" />
            <div className="p-4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <h2 className="text-xl font-bold">{title}</h2>
                        {selectedMovies && <Heart
                            onClick={() => handleClick(id, title)}
                            fill={selectedMovies[id] ? 'var(--color-primary)' : 'var(--color-background)'}
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
