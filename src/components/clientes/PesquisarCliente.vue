<template>
  <Sidenav />
  <div class="container mt-5">
    <div class="col-md-12 text-secondary">
      <h1>Pesquisar cliente</h1>
      <hr />
    </div>
    <div class="col-md-12 text-secondary">
      <div class="row mt-5">
        <div class="col-3">
          <label for="" class="form-label fw-bold h4 text-secondary"
            >Digite o Telefone:</label
          >
          <input
            type="text"
            name="telefone"
            class="form-control"
            v-model="telefone"
            minlength="15"
            maxlength="15"
            v-maska="'(##) #####-####'"
          />
        </div>
        <div class="col-2 d-flex align-items-end">
          <button
            class="btn btn-dark text-warning fw-bold"
            @click="pesquisarCliente()"
          >
            Pesquisar
          </button>
        </div>
        <div class="form-text">Obs: Todos os campos são obrigatórios</div>
      </div>
      <hr>
        <div class="row mt-2 mb-5">
            <div class="col-md-6" v-for="(item, index) in dados" :key="index">
                <div class="card mt-3">
                    <div class="card-header bg-dark text-white text-center">
                        Dados do Pedido
                    </div>
                    <div class="card-body bg-secondary text-white">
                        <ul>
                            <li>Nº Pedido: {{item.id}}</li>
                            <li>Nome: {{item.nome_cliente}}</li>
                            <li>Telefone: {{item.telefone}}</li>
                            <li>--------------</li>
                            <li>-- LANCHE --</li>
                            <li>--------------</li>
                            <li class="ms-3" v-for="(item, index) in lanche" :key="index">{{index + 1}} - {{item.nome}}</li>
                            <li>--------------</li>
                            <li>-- BEBIDA --</li>
                            <li>--------------</li>
                            <li class="ms-3" v-for="(item, index) in bebida" :key="index">{{index + 1}} - {{item.nome}}</li>
                            <li>--------------</li>
                            <li>Valor: {{item.valor_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</li>
                            <li>Pagamento: {{item.forma_pagamento}}</li>
                            <li>Rua: {{item.rua}}</li>
                            <li>Bairro: {{item.bairro}}</li>
                            <li v-if="item.ponto_referencia != null">Ponto de referência: {{item.ponto_referencia}}</li>
                            <li v-if="item.apartamento != null">Apartamento: {{item.apartamento}}</li>
                            <li v-if="item.bloco != null">Bloco: {{item.bloco}}</li>
                            <li>Data: {{item.created_at}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Sidenav from "../conteudo/Sidenav.vue";
import axios from "axios";
import { useToast } from "vue-toastification";

export default {
  name: "PesquisarClientes",
  components: { Sidenav },
  data() {
    return {
        dados: [],
        lanche: [],
        bebida: [],
        telefone: ''
    };
  },
  methods: {
    pesquisarCliente() {
      if (this.telefone == "") {
        const toast = useToast();
        toast.error(`Telefone não encontrado`);
      } else {
        let data = {
          telefone: this.telefone,
          filtro_valores: null,
          filtro_total_pedidos: null,
          compra_cliente_dia: null,
        };

        axios.post("https://www.projetoadocao.com/api/filtros", data)
          .then((response) => {
            this.dados = response.data.pedido
            this.lanche = response.data.lanche_pedido
            this.bebida = response.data.bebida_pedido
          });

        if (req.status === 200) {
          location.reload(true);
        } else {
            const toast = useToast();
            toast.error(`Telefone não encontrado`);
        }
      }
    },
  },
};
</script>

<style>
li {
    list-style: none;
}
</style>