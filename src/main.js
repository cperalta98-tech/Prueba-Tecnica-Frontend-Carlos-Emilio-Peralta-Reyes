import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import '@/assets/bootstrap.min.css'
import '@/assets/bootstrap.bundle.min.js'
import { Roulette } from 'vue3-roulette'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.component(Roulette)
app.use(VueSweetalert2)
app.mount('#app')
