import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { truncate } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

export function SearchResults({ response }) {
    const { state, dispatch } = useFavorites();

    function buildProps(result) {
        return {
            id: result.id,
            imgUrl: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
            title: result.title,
            date: result.release_date,
            votes: result.vote_average.toFixed(1),
            overview: truncate(result.overview),
            genreIds: result.genre_ids,
            state,
            dispatch
        }
    }

    return (
        <>
            {response.length > 0 &&
                response.map(result => (
                    <MovieCard key={result.id} {...buildProps(result)} />
                ))
            }
        </>
    );
}
