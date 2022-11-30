<template>
  
<div class="container-fluid bg-dark">
  <HeaderPedido />

  <!-- botões add lanche e bebida -->
  <div class="d-flex text-end">
    <div class="">
      <button @click="adicionarLanche" class="btn btn-warning fw-bold m-3">Adicionar Lanche</button>
    </div>
    <div class="">
      <button @click="adicionarBebida" class="btn btn-warning fw-bold m-3">Adicionar Bebida</button>
    </div>
  </div>

  <!-- card de pedidos -->
  <section class="h-100 h-custom" style="background-color: #eee">
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
      <div class="row d-flex justify-content-center align-items-center h-100" v-for="(bebida, index) in this.dadosPedido.bebida" :key="index">
        <div class="col">
          <div class="card mb-3">
            <div class="card-body">
              <div class="d-flex justify-content-between mobile-card">
                <div class="d-flex flex-row align-items-center col-md-8">
                  <div>
                    <img :src="'https://www.projetoadocao.com/storage/' + bebida.path" class="img-fluid rounded-3" style="width: 65px">
                  </div>
                  <div class="ms-3">
                    <h5>{{bebida.nome}}</h5>
                    <p class="small mb-0">{{bebida.ingredientes}}</p>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center col-md-4">
                  <div class="col-md-8">
                    <h5 class="mb-0">R$ {{bebida.preco}}</h5>
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

      <div class="container" v-if="dadosPedido.observacoes">
        <h5>Observações</h5>
        {{ dadosPedido.observacoes }}
      </div>

      <!-- resumo de valores -->
      <div class="row">
        <div class="col-md-12 text-end">
          <div class="">
            <hr>
            Resumo de valores
          </div>
          <div class="text-muted d-flex justify-content-between">
            <span>Subtotal</span>
            <span>{{valorPedido.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</span>
          </div>
          <div class="text-muted d-flex justify-content-between">
            <span>Taxa de entrega</span>
            <span>R$ {{dadosPedido.taxa_entrega.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</span>
          </div>
          <div class="fw-bold d-flex justify-content-between">
            <span>Total</span>
            <span>{{valorTotalPedido.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</span>
          </div>
          <div class="fw-bold d-flex justify-content-end">
            <!-- <button @click="formaPagamento" class="btn btn-success fw-bold m-3">Forma de pagamento</button> -->
            <button class="btn btn-dark text-warning fw-bold m-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Forma de pagamento</button>
          </div>
        </div>
      </div>
    </div>
  </section>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Forma de pagamento</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row" id="pagamento">
              <div class="row d-flex justify-content-center">
                <div class="col-md-12">
                  <select id="forma_pagamento" class="form-select" @change="formaPagamento($event)">
                    <option disabled selected>Selecione...</option>
                    <option v-for="item in arrFormaPagamento" :key="item.id">{{ item.forma_pagamento }}</option>
                  </select>
                  <p class="text-muted mt-2">
                    Caso sua escolha seja pix, enviar o comprovante assim que efetuar
                    o pedido
                  </p>
                </div>
              </div>

              <!-- TROCO -->
              <div class="row d-flex justify-content-center">
                <div class="col-md-12 dinheiro"
                  v-if="forma_pagamento === 'Dinheiro'">
                    <label class="form-check-label" for="tem_troco">Deseja Troco?</label>
                  <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="tem_troco" v-model="tem_troco"
                            true-value="Sim" false-value="Não">
                  </div>
                </div>
              </div>

              <!-- TROCO -->
              <div class="row d-flex justify-content-center">
                <div class="col-md-12 dinheiro"
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
                <div class="col-md-12 justify-content-center chave_pix text-center"
                  v-if="forma_pagamento === 'Pix'"
                >
                  <p class="fw-bold">Valor Pedido: {{valorTotalPedido.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</p>
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
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <a target="_blank" :href="href" @click="salvarPedidoDB(), enviarPedido()" class="enviar_pedido m-3 fw-bold btn btn-success"><i class="me-2 fa-lg fa-brands fa-whatsapp"></i> Finalizar Pedido</a>
          </div>
        </div>
      </div>
    </div>
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
      valorPedido: '',
      valorTotalPedido: '',
      tipo_pedido: '',
      forma_pagamento: '',
      tem_troco: "Não",
      troco: "",
      pedidoValor: [],
      href: '',
      prazo_entrega: '',
      mensagem_pedido: '',
      arrFormaPagamento: [],
    };
  },
  methods: {
    pedido() {
      this.tipo_pedido = localStorage.getItem("tipo_pedido");

      if(this.tipo_pedido == 'Entregar') {
        this.dadosPedido = JSON.parse(localStorage.getItem("pedido"));
        const pedido = this.dadosPedido;
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

        this.dadosPedido.valor_total = this.valorTotalPedido;
        
        localStorage.setItem('pedido', JSON.stringify(this.dadosPedido))
      } else if(this.tipo_pedido == 'Retirar') {
        this.dadosPedido = JSON.parse(localStorage.getItem("pedido"));
        const pedido = this.dadosPedido;
        let somaLanche = 0
        for(let item in pedido.lanche) {
          somaLanche += parseInt(pedido.lanche[item].preco);
        }
        
        let somaBebida = 0
        for(let item in pedido.bebida) {
          somaBebida += parseInt(pedido.bebida[item].preco);
        }
        
        this.valorPedido = somaLanche + somaBebida
        this.valorTotalPedido = somaLanche + somaBebida

        this.dadosPedido.valor_total = this.valorTotalPedido;
      };
      
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

      this.$router.go(this.$router.currentRoute)
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
    adicionarBebida() {
        this.$router.push('/dadosbebida')
    },
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
      // this.$router.push('/forma-pagamento')
    },
    listarPedido() {
        this.tipo_pedido = localStorage.getItem("tipo_pedido");

        let arr = JSON.parse(localStorage.getItem("pedido"));
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
    salvarPedidoDB() {
      // cria um array com os dados do pedido 
      if(this.troco != '' && this.troco < this.dadosPedido.valor_total) {
        toast.error('O valor do troco esta abaixo do valor do pedido!');
      } else if(this.troco != '' &&  this.troco > this.dadosPedido.valor_total) {
        this.dadosPedido.troco = this.troco
        this.dadosPedido.forma_pagamento = this.forma_pagamento
      } else {
        this.dadosPedido.troco = ''
        this.dadosPedido.forma_pagamento = this.forma_pagamento
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
          forma_pagamento: this.forma_pagamento,
      };
      
      // fetch para envio de dados ao backend
      this.axios({
        method: 'POST',
        // url: 'http://127.0.0.1:8000/api/pedidos',
        url: 'https://www.projetoadocao.com/api/pedidos',
        data: data
      }).then(res => {
        console.log(res)
      });
    },
    listaTempoEntrega() {
        this.axios(`https://www.projetoadocao.com/api/atualiza_tempo_entrega/1`)
        .then(res => {
            this.prazo_entrega = res.data.tempo_entrega
            this.mensagem_pedido = res.data.mensagem_pedido
        });

        this.axios(`https://www.projetoadocao.com/api/atualiza_forma_pagamento`)
        .then(res => {
            res.data.map((item) => {
              if(item.status == 1) {
                this.arrFormaPagamento.push(item)
              }
            });
        });
    },
    enviarPedido() {
      if(this.forma_pagamento == '') {
        const toast = useToast();
        toast.error('Porfavor selecione uma forma de pagamento!');
      } else {
        // se tiver troco, ap e bloco no pedido, entrara neste bloco 
        if (this.dadosPedido.troco != ''
          && this.dadosPedido.apartamento != '' 
          && this.dadosPedido.bloco != '' 
          && this.dadosPedido.pontoReferencia != '') {
          this.pedido_wpp = 
                '*' + this.mensagem_pedido + '*' +
                '%0A' +
                '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                '%0A' +
                '%0A*Prazo de entrega:* ' + this.prazo_entrega +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
                '%0A' +
                '%0A*e meu contato:* ' + this.dadosPedido.telefone +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*Pedido* ' +
                '%0A' +
                '%0A*Lanche:* %0A%0A' + this.lanche_pedido +
                '%0A' +
                '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
                '%0A' +
                '%0A*Observações:* ' + this.dadosPedido.observacoes +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Total* ' +
                '%0A' +
                '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
                '%0A' +
                '%0A*Troco para:* R$ ' + this.dadosPedido.troco +
                '%0A' +
                '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Endereço de entrega* ' +
                '%0A' +
                '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
                '%0A' +
                '%0A*Bairro:* ' + this.dadosPedido.bairro +
                '%0A' +
                '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
                '%0A' +
                '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
                '%0A' +
                '%0A*Bloco:* ' + this.dadosPedido.bloco +
                '%0A*--------------*' +
                '%0A' +
                '%0A*LK Pedidos Whatsapp* ' +
                '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
                '%0A' +
                '%0A*--------------*';
        } else if (this.dadosPedido.troco === '' && this.dadosPedido.apartamento != '' 
          && this.dadosPedido.bloco != '' && this.dadosPedido.pontoReferencia != '') {
            this.pedido_wpp = 
                '*' + this.mensagem_pedido + '*' +
                '%0A' +
                '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                '%0A' +
                '%0A*Prazo de entrega: 40 à 120 minutos' +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
                '%0A' +
                '%0A*e meu contato:* ' + this.dadosPedido.telefone +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*Pedido* ' +
                '%0A' +
                '%0A*Lanche:* %0A%0A' + this.lanche_pedido +
                '%0A' +
                '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
                '%0A' +
                '%0A*Observações:* ' + this.dadosPedido.observacoes +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Total* ' +
                '%0A' +
                '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
                '%0A' +
                '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Endereço de entrega* ' +
                '%0A' +
                '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
                '%0A' +
                '%0A*Bairro:* ' + this.dadosPedido.bairro +
                '%0A' +
                '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
                '%0A' +
                '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
                '%0A' +
                '%0A*Bloco:* ' + this.dadosPedido.bloco +
                '%0A*--------------*' +
                '%0A' +
                '%0A*LK Pedidos Whatsapp* ' +
                '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
                '%0A' +
                '%0A*--------------*';
            
        } else if (this.dadosPedido.troco != '' && this.dadosPedido.apartamento != '' && this.dadosPedido.pontoReferencia != '') {
          this.pedido_wpp = 
            '*' + this.mensagem_pedido + '*' +
            '%0A' +
            '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
            '%0A' +
            '%0A*--------------* ' +
            '%0A' +
            '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*e meu contato:* ' + this.dadosPedido.telefone +
            '%0A' +
            '%0A*--------------*' +
            '%0A' +
            '%0A*Pedido* ' +
            '%0A' +
            '%0A*Lanche:* %0A%0A' + this.lanche_pedido +
            '%0A' +
            '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
            '%0A' +
            '%0A*Observações:* ' + this.dadosPedido.observacoes +
            '%0A' +
            '%0A*--------------* ' +
            '%0A' +
            '%0A*Total* ' +
            '%0A' +
            '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
            '%0A' +
            '%0A*Troco para:* R$ ' + this.dadosPedido.troco +
            '%0A' +
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
            '%0A' +
            '%0A*--------------* ' +
            '%0A' +
            '%0A*Endereço de entrega* ' +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
            '%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +
            '%0A' +
            '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
            '%0A' +
            '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
            '%0A' +
            '%0A*Bloco:* ' + this.dadosPedido.bloco +
            '%0A*--------------*' +
            '%0A' +
            '%0A*LK Pedidos Whatsapp* ' +
            '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
            '%0A' +
            '%0A*--------------*';
        } else if (this.dadosPedido.apartamento != '' && this.dadosPedido.pontoReferencia != '') {
          this.pedido_wpp = 
                '*' + this.mensagem_pedido + '*' +
                '%0A' +
                '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                '%0A' +
              '%0A*Prazo de entrega:* ' + this.prazo_entrega +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
                '%0A' +
                '%0A*e meu contato:* ' + this.dadosPedido.telefone +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*Pedido* ' +
                '%0A' +
                '%0A*Lanche:* %0A%0A' + this.lanche_pedido +
                '%0A' +
                '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
                '%0A' +
                '%0A*Observações:* ' + this.dadosPedido.observacoes +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Total* ' +
                '%0A' +
                '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
                '%0A' +
                '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Endereço de entrega* ' +
                '%0A' +
                '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
                '%0A' +
                '%0A*Bairro:* ' + this.dadosPedido.bairro +
                '%0A' +
                '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
                '%0A' +
                '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*LK Pedidos Whatsapp* ' +
                '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
                '%0A' +
                '%0A*--------------*';
        } else if (this.dadosPedido.troco != '' && this.dadosPedido.pontoReferencia != '') {
          this.pedido_wpp = 
                '*' + this.mensagem_pedido + '*' +
                '%0A' +
                '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                '%0A' +
              '%0A*Prazo de entrega:* ' + this.prazo_entrega +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
                '%0A' +
                '%0A*e meu contato:* ' + this.dadosPedido.telefone +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*Pedido* ' +
                '%0A' +
                '%0A*Lanche:* %0A%0A' + this.lanche_pedido +
                '%0A' +
                '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
                '%0A' +
                '%0A*Observações:* ' + this.dadosPedido.observacoes +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Total* ' +
                '%0A' +
                '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
                '%0A' +
                '%0A*Troco para:* R$ ' + this.dadosPedido.troco +
                '%0A' +
                '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Endereço de entrega* ' +
                '%0A' +
                '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
                '%0A' +
                '%0A*Bairro:* ' + this.dadosPedido.bairro +
                '%0A' +
                '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*LK Pedidos Whatsapp* ' +
                '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
                '%0A' +
                '%0A*--------------*';
        } else if (this.dadosPedido.pontoReferencia != '') {
          this.pedido_wpp = 
                '*' + this.mensagem_pedido + '*' +
                '%0A' +
                '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                '%0A' +
              '%0A*Prazo de entrega:* ' + this.prazo_entrega +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
                '%0A' +
                '%0A*e meu contato:* ' + this.dadosPedido.telefone +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*Pedido* ' +
                '%0A' +
                '%0A*Lanche:* %0A%0A' + this.lanche_pedido + 
                '%0A' +
                '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
                '%0A' +
                '%0A*Observações:* ' + this.dadosPedido.observacoes +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Total* ' +
                '%0A' +
                '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
                '%0A' +
                '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Endereço de entrega* ' +
                '%0A' +
                '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
                '%0A' +
                '%0A*Bairro:* ' + this.dadosPedido.bairro +
                '%0A' +
                '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*LK Pedidos Whatsapp* ' +
                '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
                '%0A'
                '%0A*--------------*';
        } else {
          this.pedido_wpp = 
                '*' + this.mensagem_pedido + '*' +
                '%0A' +
                '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                '%0A' +
              '%0A*Prazo de entrega:* ' + this.prazo_entrega +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
                '%0A' +
                '%0A*e meu contato:* ' + this.dadosPedido.telefone +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*Pedido* ' +
                '%0A' +
                '%0A*Lanche:* %0A%0A' + this.lanche_pedido +
                '%0A' +
                '%0A*Bebida:* %0A%0A' + this.bebida_pedido +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Total* ' +
                '%0A' +
                '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
                '%0A' +
                '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
                '%0A' +
                '%0A*--------------* ' +
                '%0A' +
                '%0A*Endereço de entrega* ' +
                '%0A' +
                '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
                '%0A' +
                '%0A*Bairro:* ' + this.dadosPedido.bairro +
                '%0A' +
                '%0A*--------------*' +
                '%0A' +
                '%0A*LK Pedidos Whatsapp* ' +
                '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
                '%0A'
                '%0A*--------------*';
        }
      }

      // ao finalizar o pedido será gerado o link com o pedido do whatsapp para redirecionar o cliente 
      this.href = 'https://api.whatsapp.com/send?phone=55' + 34996390605 + '&text=' + this.pedido_wpp;
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
  .mobile-card-dados a{
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
</style>