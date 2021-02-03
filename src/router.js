import { createRouter, createWebHistory } from 'vue-router'

// import AssassinDesc from './pages/assassins/AssassinDesc.vue'
import AssassinList from './pages/assassins/AssassinList.vue'
// import AssassinRegister from './pages/assassins/AssassinRegister.vue'

// import ContactAssassin from './pages/requests/ContactAssassin.vue'
// import RequestsReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue'
// import UserAuth from './pages/auth/UserAuth.vue'
import store from './vuex/index.js'

const AssassinDesc = () => import('./pages/assassins/AssassinDesc.vue')
const AssassinRegister = () => import('./pages/assassins/AssassinRegister.vue')
const ContactAssassin = () => import('./pages/requests/ContactAssassin.vue')
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue')
const UserAuth = () => import('./pages/auth/UserAuth.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/assassins'},
        {path: '/assassins', component: AssassinList},
        {path: '/assassins/:id', component: AssassinDesc,
        props: true, children: [
            {path: 'contact', component: ContactAssassin}
        ]},
        {path: '/register', component: AssassinRegister, meta: {requiresAuth: true}},
        {path: '/requests', component: RequestsReceived, meta: {requiresAuth: true}},
        {path: '/auth', component: UserAuth, meta: { requiresUnauth: true }},
        {path: '/:notFound(.*)', component: NotFound}   
    ]
})

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth')
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated ) {
        next('/assassins')
    } else {
        next()
    }
})

export default router