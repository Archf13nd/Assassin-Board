export default {
    requests(state, _, _2, rootGetters) {
        const assassinId = rootGetters.userId
        return state.requests.filter(req => req.assassinId === assassinId)
    },
    hasRequests(_, getters) {
        return getters.requests && getters.requests.length > 0
    }
}