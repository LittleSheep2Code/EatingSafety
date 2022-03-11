import {createRouter, createWebHistory} from '@ionic/vue-router';
import {RouteRecordRaw} from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/introduce'
    },

    {
        path: '/introduce',
        component: () => import('@/views/IntroducePage.vue')
    },
    {
        path: '/query',
        component: () => import('@/views/QueryPage.vue')
    },
    {
        path: '/record',
        component: () => import('@/views/RecordPage.vue')
    },
    {
        path: '/settings',
        component: () => import('@/views/SettingsPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
