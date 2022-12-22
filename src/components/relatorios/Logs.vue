<template>
    <sidenav></sidenav>
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Logs Clientes</h1>
                <hr>
            </div>
        </div>
        <div class="container">
            <div class="card m-3 col-md-6" v-for="item in logs" :key="item.id">
                <div class="card-body">
                    <ul>
                        <li>Nome: {{ item.nome_cliente }}</li>
                        <li>Telefone: {{ item.telefone }}</li>
                        <li>Data: {{ item.created_at.substring(0, 10).split('-').reverse().join('/') }}</li>
                        <li>Enviou: {{ (item.enviou_pedido != '') ? item.enviou_pedido : 'Não'}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';

export default {
    name: 'Logs',
    components: { Sidenav },
    data() {
        return {
            logs: [],
        }
    },
    methods: {

    },
    created() {
        this.axios('https://www.projetoadocao.com/api/logs')
        .then(res => {
            this.logs = res.data;
            console.log(res.data)
        });
    }
}
</script>

<style>

</style>