"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useConnect } from 'wagmi'

const WalletButton = () => {


    const { connectors, connect, isPending } = useConnect()
    const { disconnect } = useDisconnect()
    const { isConnected } = useAccount()

    return (
        (isConnected ? (
            <Button variant={'outline'} size={"sm"} onClick={() => disconnect()}>Disconnect</Button>
        ) : (
            <Button variant={'outline'} size={'sm'} disabled={isPending} onClick={() => connect({ connector: connectors[0] })}>{isPending ? "Connecting..." : "Metamask"}</Button>
        )
        )
    )
}

export default WalletButton