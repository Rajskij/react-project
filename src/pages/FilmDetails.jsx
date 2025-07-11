import { useEffect, useState } from "react";

function FilmDetails({ params }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    
    useEffect(() => {
        setResponse(null);
        setIsLoading(true);
        setError(null);

        async function getMovie() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
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
    }, []);

    return (
        <h1>Film details</h1>
    );
}

export default FilmDetails;