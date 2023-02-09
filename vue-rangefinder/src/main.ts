import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from '@/App.vue'
import router from "@/components/router/router";

import './assets/main.css'

const store = createStore({
    state () {
      return {
        currentMap: ''
      }
    },
    mutations: {
      changeCurrentMap (state, payload) {
        state.currentMap = payload;
      }
    }
  })

const app = createApp(App);
app.use(store).use(router).mount('#app');

