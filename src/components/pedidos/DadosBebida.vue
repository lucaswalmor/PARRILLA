<template>
    <!-- PEDIDO DE BEBIDA -->
    <div class="row mt-3" id="pedido_bebida" v-show="divBebida">
      <div class="row d-flex justify-content-around">
        <div class="col-md-4">
          <label for="bebida" class="form-label">Bebidas</label>
          <select id="bebida" class="form-select" @change="alterarPrecoBebida($event)">
            <option value="" disabled>-- Selecione</option>
            <option v-for="bebida in dadosBebidas" :key="bebida.id">{{bebida.nome}}</option> 
          </select>
          <div class="form-group mt-3">
            <label for="preco_bebida">Preço</label>
            <input
              type="text"
              class="form-control mt-1"
              id="preco_bebida"
              readonly
              v-model="dadosPedido.preco_bebida"
            />
          </div>
        </div>
        <div class="col-12 mt-3 text-center" id="botao">
          <button type="submit" @click="etapa_3($event)" class="btn etapa_3">
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