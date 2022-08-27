<template>
    <Sidenav />
    <div class="container">
        <Message :msg="msg" v-show="msg" />
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <div class="col-md-6">
                    <h1 class="text-secondary">Editar Bebida</h1>
                </div>
                <div class="col-md-5 pt-2">
                    <input type="text" name="filtr_bebida" id="filtr_bebida" class="form-control" placeholder="Pesquisar...">
                </div>
            </div>
        </div>
        <table class="table text-center table-striped">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela_bebidas">
                <tr v-for="bebida in dadosBebidas" :key="bebida">
                    <th>{{bebida.id}}</th>
                    <td>{{bebida.nome}}</td>
                    <td>{{bebida.preco}}</td>
                    <td class="botao-acao-tabela">
                        <button class=" btn btn-primary" @click="editarBebida(bebida.id)"><i class="fa-solid fa-user-pen"></i></button>
                        <button @click="deletarBebida(bebida.id)" class="btn btn-danger ms-3"><i class="fa-solid fa-user-xmark"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// script de filtro de tabela
$(document).ready(function(){
  $("#filtr_bebida").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tabela_bebidas tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
import Message from '../message/Message.vue';
import Sidenav from '../conteudo/Sidenav.vue';
export default {
    name: "ListarBebidas",
    components: { Message, Sidenav },
    data() {
        return {
            dadosBebidas: [],
            msg: "",
            updateBebidaIcon: false,
            acoes: true
        };
    },
    methods: {
        // carregar lista de usuarios
        async listarBebida() {
            
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/bebidas");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/bebidas");
            const data = await req.json();
            this.dadosBebidas = data;
        },
        // deletar usuario 
        async deletarBebida(id) {
            if (confirm(`Você realmente deseja deletar o pedido Nº ${id} `)) {
                // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/bebidas/${id}`, {
                    method: "DELETE"
                });
                const res = await req.json();

                // msg de pedido deletado
                this.msg = `bebida Nº ${id} deletado com sucesso`;
                setTimeout(() => {
                    this.msg = "";
                }, 3000);
            }
        },
        editarBebida(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/editar-bebida/${token}/${id}`, params: {id: id, token: token}} );
        }
    },
    mounted() {
        this.listarBebida();
    }
}
</script>

<style scoped>

    .botao-acao-tabela button {
        margin-left: 10px !important;
    }

    label, h2 {
        color: black;
    }

    @media screen and (max-width: 425px ) {
        .botao-acao-tabela button {
            padding: 2px;
            margin-left: 2px !important;
            margin-top: 3px;
        }
    }
</style>