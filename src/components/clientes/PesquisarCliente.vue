<template>
  <Sidenav />
  <div class="container mt-5">
    <div class="col-md-12 text-secondary">
      <h1>Pesquisar cliente</h1>
      <hr />
    </div>
    <div class="col-md-12 text-secondary">
      <div class="col-md-12 mt-5 d-flex">
        <div class="col-md-4">
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
        <div class="col-2 ms-2">
          <button
            class="btn btn-dark text-warning fw-bold"
            @click="pesquisarCliente()"
          >
            Pesquisar
          </button>
        </div>
      </div>
      <div class="form-text">Obs: Todos os campos são obrigatórios</div>
      <hr>
        <div class="row mt-2 mb-5">
            <div class="col-md-6" v-for="(item, index) in dados" :key="index">
                <div class="card mt-3">
                    <div class="card-header bg-dark text-white text-center h5">
                        <span>Nº Pedido: </span> {{item.id}}
                    </div>
                    <div class="card-body bg-secondary text-white">
                        <ul>
                            <li></li>
                            <li><span>Nome: </span> {{item.nome_cliente}}</li>
                            <li><span>Telefone: </span> {{item.telefone}}</li>
                            <li>--------------</li>
                            <li>-- <span>LANCHE</span> --</li>
                            <li>--------------</li>
                            <li class="ms-3" v-for="(item, index) in lanche" :key="index">{{index + 1}} - {{item.nome}}</li>
                            <li>--------------</li>
                            <li>-- <span>BEBIDA</span> --</li>
                            <li>--------------</li>
                            <li class="ms-3" v-for="(item, index) in bebida" :key="index">{{index + 1}} - {{item.nome}}</li>
                            <li>--------------</li>
                            <li><span>Valor: </span> {{item.valor_total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}}</li>
                            <li><span>Pagamento: </span> {{item.forma_pagamento}}</li>
                            <li><span>Rua: </span> {{item.rua}}</li>
                            <li><span>Bairro: </span> {{item.bairro}}</li>
                            <li v-if="item.ponto_referencia != null"><span>Ponto de referência: </span> {{item.ponto_referencia}}</li>
                            <li v-if="item.apartamento != null"><span>Apartamento: </span> {{item.apartamento}}</li>
                            <li v-if="item.bloco != null"><span>Bloco: </span> {{item.bloco}}</li>
                            <li><span>Data: </span> {{item.created_at.substring(0, 10).split('-').reverse().join('/')}}</li>
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

span {
    font-weight: bold;
}
</style>