<template>
    <Sidenav />
    <input type="hidden" id="ultimo" v-model="ultimo">
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-3">
                <div class="col-md-12">
                    <h1 class="text-secondary">Vendas</h1>
                    <hr>
                </div>
            </div>
        </div>
        <div class="row" v-if="botaoIniciarDia">
            <button id="audio" class="btn btn-primary" @click="inciarDia()">Iniciar Dia</button>
        </div>

        <div class="col-md-12" v-if="diaIniciado">
            <table class="table table-striped table-responsive text-center">
                <thead class="table-dark">
                        <tr>
                            <th>Nome Cliente</th>
                            <th>Telefone</th>
                            <th>Forma Pag</th>
                            <th>Total</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        <tr v-for="pedido in pedidos" :key="pedido.id">
                            <td>{{ pedido.nome_cliente }}</td>
                            <td>{{ pedido.telefone }}</td>
                            <td>{{ pedido.forma_pagamento }}</td>
                            <td>{{ pedido.valor_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}</td>
                            <td class="botao-acao-tabela">
                                <button class="btn btn-dark" @click="verPedido(pedido.id)"><i
                                        class="fa-solid fa-eye text-light"></i></button>
                                <button class="btn ms btn-danger" @click="cancelarPedido(pedido.id)"><i
                                        class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Sidenav from '@/components/conteudo/Sidenav'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    name: 'PedidosOnline',
    components: { Sidenav },
    data() {
        return {
            ultimo: '',
            pedidos: [],
            diaIniciado: false,
            botaoIniciarDia: true,
        }
    },
    methods: {
        listarPedidos() {
            axios.get(`https://www.projetoadocao.com/api/pedidos`)
            .then(res => {
                this.pedidos = res.data[0].pedidos;
                this.ultimo = res.data.data.ultimoPedido;
            });
        },
        inciarDia() {
            this.diaIniciado = true;
            this.botaoIniciarDia = false;
        }
    },
    mounted() {
        this.listarPedidos();
    },
}
</script>

<style>

</style>