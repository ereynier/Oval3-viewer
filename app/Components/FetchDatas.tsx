import React from 'react'
import Cards from './Cards'

interface Props {
    data: any
    order: string
    sortBy: string
    filters: any
}
// UNUSED
const FetchDatas = ({data, order, sortBy, filters}: Props) => {

    const [metadatas, setMetadatas] = React.useState<{ [key: number]: any } | undefined>(undefined)
    const [additionals, setAdditionals] = React.useState<any>(undefined)
    const [stats, setStats] = React.useState<any>(undefined)

    React.useEffect(() => {
        if (!data) return;
        const fetchPromises = data?.tokens.map((item: any, index: number) =>
            fetch(`/api/metadata/${item}`)
                .then(res => res.json())
                .then(data => ({ index, data: data.data }))
        );

        const fetchAdditionalsPromises = data?.tokens.map((item: any, index: number) =>
            fetch("https://api.oval3.game/graphql/", {
                "credentials": "omit",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.5",
                    "content-type": "application/json",
                    "apollographql-client-name": "era2140-oval3",
                    "apollographql-client-version": "0.0.1",
                    "Access-Control-Allow-Origin": "*",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site"
                },
                "referrer": "https://marketplace.oval3.game/",
                "body": "{\"operationName\":\"findCard\",\"variables\":{\"tokenId\":\"" + String(item) + "\",\"similarPlayer\":true},\"query\":\"query findCard($tokenId: String!, $similarPlayer: Boolean) {\\n  Card(tokenId: $tokenId, similarCard: $similarPlayer) {\\n    tokenId\\n    rarity\\n    owner {\\n      address\\n    }\\n    edition\\n    international\\n    academy\\n    similarPlayers {\\n      image\\n      tokenId\\n    }\\n    optaId\\n    season\\n    competition\\n    club {\\n      name\\n      clubCode\\n    }\\n    bidCount\\n    score\\n    image\\n    firstname\\n    lastname\\n    position\\n    age\\n    nationality\\n    listingStatus\\n    amount\\n    endTime\\n  }\\n}\"}",
                "method": "POST",
                "mode": "cors"
            }).then(res => res.json())
                .then(data => ({ index, data: data }))
                .catch(error => error)
        );

        Promise.all(fetchPromises)
            .then(results => {
                const tmpMetadatas: any = {};
                results.forEach(({ index, data }) => {
                    tmpMetadatas[data.token] = data;
                });
                console.log("tmpMetadatas:", tmpMetadatas);
                setMetadatas(tmpMetadatas);
            })
            .catch(error => console.error(error));

        const tmpAdditionals: any = {};
        Promise.all(fetchAdditionalsPromises)
            .then(results => {
                results.forEach(({ index, data }) => {
                    tmpAdditionals[data.data.Card.tokenId] = data.data;
                });
                setAdditionals(tmpAdditionals);
            })
            .then(() => {
                const fetchStatsPromises = Object.keys(tmpAdditionals).map((key: any) => {
                    const item = tmpAdditionals[key];
                    return fetch(`https://score.oval3.game/api/scoring/player/${item.Card.optaId}`)
                        .then(res => res.json())
                        .then(data => ({ key, data: data }))
                        .catch(error => error)
                });

                Promise.all(fetchStatsPromises)
                    .then(results => {
                        const tmpStats: any = {};
                        results.forEach(({ key, data }) => {
                            tmpStats[key] = data.data;
                        });
                        setStats(tmpStats);
                    })
                    .catch(error => console.error(error));

            })
            .catch(error => console.error(error));

    }, [data]);

  return (
    <div className='w-full h-full'>
        {/* <Cards data={data} metadatas={metadatas} additionals={additionals} stats={stats} order={order} sortBy={sortBy} filters={filters} /> */}
    </div>
  )
}

export default FetchDatas