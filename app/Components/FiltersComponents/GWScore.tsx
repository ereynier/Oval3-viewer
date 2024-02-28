import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { useGWStore } from '@/utils/store/GWStore'

import React, { useEffect, useState } from 'react'

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Bold, Italic, Underline } from 'lucide-react'

interface GWScoreProps {
    setFilters: (value: any) => void
    filters: any
}

const GWScore = ({ setFilters, filters }: GWScoreProps) => {

    const [sliderValues, setSliderValues] = useState([filters.gw_score[0], filters.gw_score[1]]);
    // const [check, setCheck] = useState(filters.hide_gw_na);
    const min = 0;
    const max = 100;

    const gwDisplay = useGWStore(state => state.display)
    const setGwDisplay = useGWStore(state => state.setDisplay)
    const gwNum = useGWStore(state => state.num)
    const setGwNum = useGWStore(state => state.setNum)

    const handleSliderChange = (values: any) => {
        setSliderValues(values);
        // setFilters({ ...filters, gw_score: values })
    };

    const handleSliderCommit = (values: any) => {
        setFilters({ ...filters, gw_score: values })
    };

    const handleGWNumber = (value: string) => {
        if (value == "") return
        setGwNum(Number(value));
    }

    // const handleCheckboxChange = (value: boolean) => {
    //     setCheck(value);
    //     setFilters({ ...filters, hide_gw_na: value })
    // }

    useEffect(() => {
        setSliderValues([filters.gw_score[0], filters.gw_score[1]])
    }, [filters.gw_score])

    return (
        <div className="w-full h-full flex flex-col">
            <div className='w-10/12 mx-auto mt-8 flex flex-col gap-4'>
                <div className="flex flex-col gap-2">
                    <Label className='text-start whitespace-nowrap'>{"GW Score"}</Label>
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
                <div className="flex flex-col gap-2 items-start w-fit">
                    <Label className='text-center whitespace-nowrap'>{"Display GW Score"}</Label>
                    <Switch checked={gwDisplay === "GW"} onCheckedChange={(v: boolean) => setGwDisplay(v)} />
                </div>
                <div className='flex flex-col gap-2 items-start justify-start'>
                    <Label className='text-center whitespace-nowrap'>{"Select GW"}</Label>
                    <ToggleGroup size={"default"} type="single" onValueChange={handleGWNumber} value={String(gwNum)} className='grid grid-cols-3 sm:grid-cols-5 w-full justify-between'>
                        <ToggleGroupItem value="1" aria-label="Toggle bold" className='w-fit'>
                            <p className="text-xl align-middle" >-1</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="2" aria-label="Toggle italic" className='w-fit'>
                            <p className="text-xl align-middle" >-2</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="3" aria-label="Toggle underline" className='w-fit'>
                            <p className="text-xl align-middle" >-3</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="4" aria-label="Toggle underline" className='w-fit'>
                            <p className="text-xl align-middle" >-4</p>
                        </ToggleGroupItem>
                        <ToggleGroupItem value="5" aria-label="Toggle underline" className='w-fit'>
                            <p className="text-xl align-middle" >-5</p>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
            </div>
        </div >
    )
}

export default GWScore