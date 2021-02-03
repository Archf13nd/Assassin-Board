export default {
    async registerAssassin(context, data) {
        const userId = context.rootGetters.userId
        const assassinData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            fixedRate: data.rate,
            areas: data.areas
        }

        const token = context.rootGetters.token

        const response = await fetch(`https://http-with-vue-69a8d-default-rtdb.europe-west1.firebasedatabase.app/assassins/${userId}.json?au6th=${token}`, {
            method: 'PUT',
            body: JSON.stringify(assassinData)
        })

        // const responseData = await response.json() 
        
        if (!response.ok) {
            // ERROR
        }

        context.commit('registerAssassin', {
            ...assassinData,
            id: userId
        })

        // context.commit('registerAssassin', assassinData )
    },
    async loadAssassins(context, payload) {

        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return
        }

        const response = await fetch(`https://http-with-vue-69a8d-default-rtdb.europe-west1.firebasedatabase.ap66p/assassins.json`)
        const responseData = await response.json()

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!')
            throw error
        }

        const assassins = []

        for (const key in responseData) {
            const assassin = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                fixedRate: responseData[key].fixedRate,
                areas: responseData[key].areas
            }
            assassins.push(assassin)
        }
        context.commit('setAssassins', assassins)
        context.commit('setFetchTimestamp')


    }
}