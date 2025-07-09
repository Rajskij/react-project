import { useEffect, useState } from "react";

import { DropDown } from "@/components/dropdown";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { genres, countries, years } from "@/lib/data.js";
import SliderEl from "./ui/slide-el";

function SearchForm({ setPageName, setResponse }) {
    const [isMoveName, setIsMoveName] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setPageName('Move Search');
    }, [])

    function handleSubmit(e) {
        e.preventDefault();

        const query = createQueryString(formData);
        console.log(`https://api.themoviedb.org/3/discover/movie?${query}`);

        async function searchMovies() {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?${query}`);
            const json = await response.json();

            setResponse(json);
        }
        searchMovies();
    }

    function createQueryString(params) {
        const searchParams = new URLSearchParams();
        const reverseArr = Array.from(genres, ([k, v]) => [v, k]);
        const reverseGenre = new Map(reverseArr);
        const key = import.meta.env.VITE_API_KEY;
        
        params.year && searchParams.append('primary_release_year', params.year);
        params.country && searchParams.append('with_origin_country', countries.get(params.country));
        params.genre && searchParams.append('with_genres', reverseGenre.get(params.genre));
        params.rating && searchParams.append('vote_average.gte', params.rating);
        key && searchParams.append('api_key', key);

        return searchParams.toString();
    }

    const props = {
        disabled: isMoveName,
        setFormData
    }

    return (
        <form onSubmit={handleSubmit}>
            <SearchBar onChange={setIsMoveName} />
            <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-5">
                <DropDown label='Genre' options={[...genres.values()]} {...props} />
                <DropDown label='Country' options={[...countries.keys()]} {...props} />
                <DropDown label='Year' options={years} {...props} />
                <SliderEl {...props} />
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <Button className="w-full">Search</Button>
            </div>
        </form>
    );
}

export default SearchForm;