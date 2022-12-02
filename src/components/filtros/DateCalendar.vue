<template>
    <div class="row mt-5">
        <h6>Filtros</h6>
    </div>
    <div class="col-md-12 d-flex">
        <div class="col-md-2">
            <Datepicker 
                v-model="dataInicial" 
                :enableTimePicker="false" 
                :format="format" 
                placeholder="Data Inicial" 
                locale="pt-BR" 
                cancelText="Cancelar" 
                selectText="Selecionar"
            />
        </div>
        <div class="ms-3 col-md-2">
            <Datepicker 
                v-model="dataFinal" 
                :enableTimePicker="false" 
                :format="format" 
                placeholder="Data Final" 
                locale="pt-BR" 
                cancelText="Cancelar" 
                selectText="Selecionar"
            />
        </div>
        <div class="ms-3 col-md-2">
            <button class="btn btn-dark text-warning fw-bold w-50" @click="filtrar">Filtrar</button>
        </div>
    </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { ref } from 'vue';
import '@vuepic/vue-datepicker/dist/main.css';
import axios from "axios";

const date = ref();

export default {
    name: 'DateCalendar',
    data() {
        return {
            dataInicial: '',
            dataFinal: ''
        }
    },
    components: {
        Datepicker
    },
    methods: {
        filtrar() {
            let dataInicial = this.dataInicial.toLocaleDateString();
            let dataFinal =  this.dataFinal.toLocaleDateString();

            let dados = {
                dataInicio: dataInicial,
                dataFim: dataFinal,
            }

            axios.post("https://www.projetoadocao.com/api/filtro-data", dados)
            .then((res) => {
                console.log(res)
            });
        }
    },
    setup() {
        let date = ref(new Date());
        let format = (date) => {
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            if (day < 10) {
                day = '0' + day
            }

            return `${day}/${month}/${year}`;
        }
        
        return {
            date,
            format,
        }
    },
}
</script>

<style scoped>
    button {
        letter-spacing: 2px;
    }
</style>