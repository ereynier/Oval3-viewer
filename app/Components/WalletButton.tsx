"use client"
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import React, { useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useConnect } from 'wagmi'

const WalletButton = () => {


    const { connectors, connect, isPending, error } = useConnect()
    const { disconnect } = useDisconnect()
    const { isConnected } = useAccount()
    const { toast } = useToast()

    const handleConnect = () => {
        connect({ connector: connectors[0] })
    }

    useEffect(() => {
        if (error) {
            toast({
                title: 'Error',
                description: error.message,
                duration: 5000,
                variant: "destructive"
            })
        }
    }, [error])

    return (
        (isConnected ? (
            <Button variant={'outline'} size={"sm"} onClick={() => disconnect()}>Disconnect</Button>
        ) : (
            <Button variant={'outline'} size={'sm'} disabled={isPending} onClick={handleConnect}>{isPending ? "Connecting..." : "Metamask"}</Button>
        )
        )
    )
}

export default WalletButton