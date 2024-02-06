import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { ChevronUp } from 'lucide-react'

import React, { useEffect, useState } from 'react'

interface ScoreProps {
    setFilters: (value: any) => void
    filters: any
}

const Score = ({ setFilters, filters }: ScoreProps) => {

    const [sliderValues, setSliderValues] = useState([filters.score[0], filters.score[1]]);
    const min = 0;
    const max = 100;

    const handleSliderChange = (values: any) => {
        setSliderValues(values);
        setFilters({ ...filters, score: values })
    };

    const handleSliderCommit = (values: any) => {
        // setFilters({ ...filters, score: values })
    };

    useEffect(() => {
        setSliderValues([filters.score[0], filters.score[1]])
    }, [filters.score])

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

export default Score