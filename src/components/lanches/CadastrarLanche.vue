<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Lanche</h1>
            </div>
        </div>
        <Message :msg="msg" v-show="msg"/>
        <div class="row text-end">
            <div>
                <button class="btn btn-warning text-dark fw-bold" @click="cadastrarIngrediente">
                    Cadastrar Ingrediente
                </button>
            </div>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent="createLanche" id="formulario-lanche" enctype="multipart/form-data">
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" name="nome" id="nome" v-model="nome">
            </div>
            <div class="col-md-6">
                <label for="ingredientes" class="form-label">Ingredientes:</label>
                <Multiselect
                    id="ingredientes"
                    v-model="ingredientes"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
                    :options="ingredientesCadastrados"
                />
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" name="preco" id="preco" placeholder="00.00" min="0" v-model="preco">
                <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00"</small></p>
            </div>
            <div class="row">
                <div class="col-md-6 pt-3">
                    <input type="submit" class="form-control btn btn-success" value="Cadastrar">
                </div>
            </div>
        </form>
    </div>  
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
import Multiselect from '@vueform/multiselect';

export default {
    name: "CadastarLanche",
    components: { Sidenav, Message, Multiselect },
    data() {
        return {
            nome: null,
            preco: null,
            msg: '',
            imageLanche: {},
            ingredientes: [],
            ingredientesCadastrados: {},
        };
    },
    methods: {
        // carregar lista de usuarios
        async listarIngredientes() {
            const req = await fetch("http://127.0.0.1:8000/api/ingredientes");
            // const req = await fetch("https://pedidoparrilha.herokuapp.com/api/ingredientes");
            const data = await req.json();
            let arr = []
            for(let item in data) {
                arr.push(data[item].nome)
                this.ingredientesCadastrados = arr
                console.log(this.ingredientesCadastrados)
            }

        },
        async createLanche() {
            const data = {
                "nome": this.nome,
                "preco": this.preco,
                "ingredientes": this.ingredientes,
                "image": this.selectedFile
            }

            const dataJson = JSON.stringify(data)

            if (this.nome === null || this.preco === null) {
                alert("Porfavor preencha todos os campos");
            } else {
                const req = await fetch("http://127.0.0.1:8000/api/lanches", {
                // const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Lanche cadastrado com sucesso!";
                    this.nome = "";
                    this.preco = "";
                    this.ingredientes = [];
                    var token = this.$route.params.token;
                    this.$router.push({ path: `/adicionar-foto/${token}`, params: {token: token } });
                    setTimeout(() => {
                        this.msg = "";
                    }, 2000);
                }
            }
        },
        cadastrarIngrediente() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-ingredientes/${token}`, params: {token: token } });
        }
    },
    mounted() {
        this.listarIngredientes();
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
    label, h2 {
        color: black;
    }

</style>