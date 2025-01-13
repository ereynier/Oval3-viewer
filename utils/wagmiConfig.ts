import { http, createConfig } from 'wagmi'
import { polygon } from 'wagmi/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const config = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
  connectors: [metaMask()],
})