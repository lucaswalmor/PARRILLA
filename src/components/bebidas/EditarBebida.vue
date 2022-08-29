<template>
    <Sidenav />
    <div class="container">
        <div class="row p-5">
            <h2>Editar Bebida</h2>
        </div>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="nome" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="nome" v-model="dadosBebidas.nome">
            </div>
            <div class="col-md-6">
                <label for="preco" class="form-label">Preco:</label>
                <input type="text" class="form-control" placeholder="00.00" id="preco" v-model="dadosBebidas.preco">
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
    name: "EditarBebida",
    components: { Sidenav },
    data() {
        return {
            nome: null,
            preco: null,
            msg: "",
            dadosBebidas: []
        };
    },
    methods: {
        async updateBebida() {
            var id = this.$route.params.id;

            const data = {
                nome: this.dadosBebidas.nome,
                preco: 'R$ ' + this.dadosBebidas.preco,
            };

            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/bebidas/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Bebida editada com sucesso";
                    this.nome = "";
                    this.preco = "";
                    setTimeout(() => {
                        this.msg = ''
                    }, 2000);
                }
            }

        },
        // carregar lista de usuarios
        async listarBebida() {
            var id = this.$route.params.id;
            // cria um array com os dados do pedido 
            // const req = await fetch(`http://127.0.0.1:8000/api/bebidas/${id}`);
            const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/bebidas/${id}`);
            const data = await req.json();
            this.dadosBebidas = data;
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-bebida/${token}`, params: {token: token}} );
        }
    },
    mounted() {
        this.listarBebida();
    }
}
</script>

<style>

</style>