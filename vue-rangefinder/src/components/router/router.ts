import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import MapPage from "@/pages/MapPage.vue";


const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/erangel',
        component: MapPage,
        props: { mapName: 'erangel' }
    },
    {
        path: '/miramar',
        component: MapPage,
        props: { mapName: 'miramar' }
    },

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;