export default {
    async contactAssassin(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            userEmail: payload.email,
            message: payload.message
        }
        const response = await fetch(`https://http-with-vue-69a8d-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.assassinId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        })
        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(response.message || 'Failed to send request')
            throw error
        }

        newRequest.id = responseData.name
        newRequest.assassinId = payload.assassinId

        context.commit('addRequest', newRequest)
    },
    async fetchRequests(context) {
        const assassinId = context.rootGetters.userId
        const token = context.rootGetters.token
        const response = await fetch(`https://http-with-vue-69a8d-default-rtdb.europe-west1.firebasedatabase.app/requests/${assassinId}.json?auth=${token}`)
        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(response.message || 'Failed to fetch request')
            throw error
        }

        const requests = []

        for (const key in responseData) {
            const request = {
                id: key,
                assassinId: assassinId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message
            }
            requests.push(request)
        }
        context.commit('setRequests', requests)
    }
    
}