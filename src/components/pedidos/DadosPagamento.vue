<template>
      <!-- FORMAS DE PAGAMENTO -->
      <div class="row mt-3" id="pagamento" v-show="divPagamento">
        <div class="row d-flex justify-content-center">
          <div class="col-md-4">
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
            v-if="dadosPedido.forma_pagamento === 'Dinheiro'">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" id="tem_troco" v-model="dadosPedido.tem_troco"
                      true-value="Sim" false-value="Não">
              <label class="form-check-label" for="tem_troco">Deseja Troco?</label>
            </div>
          </div>

        </div>

        <!-- TROCO -->
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 dinheiro"
            v-if="dadosPedido.tem_troco === 'Sim'">
            <label for="troco" class="form-label">Troco para quanto:</label>
            <input
              type="number"
              id="troco"
              class="form-control"
              placeholder="R$"
              name="troco"
              v-model="dadosPedido.troco"
            />
          </div>

        </div>

        <!-- CHAVE PIX -->
        <div class="row d-flex justify-content-center">
          <div class="col-md-4 justify-content-center chave_pix text-center"
            v-if="dadosPedido.forma_pagamento === 'Pix'"
          >
            <label for="chave-pix" class="form-label">Chave pix:</label>
            <p>c4c0cd2f-e0b9-4697-af80-0600e14e062e</p>
          </div>
        </div>

        <!-- QRCODE PIX -->
        <div class="row d-flex justify-content-center text-center">
          <div
            class="col-md-4 chave_pix justify-content-center"
            id="qrcode"
            v-if="dadosPedido.forma_pagamento === 'Pix'"
          >
            <img src="/img/qrcode.png" style="width: 250px" />
          </div>
        </div>

        <!-- CONFIRMAR PEDIDO -->
        <div class="row d-flex justify-content-center">
          <div class="col-12 mt-3 text-center" id="botao">
            <button type="submit" @click="etapa_4" class="btn confirmar_pedido">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>