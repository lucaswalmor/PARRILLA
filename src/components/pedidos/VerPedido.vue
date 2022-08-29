<template>
  <Sidenav />
  <div class="row mt-5">
    <div class="row col-12 text-center">
      <h4>
        Informações do pedido Nº {{ dadosPedido.id }}
      </h4>
    </div>
    <div class="row col-12 text-center">
      <div><strong>Nome:</strong> {{ dadosPedido.nome_cliente }}</div>
      <div><strong>CPF:</strong> {{ dadosPedido.cpf }}</div>
      <div><strong>Rua:</strong> {{ dadosPedido.rua }}</div>
      <div><strong>Bairro:</strong> {{ dadosPedido.bairro }}</div>
      <div v-if="dadosPedido.apartamento != null">
        <strong>Apartamento:</strong> {{ dadosPedido.apartamento }}
      </div>
      <div v-if="dadosPedido.bloco != null">
        <strong>Bloco:</strong> {{ dadosPedido.bloco }}
      </div>
      <div><strong>Telefone:</strong> {{ dadosPedido.telefone }}</div>
      <div><strong>Lanche:</strong> {{ dadosPedido.lanche }}</div>
      <div v-if="dadosPedido.observacoes != null">
        <strong>Observações:</strong> {{ dadosPedido.observacoes }}
      </div>
      <div v-if="dadosPedido.bebida != null">
        <strong>Observações:</strong> {{ dadosPedido.bebida }}
      </div>
      <div><strong>Valor Total: R$</strong> {{ dadosPedido.valor_total }}</div>
      <div v-if="dadosPedido.troco != null">
        <strong>Troco:</strong> {{ dadosPedido.troco }}
      </div>
      <div>
        <strong>Forma de pagamento:</strong> {{ dadosPedido.forma_pagamento }}
      </div>
        <div>
            <button class="btn btn-warning mt-5" style="font-weight: bold;" @click="voltar">
                <span class="text-dark">Voltar a tela de pedidos</span>
            </button>
        </div>
    </div>
  </div>
  {{this.$route.params.teste}}
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';

export default {
    name: "VerPedido",
    data() {
        return {
            dadosPedido: [],
            token: ""
        };
    },
    methods: {
        async pedido() {
            var id = this.$route.params.id;

            // cria um array com os dados do pedido
            try {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/pedidos/${id}`);
                // const req = await fetch(`http://127.0.0.1:8000/api/pedidos/${id}`);
                const data = await req.json();
                this.dadosPedido = data;
            }
            catch (err) {
                console.log("error", err);
            }
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/pedidos/${token}`, params: {token: token}} );  
        }
    },
    mounted() {
        this.pedido();
    },
    components: { Header, Sidenav }
};
</script>

<style>
</style>