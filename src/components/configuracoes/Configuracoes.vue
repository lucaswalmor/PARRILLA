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

            <div class="col-md-4">
                <label for="telefone_restaurante" class="form-label text-dark fw-bold h5">Telefone Restaurante</label>
                <input type="text" class="form-control" v-model="telefone_restaurante">
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
import Swal from 'sweetalert2';

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
            telefone_restaurante: ''
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
                this.telefone_restaurante = res.data.telefone_restaurante
            });
            this.axios(`https://www.projetoadocao.com/api/atualiza_forma_pagamento`)
            .then(res => {
                this.forma_pagamento = res.data
            });
        },
        alterarInformacoes() {
            const data = {
                tempo_entrega: this.prazo_selecionado,
                mensagem_pedido: this.mensagem_pedido,
                telefone_restaurante: this.telefone_restaurante
            };
            if(this.verificaTelefone()) {
                this.axios({
                    method: 'PUT',
                    url: 'https://www.projetoadocao.com/api/atualiza_tempo_entrega/1',
                    data: data
                }).then(res => {
                    if (res.status == 200) {
                        toast.success("Dados atualizado com sucesso!",);
                    }
                });
            }
            
        },
        statusPagamento(option, id) {
            if(this.verificaTelefone()) {
                axios.put(`https://www.projetoadocao.com/api/atualiza_forma_pagamento/${id}`, {
                status: option.target.value})
                .then((res) => {
                    if (res.status == 200) {
                        toast.success("Status alterado com sucesso!",);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
            
        },
        verificaTelefone() {
            if (this.telefone_restaurante.length != 11 ||
                this.telefone_restaurante == "00000000000" ||
                this.telefone_restaurante == "11111111111" ||
                this.telefone_restaurante == "22222222222" ||
                this.telefone_restaurante == "33333333333" ||
                this.telefone_restaurante == "44444444444" ||
                this.telefone_restaurante == "55555555555" ||
                this.telefone_restaurante == "66666666666" ||
                this.telefone_restaurante == "77777777777" ||
                this.telefone_restaurante == "88888888888" ||
                this.telefone_restaurante == "99999999999" ){
                    Swal.fire({
                        title: `O Telefone: ${this.telefone_restaurante} é inválido.`,
                        icon: 'warning',
                        confirmButtonColor: '#dd4145',
                        confirmButtonText: 'Confirmar'
                    });
                    return false;
              }

              return true;
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