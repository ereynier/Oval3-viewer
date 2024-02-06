import React from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from './ui/button'
import { ChevronUp } from 'lucide-react'

interface CollapseProviderProps {
    name: string
    children: React.ReactNode
}

const CollapseProvider = ({ name, children }: CollapseProviderProps) => {

    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
            <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex flex-row items-center gap-2">
                        <p className='text-lg font-bold'>{name}</p>
                    </div>
                    <Button variant="ghost" size="icon">
                        <ChevronUp className={`h-6 w-6 ${isOpen ? "rotate-180" : "rotate-0"} transition-all duration-300`} />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 px-4">
                {children}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapseProvider