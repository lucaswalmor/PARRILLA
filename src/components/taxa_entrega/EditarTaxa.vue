<template>
    <Sidenav />
    <div class="container">
        <div class="row p-5">
            <h2>Editar Taxa de Entrega</h2>
        </div>
        <Message :msg="msg" v-show="msg" />
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="bairro" class="form-label">Bairro:</label>
                <input type="text" class="form-control" id="bairro" v-model="dadosTaxa.bairro">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" id="preco" placeholder="00.00" v-model="dadosTaxa.preco">
            </div>
            <div class="col-md-6">
                <input type="submit" value="Atualizar" class="form-control btn btn-success" @click="updateTaxa">
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
import Message from '../message/Message.vue';
export default {
    name: "EditarLanche",
    components: { Sidenav, Message },
    data() {
        return {
            bairro: null,
            preco: null,
            dadosTaxa: [],
            msg: ''
        };
    },
    methods: {
        async updateTaxa() {
            var id = this.$route.params.id;
            const data = {
                bairro: this.dadosTaxa.bairro,
                preco: this.dadosTaxa.preco,
            };

            if(data.bairro === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/taxa_entrega/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/taxa_entrega/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });
                console.log(req)
                if (req.status === 200) {
                    this.msg = "Taxa editada com sucesso";
                    this.bairro = "";
                    this.preco = "";
                    setTimeout(() => {
                        this.msg = ''
                    }, 2000);
                }
            }

        },
        // carregar lista de usuarios
        async listarTaxa() {
            var id = this.$route.params.id;
            // cria um array com os dados do pedido 
            const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/taxa_entrega/${id}`);
            const data = await req.json();
            this.dadosTaxa = data;
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-taxa/${token}`, params: {token: token}} );
        }
    },
    mounted() {
        this.listarTaxa();
    }
}
</script>

<style>

</style>