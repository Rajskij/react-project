import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const key = import.meta.env.VITE_API_KEY;

function Favorites({ setPageName }) {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const favorites = JSON.parse(localStorage.getItem('favs'));

    useEffect(() => {
        setPageName('Favorite Movies');
    }, [])

    function handleClick(movieId) {
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
                console.log(json)
                setResponse(json);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
                throw err;
            } finally {
                setIsLoading(false)
            }
        }

        // getMovie();
    }

    return (
        <Accordion
            type="single"
            collapsible
            className="w-full"
        // defaultValue="item-1"
        >
            {
                Object.entries(favorites).map(([key, value], idx) => (
                    <AccordionItem key={key} value={`item-${idx}`}>
                        <AccordionTrigger onClick={() => handleClick(key)} >{value}</AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            {isLoading && <Skeleton className='h-[600px] md:h-[300px]' />}
                            <p>
                                Our flagship product combines cutting-edge technology with sleek
                                design. Built with premium materials, it offers unparalleled
                                performance and reliability.
                            </p>
                            <p>
                                Key features include advanced processing capabilities, and an
                                intuitive user interface designed for both beginners and experts.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}


export default Favorites;