import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { truncate } from "@/lib/utils";

export function SearchResults({ response }) {
    const [selectedMovies, setSelectedMovies] = useState();

    useEffect(() => {
        const currentFaws = JSON.parse(localStorage.getItem('favs'));
        setSelectedMovies(currentFaws || {})
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

    function buildProps(result) {
        return {
            id: result.id,
            imgUrl: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            title: result.title,
            date: result.release_date,
            votes: result.vote_average.toFixed(1),
            overview: truncate(result.overview),
            genreIds: result.genre_ids,
            selectedMovies,
            handleClick
        }
    }

    return (
        <>
            {
                response.results.map(result => (
                    <MovieCard key={result.id} {...buildProps(result)} />
                ))
            }
        </>
    );
}
