<template>
    <Sidenav />
    <div class="container mt-5">
        <div class="row col-md-12">
            <FormPesquisaCliente />
        </div>
        <div class="row mt-5 col-12" v-if="this.dados != null">
            <div class="col-md-7" >
                <h4>{{gasto_total}}</h4>
            </div>
            <div class="col-md-5">
                <select name="modo" id="modo" class="form-select" v-model="modo" @change="pesquisarCPF($event)">
                    <option value="" disabled>Selecione...</option>
                    <option value="mes">Mês atual</option>
                    <option value="ano">Ano atual</option>
                </select>
                <div class="form-text">
                    Pesquisar gasto do cliente no mês atual ou no ano atual.
                </div>
            </div>
        </div>
        <div class="row mt-2 mb-5">
            <div class="col-md-6" v-for="(dado, index) in dados" :key="index">
                <ListarPedidoCliente v-bind="dado" />
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import FormPesquisaCliente from './FormPesquisaCliente.vue';
import ListarPedidoCliente from './ListarPedidoCliente.vue';

export default {
    name: 'Clientes',
    components: { Sidenav, FormPesquisaCliente, ListarPedidoCliente },
    data() {
        return {
            dados: [],
            gasto_total: '',
            soma_total: '',
            modo: '',
            valor_data_atual: ''
        }
    },
    methods: {
        dadosStorage() {
            this.dados = JSON.parse(localStorage.getItem('dados'));
            this.soma_total = JSON.parse(localStorage.getItem('soma_total'));
            this.gasto_total = `Este cliente já comprou um total de R$ ${this.soma_total}`;
        },
        async pesquisarCPF(event) {
            const option = event.target.value;
            const data_atual = new Date();
            let mes = (data_atual.getMonth()) + 1;
            let ano = data_atual.getFullYear();

            if(option === 'mes') {
                this.valor_data_atual = '0' + mes;
            } else if (option === 'ano') {
                this.valor_data_atual = ano;
            }

            let data = {
                telefone_cliente: this.dados[0].telefone,
                filtro_valores: '',
                filtro_total_pedidos: '',
                compra_cliente_dia: this.modo,
                data: this.valor_data_atual
            }

            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);

            // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
            const req = await fetch("https://www.projetoadocao.com/api/filtros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            const dados = await req.json();
            
            if(option == 'mes') {
                this.gasto_total = `Este cliente já gastou neste mês R$ ${dados} em seu restaurante!`;
            } else if(option == 'ano') {
                this.gasto_total = `Este cliente já gastou este ano R$ ${dados} em seu restaurante!`;
            } else {
                this.gasto_total = `Este cliente já gastou R$ ${dados} em seu restaurante!`;
            }
        },
    },
    mounted() {
        this.dadosStorage();
        this.pesquisarCPF();
    },
}
</script>

<style>

</style>