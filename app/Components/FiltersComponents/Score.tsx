import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

import React, { useState } from 'react'

interface ScoreProps {
    setFilters: (value: any) => void
    filters: any
}

const Score = ({ setFilters, filters }: ScoreProps) => {

    const [sliderValues, setSliderValues] = useState([filters.score[0], filters.score[1]]);

    const handleSliderChange = (values: any) => {
        setSliderValues(values);
    };

    const handleSliderCommit = (values: any) => {
        setFilters({ ...filters, score: values})
    };

    return (
        <div className="w-10/12 mx-auto mt-8">
            <Slider
                min={0}
                max={100}
                defaultValue={sliderValues}
                onValueChange={(values) => handleSliderChange(values)}
                onValueCommit={(values) => handleSliderCommit(values)}
            />
            <div className="flex justify-between mt-4">
                <span>{sliderValues[0]}</span>
                <span>{sliderValues[1]}</span>
            </div>
        </div>
    )
}

export default Score