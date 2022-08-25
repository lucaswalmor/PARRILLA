<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Bebida</h1>
            </div>
        </div>
        <Message :msg="msg" v-show="msg"/>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" placeholder="00.00" id="preco" min="0" v-model="preco">
            </div>
            <div class="col-md-12">
                <input type="submit" class="form-control btn btn-secondary" @click="createBebida">
            </div>
        </form>
        <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00", sempre colocar os valores decimais</small></p>
    </div>  
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
export default {
    name: "CadastarBebida",
    data() {
        return {
            nome: null,
            preco: null,
            msg: '',
        };
    },
    methods: {
        async createBebida() {
            // cria um array com os dados do pedido 
            const data = {
                nome: this.nome,
                preco: "R$ " + this.preco,
            };
            if (data.nome === null || data.preco === null) {
                alert("Porfavor preencha todos os campos");
            }
            else {
                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);
                // const req = await fetch("http://127.0.0.1:8000/api/bebidas", {
                const req = await fetch("https://pedidoparrilha.herokuapp.com/api/bebidas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                if (req.status === 200) {
                    this.msg = "Bebida cadastrada com sucesso!";
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