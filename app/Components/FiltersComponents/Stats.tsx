import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { ChevronUp } from 'lucide-react'

import React, { useEffect, useState } from 'react'

interface StatsProps {
    setFilters: (value: any) => void
    filters: any
}

const Stats = ({ setFilters, filters }: StatsProps) => {

    const [attackSliderValues, setAttackSliderValues] = useState([filters.stats.attack[0], filters.stats.attack[1]]);
    const [defenseSliderValues, setDefenseSliderValues] = useState([filters.stats.defense[0], filters.stats.defense[1]]);
    const [strengthSliderValues, setStrengthSliderValues] = useState([filters.stats.strength[0], filters.stats.strength[1]]);
    const [impactSliderValues, setImpactSliderValues] = useState([filters.stats.impact[0], filters.stats.impact[1]]);
    const [skillsSliderValues, setSkillsSliderValues] = useState([filters.stats.skills[0], filters.stats.skills[1]]);

    const min = -10
    const max = 100

    const handleSliderChange = (values: any, stat: string) => {
        if (stat === "attack") setAttackSliderValues(values);
        if (stat === "defense") setDefenseSliderValues(values);
        if (stat === "strength") setStrengthSliderValues(values);
        if (stat === "impact") setImpactSliderValues(values);
        if (stat === "skills") setSkillsSliderValues(values);

        // setFilters({ ...filters, stats: { ...filters.stats, [stat]: values } });
    };

    const handleSliderCommit = (values: any, stat: string) => {
        setFilters({ ...filters, stats: { ...filters.stats, [stat]: values } });
    };

    useEffect(() => {
        setAttackSliderValues([filters.stats.attack[0], filters.stats.attack[1]])
        setDefenseSliderValues([filters.stats.defense[0], filters.stats.defense[1]])
        setStrengthSliderValues([filters.stats.strength[0], filters.stats.strength[1]])
        setImpactSliderValues([filters.stats.impact[0], filters.stats.impact[1]])
        setSkillsSliderValues([filters.stats.skills[0], filters.stats.skills[1]])
    }, [filters.stats])

    return (
        <div className="w-full h-full">
            <div className='w-full flex flex-col items-center justify-center gap-2 mt-8'>
                <div className="w-10/12 mx-auto flex flex-col gap-1">
                    <h4 className="text-start">Attack</h4>
                    <Slider
                        min={min}
                        max={max}
                        defaultValue={[min, max]}
                        value={attackSliderValues}
                        onValueChange={(values) => handleSliderChange(values, "attack")}
                        onValueCommit={(values) => handleSliderCommit(values, "attack")}
                    />
                    <div className="flex justify-between mt-1">
                        <span>{attackSliderValues[0]}</span>
                        <span>{attackSliderValues[1]}</span>
                    </div>
                </div>
                <div className="w-10/12 mx-auto flex flex-col gap-1">
                    <h4 className="text-start">Defense</h4>
                    <Slider
                        min={min}
                        max={max}
                        defaultValue={[min, max]}
                        value={defenseSliderValues}
                        onValueChange={(values) => handleSliderChange(values, "defense")}
                        onValueCommit={(values) => handleSliderCommit(values, "defense")}
                    />
                    <div className="flex justify-between mt-1">
                        <span>{defenseSliderValues[0]}</span>
                        <span>{defenseSliderValues[1]}</span>
                    </div>
                </div>
                <div className="w-10/12 mx-auto flex flex-col gap-1">
                    <h4 className="text-start">Strength</h4>
                    <Slider
                        min={min}
                        max={max}
                        defaultValue={[min, max]}
                        value={strengthSliderValues}
                        onValueChange={(values) => handleSliderChange(values, "strength")}
                        onValueCommit={(values) => handleSliderCommit(values, "strength")}
                    />
                    <div className="flex justify-between mt-1">
                        <span>{strengthSliderValues[0]}</span>
                        <span>{strengthSliderValues[1]}</span>
                    </div>
                </div>
                <div className="w-10/12 mx-auto flex flex-col gap-1">
                    <h4 className="text-start">Impact</h4>
                    <Slider
                        min={min}
                        max={max}
                        defaultValue={[min, max]}
                        value={impactSliderValues}
                        onValueChange={(values) => handleSliderChange(values, "impact")}
                        onValueCommit={(values) => handleSliderCommit(values, "impact")}
                    />
                    <div className="flex justify-between mt-1">
                        <span>{impactSliderValues[0]}</span>
                        <span>{impactSliderValues[1]}</span>
                    </div>
                </div>
                <div className="w-10/12 mx-auto flex flex-col gap-1">
                    <h4 className="text-start">Skills</h4>
                    <Slider
                        min={min}
                        max={max}
                        defaultValue={[min, max]}
                        value={skillsSliderValues}
                        onValueChange={(values) => handleSliderChange(values, "skills")}
                        onValueCommit={(values) => handleSliderCommit(values, "skills")}
                    />
                    <div className="flex justify-between mt-1">
                        <span>{skillsSliderValues[0]}</span>
                        <span>{skillsSliderValues[1]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats