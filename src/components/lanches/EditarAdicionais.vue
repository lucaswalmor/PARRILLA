<template>
    <Sidenav />
    <div class="container">
        <div class="row p-5 text-secondary">
            <h2>Editar Adicionais</h2>
            <hr>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Adicional:</label>
                <input type="text" class="form-control" id="nome" v-model="dadosAdicionais.nome_adicional">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" placeholder="00.00" id="preco" v-model="dadosAdicionais.preco_adicional">
            </div>
            <div class="col-md-6">
                <input type="submit" value="Atualizar" class="form-control btn btn-success" @click="updateBebida">
            </div>
            <div class="col-md-6">
                <input type="submit" value="Voltar" class="form-control btn btn-secondary" @click="voltar">
            </div>
        </form>
        <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00", sempre colocar os valores decimais</small></p>
    </div>    
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import { useToast } from "vue-toastification";
import axios from 'axios';
const toast = useToast();

export default {
    name: 'EditarAdicionais',
    components: { Sidenav },
    data() {
        return {
            nome: null,
            preco: null,
            msg: "",
            dadosAdicionais: []
        }
    },
    methods: {
        async updateBebida() {
            
            const id = this.$route.params.id;

            let data = {
                nome_adicional: this.dadosAdicionais.nome_adicional,
                preco_adicional: this.dadosAdicionais.preco_adicional,
            };

            if(data.nome_adicional === null || data.preco_adicional === null) {
                alert('Porfavor preencha os campos')
            } else {
                axios.put(`https://www.projetoadocao.com/api/adicionais/${id}`, data)
                .then(res => {
                    toast.success(`Adicional editado com sucesso`);
                });
            }

        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-adicionais/${token}`, params: {token: token}} );
        }
    },
    mounted() {

        const id = this.$route.params.id;

        this.axios(`https://www.projetoadocao.com/api/adicionais/${id}`)
        .then(res => {
            this.dadosAdicionais = res.data
        });
    }
}
</script>

<style>

</style>