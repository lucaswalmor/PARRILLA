<template>
    <HeaderPedido />    
    <Message :msg="msg" v-show="msg"/>
    <div class="mt-3 container-fluid" id="pedido_lanche">
      <!-- card de lanches -->
      <div class="row">
        <div class="col-md-2 pt-3" v-for="bebida in dadosBebidas" :key="bebida.id">
          <div class="card">
            <div class="card-header text-center fw-bold">
              {{bebida.nome}}
            </div>
            <div class="card-body">
              <img :src="'https://www.projetoadocao.com/storage/' + bebida.path">
            </div>
            <div class="card-footer">
              <span class="fw-bold">Valor: </span>R$ {{bebida.preco}}
            </div>
            <div class="card-footer">
              <div class="row text-center">
                  <button class="btn btn-warning text-dark fw-bold w-100" @click="adicionarBebida(bebida)">
                    <i class="fa-solid fa-circle-plus"></i> Adicionar ao carrinho
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- adicionar bebida / carrinho -->
      <div class="row pt-3 d-flex justify-content-center align-items-center">
        <div class="col-md-4 text-center">
          <button type="submit" @click="adicionarLanche" class="btn btn-warning text-dark fw-bold w-75">
            <i class="fa-lg fa-solid fa-burger"></i> Adicionar Lanche
          </button>
          <button type="submit" @click="carrinho" class="btn btn-warning text-dark fw-bold w-75">
            <i class="fa-lg fa-solid fa-cart-shopping"></i> Carrinho
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import HeaderPedido from '../conteudo/HeaderPedido.vue';
export default {
    name: "DadosBebida",
    data() {
        return {
            dadosBebidas: [],
            dadosPedido: {
                bebida: "",
                preco_bebida: "",
            },
            pedido: [],
            msg: ""
        };
    },
    methods: {
        alterarPrecoBebida(event) {
            const option = event.target.value;
            this.dadosPedido.bebida = option;
            var precoBebida = this.dadosBebidas;
            // percorre o array de lanches que vem do banco de dados e seta o valor do preco 
            for (var item in precoBebida) {
                var nome = precoBebida[item].nome;
                var preco = precoBebida[item].preco;
                if (option == nome) {
                    this.dadosPedido.preco_bebida = preco;
                }
            }
        },
        // carregar lista de usuarios
        async listarBebidas() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/bebidas");
            const req = await fetch("https://www.projetoadocao.com/api/bebidas");
            const data = await req.json();
            this.dadosBebidas = data;
        },
        adicionarBebida(bebida) {
            // traz o array de dados do localstorage e adicionar ao array de dadospedido
            var arr = JSON.parse(localStorage.getItem("pedido"));
            this.dadosPedido = arr;

            if (this.dadosPedido.bebida == undefined) {
                // pega o bebida adicionado e adiciona ao array de dados do localStorage
                this.pedido.push(bebida);
                this.dadosPedido.bebida = this.pedido;
                // seta o novo valor de dadospedido ao localstorage 
                localStorage.setItem("pedido", JSON.stringify(this.dadosPedido));
            }
            if (this.dadosPedido.bebida != undefined) {
                // busca os bebidas que ja estao no pedido e preenche o array de pedidos 
                this.pedido = this.dadosPedido.bebida;
                // adiciona o item adicional ao array de pedidos
                this.pedido.push(bebida);
                // seta o novo valor de dadospedido ao localstorage 
                localStorage.setItem("pedido", JSON.stringify(this.dadosPedido));
            }
            this.msg = `1 ${bebida.nome} foi adicionado ao carrinho`;
            setTimeout(() => {
                this.msg = "";
            }, 2500);
        },
        adicionarLanche() {
          this.$router.push('/dadosLanche');
        },
        carrinho() {
          this.$router.push('/carrinho');
        }
    },
    mounted() {
        this.listarBebidas();
    },
    components: { HeaderPedido }
}
</script>

<style scoped>
  .card-body {
    padding: 0;
  }

  img {
    width: 100%;
    height: 250px;
  }

  button {
    margin-top: 10px;
  }

  .background {
    margin: 0;
    padding: 0;
    background-color: #333;
  }
</style>