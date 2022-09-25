<template>
    <Sidenav />
    <div class="container">
        <div class="row p-5">
            <h2>Editar Adicionais</h2>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Adicional:</label>
                <input type="text" class="form-control" id="nome" v-model="dadosAdicionais.nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" placeholder="00.00" id="preco" v-model="dadosAdicionais.preco">
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

    },
    mounted() {
        this.axios("http://127.0.0.1:8000/api/adicionais")
        .then(res => {
            this.adicionais = res.data
        console.log(res.data)
        });
    }
}
</script>

<style>

</style>