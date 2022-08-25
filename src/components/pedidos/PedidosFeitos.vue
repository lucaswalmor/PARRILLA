<template>
    <Sidenav />
    <div class="col py-3 body-dashboard">
        <div class="div-table container">
            <div class="row">
                <div class="titulo col-md-12 p-5 d-flex">
                    <div class="col-md-6">
                        <h1 class="text-secondary">Pedidos</h1>
                    </div>
                    <div class="col-md-5 pt-2">
                        <input type="text" name="filter" id="filter" class="form-control" placeholder="Pesquisar...">
                    </div>
                </div>
            </div>
            <table class="table text-center table-striped table-responsive">
                <thead class="table-dark">
                    <tr>
                        <th>Nº</th>
                        <th>Nome Cliente</th>
                        <th>Telefone</th>
                        <th>Forma Pag</th>
                        <th>Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="myTable">
                    <tr v-for="pedido in pedidos" :key="pedido.id">
                        <th>{{pedido.id}}</th>
                        <td>{{pedido.nome_cliente}}</td>
                        <td>{{pedido.telefone}}</td>
                        <td>{{pedido.forma_pagamento}}</td>
                        <td>R$ {{pedido.valor_total}}</td>
                        <td class="botao-acao-tabela">
                            <button class="btn btn-dark" @click="verPedido(pedido.id)"><i class="fa-solid fa-eye text-light"></i></button>
                            <button class="btn btn-danger" @click="cancelarPedido(pedido.id)"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
$(document).ready(function(){
  $("#filter").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
import Header from '../conteudo/Header.vue';
import Sidenav from '../conteudo/Sidenav.vue';
export default {
    name: "Pedidos",
    props: {
        pedidos: Array,
        token: String
    },
    data() {
        return {
            pedidos: this.pedidos,
            token: this.token
        };
    },
    methods: {
        async listarPedidos() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/pedidos");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/pedidos");
            const data = await req.json();
            this.pedidos = data[0].pedidos;
            this.somaValorTotal = data[0].somas;
            this.totalPedidos = this.pedidos.length;
        },
        async cancelarPedido(id) {
            if (confirm(`Você realmente deseja deletar o pedido Nº ${id} `)) {
                // const req = await fetch(`http://127.0.0.1:8000/api/pedidos/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/pedidos/${id}`, {
                    method: "DELETE"
                });

                const res = await req.json();
                // msg de pedido deletado
                this.msg = `bebida Nº ${id} deletado com sucesso`;

                setTimeout(() => {
                    this.msg = "";
                }, 3000);

                this.$router.go(this.$router.currentRoute)
            }
        },
        verPedido(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/ver-pedido/${token}/${id}`, params: { id: id, token: token } });
        },
    },
    mounted() {
        this.listarPedidos();
    },
    components: { Header, Sidenav }
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