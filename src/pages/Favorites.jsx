import { useState, useEffect } from "react";

import { Skeleton } from "@/components/ui/skeleton"
import { MovieCard } from "@/components/MovieCard";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { truncate } from "@/lib/utils";
import { Heart } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

const key = import.meta.env.VITE_API_KEY;

function Favorites({ setPageName }) {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ids, setIds] = useState({});
    // const favorites = JSON.parse(localStorage.getItem('favs'));
    // const [selectedMovies, setSelectedMovies] = useState();
    const {state, dispatch} = useFavorites();

    useEffect(() => {
        setPageName('Favorite Movies');
        setResponse(null);
    }, [])

    function handlePreviewMovie(movieId) {
        setResponse(null);
        setIsLoading(true);
        setError(null);

        async function getMovie() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`);

                if (!response.ok) {
                    throw new Error('The network connection encountered an issue during the response');
                }

                const json = await response.json();
                if (!json) {
                    throw new Error('Unfortunately, no film was found');
                }
                setResponse(json);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                throw err;
            } finally {
                setIsLoading(false)
            }
        }

        getMovie();
        // Testing loading condition
        // setTimeout(async () => await getMovie(), 2000);
    }

    function buildProps(res) {
        return {
            imgUrl: `https://image.tmdb.org/t/p/w500${res.poster_path}`,
            title: res.title,
            date: res.release_date,
            votes: res.vote_average.toFixed(1),
            overview: truncate(res.overview),
            genreIds: Object.entries(res.genres).map(([key, value]) => value.id),
            state,
            dispatch
        }
    }

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
            onValueChange={(value) => handlePreviewMovie(value)}
        // defaultValue="item-1"
        >
            <PageHeader title='Your Movie Collection' message="browse all the films you've saved as favorites">
                <Heart className="mr-3" />
            </PageHeader>
            {state && Object.entries(state).map(([key, value], idx) => (
                <AccordionItem key={key} value={key}>
                    <AccordionTrigger>{value}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        {isLoading && <Skeleton className='h-[600px] md:h-[300px]' />}
                        {response && <MovieCard id={key} {...buildProps(response)} />}
                        {error && <p className="text-red-400 text-center my-5">{error}</p>}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}


export default Favorites;