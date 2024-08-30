"use client"
import RugbyLoader from '@/components/RugbyLoader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { searchPlayer } from './searchPlayer'
import { Button } from '@/components/ui/button'

interface SearcherProps {
    setData: React.Dispatch<React.SetStateAction<any>>
}

const Searcher = ({ setData }: SearcherProps) => {

    const [name, setName] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        if (name.length == 0) {
            setData([])
            setLoading(false)
            return
        }
        searchPlayer(name).then((data) => {
            console.log(data)
            setData(data)
            setLoading(false)
        })
    }

    return (
        <div className="flex flex-col items-center justify-start w-full py-2">
            <form className='flex flex-row gap-2 items-end justify-center w-full' onSubmit={handleSubmit}>
                <div className='relative flex flex-col gap-1 items-start justify-center w-full'>
                    <Label className=''>Player name</Label>
                    <Input placeholder="Name" value={name} onChange={handleChange} />
                </div>
                <Button type='submit' disabled={loading} className="w-full sm:w-fit">
                    {loading ? "Loading..." : "Search"}
                </Button>
            </form>
            {loading && <RugbyLoader />}
        </div >
    )
}

export default Searcher