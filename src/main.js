import 'primevue/resources/themes/lara-light-indigo/theme.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

import App from './App.vue'
import router from './router'
import './api'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const firebaseConfig = {
  apiKey: 'AIzaSyC7E2j-lbsJHi-DhJC67RrtwPrlyHzpfmw',
  authDomain: 'jwt-firebase-vue3-8367b.firebaseapp.com',
  projectId: 'jwt-firebase-vue3-8367b',
  storageBucket: 'jwt-firebase-vue3-8367b.appspot.com',
  messagingSenderId: '35004296707',
  appId: '1:35004296707:web:8d29aebda8741587092836'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
