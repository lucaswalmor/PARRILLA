<template>
    <Sidenav />
    <div class="container">
        <div class="row p-5">
            <h2>Editar Adicionais</h2>
            <hr>
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
import { useToast } from "vue-toastification";

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
            var id = this.$route.params.id;

            const data = {
                nome: this.dadosAdicionais.nome,
                preco: this.dadosAdicionais.preco,
            };

            if(data.nome === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/adicionais/${id}`, {
                const req = await fetch(`https://www.projetoadocao.com/api/adicionais/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Adicional editada com sucesso";
                    this.nome = "";
                    this.preco = "";
                    const toast = useToast();
                    toast.success(`Adicional editada com sucesso`);
                    setTimeout(() => {
                        this.msg = ''
                    }, 2000);
                }
            }

        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-adicionais/${token}`, params: {token: token}} );
        }
    },
    mounted() {
        this.axios("http://127.0.0.1:8000/api/adicionais")
        .then(res => {
            this.dadosAdicionais = res.data[0]
        });
    }
}
</script>

<style>

</style>