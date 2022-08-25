<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5 d-flex">
                <div class="col-md-6">
                    <h1 class="text-secondary">Editar Usuário</h1>
                </div>
                <div class="col-md-5 pt-2">
                    <input type="text" name="filtro_usuarios" id="filtro_usuarios" class="form-control" placeholder="Pesquisar...">
                </div>
            </div>
        </div>
        <table class="table text-center table-striped">
            <thead class="table-dark">
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody id="tabela_usuarios">
                <tr v-for="usuario in dadosUsuario" :key="usuario">
                    <th>{{usuario.id}}</th>
                    <td>{{usuario.name}}</td>
                    <td>{{usuario.email}}</td>
                    <td class="botao-acao-tabela">
                        <button class="btn btn-primary botao-acao-tabela" @click="editUsuario(usuario.id)"><i class="fa-solid fa-user-pen"></i></button>
                        <button @click="deleteUser(usuario.id)" class="btn btn-danger ms-3"><i class="fa-solid fa-user-xmark"></i></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// script de filtro de tabela
$(document).ready(function(){
  $("#filtro_usuarios").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tabela_usuarios tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
import Message from '../message/Message.vue';
import Sidenav from '../conteudo/Sidenav.vue';
export default {
    name: "ListaUsuarios",
    components: { Message, Sidenav },
    data() {
        return {
            dadosUsuario: [],
            msg: ""
        };
    },
    methods: {
        // carregar lista de usuarios
        async editarUsuario() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/usuarios");
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/usuarios");
            const data = await req.json();
            this.dadosUsuario = data;
        },

        // deletar usuario 
        async deleteUser(id) {
            if (confirm(`Você realmente deseja deletar o pedido Nº ${id} `)) {
                // requisicao feita para o backend
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/usuarios/${id}`, {
                    method: "DELETE"
                });
                const res = await req.json();

                // msg de pedido deletado
                this.msg = `Usuário Nº ${id} deletado com sucesso`;
                setTimeout(() => {
                    this.msg = "";
                }, 3000);
            }

        },
        editUsuario(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/editar-usuario/${token}/${id}`, params: {id: id, token: token}} );
        },
    },
    mounted() {
        this.editarUsuario();
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