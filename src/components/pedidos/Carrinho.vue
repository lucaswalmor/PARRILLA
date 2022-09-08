<template>
  <HeaderPedido />
  <div class="d-flex text-end">
    <div class="">
      <button @click="adicionarLanche" class="btn btn-warning fw-bold m-3">Adicionar Lanche</button>
    </div>
    <div class="">
      <button @click="adicionarLanche" class="btn btn-warning fw-bold m-3">Adicionar Bebida</button>
    </div>
    <div class="">
      <button @click="formaPagamento" class="btn btn-success fw-bold m-3">Finalizar Pedido</button>
    </div>
  </div>
  <section class="h-100 h-custom mb-5" style="background-color: #eee">
    <div class="container py-5 h-100">
      <!-- card lanches -->
      <div class="row d-flex justify-content-center align-items-center h-100" v-for="(dados, index) in this.dadosPedido.lanche" :key="index">
        <div class="col">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between mobile-card">
                <div class="d-flex flex-row align-items-center col-md-8">
                  <div>
                    <img :src="'https://www.projetoadocao.com/storage/' + dados.path" class="img-fluid rounded-3" style="width: 65px">
                  </div>
                  <div class="ms-3">
                    <h5>{{dados.nome}}</h5>
                    <p class="small mb-0">{{dados.ingredientes}}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center col-md-4">
                  <div class="col-md-8">
                    <h5 class="mb-0">R$ {{dados.preco}}</h5>
                  </div>
                  <div class="col-md-4 mobile-card-dados">
                    <a style="color: #cecece"  @click="removerLanche(index)"><i class="fas fa-trash-alt"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- card bebidas -->
      <div class="row d-flex justify-content-center align-items-center h-100" v-for="(dados, index) in this.dadosPedido.bebida" :key="index">
        <div class="col">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between mobile-card">
                <div class="d-flex flex-row align-items-center col-md-8">
                  <div>
                    <img :src="'https://www.projetoadocao.com/storage/' + dados.path" class="img-fluid rounded-3" style="width: 65px">
                  </div>
                  <div class="ms-3">
                    <h5>{{dados.nome}}</h5>
                    <p class="small mb-0">{{dados.ingredientes}}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center col-md-4">
                  <div class="col-md-8">
                    <h5 class="mb-0">R$ {{dados.preco}}</h5>
                  </div>
                  <div class="col-md-4 mobile-card-dados">
                    <a style="color: #cecece"  @click="removerBebida(index)"><i class="fas fa-trash-alt"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-end">
          <div class="">
            <hr>
            Resumo de valores
          </div>
          <div class="text-muted d-flex justify-content-between">
            <span>Subtotal</span>
            <span>R$ {{valorPedido}}</span>
          </div>
          <div class="text-muted d-flex justify-content-between">
            <span>Taxa de entrega</span>
            <span>R$ {{dadosPedido.taxa_entrega}}</span>
          </div>
          <div class="fw-bold d-flex justify-content-between">
            <span>Total</span>
            <span>R$ {{valorTotalPedido}}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderPedido from "../conteudo/HeaderPedido.vue";
export default {
  name: "Carrinho",
  data() {
    return {
      dadosPedido: [],
      valorPedido: '',
      valorTotalPedido: ''
    };
  },
  methods: {
    pedido() {
      this.dadosPedido = JSON.parse(localStorage.getItem("pedido"));
      const pedido = this.dadosPedido;
      console.log(pedido)
      let somaLanche = 0
      for(let item in pedido.lanche) {
        somaLanche += parseInt(pedido.lanche[item].preco);
      }
      
      let somaBebida = 0
      for(let item in pedido.bebida) {
        somaBebida += parseInt(pedido.bebida[item].preco);
      }
      
      this.valorPedido = somaLanche + somaBebida
      this.valorTotalPedido = somaLanche + parseInt(pedido.taxa_entrega) + somaBebida
    },
    removerBebida(index) {
      const arrBebida = this.dadosPedido.bebida;
      arrBebida.splice(arrBebida[index], 1);
      // traz o array de dados do localstorage e adicionar ao array de dadospedido
      var arr = JSON.parse(localStorage.getItem("pedido"));
      this.dadosPedido = arr;
      // pega o bebida adicionado e adiciona ao array de dados do localStorage
      this.dadosPedido.bebida = arrBebida;
      // seta o novo valor de dadospedido ao localstorage
      localStorage.setItem("pedido", JSON.stringify(this.dadosPedido));

      this.$router.go(this.$router.currentRoute)
    },
    adicionarLanche() {
        this.$router.push('/dadosLanche')
    },
    formaPagamento() {

    }
  },
  created() {
    this.pedido();
  },
  components: { HeaderPedido },
};
</script>

<style scoped>
  @media screen and (max-width: 480px) {
    .mobile-card {
      flex-wrap: wrap;
    }

    .mobile-card-dados {
      margin: 10px;
    }
  }
</style>