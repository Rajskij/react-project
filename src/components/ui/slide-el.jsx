import { useState, useEffect } from "react";

import { Slider } from "@/components/ui/slider"

function SliderEl({ disabled, setFormData }) {
    const [rating, setRating] = useState([7])

     useEffect(() => {
        setFormData(prev => ({ ...prev, rating: rating[0] }));
    }, [rating]);

    function handleChange(newValue) {
        setRating(newValue);
    }

    return (
        <div>
            <label className="text-muted-foreground px-2 py-1.5 text-xs">
                Minimum film rating: <strong>{rating}</strong>
            </label>
            <Slider
                disabled={disabled}
                value={rating}
                onValueChange={handleChange}
                label='Rating'
                max={10}
                step={1}
                className='mt-5'
            />
        </div>
    );
}

export default SliderEl;