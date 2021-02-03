export default {
    setUser(state, payload) {
        state.token = payload.token
        state.userId = payload.userId
        state.didAutoLogout = false
    },
    hasAutoLoggedOut(state) {
        state.hasAutoLoggedOut = true
    }
}