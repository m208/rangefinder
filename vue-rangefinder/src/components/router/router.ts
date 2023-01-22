import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import MapPage from "@/pages/MapPage.vue";
import { mapList } from '@/libs/mapsParams';

const mapLinks = mapList.map(el=>({
        path: `/${el}`,
        component: MapPage,
        props: { mapName: el }
    })
)

const routes = [
    {
        path: '/',
        component: MainPage
    },
    
    ...mapLinks
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;