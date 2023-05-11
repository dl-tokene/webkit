import '@tokene/styles/src/index.scss'
import 'virtual:svg-icons-register'

import { createApp, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const app = createApp({
  render: () => h(App),
})

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/:catchAll(.*)',
      component: App,
    },
  ],
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

app.use(router)

app.mount('#app')
