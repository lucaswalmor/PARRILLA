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
            <div class="col-md-4">
                <label for="adicional" class="form-label">Adicional</label>
                <input type="text" class="form-control" v-model="adicional">
            </div>
            <div class="text-muted">
                *Digite o nome do adicional
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="preco" class="form-label">Preço</label>
                <input type="text" class="form-control" v-model="preco">
            </div>
            <div class="text-muted">
                * Favor seguir o modelo de preço na hora do cadastro "00.00"
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <button class="btn btn-warning w-100 text-dark fw-bold mt-4" @click="createAdicionais">Adicionar</button>
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
                        <td>{{item.nome}}</td>
                        <td>R$ {{item.preco}}</td>
                        <td class="d-flex justify-content-center">
                            <select name="" id="" class="form-select w-50" @change="statusAdicionais($event, item.id)" v-model="item.status">
                                <option value="Ativo">Ativo</option>
                                <option value="Inativo">Inativo</option>
                            </select>
                        </td>
                        <td class="botao-acao-tabela">
                            <button class=" btn btn-primary" @click="editarAdicionais(item.id)"><i class="fa-solid fa-pen-to-square"></i></button>
                            <button @click="deletarAdicionais(item.id)" class="btn btn-danger ms-3"><i class="fa-solid fa-user-xmark"></i></button>
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
        async createAdicionais() {
            let data = {
                nome: this.adicional,
                preco: this.preco
            }

            if (data.nome === null || data.preco === null) {
                alert("Porfavor preencha todos os campos");
            }
            else {
                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);
                const req = await fetch("http://127.0.0.1:8000/api/adicionais", {
                // const req = await fetch("https://www.projetoadocao.com/api/adicionais", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                
                    this.msg = "Adicional cadastrado com sucesso!";
                    this.adicional = "";
                    const toast = useToast();
                    toast.success(`Adicional cadastrado com sucesso!`);
                    var token = this.$route.params.token;
                    this.$router.push({ path: `/cadastrar-lanche/${token}`, params: {token: token } });
                    setTimeout(() => {
                        this.msg = "";
                    }, 2000);
            }
        },
        async statusAdicionais(option, id) {
            let data = {
                status: option.target.value
            };

            const dataJson = JSON.stringify(data);
            const req = await fetch(`http://127.0.0.1:8000/api/adicionais/${id}`, {
            // const req = await fetch(`https://www.projetoadocao.com/api/adicionais/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            if(req.status === 200) {
                const toast = useToast();
                toast.success(`Status atualizado com sucesso!`);
            }
        },
        // deletar usuario 
        async deletarAdicionais(id) {
            if (confirm(`Você realmente deseja deletar o pedido Nº ${id} `)) {
                const req = await fetch(`http://127.0.0.1:8000/api/adicionais/${id}`, {
                // const req = await fetch(`https://www.projetoadocao.com/api/adicionais/${id}`, {
                    method: "DELETE"
                });
                const res = await req.json();

                // msg de pedido deletado
                this.msg = `Adicional Nº ${id} deletado com sucesso`;
                const toast = useToast();
                toast.success(`Adicional deletada com sucesso`);
                setTimeout(() => {
                    this.msg = "";
                    location.reload();
                }, 1500);
            }
        },
        editarAdicionais(id) {
            var token = this.$route.params.token;
            this.$router.push({ path: `/editar-adicionais/${token}/${id}`, params: {id: id, token: token}} );
        },
        cadastrarAdicionais() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-adicionais/${token}`, params: {token: token } });
        },
    },
    mounted() {
        this.axios("http://127.0.0.1:8000/api/adicionais")
        .then(res => {
            this.adicionais = res.data
        });
    }
}

</script>

<style>

</style>