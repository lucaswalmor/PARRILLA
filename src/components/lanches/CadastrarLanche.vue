<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Lanche</h1>
                <hr>
            </div>
        </div>
        <div class="row text-end">
            <div>
                <button class="btn btn-warning text-dark fw-bold" @click="cadastrarIngrediente">
                    Cadastrar Ingrediente
                </button>
                <button class="btn btn-secondary ms-3 fw-bold" @click="cadastrarAdicionais">
                    Cadastrar Adicionais
                </button>
            </div>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent="createLanche" id="formulario-lanche" enctype="multipart/form-data">
            <div class="col-md-4">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" name="nome" id="nome" v-model="nome">
            </div>
            <div class="col-md-4">
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
            <div class="col-md-4">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" name="preco" id="preco" placeholder="00.00" min="0" v-model="preco">
                <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00"</small></p>
            </div>
            <div class="col-md-12 d-flex">
                <h6>Adicionais</h6>
            </div>
            <div class="col-md-12 d-flex">
                <div v-for="item in adicionaisCadastrados" :key="item.id" class="col-md-3 form-check">
                    <input type="checkbox" class="form-check-input" :id="item.id" :value="item" v-model="adicionais">
                    <label class="form-check-label check-pointer" :for="item.id">{{ item.nome_adicional }}</label>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 pt-3">
                    <input type="submit" class="form-control btn btn-success" value="Cadastrar">
                </div>
                <div class="col-md-6 pt-3">
                    <input type="button" class="form-control btn btn-secondary" value="Voltar" @click="voltar">
                </div>
            </div>
        </form>
    </div>  
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import Multiselect from '@vueform/multiselect';
import { useToast } from "vue-toastification";
import axios from 'axios';
const toast = useToast();

export default {
    name: "CadastarLanche",
    components: { Sidenav, Multiselect },
    data() {
        return {
            nome: null,
            preco: null,
            imageLanche: {},
            ingredientes: [],
            ingredientesCadastrados: {},
            adicionais: [],
            adicionaisCadastrados: {},
        };
    },
    methods: {
        // carregar lista de usuarios
        async listar() {
            // const req = await fetch("http://127.0.0.1:8000/api/ingredientes");
            const req = await fetch("https://www.projetoadocao.com/api/ingredientes");
            const data = await req.json();
            let arr = []
            for(let item in data) {
                arr.push(data[item].nome)
                this.ingredientesCadastrados = arr
            }
            
            const adicionais = await fetch("https://www.projetoadocao.com/api/adicionais");
            const dataAdicionais = await adicionais.json();
            this.adicionaisCadastrados = dataAdicionais

        },
        async createLanche() {
            let data = {
                "nome": this.nome,
                "preco": this.preco,
                "ingredientes": this.ingredientes,
                "adicionais": this.adicionais,
                "image": this.selectedFile
            }
            
            let dataJson = JSON.stringify(data);

            if (this.nome === null || this.preco === null) {
                alert("Porfavor preencha todos os campos");
            } else {
                axios.post('https://www.projetoadocao.com/api/lanches', data)
                .then(res => {
                    this.nome = "";
                    this.preco = "";
                    this.ingredientes = [];
                    this.adicionais = [];
                    toast.info(`Agora adicione uma foto do lanche`);
                    var token = this.$route.params.token;
                    this.$router.push({ path: `/adicionar-foto/${token}`, params: {token: token } });
                });
            }
        },
        cadastrarIngrediente() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-ingredientes/${token}`, params: {token: token } });
        },
        cadastrarAdicionais() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-adicionais/${token}`, params: {token: token } });
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-lanche/${token}`, params: {token: token } });
        }
    },
    mounted() {
        this.listar();
    }
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style scoped>
    label, h2 {
        color: black;
        padding: 0;
    }

    .check-pointer {
        cursor: pointer;
    }
</style>