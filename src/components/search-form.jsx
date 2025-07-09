import { useState } from "react";
import { DropDown } from "@/components/dropdown";
import { SearchBar } from "@/components/searchbar";
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button";
import { genres, countries, years } from "@/lib/data.js";

function SearchForm({ setPageName }) {
    const [isMoveName, setIsMoveName] = useState(null);
    const [sliderValue, setSliderValue] = useState([7])
    setPageName('Move Search');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target);
    }

    return (
        <form onSubmit={handleSubmit}>
            <SearchBar onChange={setIsMoveName} />
            <div className="grid auto-rows-min gap-4 md:grid-cols-4 mb-5">
                <DropDown label='Genre' options={[...genres.values()]} disabled={isMoveName} />
                <DropDown label='Countries' options={[...countries.keys()]} disabled={isMoveName} />
                <DropDown label='Year' options={years} disabled={isMoveName} />
                <div>
                    <label className="text-muted-foreground px-2 py-1.5 text-xs">
                        Minimum film rating: <strong>{sliderValue}</strong>
                    </label>
                    <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        label='Rating'
                        defaultValue={[33]}
                        max={10}
                        step={1}
                        className='mt-5'
                    />
                </div>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                <Button className="w-full">Search</Button>
            </div>
        </form>
    );
}

export default SearchForm;