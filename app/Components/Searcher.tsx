"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useCallback, useEffect, useRef } from 'react'
import { useToast } from "@/components/ui/use-toast"
import RugbyLoader from '@/components/RugbyLoader'
import { Label } from '@/components/ui/label'
import { isAddress } from 'viem'
import { X } from 'lucide-react'
import { useLocalStorage } from '@/lib/hooks'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'


interface SearcherProps {
    setData: React.Dispatch<React.SetStateAction<any>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Searcher = ({ setData, setIsLoading }: SearcherProps) => {

    const [address, setAddress] = React.useState<string>("")
    const [loading, setLoading] = React.useState<boolean>(false)
    const [error, setError] = React.useState<string>("")
    const [pastInputs, setPastInputs] = useLocalStorage<string[]>("pastInputs", [])
    const { toast } = useToast()

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [open, setOpen] = React.useState<boolean>(false)
    const inputRef = useRef(null);
    const divRef = useRef(null);

    const search = searchParams.get('address')

    useEffect(() => {
        function handleClickOutside(event: { target: any }) {
            if ((inputRef.current as unknown as HTMLInputElement) && !(inputRef.current as unknown as HTMLInputElement).contains(event.target) && (divRef.current as unknown as HTMLDivElement) && !(divRef.current as unknown as HTMLDivElement).contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (search) {
            setAddress(search)
        }
    }, [search])

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
        if (e.target.value == "") {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const handleSelectAddress = (address: string) => {
        setAddress(address)
        setOpen(false)
    }

    const handleDeleteAddress = (address: string) => {
        setPastInputs(pastInputs.filter(input => input !== address))
        localStorage.setItem("pastInputs", JSON.stringify(pastInputs.filter(input => input !== address)))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpen(false)
        if (loading) return
        if (!address) {
            setData(undefined)
            router.push(pathname)
            return
        }
        if (!isAddress(address)) {
            setError("Invalid address")
            toast({
                title: "An error occurred.",
                description: "Invalid address",
                variant: "destructive"
            })
            router.push(pathname)
            return
        }
        setLoading(true)
        setIsLoading(true)
        setError("")
        console.log("address:", address)
        // add to past inputs
        if (!pastInputs.includes(address)) {
            setPastInputs([...pastInputs, address])
            localStorage.setItem("pastInputs", JSON.stringify([...pastInputs, address]))
        }
        // update url
        router.push(pathname + '?' + createQueryString('address', address))
        // fetch data
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

    const sliceAddress = (address: string) => {
        if (window) {
            if (window.innerWidth < 640) return `${address.slice(0, 10)}...`
            if (window.innerWidth < 768) return `${address.slice(0, 15)}...`
            if (window.innerWidth < 1024) return `${address.slice(0, 20)}...`
            return `${address}`
        } else {
            return `${address.slice(0, 2)}...`
        }
    }

    return (
        <div className="flex flex-col items-center justify-start w-full py-2">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 items-end justify-around max-w-4xl mt-2 px-8 w-full">
                <div className='relative flex flex-col gap-1 items-start justify-center w-full'>
                    <Label className=''>User address</Label>
                    <Input ref={inputRef} placeholder="0x8a6f..." value={address} onChange={handleChange} onFocusCapture={() => setOpen(true)} />
                    {open && pastInputs.length > 0 && (
                        <div ref={divRef} className="absolute top-16 left-0 w-full z-10 border-[1px] rounded-lg max-h-40 h-fit bg-background p-1 sm:p-4 overflow-scroll">
                            <div className='flex flex-col gap-2 w-full'>
                                {pastInputs.map((input, index) => (
                                    <div key={index} className='flex flex-row gap-1 w-full h-full'>
                                        <Button type='button' variant={"ghost"} onClick={() => handleSelectAddress(input)} className='justify-start w-full'>{sliceAddress(input)}</Button>
                                        <Button type='button' variant={'ghost'} onClick={() => handleDeleteAddress(input)} className='p-2'><X className='w-5 h-5'></X></Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Button type='submit' disabled={loading} className="w-full sm:w-fit">
                    {loading ? "Loading..." : "Search"}
                </Button>
                {loading && <RugbyLoader />}
            </form >
        </div >
    )
}

export default Searcher