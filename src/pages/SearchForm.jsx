import { useEffect, useState } from "react";

import { Dropdown } from "@/components/Dropdown";
import { SearchBar } from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { SearchResults } from "@/components/SearchResults.jsx";
import { genres, countries, years } from "@/lib/data.js";
import SliderEl from "../components/ui/slide-el";
import { FilmIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useResponse } from "@/hooks/useResponse";
import { createQueryString } from "@/lib/utils";

const key = import.meta.env.VITE_API_KEY;
const discoverEndpoint = 'https://api.themoviedb.org/3/discover/movie?';
const searchEndpoint = 'https://api.themoviedb.org/3/search/movie?'

function SearchForm({ setPageName }) {
    const [moveName, setMoveName] = useState(null);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { state, dispatch } = useResponse();

    useEffect(() => {
        setPageName('Move Search');
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        dispatch({ type: 'CLEAR' })
        setError(null);

        const url = moveName ? searchEndpoint : discoverEndpoint;
        const query = moveName
            ? `api_key=${key}&query=${moveName}`
            : createQueryString(formData, key);

        async function searchMovies() {
            try {
                const response = await fetch(url + query);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                if (json.results.length === 0) {
                    throw new Error('Unfortunately, no film was found');
                }
                // setResponse(json);
                dispatch({ type: 'ADD_RESPONSE', payload: json.results })
            } catch (err) {
                console.error('Fetch error:', err.message);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        searchMovies();
        // Testing loading condition
        // setTimeout(async () => await searchMovies(), 3000);
    }

    const props = {
        disabled: moveName,
        setFormData
    }

    return (
        <div>
            {state.length < 1 &&
                <PageHeader title='Welcome to Film Forge' message='what would you like to search today?'>
                    <FilmIcon className="mr-3" />
                </PageHeader>}
            <form onSubmit={handleSubmit}>
                <SearchBar onChange={setMoveName} />
                <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-5">
                    <Dropdown label='Genre' options={[...genres.values()]} {...props} />
                    <Dropdown label='Country' options={[...countries.keys()]} {...props} />
                    <Dropdown label='Year' options={years} {...props} />
                    <SliderEl {...props} />
                </div>
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <Button className="w-full">Search</Button>
                </div>
            </form>
            {/* Response Components */}
            {isLoading && (<>
                <Skeleton className='h-[600px] md:h-[300px] mt-3' />
                <Skeleton className='h-[600px] md:h-[300px] mt-3' />
            </>)}
            {error && <h1 className="text-center mt-10">{error}</h1>}
            {state && <SearchResults response={state} />}
        </div>
    );
}

export default SearchForm;