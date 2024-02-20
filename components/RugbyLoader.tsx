import React from 'react'

interface RugbyLoaderProps {
    zIndex?: number
}

const RugbyLoader = ({zIndex = 100}: RugbyLoaderProps) => {
    return (
        <div className="fixed flex items-center justify-center bottom-5 left-5" style={{zIndex: zIndex}}>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div className="h-12 w-12 rounded-full border-[6px] border-gray-200 dark:border-gray-800" />
                    <div className="absolute top-0 left-0 h-12 w-12 rounded-full border-t-[10px] border-b-[10px] border-green-500 animate-spin " />
                </div>
            </div>
        </div>
    )
}

export default RugbyLoader