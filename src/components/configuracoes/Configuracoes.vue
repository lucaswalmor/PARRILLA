<template>
    <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-3">
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
            <div class="col-md-6">
                <table class="table table-responsive table-striped align-middle">
                    <thead class="table-dark text-center">
                        <tr>
                            <th>Mensagem Aviso</th>
                        </tr>
                    </thead>
                    <tbody>
                        <textarea name="" id="" rows="9" v-model="mensagem_pedido" class="form-control"></textarea>
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <table class="table table-responsive table-striped text-center align-middle">
                    <thead class="table-dark">
                        <tr>
                            <th>Forma Pagamento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in forma_pagamento" :key="item.id">
                            <td>{{item.forma_pagamento}}</td>
                            <td class="d-flex justify-content-center">
                                <select name="" id="" class="form-select w-50" @change="statusPagamento($event, item.id)"
                                    v-model="item.status">
                                    <option value="1">Ativo</option>
                                    <option value="0">Inativo</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="col-md-12 mt-3">
            <button class="btn btn-success w-50" @click="alterarInformacoes">
                Salvar
            </button>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import { useToast } from "vue-toastification";
import axios from 'axios'

const toast = useToast();

export default {
    name: "Configuracoes",
    components: { Sidenav },
    data() {
        return {
            lista_tempo_entrega: [],
            prazo_selecionado: '',
            mensagem_pedido: '',
            forma_pagamento: [],
        }
    },
    methods: {
        listasConfiguracoes() {
            this.axios(`https://www.projetoadocao.com/api/lista_tempo_entrega`)
            .then(res => {
                this.lista_tempo_entrega = res.data
            });
            this.axios(`https://www.projetoadocao.com/api/atualiza_tempo_entrega/1`)
            .then(res => {
                this.prazo_selecionado = res.data.tempo_entrega
                this.mensagem_pedido = res.data.mensagem_pedido
            });
            this.axios(`https://www.projetoadocao.com/api/atualiza_forma_pagamento`)
            .then(res => {
                this.pag = res.data
                // this.mensagem_pedido = res.data.mensagem_pedido
            });
        },
        alterarInformacoes() {
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
                    toast.success("Dados atualizado com sucesso!",);
                }
            });
        },
        statusPagamento(option, id) {
            axios.put(`https://www.projetoadocao.com/api/atualiza_forma_pagamento/${id}`, {
                status: option.target.value})
                .then((res) => {
                if (res.status == 200) {
                    toast.success("Status alterado com sucesso!",);
                }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
    },
    created() {
        this.listasConfiguracoes();
    }
}
</script>

<style scoped>
select {
    cursor: pointer;
}
</style>