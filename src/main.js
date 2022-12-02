import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import Maska from 'maska'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios';

const Application = createApp(App)
Application.config.globalProperties.axios=axios
Application.use(Toast);
Application.use(router);
Application.use(Maska);
Application.mount('#app');