"use client"
import React, { Suspense } from 'react'
import FiltersHandler from './FiltersHandler'
import { emptyFilters } from '@/utils/emptyFilters';
import { useFilterOpenStore } from '@/utils/store/FilterOpenStore';
import Cards from './Cards';
import Sorter from './Sorter';
import { countCards, searchCards } from './searchCards';
import { useOrderStore } from '@/utils/store/OrderStore';
import { usePinnedStore } from '@/utils/store/PinnedStore';
import { useInView } from 'react-intersection-observer'
import { useNbCardStore } from '@/utils/store/NbCardStore';
import { useFiltersStore } from '@/utils/store/FiltersStore';
import { getTotalNbCard } from '@/utils/getNbCard';
import { getBlock } from '@/utils/getBlock';

const Collection = () => {
    const [filters, setFilters] = useFiltersStore(state => [state.filter, state.setFilter]);
    const filterOpen = useFilterOpenStore(state => state.open);
    const [block, setBlock] = React.useState<number | null>(null);
    const [cards, setCards] = React.useState<any | null>(null);
    const { sortBy, order } = useOrderStore(state => ({ sortBy: state.sortBy, order: state.order }))
    const { pinnedPlayers, onlyPinned } = usePinnedStore(state => ({ pinnedPlayers: state.pinnedPlayers, onlyPinned: state.onlyPinned }))
    const { ref, inView } = useInView({ delay: 10000 })
    const PLAYERS_TO_LOAD = 20
    const [offset, setOffset] = React.useState(0)
    const { setNbCard, setNbFilteredCard } = useNbCardStore(state => ({ setNbCard: state.setNbCard, setNbFilteredCard: state.setNbFilteredCard }))

    // quand les filtres changes faire un call api pour récupérer le nombre total de cartes (chiffre stocké en DB ?) et le nombre filtré.

    React.useEffect(() => {
        const fetchCards = async () => {
            setOffset(0)
            const data = await searchCards(filters, sortBy, order, onlyPinned, PLAYERS_TO_LOAD, 0, pinnedPlayers)
            setCards(data)
            setOffset(PLAYERS_TO_LOAD)
            const totalFiltered = await countCards(filters, onlyPinned, pinnedPlayers)
            setNbFilteredCard(totalFiltered)
        }
        fetchCards()
    }, [filters, sortBy, order, onlyPinned, pinnedPlayers])

    React.useEffect(() => {
        const fetchCards = async () => {
            const data = await searchCards(filters, sortBy, order, onlyPinned, PLAYERS_TO_LOAD, offset, pinnedPlayers)
            setCards([...cards, ...data])
            setOffset((prev) => prev + PLAYERS_TO_LOAD)
        }
        if (cards && cards.length >= offset && inView) {
            fetchCards()
        }
    }, [inView])

    React.useEffect(() => {
        const fetchNbCards = async () => {
            const data = await getTotalNbCard()
            setNbCard(data)
            const block = await getBlock()
            setBlock(block || null)
        }
        fetchNbCards()
    }, [])

    return (
        <div className="flex flex-row items-start justify-center min-h-screen h-full w-full gap-2">
            <FiltersHandler setFilters={setFilters} filters={filters} />
            <div className={`${filterOpen ? "md:ml-80" : ""} flex flex-col items-center justify-start min-h-screen h-full w-full py-2 gap-2`}>

                <div className="flex flex-col items-center sm:items-start justify-center gap-2 w-full max-w-4xl mt-8">
                    <div className="flex flex-col sm:flex-row items-start justify-center gap-2 px-8 w-full">
                        <Sorter />
                    </div>
                </div>
                {cards && cards.length > 0 ? (
                    <div className='flex flex-col gap-2'>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Cards cards={cards} />
                        </Suspense>
                        <div className='w-full items-center text-center' ref={ref}>
                            Loading...
                        </div>
                    </div>
                ) : (
                    !cards ? (
                        <div className="absolute inset-0 -z-[1] flex flex-col items-center justify-center">
                            <p className="text-center text-5xl sm:text-7xl font-bold relative bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 py-8">
                                Oval3 Viewer
                            </p>
                            <p className="text-center text-3xl sm:text-4xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
                                Check your cards
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl mt-36">
                            <p className="text-center text-4xl sm:text-5xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
                                No cards found
                            </p>
                            <p className="text-center text-2xl sm:text-3xl font-bold relative bg-clip-text text-neutral-800 dark:text-neutral-300">
                                Refine your search or buy some on the <span className="bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 ">Oval3</span> marketplace
                            </p>
                        </div>
                    )
                )}
            </div>
            <p className="fixed text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-green-200 to-green-500 bottom-1 right-3 -z-5 ">beta</p>
            <p className="absolute text-xs sm:text-sm italic text-foreground opacity-70 top-1">{`block: ${block ? `${block}` : ""}`}</p>
        </div>
    )
}

export default Collection