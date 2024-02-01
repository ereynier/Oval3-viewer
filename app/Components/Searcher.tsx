"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"

interface SearcherProps {
    setData: React.Dispatch<React.SetStateAction<any>>
}

const Searcher = ({setData}: SearcherProps) => {

    const [address, setAddress] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>("")
    const { toast } = useToast()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
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
            })
    }

    return (
        <div className="flex flex-col items-center justify-start w-full py-2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-center justify-around max-w-4xl mt-6 px-8 w-full">
                <Input required placeholder="Address..." value={address} onChange={handleChange} />
                <Button className="w-full sm:w-fit">
                    {loading ? "Loading..." : "Search"}
                </Button>
            </form>
        </div>
    )
}

export default Searcher