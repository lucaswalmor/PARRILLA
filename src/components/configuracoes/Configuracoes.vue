<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <div class="col-md-12">
                    <h1 class="text-secondary">Configurações Gerais</h1>
                    <hr>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <label for="lista_tempo_entrega" class="text-dark fw-bold h5">Tempo de Entrega</label>
                <select v-model="prazo_selecionado" name="lista_tempo_entrega" id="lista_tempo_entrega" class="form-select">
                    <option v-for="item in lista_tempo_entrega" :key="item.id">{{item.lista_tempo_entrega}}</option>
                </select>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-md-12">
                <label for="lista_tempo_entrega" class="text-dark fw-bold h5">Mensagem Aviso</label>
                <textarea name="" id="" rows="5" v-model="mensagem_pedido" class="form-control"></textarea>
            </div>
        </div>
            <div class="col-md-12 mt-3">
                <button class="btn btn-success w-100" @click="alterarInformacoes">
                    Salvar
                </button>
            </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import { useToast } from "vue-toastification";

export default {
    name: "Configuracoes",
    components: { Sidenav },
    data() {
        return {
            lista_tempo_entrega: [],
            prazo_selecionado: '',
            mensagem_pedido: '',
        }
    },
    methods: {
        listaTempoEntrega() {
            this.axios(`https://www.projetoadocao.com/api/lista_tempo_entrega`)
            .then(res => {
                this.lista_tempo_entrega = res.data
            });
            this.axios(`https://www.projetoadocao.com/api/atualiza_tempo_entrega/1`)
            .then(res => {
                this.prazo_selecionado = res.data.tempo_entrega
                this.mensagem_pedido = res.data.mensagem_pedido
            });
        },
        alterarInformacoes() {
            const toast = useToast();
            const data = {
                tempo_entrega: this.prazo_selecionado,
                mensagem_pedido: this.mensagem_pedido
            };

            this.axios({
                method: 'PUT',
                url: 'https://www.projetoadocao.com/api/atualiza_tempo_entrega/1',
                data: data
            }).then(res => {
                if (res.status == 200) {
                    toast.success("Prazo de entrega atualizado com sucesso!",);
                }
            });
        }
    },
    created() {
        this.listaTempoEntrega();
    }
}
</script>

<style scoped>
select {
    cursor: pointer;
}
</style>