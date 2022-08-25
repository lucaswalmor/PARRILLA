<template>
    <div class="container" v-show="cadastroTaxa">
        <Message :msg="msg" v-show="msg" />
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <h1 class="text-secondary">Cadastrar Taxa de Entrega</h1>
            </div>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="bairro" class="form-label">Bairro:</label>
                <!-- <select name="bairro" id="bairro" v-model="bairro" class="form-control">
                    <option>teste</option>
                </select> -->
                <input type="text" class="form-control" id="bairro" v-model="bairro">
            </div>
            <!-- <div class="col-md-6">
                <label for="valor_taxa" class="form-label">Valor da Taxa</label>
                <input type="number" class="form-control" id="valor_taxa" placeholder="00.00" v-model="valor_taxa">
            </div> -->
            <div class="col-md-12">
                <input type="submit" class="form-control btn btn-secondary" @click="createTaxa">
            </div>
        </form>
        <p class="mt-3"><small>* Favor seguir o modelo de preço na hora do cadastro "00.00", sempre colocar os valores decimais</small></p>
    </div>
</template>

<script>
import Message from '../message/Message.vue';

export default {
    name: "CadastrarTaxa",
    components: { Message },    
    data() {
        return {
            bairro: '',
            valor_taxa: '',
            msg: ""
        };
    },
    methods: {
        async createTaxa() {
            // cria um array com os dados do pedido 
            const data = {
                bairro: this.bairro,
                // preco: 'R$ ' + this.valor_taxa,
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);

            // const req = await fetch("http://127.0.0.1:8000/api/taxa_entrega", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/taxa_entrega", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            // traz a resposta dos dados criado

            if (req.status === 200) {
                this.bairro = "";
                // this.valor_taxa = "";
            }

            setTimeout(() => {
                this.msg = ''
            }, 2000);
        },
    },
}
</script>

<style scoped>
    label, h2 {
        color: black;
    }
</style>