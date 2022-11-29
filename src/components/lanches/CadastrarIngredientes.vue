<template>
    <Sidenav />
    <div class="container">
        <Message :msg="msg" v-show="msg"></Message>
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Ingredientes</h1>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="ingrediente" class="form-label">Ingrediente</label>
                <input type="text" class="form-control" v-model="ingrediente">
            </div>
            <div class="text-muted">
                *Digite o nome do ingrediente
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <button class="btn btn-warning w-100 text-dark fw-bold mt-4" @click="createIngredientes">Adicionar</button>
                <button class="btn btn-secondary w-100 fw-bold mt-4" @click="voltar">Voltar</button>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
import { useToast } from "vue-toastification";

export default {
    name: 'CadastrarIngredientes',
    components: { Sidenav, Message },
    data() {
        return {
            ingrediente: '',
            msg: '',
        }
    },
    methods: {
        async createIngredientes() {
            // cria um array com os dados do pedido 
            const data = {
                nome: this.ingrediente,
            };

            if (data.nome === null || data.preco === null) {
                alert("Porfavor preencha todos os campos");
            }
            else {
                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);
                // const req = await fetch("http://127.0.0.1:8000/api/ingredientes", {
                const req = await fetch("https://www.projetoadocao.com/api/ingredientes", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                if (req.status === 200) {
                    this.msg = "Ingrediente cadastrado com sucesso!";
                    this.ingrediente = "";
                    const toast = useToast();
                    toast.success(`Ingrediente cadastrado com sucesso!`);
                    var token = this.$route.params.token;
                    this.$router.push({ path: `/cadastrar-lanche/${token}`, params: {token: token } });
                    setTimeout(() => {
                        this.msg = "";
                    }, 2000);
                }
            }
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-lanche/${token}`, params: {token: token } });
        }
    }
}
</script>

<style scoped>
    label {
        color: black;
    }
</style>