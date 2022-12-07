<template>
    <Sidenav />
    <input type="hidden" id="ultimo" v-model="ultimo">
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-3">
                <div class="col-md-12">
                    <h1 class="text-secondary">Vendas do dia</h1>
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
                        </tr>
                    </thead>
                    <tbody id="myTable">
                        <tr v-for="pedido in pedidos" :key="pedido.id">
                            <td>{{ pedido.nome_cliente }}</td>
                            <td>{{ pedido.telefone }}</td>
                            <td>{{ pedido.forma_pagamento }}</td>
                            <td>{{ pedido.valor_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }}</td>
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
            axios.get(`https://www.projetoadocao.com/api/pedidos-dia`)
            .then(res => {
                this.pedidos = res.data.data.pedidos;
                this.ultimo = res.data.data.ultimoPedido;
            });
        },
        inciarDia() {
            let date = new Date();
            localStorage.setItem('iniciouDia', date.toLocaleDateString());
            this.diaIniciado = true;
            this.botaoIniciarDia = false;
        },
        verificaNovoPedido() {
            setInterval(() => {
                const idAntigo = this.ultimo
                axios.get(`https://www.projetoadocao.com/api/pedidos-dia`)
                .then(res => {
                    const novoId = res.data.data.ultimoPedido;
                    const dadosPedido = res.data.data.pedidos.at(-1);
                    if(idAntigo < novoId) {
                        setTimeout(() => {
                            const audio = new Audio('https://soundbible.com/mp3/dixie-horn_daniel-simion.mp3');
                            audio.play();
                            Swal.fire({
                                title: 'Novo Pedido!',
                                html: `Nome: ${dadosPedido.nome_cliente} <br> Telefone: ${dadosPedido.telefone}`,
                                icon: 'success',
                                confirmButtonColor: '#4FA845',
                                confirmButtonText: 'Confirmar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload();
                                }
                            });
                        });
                    }
                });
            }, 5000);
        },
    },
    mounted() {
        this.listarPedidos();
        this.verificaNovoPedido();

        let dataAtual = localStorage.getItem('iniciouDia')
        if(dataAtual) {
            this.diaIniciado = true;
            this.botaoIniciarDia = false;
        }
    },
}
</script>

<style>

</style>