import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/styles/global.scss'

import App from './App.vue'
import router from './router'
import { vReveal } from './directives/reveal'

createApp(App).use(createPinia()).use(router).directive('reveal', vReveal).mount('#app')
