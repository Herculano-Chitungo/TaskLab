import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// BLOCO 1, passo 3: aqui a store é instalada, com .use(store) no Vuex ou .use(createPinia()) no
// Pinia. No bloco 4 entra também o Router, com .use(router).
createApp(App).mount('#app')
