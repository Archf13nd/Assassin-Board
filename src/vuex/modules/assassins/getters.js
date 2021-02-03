export default {
    assassins(state) {
        return state.assassins
    },
    hasAssassins(state) {       
        return state.assassins.length > 0
    },
    isAssassin(_, getters, _2, rootGetters) {
        const assassins = getters.assassins
        const userId = rootGetters.userId
        return assassins.some(assassin => assassin.id === userId)
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch
        if (!lastFetch) {
            return true
        }
        const currentTimeStamp = new Date().getTime()
        return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
}