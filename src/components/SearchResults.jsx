import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

function SearchResults({ response, genres }) {
    const [selectedMovies, setSelectedMovies] = useState({});

    useEffect(() => {
        const currentFaws = JSON.parse(localStorage.getItem('favs'));
        setSelectedMovies(currentFaws || [])
    }, [])

    function handleClick(movieId, title) {
        setSelectedMovies(prev => {
            if (selectedMovies[movieId]) {
                const { [movieId]: _, ...rest } = prev;
                localStorage.setItem('favs', JSON.stringify(rest));

                return rest;
            }
            const newFavs = { ...prev, [movieId]: title };
            localStorage.setItem('favs', JSON.stringify(newFavs));

            return newFavs;
        });
    }

    function truncate(str, max = 150) {
        return str.length > max ? str.slice(0, max) + "..." : str;
    }

    return (
        <>
            {response.results.map(result => (
                <div key={result.id} className="flex flex-col md:flex-row bg-muted/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                        alt={result.title}
                        className="w-full md:w-auto md:h-[300px] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between">
                                <h2 className="text-xl font-bold">{result.title}</h2>
                                {/* <Button variant="outline" className="bg-blue" > */}
                                <Heart
                                    onClick={() => handleClick(result.id, result.title)}
                                    fill={selectedMovies[result.id] ? 'var(--color-primary)' : 'var(--color-background)'}
                                    className="text-primary cursor-pointer" />
                                {/* </Button> */}
                            </div>
                            <p className="text-sm text-gray-500 mb-1">Released: {result.release_date}</p>
                            <p className="text-sm text-yellow-600 font-semibold">Average votes: {result.vote_average.toFixed(1)}</p>
                            <p className="text-sm mt-2 text-gray-700">{truncate(result.overview)}</p>
                        </div>
                        {/* Optionally map genres */}
                        <div className="mt-3 flex flex-wrap gap-1 text-xs text-white">
                            {result.genre_ids.map(id => (
                                <span key={id} className="bg-primary px-2 py-1 rounded">
                                    {genres.get(id) || 'Unknown'}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SearchResults;