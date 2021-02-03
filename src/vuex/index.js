import { createStore } from 'vuex'

import assassinsModule from './modules/assassins/index.js'
import requestsModule from './modules/requests/index.js'
import authModule from './modules/auth/index.js'

const store = createStore({
    modules: {
        assassins: assassinsModule,
        requests: requestsModule,
        auth: authModule
    },
    
})

export default store