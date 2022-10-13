<template>
<div class="container-fluid bg-dark">
  <HeaderPedido />
  <!-- DADOS DO PEDIDO FEITO -->
  <div class="row mt-3" id="pedido_montado">
    <div class="row col-12 text-center">
      <h4>
        Agradecemos pela preferência, agora só resta enviar o pedido &#x1F60A;
      </h4>
    </div>
    <div class="row col-12 text-justify d-flex flex-column align-items-center">
      <div class="col-md-6"><strong>Código do pedido:</strong> {{ dadosPedido.codigoPedido }}</div>
      <div class="col-md-6"><strong>Nome:</strong> {{ dadosPedido.nome }}</div>
      <div class="col-md-6"><strong>Rua:</strong> {{ dadosPedido.rua }}</div>
      <div class="col-md-6">
        <strong>Bairro:</strong> {{ dadosPedido.bairro }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.pontoReferencia != ''">
        <strong>Ponto de Referência:</strong> {{ dadosPedido.pontoReferencia }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.apartamento != ''">
        <strong>Apartamento:</strong> {{ dadosPedido.apartamento }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.bloco != ''">
        <strong>Bloco:</strong> {{ dadosPedido.bloco }}
      </div>
      <div class="col-md-6">
        <strong>Telefone:</strong> {{ dadosPedido.telefone }}
      </div>
      <div class="col-md-6">
        <strong>Lanche:</strong> 
        <ul>
          <li v-for="(lanche, index) in dadosPedido.lanche" :key="index">{{index + 1}} - {{lanche.nome}}</li>
        </ul>
      </div>
      <div class="col-md-6" v-if="dadosPedido.observacoes != ''">
        <strong>Observações:</strong> {{ dadosPedido.observacoes }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.bebida != undefined">
        <strong>Bebida:</strong>
        <ul>
          <li v-for="(bebida, index) in dadosPedido.bebida" :key="index">{{index + 1}} - {{bebida.nome}}</li>
        </ul>
      </div>
      <div class="col-md-6">
        <strong>Valor Total: </strong>R$ {{ valorTotalpedido }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.troco != ''">
        <strong> Troco: </strong> R$ {{ dadosPedido.troco }}
      </div>
      <div class="col-md-6">
        <strong>Forma de pagamento:</strong> {{ dadosPedido.forma_pagamento }}
      </div>
    </div>
  </div>
    <!-- BOTAO DE ENVIAR O PEDIDO -->
    <div class="mt-3 text-center" id="link_wpp">
    <div class="">
    </div>
    <div class="">
    </div>
      <button @click="adicionarLanche" class="text-dark btn btn-warning fw-bold m-3">
        <i class="fa-lg fa-solid fa-burger"></i> Adicionar Lanche
      </button>
      <button @click="adicionarBebida" class="text-dark btn btn-warning fw-bold m-3">
        <i class="fa-lg fa-solid fa-wine-bottle"></i> Adicionar Bebida
      </button>
      <a :href="href" target="_blank" @click="salvarPedidoDB(), enviarPedido()" class="enviar_pedido m-3 fw-bold btn btn-success"><i class="fa-lg fa-brands fa-whatsapp"></i> Enviar Pedido</a>
    </div>
    <Footer />
</div>
</template>

<script>
import HeaderPedido from '../conteudo/HeaderPedido.vue';
import Footer from '../conteudo/Footer.vue';

export default {
    name: "ConfirmarPedido",
    data() {
        return {
            dadosPedido: [],
            valorPedido: '',
            valorTotalPedido: '',
            href: '',
            lanche_pedido: '',
            bebida_pedido: '',
            pedido_wpp: '',
            tipo_pedido: ''
        };
    },
    methods: {
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
        salvarPedidoDB() {
          // cria um array com os dados do pedido 
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
              forma_pagamento: this.dadosPedido.forma_pagamento,
          };

          // fetch para envio de dados ao backend
          this.axios({
            method: 'POST',
            // url: 'http://127.0.0.1:8000/api/pedidos',
            url: 'https://www.projetoadocao.com/api/pedidos',
            data: data
          }).then(res => {
            console.log(res)
          })
        },
        enviarPedido() {

          // se tiver troco, ap e bloco no pedido, entrara neste bloco 
          if (this.dadosPedido.troco != ''
            && this.dadosPedido.apartamento != '' 
            && this.dadosPedido.bloco != '' 
            && this.dadosPedido.pontoReferencia != '') {
            this.pedido_wpp = 
                  '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
                  '%0A' +
                  '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                  '%0A' +
                  '%0A*Prazo de entrega: 40 à 110 minutos' +
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
                  '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
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
              '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
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
                  '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
                  '%0A' +
                  '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                  '%0A' +
                '%0A*Prazo de entrega: 40 à 110 minutos' +
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
                  '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
                  '%0A' +
                  '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                  '%0A' +
                '%0A*Prazo de entrega: 40 à 110 minutos' +
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
                  '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
                  '%0A' +
                  '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                  '%0A' +
                '%0A*Prazo de entrega: 40 à 110 minutos' +
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
                  '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
                  '%0A' +
                  '%0A*Código pedido* ' + this.dadosPedido.codigoPedido +
                  '%0A' +
                '%0A*Prazo de entrega: 40 à 110 minutos' +
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

          // ao finalizar o pedido será gerado o link com o pedido do whatsapp para redirecionar o cliente 
          this.href = 'https://api.whatsapp.com/send?phone=55' + 34996390605 + '&text=' + this.pedido_wpp;
        },
        adicionarBebida() {
          this.$router.push('/dadosbebida');
        },
        adicionarLanche() {
          this.$router.push('/dadosLanche');
        },
    },
    mounted() {
        this.listarPedido();
    },
    components: { HeaderPedido, Footer }
};
</script>

<style scoped>
  #pedido_montado {
    color: #fff;
  }

  strong, h4 {
    color: #f9a529;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
  
  div {
    text-transform: capitalize;
  }
</style>