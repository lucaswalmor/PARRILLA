<template>
    <Sidenav />
    <div class="container">
        <Message :msg="msg" v-show="msg" />
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <div class="col-md-12">
                    <h1 class="text-secondary">Editar Bebida</h1>
                    <hr>
                </div>
                <div class="col-md-5 pt-2">
                    <input type="text" name="filtr_bebida" id="filtr_bebida" class="form-control"
                        placeholder="Pesquisar...">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 p-3 text-end">
                <button class="btn btn-dark text-warning" @click="cadastrarBebida">
                    Cadastrar Bebida
                </button>
            </div>
        </div>

        <div class="tbodyDiv">
            <table class="table text-center  align-middle">
                <thead class="table-dark">
                    <tr>
                        <th></th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody id="tabela_bebidas">
                    <tr v-for="bebida in dadosBebidas" :key="bebida">
                        <th><img :src="'https://www.projetoadocao.com/storage/' + bebida.path" style="width: 100px"></th>
                        <td>{{ bebida.nome }}</td>
                        <td>R$ {{ bebida.preco }}</td>
                        <td>
                            <select name="" id="" class="form-select" @change="statusBebida($event, bebida.id)"
                                v-model="bebida.status">
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </td>
                        <td class="botao-acao-tabela">
                            <button class=" btn btn-primary" @click="editarBebida(bebida.id)"><i
                                    class="fa-solid fa-pen-to-square"></i></button>
                            <button @click="deletarBebida(bebida)" class="btn btn-danger ms-3"><i
                                    class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
// script de filtro de tabela
$(document).ready(function () {
    $("#filtr_bebida").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tabela_bebidas tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

import Message from '../message/Message.vue';
import Sidenav from '../conteudo/Sidenav.vue';
import { useToast } from "vue-toastification";
import Swal from 'sweetalert2';
const toast = useToast();

export default {
    name: "ListarBebidas",
    components: { Message, Sidenav },
    data() {
        return {
            dadosBebidas: [],
            msg: "",
            updateBebidaIcon: false,
            acoes: true,
        };
    },
    methods: {
        // carregar lista de usuarios
        async listarBebida() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/bebidas");
            const req = await fetch("https://www.projetoadocao.com/api/bebidas");
            const data = await req.json();
            this.dadosBebidas = data;
        },
        // deletar usuario 
        async deletarBebida(bebida) {
            Swal.fire({
                html: `
                    <h4>Você realmente deseja deletar a bebida: </h4>
                    <h2>${bebida.nome}</h2>
                `,
                icon: 'warning',
                cancelButtonColor: '#d33',
                showCancelButton: true,
                confirmButtonColor: '#4FA845',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://www.projetoadocao.com/api/bebidas/${bebida.id}`)
                    .then(() => 
                        this.$router.go(this.$router.currentRoute)
                    );
                }
            });
        },
        editarBebida(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/editar-bebida/${token}/${id}`, params: { id: id, token: token } });
        },
        cadastrarBebida() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-bebida/${token}`, params: { token: token } });
        },
        async statusBebida(option, id) {
            let data = {
                status: option.target.value
            };

            const dataJson = JSON.stringify(data);
            // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`, {
            const req = await fetch(`https://www.projetoadocao.com/api/bebidas/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            if (req.status == 200) {
                toast.success("Status alterado com sucesso!",);
            }
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

label,
h2 {
    color: black;
}

@media screen and (max-width: 425px) {
    .botao-acao-tabela button {
        padding: 2px;
        margin-left: 2px !important;
        margin-top: 3px;
    }
}
</style>