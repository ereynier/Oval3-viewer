import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'
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

    const [FRIsOpen, setFRIsOpen] = React.useState(!filters.position.prop || !filters.position.hooker)
    const [STRIsOpen, setSTRIsOpen] = React.useState(!filters.position.lock || !filters.position.flanker || !filters.position.number8)
    const [halfIsOpen, setHalfIsOpen] = React.useState(!filters.position.scrumhalf || !filters.position.outsidehalf)
    const [backIsOpen, setBackIsOpen] = React.useState(!filters.position.centre || !filters.position.leftwing || !filters.position.rightwing || !filters.position.fullback)

    const [FRValue, setFRValue] = React.useState(filters.position.prop && filters.position.hooker)
    const [propValue, setPropValue] = React.useState(filters.position.prop)
    const [hookerValue, setHookerValue] = React.useState(filters.position.hooker)

    const [STRValue, setSTRValue] = React.useState(filters.position.lock && filters.position.flanker && filters.position.number8)
    const [lockValue, setLockValue] = React.useState(filters.position.lock)
    const [flankerValue, setFlankerValue] = React.useState(filters.position.flanker)
    const [number8Value, setNumber8Value] = React.useState(filters.position.number8)

    const [halfValue, setHalfValue] = React.useState(filters.position.scrumhalf && filters.position.outsidehalf)
    const [scrumhalfValue, setScrumhalfValue] = React.useState(filters.position.scrumhalf)
    const [outsidehalfValue, setOutsidehalfValue] = React.useState(filters.position.outsidehalf)

    const [backValue, setBackValue] = React.useState(filters.position.centre && filters.position.leftwing && filters.position.rightwing && filters.position.fullback)
    const [centreValue, setCentreValue] = React.useState(filters.position.centre)
    const [leftwingValue, setLeftwingValue] = React.useState(filters.position.leftwing)
    const [rightwingValue, setRightwingValue] = React.useState(filters.position.rightwing)
    const [fullbackValue, setFullbackValue] = React.useState(filters.position.fullback)


    const handleFR = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setFRValue(value);
            setPropValue(value);
            setHookerValue(value);
        }
        setFilters({ ...filters, position: { ...filters.position, prop: value, hooker: value } })
    }

    const handleProp = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setPropValue(value);
            setFilters({ ...filters, position: { ...filters.position, prop: value } })
        }
    }

    const handleHooker = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setHookerValue(value);
            setFilters({ ...filters, position: { ...filters.position, hooker: value } })
        }
    }

    const handleSTR = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setSTRValue(value);
            setLockValue(value);
            setFlankerValue(value);
            setNumber8Value(value);
        }
        setFilters({ ...filters, position: { ...filters.position, lock: value, flanker: value, number8: value } })
    }

    const handleLock = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setLockValue(value);
            setFilters({ ...filters, position: { ...filters.position, lock: value } })
        }
    }

    const handleFlanker = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setFlankerValue(value);
            setFilters({ ...filters, position: { ...filters.position, flanker: value } })
        }
    }

    const handleNumber8 = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setNumber8Value(value);
            setFilters({ ...filters, position: { ...filters.position, number8: value } })
        }
    }

    const handleHalf = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setHalfValue(value);
            setScrumhalfValue(value);
            setOutsidehalfValue(value);
        }
        setFilters({ ...filters, position: { ...filters.position, scrumhalf: value, outsidehalf: value } })
    }

    const handleScrumhalf = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setScrumhalfValue(value);
            setFilters({ ...filters, position: { ...filters.position, scrumhalf: value } })
        }
    }

    const handleOutsidehalf = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setOutsidehalfValue(value);
            setFilters({ ...filters, position: { ...filters.position, outsidehalf: value } })
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
        setFilters({ ...filters, position: { ...filters.position, centre: value, leftwing: value, rightwing: value, fullback: value } })
    }

    const handleCentre = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setCentreValue(value);
            setFilters({ ...filters, position: { ...filters.position, centre: value } })
        }
    }

    const handleLeftwing = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setLeftwingValue(value);
            setFilters({ ...filters, position: { ...filters.position, leftwing: value } })
        }
    }

    const handleRightwing = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setRightwingValue(value);
            setFilters({ ...filters, position: { ...filters.position, rightwing: value } })
        }
    }

    const handleFullback = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            setFullbackValue(value);
            setFilters({ ...filters, position: { ...filters.position, fullback: value } })
        }
    }

    return (
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
    )
}

export default Position