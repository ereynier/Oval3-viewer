import React from 'react'

interface RugbyLoaderProps {
    zIndex?: number
}

const RugbyLoader = ({zIndex = 100}: RugbyLoaderProps) => {
    return (
        <div className="fixed flex items-center justify-center inset-0" style={{zIndex: zIndex}}>
            <div className="flex items-center justify-center">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full border-8 border-gray-200 dark:border-gray-800" />
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-[20px] border-b-[20px] border-green-500 animate-spin " />
                </div>
            </div>
        </div>
    )
}

export default RugbyLoader