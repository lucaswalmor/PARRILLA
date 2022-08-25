<template>
    <Sidenav />
    <div class="container">
        <div class="row p-5">
            <h2>Editar Lanche</h2>
        </div>
        <Message :msg="msg" v-show="msg"/>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="dadosLanche.nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" id="preco" placeholder="00.00" v-model="dadosLanche.preco">
            </div>
            <div class="col-md-6">
                <input type="submit" value="Atualizar" class="form-control btn btn-success" @click="updateLanche">
            </div>
            <div class="col-md-6">
                <input type="submit" value="Voltar" class="form-control btn btn-secondary" @click="voltar">
            </div>
        </form>
        <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00", sempre colocar os valores decimais</small></p>
    </div>    
</template>

<script>
import Header from '../conteudo/Header.vue';
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
export default {
    name: "EditarLanche",
    components: { Header, Sidenav, Message },
    data() {
        return {
            nome: null,
            preco: null,
            dadosLanche: [],
            msg: ''
        };
    },
    methods: {
        async updateLanche() {
            var id = this.$route.params.id;
            const data = {
                nome: this.dadosLanche.nome,
                preco: 'R$ ' + this.dadosLanche.preco,
            };

            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/lanches/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/lanches/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Lanche editado com sucesso";
                    this.nome = "";
                    this.preco = "";
                    setTimeout(() => {
                        this.msg = ''
                    }, 2000);
                }
            }

        },
        // carregar lista de usuarios
        async listarLanche() {
            var id = this.$route.params.id;
            // cria um array com os dados do pedido 
            const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/lanches/${id}`);
            const data = await req.json();
            this.dadosLanche = data;
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-lanche/${token}`, params: {token: token}} );
        }
    },
    mounted() {
        this.listarLanche();
    }
}
</script>

<style>

</style>