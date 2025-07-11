import { Skeleton } from "@/components/ui/skeleton";
import { convertDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const key = import.meta.env.VITE_API_KEY;

function FilmDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [response, setResponse] = useState();
    const { id } = useParams();

    useEffect(() => {
        setResponse(null);
        setIsLoading(true);
        setError(null);

        async function getMovie() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}`);

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
        <>
            <button onClick={() => window.history.back()}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft />
                Back to previous page
            </button>
            {isLoading && <Skeleton className='h-[600px] md:h-[300px]' />}
            {response &&
                <div className="flex flex-col md:flex-row bg-muted/50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow mt-3">
                    <div className="md:w-1/3 p-4 flex justify-center">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${response.poster_path}`}
                            alt={response.title}
                            className="rounded-lg w-full max-w-xs object-cover shadow-md"
                        />
                    </div>

                    <div className="md:w-2/3 p-6 space-y-4">
                        <div>
                            <h1 className="text-3xl font-bold">{response.title}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-2">
                                <span>{convertDate(response.release_date)}</span>
                                <span>•</span>
                                <span>{response.runtime} mins</span>
                                <span>•</span>
                                <span>{response.genres.map(g => g.name).join(', ')}</span>
                            </div>
                            <p className="italic text-lg my-5">{response.tagline}</p>
                        </div>

                        <div className="flex items-center gap-2 my-10">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                {response.vote_average.toFixed(1)}
                            </div>
                            <span>User Score</span>
                            <span className="text-muted-foreground">({response.vote_count} votes)</span>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">Overview</h2>
                            <p className="text-muted-foreground">{response.overview}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-semibold">Production Companies</h3>
                                <p className="text-muted-foreground">{response.production_companies.map(c => c.name).join(', ')}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Production Countries</h3>
                                <p className="text-muted-foreground">{response.production_countries.map(c => c.name).join(', ')}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Original Language</h3>
                                <p className="text-muted-foreground">{response.spoken_languages[0].english_name}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold">Budget/Revenue</h3>
                                <p className="text-muted-foreground">${response.budget.toLocaleString()} / ${response.revenue.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>}
            {error && <h1 className="text-center mt-10">{error}</h1>}
        </>
    );
}

export default FilmDetails;