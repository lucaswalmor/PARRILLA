<template>
  <div class="card mt-3">
    <div class="card-header bg-dark text-white text-center">
        Dados do Pedido
    </div>
    <div class="card-body bg-secondary text-white">
        <ul>
            <li>Nº Pedido: {{id}}</li>
            <li>Nome: {{nome_cliente}}</li>
            <li>Telefone: {{telefone}}</li>
            <li>Lanche: {{lanche}}</li>
            <li>Valor: R$ {{valor_total}}</li>
            <li>Pagamento: {{forma_pagamento}}</li>
            <li>Rua: {{rua}}</li>
            <li>Bairro: {{bairro}}</li>
            <li v-if="ponto_referencia != null">Ponto de referência: {{ponto_referencia}}</li>
            <li v-if="apartamento != null">Apartamento: {{apartamento}}</li>
            <li v-if="bloco != null">Bloco: {{bloco}}</li>
            <li>Data: {{getCreated}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ListarPedidoCliente',
    props: ['nome_cliente', 'telefone', 'lanche', 'valor_total', 'rua', 'bairro', 'forma_pagamento', 'created_at', 'id', 'ponto_referencia'],
    data() {
      return {
        gasto_total: ''
      }
    },
    computed: {
      getCreated() {
        function adicionaZero(numero){
            if (numero <= 9) 
                return "0" + numero;
            else
                return numero; 
        }

        let dataBackEnd = this.created_at.substring(0, 10);
        let dataAtual = new Date(dataBackEnd); //29/01/2020
        let dataAtualFormatada = (adicionaZero(dataAtual.getDate().toString()) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());
        return dataAtualFormatada;
      }
    },
    
}
</script>

<style>

</style>