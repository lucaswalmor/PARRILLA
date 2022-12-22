<template>
  <div class="container-fluid bg-dark">
    <HeaderPedido />

    <!-- botões add lanche e bebida -->
    <div class="d-flex text-end">
      <div class="">
        <button @click="adicionarLanche" class="btn btn-warning fw-bold m-3">
          Adicionar Lanche
        </button>
      </div>
      <div class="">
        <button @click="adicionarBebida" class="btn btn-warning fw-bold m-3">
          Adicionar Bebida
        </button>
      </div>
    </div>

    <!-- card de pedidos -->
    <section class="h-100 h-custom" style="background-color: #eee">
      <div class="container py-5 h-100">
        <!-- card lanches -->
        <div
          class="row d-flex justify-content-center align-items-center h-100"
          v-for="(dados, index) in this.dadosPedido.lanche"
          :key="index"
        >
          <div class="col">
            <div class="card mb-3">
              <div class="card-body">
                <div class="d-flex justify-content-between mobile-card">
                  <div class="d-flex flex-row align-items-center col-md-8">
                    <div>
                      <img
                        :src="
                          'https://www.projetoadocao.com/storage/' + dados.path
                        "
                        class="img-fluid rounded-3"
                        style="width: 65px"
                      />
                    </div>
                    <div class="ms-3">
                      <h5>{{ dados.nome }}</h5>
                      <p class="small mb-0">{{ dados.ingredientes }}</p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center col-md-4">
                    <div class="col-md-8">
                      <h5 class="mb-0">R$ {{ dados.preco }}</h5>
                    </div>
                    <div class="col-md-4 mobile-card-dados">
                      <a style="color: #cecece" @click="removerLanche(index)"
                        ><i class="fas fa-trash-alt"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- card bebidas -->
        <div
          class="row d-flex justify-content-center align-items-center h-100"
          v-for="(bebida, index) in this.dadosPedido.bebida"
          :key="index"
        >
          <div class="col">
            <div class="card mb-3">
              <div class="card-body">
                <div class="d-flex justify-content-between mobile-card">
                  <div class="d-flex flex-row align-items-center col-md-8">
                    <div>
                      <img
                        :src="
                          'https://www.projetoadocao.com/storage/' + bebida.path
                        "
                        class="img-fluid rounded-3"
                        style="width: 65px"
                      />
                    </div>
                    <div class="ms-3">
                      <h5>{{ bebida.nome }}</h5>
                      <p class="small mb-0">{{ bebida.ingredientes }}</p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center col-md-4">
                    <div class="col-md-8">
                      <h5 class="mb-0">R$ {{ bebida.preco }}</h5>
                    </div>
                    <div class="col-md-4 mobile-card-dados">
                      <a style="color: #cecece" @click="removerBebida(index)"
                        ><i class="fas fa-trash-alt"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container" v-if="dadosPedido.observacoes">
          <h5>Observações</h5>
          {{ dadosPedido.observacoes }}
        </div>

        <!-- resumo de valores -->
        <div class="row">
          <div class="col-md-12 text-end">
            <div class="">
              <hr />
              Resumo de valores
            </div>
            <div class="text-muted d-flex justify-content-between">
              <span>Subtotal</span>
              <span>{{
                valorPedido.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              }}</span>
            </div>
            <div class="text-muted d-flex justify-content-between">
              <span>Taxa de entrega</span>
              <span
                >R$
                {{
                  dadosPedido.taxa_entrega.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })
                }}</span
              >
            </div>
            <div class="fw-bold d-flex justify-content-between">
              <span>Total</span>
              <span>{{
                valorTotalPedido.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })
              }}</span>
            </div>
            <div class="fw-bold d-flex flex-column mt-3">
                <input type="radio" class="btn-check" id="btn-check-1" value="Cartão de crédito" v-model="pag" autocomplete="off">
                <label class="m-1 btn btn-primary" for="btn-check-1">Cartão de crédito</label>

                <input type="radio" class="btn-check" id="btn-check-2" value="Cartão de débito" v-model="pag" autocomplete="off">
                <label class="m-1 btn btn-primary" for="btn-check-2">Cartão de Débito</label>

                <input type="radio" class="btn-check" id="btn-check-3" value="pix" v-model="pag" autocomplete="off">
                <label class="m-1 btn btn-primary" for="btn-check-3">Pix</label>

                <input type="radio" class="btn-check" id="btn-check-4" value="dinheiro" v-model="pag" autocomplete="off">
                <label class="m-1 btn btn-primary" for="btn-check-4">Dinheiro</label>
                
                <div class="row">
                  <!-- TROCO -->
                  <div class=" d-flex justify-content-center" v-if="pag === 'dinheiro'">
                    
                      <label class="form-check-label text-dark" for="tem_troco"
                        >Deseja Troco?</label
                      >
                      <div class="form-check form-switch m-2">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="tem_troco"
                          v-model="tem_troco"
                          true-value="Sim"
                          false-value="Não"
                        />
                      </div>
                  </div>

                  <!-- TROCO -->
                  <div class="row d-flex justify-content-center">
                    <div class="col-md-12 dinheiro" v-if="tem_troco === 'Sim'">
                      <label for="troco" class="form-label text-dark"
                        >Troco para quanto:</label
                      >
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
                  <div class="row d-flex justify-content-center mt-3">
                    <div
                      class="col-md-12 justify-content-center chave_pix text-center"
                      v-if="pag === 'pix'"
                    >
                      <p class="fw-bold">
                        Valor Pedido:
                        {{
                          valorTotalPedido.toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }}
                      </p>
                      <label for="chave-pix" class="form-label">Chave pix:</label>
                      <p>10e9b194-6130-4435-a621-1ea219b87a34</p>
                    </div>
                  </div>
                </div>

                <a :href="href" @click="salvarPedidoDB(), enviarPedido(), salvarLog()" class="enviar_pedido m-3 fw-bold btn btn-success">
                  <i class="me-2 fa-lg fa-brands fa-whatsapp"></i> Finalizar Pedido
                </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import HeaderPedido from "../conteudo/HeaderPedido.vue";
import Footer from "../conteudo/Footer.vue";
import { useToast } from "vue-toastification";

export default {
  name: "Carrinho",
  data() {
    return {
      dadosPedido: [],
      valorPedido: "",
      valorTotalPedido: "",
      tipo_pedido: "",
      forma_pagamento: "",
      tem_troco: "Não",
      troco: "",
      pedidoValor: [],
      href: "",
      prazo_entrega: "",
      mensagem_pedido: "",
      arrFormaPagamento: [],
      pag: "",
    };
  },
  methods: {
    salvarLog() {
      let data = {
        nome_cliente: this.dadosPedido.nome,
        cod_pedido: this.dadosPedido.codigoPedido,
        forma_pagamento: this.pag,
        enviou_pedido: 'Sim'
      }
      
      this.axios({
        // url: 'http://127.0.0.1:8000/api/pedidos',
        url: "https://www.projetoadocao.com/api/logs", 
        data: data,
        method: 'PUT'
      });
    },
    pedido() {
      this.tipo_pedido = localStorage.getItem("tipo_pedido");

      if (this.tipo_pedido == "Entregar") {
        this.dadosPedido = JSON.parse(localStorage.getItem("pedido"));
        const pedido = this.dadosPedido;
        let somaLanche = 0;
        for (let item in pedido.lanche) {
          somaLanche += parseFloat(pedido.lanche[item].preco);
        }

        let somaBebida = 0;
        for (let item in pedido.bebida) {
          somaBebida += parseFloat(pedido.bebida[item].preco);
        }

        this.valorPedido = somaLanche + somaBebida;
        this.valorTotalPedido =
          somaLanche + parseFloat(pedido.taxa_entrega) + somaBebida;

        this.dadosPedido.valor_total = this.valorTotalPedido;

        localStorage.setItem("pedido", JSON.stringify(this.dadosPedido));
      } else if (this.tipo_pedido == "Retirar") {
        this.dadosPedido = JSON.parse(localStorage.getItem("pedido"));
        const pedido = this.dadosPedido;
        let somaLanche = 0;
        for (let item in pedido.lanche) {
          somaLanche += parseFloat(pedido.lanche[item].preco);
        }

        let somaBebida = 0;
        for (let item in pedido.bebida) {
          somaBebida += parseFloat(pedido.bebida[item].preco);
        }

        this.valorPedido = somaLanche + somaBebida;
        this.valorTotalPedido = somaLanche + somaBebida;

        this.dadosPedido.valor_total = this.valorTotalPedido;
      }
    },
    removerLanche(index) {
      const arrLanche = this.dadosPedido.lanche;
      arrLanche.splice(arrLanche[index], 1);
      // traz o array de dados do localstorage e adicionar ao array de dadospedido
      var arr = JSON.parse(localStorage.getItem("pedido"));
      this.dadosPedido = arr;
      // pega o lanche adicionado e adiciona ao array de dados do localStorage
      this.dadosPedido.lanche = arrLanche;
      // seta o novo valor de dadospedido ao localstorage
      localStorage.setItem("pedido", JSON.stringify(this.dadosPedido));

      this.$router.go(this.$router.currentRoute);
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

      this.$router.go(this.$router.currentRoute);
    },
    adicionarLanche() {
      this.$router.push("/dadosLanche");
    },
    adicionarBebida() {
      this.$router.push("/dadosbebida");
    },
    listarPedido() {
      this.tipo_pedido = localStorage.getItem("tipo_pedido");

      let arr = JSON.parse(localStorage.getItem("pedido"));
      this.dadosPedido = arr;
      const pedido = arr;

      const a = [];
      arr.lanche.filter((lanche) => {
        a.push(lanche.nome);
        this.lanche_pedido = a.join("%0A");
      });

      if (arr.hasOwnProperty("bebida")) {
        const b = [];
        arr.bebida.filter((bebida) => {
          b.push(bebida.nome);
          this.bebida_pedido = b.join("%0A");
        });
      }

      let somaLanche = 0;
      for (let item in pedido.lanche) {
        somaLanche += parseFloat(pedido.lanche[item].preco);
      }

      let somaBebida = 0;
      for (let item in pedido.bebida) {
        somaBebida += parseFloat(pedido.bebida[item].preco);
      }

      if (this.tipo_pedido == "Entregar") {
        this.valorpedido = somaLanche + somaBebida;
        this.valorTotalpedido =
          somaLanche + parseFloat(pedido.taxa_entrega) + somaBebida;
      } else if (this.tipo_pedido == "Retirar") {
        this.valorpedido = somaLanche + somaBebida;
        this.valorTotalpedido = somaLanche + somaBebida;
      }
    },
    salvarPedidoDB() {
      // cria um array com os dados do pedido
      if (this.troco != "" && this.troco < this.dadosPedido.valor_total) {
        toast.error("O valor do troco esta abaixo do valor do pedido!");
      } else if (
        this.troco != "" &&
        this.troco > this.dadosPedido.valor_total
      ) {
        this.dadosPedido.troco = this.troco;
        this.pag = this.pag;
      } else {
        this.dadosPedido.troco = "";
        this.pag = this.pag;
      }

      const data = {
        nome_cliente: this.dadosPedido.nome,
        codigo_pedido: this.dadosPedido.codigoPedido,
        rua: this.dadosPedido.rua,
        bairro: this.dadosPedido.bairro,
        ponto_referencia: this.dadosPedido.pontoReferencia,
        apartamento: this.dadosPedido.apartamento,
        bloco: this.dadosPedido.bloco,
        telefone: this.dadosPedido.telefone,
        bebida: this.dadosPedido.bebida,
        lanche: this.dadosPedido.lanche,
        observacoes: this.dadosPedido.observacoes,
        valor_total: this.dadosPedido.valor_total,
        troco: this.dadosPedido.troco,
        forma_pagamento: this.pag,
      };
      
      // fetch para envio de dados ao backend
      this.axios({
        method: "POST",
        // url: 'http://127.0.0.1:8000/api/pedidos',
        url: "https://www.projetoadocao.com/api/pedidos",
        data: data,
      });
    },
    listaTempoEntrega() {
      this.axios(
        `https://www.projetoadocao.com/api/atualiza_tempo_entrega/1`
      ).then((res) => {
        this.prazo_entrega = res.data.tempo_entrega;
        this.mensagem_pedido = res.data.mensagem_pedido;
      });

      this.axios(
        `https://www.projetoadocao.com/api/atualiza_forma_pagamento`
      ).then((res) => {
        res.data.map((item) => {
          if (item.status == 1) {
            this.arrFormaPagamento.push(item);
          }
        });
      });
    },
    enviarPedido() {
      this.pedido_wpp = `
        *${this.mensagem_pedido}*
        %0A
        %0A*Código pedido*  ${this.dadosPedido.codigoPedido}
        %0A
        %0A*Prazo de entrega:*  ${this.prazo_entrega}
        %0A
        %0A*--------------* 
        %0A
        %0A*Olá, meu nome é*  ${this.dadosPedido.nome}
        %0A
        %0A*e meu contato:*  ${this.dadosPedido.telefone}
        %0A
        %0A*--------------*
        %0A
        %0A*Pedido* 
        %0A
        ${
          this.lanche_pedido ? "%0A*Lanches:* %0A%0A " + this.lanche_pedido : ""
        }
        %0A
        ${
          this.bebida_pedido ? "%0A*Bebidas:* %0A%0A " + this.bebida_pedido : ""
        }
        %0A
        ${
          this.dadosPedido.observacoes
            ? "%0A*Observações:* %0A%0A " + this.dadosPedido.observacoes
            : ""
        }
        %0A
        %0A*--------------* 
        %0A
        %0A*SubTotal:* ${this.valorPedido.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        %0A
        %0A*Taxa de entrega:* ${this.dadosPedido.taxa_entrega.toLocaleString(
          "pt-br",
          { style: "currency", currency: "BRL" }
        )}
        %0A
        %0A*Total:* ${this.dadosPedido.valor_total.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
        %0A
        ${
          this.dadosPedido.troco
            ? "%0A*Troco para:* " +
              this.dadosPedido.troco.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })
            : ""
        }
        %0A
        %0A*Forma de pagamento:*  ${this.pag}
        %0A
        %0A*--------------* 
        %0A
        %0A*Endereço de entrega* 
        %0A
        %0A*Rua:*  ${this.dadosPedido.rua}  Nº  ${this.dadosPedido.numero}
        %0A
        %0A*Bairro:*  ${this.dadosPedido.bairro}
        %0A
        ${
          this.dadosPedido.pontoReferencia
            ? "%0A*Ponto de referência:* " + this.dadosPedido.pontoReferencia
            : ""
        }
        %0A
        ${
          this.dadosPedido.apartamento
            ? "%0A*Apartamento:* " + this.dadosPedido.apartamento
            : ""
        }
        %0A
        ${this.dadosPedido.bloco ? "%0A*bloco:* " + this.dadosPedido.bloco : ""}
        %0A*--------------*
        %0A
        %0A*LK Pedidos Whatsapp* 
        %0Ahttps://lucaswalmor.github.io/lk-whatsapp/
        %0A
        %0A*--------------*
      `;

      this.href =
        "https://api.whatsapp.com/send?phone=55" +
        34996390605 +
        "&text=" +
        this.pedido_wpp;
    },
  },
  created() {
    this.pedido();
    this.listarPedido();
    this.listaTempoEntrega();
  },
  components: { HeaderPedido, Footer },
};
</script>

<style scoped>
.mobile-card-dados a {
  cursor: pointer;
}

@media screen and (max-width: 480px) {
  .mobile-card {
    flex-wrap: wrap;
  }

  .mobile-card-dados {
    margin: 10px;
  }
}

.wrapper {
  display: inline-flex;
  height: 100px;
  width: 400px;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 5px;
  padding: 30px 25px;
}

.wrapper .option {
  background: #fff;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  padding: 0 10px;
  border: 2px solid lightgrey;
  transition: all 0.3s ease;
}

.wrapper .option .dot {
  height: 20px;
  width: 20px;
  background: #d9d9d9;
  border-radius: 50%;
  position: relative;
}

.wrapper .option .dot::before {
  position: absolute;
  content: "";
  top: 4px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: #0069d9;
  border-radius: 50%;
  opacity: 0;
  transform: scale(1.5);
  transition: all 0.3s ease;
}

input[type="radio"] {
  display: none;
}

#option-1:checked:checked ~ .option-1,
#option-2:checked:checked ~ .option-2 {
  border-color: #0069d9;
  background: #0069d9;
}

#option-1:checked:checked ~ .option-1 .dot,
#option-2:checked:checked ~ .option-2 .dot {
  background: #fff;
}

#option-1:checked:checked ~ .option-1 .dot::before,
#option-2:checked:checked ~ .option-2 .dot::before {
  opacity: 1;
  transform: scale(1);
}

.wrapper .option span {
  font-size: 20px;
  color: #808080;
}

#option-1:checked:checked ~ .option-1 span,
#option-2:checked:checked ~ .option-2 span {
  color: #fff;
}
</style>