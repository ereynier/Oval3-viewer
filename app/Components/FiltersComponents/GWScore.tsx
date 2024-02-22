import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { ChevronUp } from 'lucide-react'

import React, { useEffect, useState } from 'react'

interface GWScoreProps {
    setFilters: (value: any) => void
    filters: any
}

const GWScore = ({ setFilters, filters }: GWScoreProps) => {

    const [sliderValues, setSliderValues] = useState([filters.gw_score[0], filters.gw_score[1]]);
    // const [check, setCheck] = useState(filters.hide_gw_na);
    const min = 0;
    const max = 100;

    const handleSliderChange = (values: any) => {
        setSliderValues(values);
        // setFilters({ ...filters, gw_score: values })
    };

    const handleSliderCommit = (values: any) => {
        setFilters({ ...filters, gw_score: values })
    };

    // const handleCheckboxChange = (value: boolean) => {
    //     setCheck(value);
    //     setFilters({ ...filters, hide_gw_na: value })
    // }

    useEffect(() => {
        setSliderValues([filters.gw_score[0], filters.gw_score[1]])
    }, [filters.gw_score])

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

export default GWScore