import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { ChevronUp } from 'lucide-react'

import React, { useEffect, useState } from 'react'

interface AgeProps {
    setFilters: (value: any) => void
    filters: any
}

const Age = ({ setFilters, filters }: AgeProps) => {

    const [sliderValues, setSliderValues] = useState([filters.age[0], filters.age[1]]);
    const min = 17;
    const max = 40;

    const handleSliderChange = (values: any) => {
        setSliderValues(values);
        setFilters({ ...filters, age: values })
    };

    const handleSliderCommit = (values: any) => {
        // setFilters({ ...filters, age: values })
    };

    useEffect(() => {
        setSliderValues([filters.age[0], filters.age[1]])
    }, [filters.age])

    return (
        <div className="w-full h-full">
            <div className="w-10/12 mx-auto mt-8">
                <Slider
                    min={min}
                    max={max}
                    defaultValue={[min, max]}
                    value={sliderValues}
                    onValueChange={(values) => handleSliderChange(values)}
                    onValueCommit={(values) => handleSliderCommit(values)}
                />
                <div className="flex justify-between mt-1">
                    <span>{sliderValues[0]}</span>
                    <span>{sliderValues[1]}</span>
                </div>
            </div>
        </div>
    )
}

export default Age