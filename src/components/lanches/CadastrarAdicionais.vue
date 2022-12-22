<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Adicionais</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <label for="adicional" class="form-label">Adicional</label>
                <input type="text" class="form-control" v-model="adicional">
                <div class="text-muted">
                    *Digite o nome do adicional
                </div>
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preço</label>
                <input type="text" class="form-control" v-model="preco">
                <div class="text-muted">
                    * Favor seguir o modelo de preço na hora do cadastro "00.00"
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <button class="btn btn-warning w-100 text-dark fw-bold mt-4" @click="createAdicionais">Adicionar</button>
            </div>
            <div class="col-md-4">
                <button class="btn btn-secondary w-100 fw-bold mt-4" @click="voltar">Voltar</button>
            </div>
        </div>

        <div class="row mt-5">
            <table class="table text-center">
                <thead class="table-dark">
                    <tr>
                        <td>Adicional</td>
                        <td>Preço</td>
                        <td>Status</td>
                        <td>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in adicionais" :key="item.id">
                        <td>{{item.nome_adicional}}</td>
                        <td>{{item.preco_adicional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</td>
                        <td>
                            <select name="" id="" class="form-select" @change="statusAdicionais($event, item.id)" v-model="item.status_adicional">
                                <option value="1">Ativo</option>
                                <option value="0">Inativo</option>
                            </select>
                        </td>
                        <td class="botao-acao-tabela">
                            <button class=" btn btn-primary" @click="editarAdicionais(item.id)"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button @click="deletarAdicionais(item)" class="btn btn-danger ms-3"><i class="fa-solid fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import { useToast } from "vue-toastification";
import axios from "axios";
import Swal from 'sweetalert2';

const toast = useToast();

export default {
    name: "CadastrarAdicionais",
    components: { Sidenav },
    data() {
        return {
            adicional: '',
            preco: '',
            adicionais: []
        }
    },
    methods: {
        createAdicionais() {
            let data = {
                nome_adicional: this.adicional,
                preco_adicional: this.preco
            }
            
            if (data.nome === null || data.preco === null) {
                alert("Porfavor preencha todos os campos");
            }
            else {
                axios.post('https://www.projetoadocao.com/api/adicionais', data)
                .then(res => {
                    this.adicional = "";
                    toast.success(`Adicional cadastrado com sucesso!`);
                    location.reload();
                });
            }
        },
        async statusAdicionais(option, id) {
            let data = {
                status_adicional: option.target.value
            };

            axios.put(`https://www.projetoadocao.com/api/adicionais/${id}`, data)
            .then(res => {
                toast.success("Status alterado com sucesso!",);
            });
        },

        // deletar usuario 
        deletarAdicionais(adicional) {
            console.log(adicional)
            Swal.fire({
                html: `
                    <h4>Você realmente deseja deletar o adicional: </h4>
                    <h2>${adicional.nome_adicional}</h2>
                `,
                icon: 'warning',
                cancelButtonColor: '#d33',
                showCancelButton: true,
                confirmButtonColor: '#4FA845',
                confirmButtonText: 'Confirmar'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(`https://www.projetoadocao.com/api/adicionais/${adicional.id}`)
                    .then(() => 
                        this.$router.go(this.$router.currentRoute)
                    );
                }
            });
        },

        editarAdicionais(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/editar-adicionais/${token}/${id}`, params: {id: id, token: token}} );
        },

        cadastrarAdicionais() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-adicionais/${token}`, params: {token: token } });
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-lanche/${token}`, params: {token: token } });
            
        }
    },
    mounted() {
        axios.get('https://www.projetoadocao.com/api/adicionais')
        .then(res => {
            this.adicionais = res.data
        });
    }
}

</script>

<style>

</style>