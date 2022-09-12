<template>
  <Sidenav />
  <div class="mt-5">
    <div class="row col-12 text-center text-secondary">
      <h4>
        Informações do pedido Nº {{ id }}
      </h4>
    </div>
      <div class="container">
        <div class="d-flex justify-content-center align-items-center flex-column mb-5">
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Cliente: </label>
            <input type="text" readonly v-model="nome_cliente" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Código Pedido: </label>
            <input type="text" readonly v-model="codigo_pedido" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Telefone: </label>
            <input type="text" readonly v-model="telefone" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">CPF: </label>
            <input type="text" readonly v-model="cpf" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Valor Pedido: </label>
            <input type="text" readonly v-model="valor_total" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Lanches: </label>
          </div>
          <div class="col-md-4" v-for="(item, index) in lanches" :key="index">
            <input type="text" readonly :value="item.nome" class="form-control mt-2">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Bebidas: </label>
          </div>
          <div class="col-md-4" v-for="(bebida, index) in bebidas" :key="index">
            <input type="text" readonly :value="bebida.nome" class="form-control mt-2">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Forma Pagamento: </label>
            <input type="text" readonly v-model="forma_pagamento" class="form-control">
          </div>
          <div class="col-md-4 pt-2" v-if="troco != null">
            <label for="" class="form-label">Troco: </label>
            <input type="text" readonly v-model="troco" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Rua: </label>
            <input type="text" readonly v-model="rua" class="form-control">
          </div>
          <div class="col-md-4 pt-2">
            <label for="" class="form-label">Bairro: </label>
            <input type="text" readonly v-model="bairro" class="form-control">
          </div>
          <div class="col-md-4 pt-2" v-if="apartamento != null">
            <label for="" class="form-label">Apartamento: </label>
            <input type="text" readonly v-model="apartamento" class="form-control">
          </div>
          <div class="col-md-4 pt-2" v-if="bloco != null">
            <label for="" class="form-label">Bloco: </label>
            <input type="text" readonly v-model="bloco" class="form-control">
          </div>
          <div class="col-md-4 pt-2" v-if="ponto_referencia != null">
            <label for="" class="form-label">Ponto de Referência: </label>
            <input type="text" readonly v-model="ponto_referencia" class="form-control">
          </div>
          <div class="col-md-4 pt-4">
            <button class="btn btn-warning fw-bold w-100" @click="voltar">
              Voltar
            </button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';

export default {
    name: "VerPedido",
    data() {
        return {
            dadosPedido: [],
            token: "",
            dataDoPedido: '',
            id: '',
            nome_cliente: '',
            codigo_pedido: '',
            telefone: '',
            cpf: '',
            rua: '',
            bairro: '',
            ponto_referencia: '',
            apartamento: '',
            bloco: '',
            valor_total: '',
            troco: '',
            forma_pagamento: '',
            lanches: [],
            bebidas: [],
        };
    },
    methods: {
        async pedido() {
            var id = this.$route.params.id;
            // this.axios(`http://127.0.0.1:8000/api/pedidos/${id}`)
            let arr = this.axios(`https://www.projetoadocao.com/api/pedidos/${id}`)
            .then(res => {
                this.dadosPedido = res.data[0].pedido;
                this.lanches = res.data[0].lanches;
                this.bebidas = res.data[0].bebidas;

                this.id = res.data[0].pedido.id
                this.nome_cliente = res.data[0].pedido.nome_cliente
                this.codigo_pedido = res.data[0].pedido.codigo_pedido
                this.telefone = res.data[0].pedido.telefone
                this.cpf = res.data[0].pedido.cpf
                this.rua = res.data[0].pedido.rua
                this.bairro = res.data[0].pedido.bairro
                this.ponto_referencia = res.data[0].pedido.ponto_referencia
                this.apartamento = res.data[0].pedido.apartamento
                this.bloco = res.data[0].pedido.bloco
                this.valor_total = res.data[0].pedido.valor_total
                this.troco = res.data[0].pedido.troco
                this.forma_pagamento = res.data[0].pedido.forma_pagamento


                let data_pedido = res.data[0].pedido.created_at;
                let dataAtual = new Date(data_pedido);
                let dataPublicacao = new Date(dataAtual);
                this.dataDoPedido = dataPublicacao.toLocaleDateString('pt-BR')
            });
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/pedidos/${token}`, params: {token: token}} );  
        }
    },
    mounted() {
        this.pedido();
    },
    components: { Sidenav }
};
</script>

<style scoped>
  label {
    color: black;
  }
</style>