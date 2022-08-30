<template>
    <Sidenav />
    <div class="container mt-5">
        <div class="row col-md-12">
            <FormPesquisaCliente />
        </div>
        <div class="row mt-5 col-12" v-if="gasto_total != ''">
            <div class="col-md-7">
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
            modo: '',
            valor_data_atual: ''
        }
    },
    methods: {
        dadosStorage() {
            // console.log(JSON.parse(localStorage.getItem('dados')))
            this.dados = JSON.parse(localStorage.getItem('dados'));
        },
        somaGastoTotal() {
            let quant = this.dados;
            let arr_valores = []
            let soma = 0

            for (var i = 0; i < quant.length; i++){
                arr_valores[i] = parseInt(quant[i].valor_total);      
                soma += parseInt(arr_valores[i]);
            }  

            this.gasto_total = `Este cliente já gastou R$ ${soma} em seu restaurante!`;
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
                cpf_cliente: this.dados[0].cpf,
                filtro_valores: null,
                filtro_total_pedidos: null,
                compra_cliente_dia: this.modo,
                data: this.valor_data_atual
            }

            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);

            // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/filtros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            const dados = await req.json();
            
            let quant = dados;
            let arr_valores = []
            let soma = 0

            for (var i = 0; i < quant.length; i++){
                arr_valores[i] = parseInt(quant[i].valor_total);      
                soma += parseInt(arr_valores[i]);
            }  

            if(option == 'mes') {
                this.gasto_total = `Este cliente já gastou neste mês R$ ${soma} em seu restaurante!`;
            } else if(option == 'ano') {
                this.gasto_total = `Este cliente já gastou este ano R$ ${soma} em seu restaurante!`;
            } else {
                this.gasto_total = `Este cliente já gastou R$ ${soma} em seu restaurante!`;
            }
        },
        
        async pesquisar() {
            let data = {
                cpf_cliente: this.cpf,
                filtro_valores: null,
                filtro_total_pedidos: null,
                compra_cliente_dia: null
            }

            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
            // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/filtros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            const dados = await req.json();

            localStorage.setItem('dados', JSON.stringify(dados))
            // this.$emit('dadosBack', p)
            if(dados != '') {
                location.reload(true);
            } else {
                alert(`Não foi encontrado dados com o CPF: ${this.cpf}`)
                localStorage.setItem('dados', '')
                location.reload(true);
            }
        }
    },
    mounted() {
        this.dadosStorage();
        this.pesquisarCPF();
    },
}
</script>

<style>

</style>