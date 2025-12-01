import { createApp } from 'vue'
import App from './App.vue'
import Vue3DragSelector from "vue3-drag-selector"

const app = createApp(App)
app.use(Vue3DragSelector)
app.mount('#app')
