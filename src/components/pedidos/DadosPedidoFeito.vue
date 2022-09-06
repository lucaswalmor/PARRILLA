<template>
  <!-- DADOS DO PEDIDO FEITO -->
  <div class="row mt-3" id="pedido_montado" v-show="divFinPedido">
    <div class="row col-12 text-center">
      <h4>
        Agradecemos pela preferência, agora só resta enviar o pedido &#x1F60A;
      </h4>
    </div>
    <div class="row col-12 text-justify d-flex flex-column align-items-center">
      <div class="col-md-6"><strong>Nome:</strong> {{ dadosPedido.nome }}</div>
      <div class="col-md-6"><strong>CPF:</strong> {{ dadosPedido.cpf }}</div>
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
        <strong>Lanche:</strong> {{ dadosPedido.lanche }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.observacoes != ''">
        <strong>Observações:</strong> {{ dadosPedido.observacoes }}
      </div>
      <div class="col-md-6" v-if="dadosPedido.bebida != ''">
        <strong>Bebida:</strong> {{ dadosPedido.bebida }}
      </div>
      <div class="col-md-6">
        <strong>Valor Total: R$</strong> {{ dadosPedido.valor_total }}
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
    <div
    class="col-12 mt-3 text-center"
    v-show="divFinPedido"
    id="link_wpp"
    >
    <a :href="href" @click="salvarPedidoDB" class="enviar_pedido mb-3"
        >Enviar Pedido</a
    >
    </div>

</template>

<script>
export default {};
</script>

<style>
</style>