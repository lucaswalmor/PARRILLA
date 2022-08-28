<template>
  <div class="card mt-3">
    <div class="card-header bg-dark text-white text-center">
        Dados do Pedido
    </div>
    <div class="card-body bg-secondary text-white">
        <ul>
            <li>Nome: {{nome_cliente}}</li>
            <li>Telefone: {{telefone}}</li>
            <li>Lanche: {{lanche}}</li>
            <li>Valor: R$ {{valor_total}}</li>
            <li>Pagamento: {{forma_pagamento}}</li>
            <li>Rua: {{rua}}</li>
            <li>Bairro: {{bairro}}</li>
            <li v-if="apartamento != null">Apartamento: {{apartamento}}</li>
            <li v-if="bloco != null">Bloco: {{bloco}}</li>
            <li>Data / Hora: {{created_at}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
    name: 'ListarPedidoCliente',
    props: ['nome_cliente', 'telefone', 'lanche', 'valor_total', 'rua', 'bairro', 'forma_pagamento', 'created_at']
}
</script>

<style>

</style>