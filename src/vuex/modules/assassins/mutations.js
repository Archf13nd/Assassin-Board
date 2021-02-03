export default {
    registerAssassin(state, payload) {
        state.assassins.push(payload)
    },
    setAssassins(state, payload) {
        state.assassins = payload
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime()
    }
}