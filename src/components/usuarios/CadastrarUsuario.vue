<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Usuário</h1>
                <hr />
            </div>
        </div>
        <Message :msg="msg" v-show="msg"/>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="name" v-model="name">
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" v-model="email">
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4" v-model="password">
            </div>
            <div class="row">
                <div class="col-md-6 pt-3">
                    <input type="submit" class="form-control btn btn-success" value="Cadastrar" @click="createUser">
                </div>
                <div class="col-md-6 pt-3">
                    <input type="submit" class="form-control btn btn-secondary" @click="voltar" value="Voltar">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import Message from '../message/Message.vue';
import Sidenav from '../conteudo/Sidenav.vue';
import { useToast } from "vue-toastification";

export default {
    name: "CadastrarUsuario",
    components: { Message, Sidenav},    
    data() {
        return {
            name: null,
            email: null,
            password: null,
            msg: ""
        };
    },
    methods: {
        async createUser() {
            const toast = useToast();
            // cria um array com os dados do pedido 
            const data = {
                name: this.name,
                password: this.password,
                email: this.email
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
                
            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha todos os campos');
            } else {
                // const req = await fetch("http://127.0.0.1:8000/api/register", {
                // const req = await fetch("https://www.projetoadocao.com/api/register", {
                const req = await fetch("https://www.projetoadocao.com/api/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                // traz a resposta dos dados criado
                const res = await req.json();
                if (res.message === "User successfully register.") {
                    toast.success("Cadastro realizado com sucesso!",);
                    this.msg = "Usuario criado com sucesso"
                    this.name = "";
                    this.email = "";
                    this.password = "";
                    setTimeout(() => {
                        this.msg = ''
                    }, 2000);
                } else if(res.errors.email[0]) {
                    toast.error("Dados inválidos!");
                }
            }
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-usuario/${token}`, params: {token: token } });
        }
    },
}
</script>

<style scoped>
    label, h2 {
        color: black;
    }
</style>