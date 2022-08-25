<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Lanche</h1>
            </div>
        </div>
        <Message :msg="msg" v-show="msg"/>
        <form class="row g-3" autocomplete="off" @submit.prevent="createLanche" id="formulario-lanche" enctype="multipart/form-data">
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" name="nome" id="nome" v-model="nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" name="preco" id="preco" placeholder="00.00" min="0" v-model="preco">
            </div>
            <div class="col-md-12">
                <input type="submit" class="form-control btn btn-secondary">
            </div>
        </form>
        <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00", sempre colocar os valores decimais</small></p>
    </div>  
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
export default {
    name: "CadastarLanche",
    data() {
        return {
            nome: null,
            preco: null,
            msg: '',
            foto: [],
        };
    },
    methods: {
        async createLanche() {
            let form = document.querySelector('#formulario-lanche');
            const formData = new FormData(form);
            if (this.nome === null || this.preco === null) {
                alert("Porfavor preencha todos os campos");
            }else {
                // const req = await fetch("http://127.0.0.1:8000/api/lanches", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches", {
                    method: "POST",
                    // headers: { "Content-Type": "multipart/form-data" },
                    body: formData
                });

                if (req.status === 200) {
                    this.msg = "Lanche cadastrado com sucesso!";
                    this.nome = "";
                    this.preco = "";
                    setTimeout(() => {
                        this.msg = "";
                    }, 2000);
                }
            }
        }
    },
    components: { Sidenav, Message }
}
</script>

<style scoped>
    label, h2 {
        color: black;
    }

</style>