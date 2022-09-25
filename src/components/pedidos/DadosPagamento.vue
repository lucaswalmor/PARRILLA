<template>
  
<div class="container-fluid bg-dark">
      <HeaderPedido />
      <!-- FORMAS DE PAGAMENTO -->
      <div class="row mt-3" id="pagamento">
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 mt-5">
            <label for="forma_pagamento" class="form-label"
              >Forma de pagamento</label
            >
            <select id="forma_pagamento" class="form-select" @change="formaPagamento($event)">
              <option disabled selected>Selecione...</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
            <p>
              Caso sua escolha seja pix, enviar o comprovante assim que efetuar
              o pedido
            </p>
          </div>
        </div>

        <!-- TROCO -->
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 dinheiro"
            v-if="forma_pagamento === 'Dinheiro'">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="tem_troco" v-model="tem_troco"
                      true-value="Sim" false-value="Não">
              <label class="form-check-label" for="tem_troco">Deseja Troco?</label>
            </div>
          </div>

        </div>

        <!-- TROCO -->
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 dinheiro"
            v-if="tem_troco === 'Sim'">
            <label for="troco" class="form-label">Troco para quanto:</label>
            <input
              type="number"
              id="troco"
              class="form-control"
              placeholder="R$"
              name="troco"
              v-model="troco"
            />
          </div>

        </div>

        <!-- CHAVE PIX -->
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 justify-content-center chave_pix text-center"
            v-if="forma_pagamento === 'Pix'"
          >
            <p class="fw-bold">Valor Pedido: R$ {{valorTotalpedido}}</p>
            <label for="chave-pix" class="form-label">Chave pix:</label>
            <p>10e9b194-6130-4435-a621-1ea219b87a34</p>
          </div>
        </div>

        <!-- QRCODE PIX -->
        <!-- <div class="row d-flex justify-content-center text-center">
          <div
            class="col-md-4 chave_pix justify-content-center"
            id="qrcode"
            v-if="forma_pagamento === 'Pix'"
          >
            <img src="/img/qrcode.png" style="width: 250px" />
          </div>
        </div> -->

        <!-- CONFIRMAR PEDIDO -->
        <div class="row d-flex justify-content-center">
          <div class="col-12 mt-3 text-center" id="botao">
            <button type="submit" @click="confirmarPedido" class="btn mb-5 btn-warning fw-bold">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
      <Footer />
</div>
</template>

<script>
import HeaderPedido from '../conteudo/HeaderPedido.vue';
import Footer from '../conteudo/Footer.vue';
import { useToast } from "vue-toastification";

export default {
  name: "DadosPagamento",
  components: { HeaderPedido, Footer },
  data() {
      return {
        forma_pagamento: '',
        tem_troco: "Não",
        troco: "",
        pedido: [],
        dadosPedido: [],
        valorTotalpedido: '',
        tipo_pedido: ''
      };
  },
  methods: {
    // altera divs da forma de pagamento 
    formaPagamento(event) {
      const option = event.target.value;
      if(option === 'Cartão de crédito') {
        this.forma_pagamento = option
      } else if(option === 'Cartão de débito') {
        this.forma_pagamento = option
      } else if(option === 'Pix') {
        this.forma_pagamento = option
      } else if(option === 'Dinheiro') {
        this.forma_pagamento = option
      }
    },
    confirmarPedido() {
      var arr = JSON.parse(localStorage.getItem("pedido"));
      this.dadosPedido = arr;
      const toast = useToast();

      if(this.forma_pagamento == '') {
        toast.error('Porfavor selecione uma forma de pagamento!');
      } else {
        if(this.troco != '' && this.troco < this.dadosPedido.valor_total) {
          toast.error('O valor do troco esta abaixo do valor do pedido!');
        } else if(this.troco != '' &&  this.troco > this.dadosPedido.valor_total) {
          this.dadosPedido.troco = this.troco
          this.dadosPedido.forma_pagamento = this.forma_pagamento
        } else {
          this.dadosPedido.troco = ''
          this.dadosPedido.forma_pagamento = this.forma_pagamento
        }

        localStorage.setItem('pedido', JSON.stringify(this.dadosPedido))
        this.$router.push('/confirmar-pedido')
      }
    },
    listarPedido() {
        this.tipo_pedido = localStorage.getItem("tipo_pedido");

        var arr = JSON.parse(localStorage.getItem("pedido"));
        this.dadosPedido = arr;
        const pedido = arr;

        const a = []
        arr.lanche.filter((lanche) => {
          a.push(lanche.nome)
          this.lanche_pedido = a.join('%0A')
        })

        if(arr.hasOwnProperty("bebida")){
          const b = []
          arr.bebida.filter((bebida) => {
            b.push(bebida.nome)
            this.bebida_pedido = b.join('%0A')
          })
        }

        let somaLanche = 0
        for(let item in pedido.lanche) {
          somaLanche += parseInt(pedido.lanche[item].preco);
        }
        
        let somaBebida = 0
        for(let item in pedido.bebida) {
          somaBebida += parseInt(pedido.bebida[item].preco);
        }
        
        if(this.tipo_pedido == 'Entregar') {
          this.valorpedido = somaLanche + somaBebida
          this.valorTotalpedido = somaLanche + parseInt(pedido.taxa_entrega) + somaBebida
        } else if (this.tipo_pedido == 'Retirar') {
          this.valorpedido = somaLanche + somaBebida
          this.valorTotalpedido = somaLanche + somaBebida
        }
    },
  },
  mounted() {
    this.listarPedido();
  }
}
</script>

<style scoped>
  p {
    color: #f9a529;
  }
</style>