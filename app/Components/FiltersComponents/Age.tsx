import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

import React, { useState } from 'react'

interface AgeProps {
    setFilters: (value: any) => void
    filters: any
}

const Age = ({ setFilters, filters }: AgeProps) => {

    const [sliderValues, setSliderValues] = useState([filters.age[0], filters.age[1]]);

    const handleSliderChange = (values: any) => {
        setSliderValues(values);
    };

    const handleSliderCommit = (values: any) => {
        setFilters({ ...filters, age: values})
    };

    return (
        <div className="w-10/12 mx-auto mt-8">
            <Slider
                min={17}
                max={40}
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

export default Age