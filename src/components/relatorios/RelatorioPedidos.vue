<template>
    <Sidenav />
    <div class="col py-3 body-dashboard">
        <div class="div-table container">
            <div class="row">
                <div class="titulo col-md-12 p-5">
                    <div class="col-md-12">
                        <h1 class="text-secondary">Pedidos</h1>
                        <hr>
                    </div>
                    <div class="col-md-5 pt-2">
                        <input type="text" name="filter" id="filter" class="form-control" placeholder="Pesquisar...">
                    </div>
                </div>
            </div>
            <input type="hidden" id="ultimo" v-model="ultimo.id">

            <div class="tbodyDiv">
                <table class="table text-center table-striped table-responsive table-fixed align-middle">
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
                                <button class="btn btn-danger" @click="cancelarPedido(pedido)"><i
                                        class="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Sidenav from '../conteudo/Sidenav.vue';
import Swal from 'sweetalert2'

export default {
    name: "Pedidos",
    props: {
        pedidos: Array,
        token: String
    },
    components: { Sidenav },
    data() {
        return {
            pedidos: [],
            token: this.token,
            ultimo: ''
        };
    },
    methods: {
        listarPedidos() {
            // this.axios(`http://127.0.0.1:8000/api/pedidos/`)
            axios.get(`https://www.projetoadocao.com/api/pedidos`)
            .then(res => {
                this.pedidos = res.data[0].pedidos;
                this.somaValorTotal = res.data[0].somas;
                this.totalPedidos = this.pedidos.length;
                this.ultimo = res.data[0].pedidos.at(-1);
            });
        },
        async cancelarPedido(pedido) {
            Swal.fire({
                html: `
                    <h4>Você realmente deseja deletar o pedido de: </h4>
                    <h2>${pedido.nome_cliente}</h2>
                `,
                icon: 'warning',
                cancelButtonColor: '#d33',
                showCancelButton: true,
                confirmButtonColor: '#4FA845',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://www.projetoadocao.com/api/pedidos/${pedido.id}`)
                    .then(() => 
                        this.$router.go(this.$router.currentRoute)
                    );
                }
            });
        },
        verPedido(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/ver-pedido/${token}/${id}`, params: { id: id, token: token } });
        },
    },
    mounted() {
        $("#filter").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
        this.listarPedidos();

    },
}
</script>

<style scoped>
.botao-acao-tabela button {
    margin-left: 10px !important;
}

@media screen and (max-width: 425px) {
    .botao-acao-tabela button {
        padding: 2px;
        margin-left: 10px !important;
        margin-top: 3px;
    }
}
</style>