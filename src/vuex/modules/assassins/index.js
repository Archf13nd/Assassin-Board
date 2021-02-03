import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'
export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            assassins: [
                {
                    id: "a1",
                    firstName: "Alex",
                    lastName: "Oiyx",
                    areas: ['knife', 'stealth'],
                    description: "I'm Alex and if you want someone killed in a unique way, hit me the hitman up",
                    fixedRate: 1,
                },
                {
                    id: "a2",
                    firstName: "Kudo",
                    lastName: "Minx",
                    areas: ['sniper', 'stealth'],
                    description: "My name is Kudo and I've so far killed 13 targets for various clients",
                    fixedRate: 3,
                },
            ]
        }
    },
    mutations,
    actions,
    getters
};