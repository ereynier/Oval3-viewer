"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import RugbyLoader from '@/components/RugbyLoader'
import { Label } from '@/components/ui/label'
import { isAddress } from 'viem'

interface SearcherProps {
    setData: React.Dispatch<React.SetStateAction<any>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Searcher = ({ setData, setIsLoading }: SearcherProps) => {

    const [address, setAddress] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>("")
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (loading) return
        if (!address) {
            setData(undefined)
            return
        }
        if (!isAddress(address)) {
            setError("Invalid address")
            toast({
                title: "An error occurred.",
                description: "Invalid address",
                variant: "destructive"
            })
            return
        }
        setLoading(true)
        setIsLoading(true)
        setError("")
        console.log("address:", address)
        fetch("/api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ address })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    setData(data.data)
                } else {
                    setError(data.error)
                    toast({
                        title: "An error occurred.",
                        description: data.error,
                        variant: "destructive"
                    })
                }
                setLoading(false)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setError("Something went wrong")
                toast({
                    title: "An error occurred.",
                    description: err,
                    variant: "destructive"
                })
                setLoading(false)
                setIsLoading(false)
            })
    }

    return (
        <div className="flex flex-col items-center justify-start w-full py-2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-end justify-around max-w-4xl mt-2 px-8 w-full">
                <div className='flex flex-col gap-1 items-start justify-center w-full'>
                    <Label className=''>User address</Label>
                    <Input placeholder="0x8a6f..." value={address} onChange={handleChange} />
                </div>
                <Button disabled={loading} className="w-full sm:w-fit">
                    {loading ? "Loading..." : "Search"}
                </Button>
                {loading && <RugbyLoader />}
            </form>
        </div>
    )
}

export default Searcher