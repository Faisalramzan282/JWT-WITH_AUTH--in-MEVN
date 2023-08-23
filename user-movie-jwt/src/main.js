import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../src/assets/index.css'
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers = {
    'Headers' : store.state.user.tokens,
    'Content-type' : 'application/json'
}
createApp(App).use(store).use(router).mount('#app')
