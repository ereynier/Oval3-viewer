
export const getGWScore = (nb_games: { attack: string, defense: string, game_date: string, impact: string, metadata_total: string, skills: string, strength: string }[], gwNum: number) => {
    if (!nb_games || nb_games.length === 0) return "N/A"
    // get metadata_total of the last game if the date is between last monday and previous monday (gwNum - 1 weeks ago to gwNum - 2 weeks ago)
    const lastMonday = new Date()
    const today = new Date()
    today.setDate(today.getDate() - 7 * (gwNum - 1))
    lastMonday.setDate(lastMonday.getDate() - 7 * (gwNum - 1))
    lastMonday.setDate(lastMonday.getDate() - (today.getDay() - 1) % 7)
    const previousMonday = new Date(lastMonday)
    previousMonday.setDate(previousMonday.getDate() - 7)
    const lastGame = nb_games.find(game => {
        const game_date = new Date(game.game_date)
        return game_date >= previousMonday && game_date < lastMonday
    })
    if (lastGame) return lastGame.metadata_total
    return "N/A"
}

