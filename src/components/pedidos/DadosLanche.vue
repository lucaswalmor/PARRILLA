<template>
<div class="container-fluid bg-dark">
    <HeaderPedido />
    <div class="mt-3 container-fluid" id="pedido_lanche">
      <!-- card de lanches -->
      <div class="row">
        <div class="col-md-2 pt-3 centralizar-cards" v-for="lanche in dadosLanches" :key="lanche.id">
          <div class="card">
            <div class="card-header text-center fw-bold">
              {{lanche.nome}}
            </div>
            <div class="card-body">
              <img :src="'https://www.projetoadocao.com/storage/' + lanche.path">
            </div>
            <div class="card-footer">
              <span class="fw-bold">Ingredientes: </span>{{lanche.ingredientes}}
              <br>
              <span class="fw-bold">Valor: </span>R$ {{lanche.preco}}
            </div>
            <div class="card-footer">
              <div class="row text-center">
                  <button class="btn btn-warning text-dark fw-bold w-100" @click="adicionarLanche(lanche)">
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
          <button type="button" class="btn btn-warning text-dark fw-bold w-75" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i class="fa-lg fa-solid fa-eye"></i> Observações 
          </button>
          <button type="submit" @click="adicionarBebida" class="btn btn-warning text-dark fw-bold w-75">
            <i class="fa-lg fa-solid fa-wine-bottle"></i> Adicionar Bebida
          </button>
          <button v-show="quatidadeLancheCarrinho" type="submit" @click="carrinho" class="btn btn-warning text-dark fw-bold w-75">
            <i class="fa-lg fa-solid fa-cart-shopping"></i> Carrinho
          </button>
          <!-- <button @click="formaPagamento" class="btn btn-warning text-dark fw-bold w-75"><i class="fa-solid fa-money-bill"></i> Forma de pagamento</button> -->
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Observação</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="">
                <textarea class="form-control" cols="30" rows="3" v-model="observacoes"></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="adicionarObservacao"><i class="fa-solid pe-2 fa-floppy-disk"></i> Salvar</button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
</div>
</template>

<script>
  import HeaderPedido from '../conteudo/HeaderPedido.vue';
  import Footer from '../conteudo/Footer.vue';
  import { useToast } from "vue-toastification";

  export default {
      name: "DadosLanche",
      components: { HeaderPedido, Footer },
      data() {
        return {
            dadosLanches: [],
            pedido: [],
            msg: '',
            observacoes: '',
            quatidadeLancheCarrinho: false
        };
      },
      methods: {
        // carregar lista de usuarios
        async listarLanche() {
            // cria um array com os dados do pedido 
            // const req = await fetch("http://127.0.0.1:8000/api/lanches");

            const req = await fetch("https://www.projetoadocao.com/api/lanches");
            const data = await req.json();

            this.dadosLanches = data;
            console.log(this.dadosLanches);
            // traz o array de dados do localstorage e adicionar ao array de dadospedido
            var arr = JSON.parse(localStorage.getItem('pedido'))
            if(arr.hasOwnProperty("observacoes")){
              this.observacoes = arr.observacoes
            } else {
              arr.observacoes = ""
              localStorage.setItem('pedido', JSON.stringify(arr))
            }
        },
        alterarPrecoLanche(event) {
          const option = event.target.value;
          this.dadosPedido.lanche = option;
          var precoLanche = this.dadosLanches;
          // percorre o array de lanches que vem do banco de dados e seta o valor do preco 
          for (var item in precoLanche){
            var nome = precoLanche[item].nome;
            var preco = precoLanche[item].preco;
            if(option == nome) {
              this.dadosPedido.preco_lanche =  preco
            }
          }
        },
        adicionarLanche(lanche) {
          // traz o array de dados do localstorage e adicionar ao array de dadospedido
          var arr = JSON.parse(localStorage.getItem('pedido'))

          if(arr.hasOwnProperty("lanche")){
            arr.lanche.push(Object.assign({}, lanche))
            localStorage.setItem('pedido', JSON.stringify(arr))
          } else {
            this.pedido.push(lanche);
            arr.lanche = this.pedido
            localStorage.setItem('pedido', JSON.stringify(arr))
          }

          let lanchesPedidos = JSON.parse(localStorage.getItem('pedido'))      
          this.quatidadeLancheCarrinho = (lanchesPedidos.lanche.length > 0) ? true : false;

          const toast = useToast();
          toast.success(`1 ${lanche.nome} foi adicionado ao carrinho`);
        },
        adicionarBebida() {
          this.$router.push('/dadosbebida');
        },
        carrinho() {
          this.$router.push('/carrinho');
        },
        adicionarObservacao() {
          // traz o array de dados do localstorage e adicionar ao array de dadospedido
          var arr = JSON.parse(localStorage.getItem('pedido'))
          arr.observacoes = this.observacoes;
          localStorage.setItem('pedido', JSON.stringify(arr))
        },
        formaPagamento() {
          this.$router.push('/forma-pagamento')
        }
      },
      mounted() {
        const toast = useToast();
        toast.info(`Caso queira algum adicional, porfavor adicionar as observações o adicional e o lanche que gostaria`, {
          timeout: 5000
        });
        
        let lanchesPedidos = JSON.parse(localStorage.getItem('pedido'));
        if(lanchesPedidos.lanche) {
          this.quatidadeLancheCarrinho = (lanchesPedidos.lanche.length > 0) ? true : false;
        }
        this.listarLanche();
      }
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
    background: #333 !important;
  }

  .card {
    min-height: 495px;
  }

  @media screen and (max-width: 480px) {
    .card {
      width: 75%;
    }

    .centralizar-cards {
      display: flex;
      justify-content: center;
    }
  }
</style>