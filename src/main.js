import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Maska from 'maska'

const teste = createApp(App)
teste.use(router);
teste.use(Maska);
teste.mount('#app');

