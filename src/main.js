import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Maska from 'maska'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const teste = createApp(App)
teste.use(Toast);
teste.use(router);
teste.use(Maska);
teste.mount('#app');

const toast = useToast();

