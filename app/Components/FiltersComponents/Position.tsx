import { Checkbox } from '@/components/ui/checkbox'
import React, { useEffect } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ArrowBigDown, ArrowBigDownDash, ArrowDown, ChevronDown, ChevronUp, SortAsc } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PositionProps {
    setFilters: (value: any) => void
    filters: any
}

const Position = ({ setFilters, filters }: PositionProps) => {

    const [FRIsOpen, setFRIsOpen] = React.useState(!filters.position["Prop"] || !filters.position["Hooker"])
    const [STRIsOpen, setSTRIsOpen] = React.useState(!filters.position["Lock"] || !filters.position["Flanker"] || !filters.position["Number 8"])
    const [halfIsOpen, setHalfIsOpen] = React.useState(!filters.position["Scrum Half"] || !filters.position["Outside Half"])
    const [backIsOpen, setBackIsOpen] = React.useState(!filters.position["Centre"] || !filters.position["Left Wing"] || !filters.position["Right Wing"] || !filters.position["Full Back"])

    const [FRValue, setFRValue] = React.useState(filters.position["Prop"] && filters.position["Hooker"])
    const [propValue, setPropValue] = React.useState(filters.position["Prop"])
    const [hookerValue, setHookerValue] = React.useState(filters.position["Hooker"])

    const [STRValue, setSTRValue] = React.useState(filters.position["Lock"] && filters.position["Flanker"] && filters.position["Number 8"])
    const [lockValue, setLockValue] = React.useState(filters.position["Lock"])
    const [flankerValue, setFlankerValue] = React.useState(filters.position["Flanker"])
    const [number8Value, setNumber8Value] = React.useState(filters.position["Number 8"])

    const [halfValue, setHalfValue] = React.useState(filters.position["Scrum Half"] && filters.position["Outside Half"])
    const [scrumhalfValue, setScrumhalfValue] = React.useState(filters.position["Scrum Half"])
    const [outsidehalfValue, setOutsidehalfValue] = React.useState(filters.position["Outside Half"])

    const [backValue, setBackValue] = React.useState(filters.position["Centre"] && filters.position["Left Wing"] && filters.position["Right Wing"] && filters.position["Full Back"])
    const [centreValue, setCentreValue] = React.useState(filters.position["Centre"])
    const [leftwingValue, setLeftwingValue] = React.useState(filters.position["Left Wing"])
    const [rightwingValue, setRightwingValue] = React.useState(filters.position["Right Wing"])
    const [fullbackValue, setFullbackValue] = React.useState(filters.position["Full Back"])


    const handleFR = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setFRValue(value);
            setPropValue(value);
            setHookerValue(value);
        }
        setFilters({ ...filters, position: { ...filters.position, ["Prop"]: value, ["Hooker"]: value } })
    }

    const handleProp = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setPropValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Prop"]: value } })
        }
    }

    const handleHooker = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setHookerValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Hooker"]: value } })
        }
    }

    const handleSTR = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setSTRValue(value);
            setLockValue(value);
            setFlankerValue(value);
            setNumber8Value(value);
        }
        setFilters({ ...filters, position: { ...filters.position, ["Lock"]: value, ["Flanker"]: value, ["Number 8"]: value } })
    }

    const handleLock = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setLockValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Lock"]: value } })
        }
    }

    const handleFlanker = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setFlankerValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Flanker"]: value } })
        }
    }

    const handleNumber8 = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setNumber8Value(value);
            setFilters({ ...filters, position: { ...filters.position, ["Number 8"]: value } })
        }
    }

    const handleHalf = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setHalfValue(value);
            setScrumhalfValue(value);
            setOutsidehalfValue(value);
        }
        setFilters({ ...filters, position: { ...filters.position, ["Scrum Half"]: value, ["Outside Half"]: value } })
    }

    const handleScrumhalf = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setScrumhalfValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Scrum Half"]: value } })
        }
    }

    const handleOutsidehalf = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setOutsidehalfValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Outside Half"]: value } })
        }
    }

    const handleBack = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setBackValue(value);
            setCentreValue(value);
            setLeftwingValue(value);
            setRightwingValue(value);
            setFullbackValue(value);
        }
        setFilters({ ...filters, position: { ...filters.position, ["Centre"]: value, ["Left Wing"]: value, ["Right Wing"]: value, ["Full Back"]: value } })
    }

    const handleCentre = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setCentreValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Centre"]: value } })
        }
    }

    const handleLeftwing = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setLeftwingValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Left Wing"]: value } })
        }
    }

    const handleRightwing = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setRightwingValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Right Wing"]: value } })
        }
    }

    const handleFullback = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setFullbackValue(value);
            setFilters({ ...filters, position: { ...filters.position, ["Full Back"]: value } })
        }
    }

    useEffect(() => {
        setFRValue(filters.position["Prop"] && filters.position["Hooker"])
        setSTRValue(filters.position["Lock"] && filters.position["Flanker"] && filters.position["Number 8"])
        setHalfValue(filters.position["Scrum Half"] && filters.position["Outside Half"])
        setBackValue(filters.position["Centre"] && filters.position["Left Wing"] && filters.position["Right Wing"] && filters.position["Full Back"])
        setHookerValue(filters.position["Hooker"])
        setPropValue(filters.position["Prop"])
        setLockValue(filters.position["Lock"])
        setFlankerValue(filters.position["Flanker"])
        setNumber8Value(filters.position["Number 8"])
        setScrumhalfValue(filters.position["Scrum Half"])
        setOutsidehalfValue(filters.position["Outside Half"])
        setCentreValue(filters.position["Centre"])
        setLeftwingValue(filters.position["Left Wing"])
        setRightwingValue(filters.position["Right Wing"])
        setFullbackValue(filters.position["Full Back"])
    }, [filters.position])

    return (
        <div className="w-full h-full">
            <div className='flex flex-col gap-1'>
                <Collapsible open={FRIsOpen} onOpenChange={setFRIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={FRValue} id="FR" onCheckedChange={(value) => handleFR(value)} />
                            <p>First Row</p>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ChevronUp className={`h-6 w-6 ${FRIsOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`} />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2 px-4">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={propValue} id="FR" onCheckedChange={(value) => handleProp(value)} />
                            <p>Prop</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={hookerValue} id="FR" onCheckedChange={(value) => handleHooker(value)} />
                            <p>Hooker</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={STRIsOpen} onOpenChange={setSTRIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={STRValue} id="STR" onCheckedChange={(value) => handleSTR(value)} />
                            <p>Second & Third Row</p>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ChevronUp className={`h-6 w-6 ${STRIsOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`} />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2 px-4">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={lockValue} id="STR" onCheckedChange={(value) => handleLock(value)} />
                            <p>Lock</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={flankerValue} id="STR" onCheckedChange={(value) => handleFlanker(value)} />
                            <p>Flanker</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={number8Value} id="STR" onCheckedChange={(value) => handleNumber8(value)} />
                            <p>Number 8</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={halfIsOpen} onOpenChange={setHalfIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={halfValue} id="Half" onCheckedChange={(value) => handleHalf(value)} />
                            <p>Half</p>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ChevronUp className={`h-6 w-6 ${halfIsOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`} />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2 px-4">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={scrumhalfValue} id="Half" onCheckedChange={(value) => handleScrumhalf(value)} />
                            <p>Scrum Half</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={outsidehalfValue} id="Half" onCheckedChange={(value) => handleOutsidehalf(value)} />
                            <p>Outside Half</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

                <Collapsible open={backIsOpen} onOpenChange={setBackIsOpen}>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={backValue} id="Back" onCheckedChange={(value) => handleBack(value)} />
                            <p>Back</p>
                        </div>
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ChevronUp className={`h-6 w-6 ${backIsOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`} />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2 px-4">
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={centreValue} id="Back" onCheckedChange={(value) => handleCentre(value)} />
                            <p>Centre</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={leftwingValue} id="Back" onCheckedChange={(value) => handleLeftwing(value)} />
                            <p>Left Wing</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={rightwingValue} id="Back" onCheckedChange={(value) => handleRightwing(value)} />
                            <p>Right Wing</p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Checkbox checked={fullbackValue} id="Back" onCheckedChange={(value) => handleFullback(value)} />
                            <p>Fullback</p>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    )
}

export default Position