<template>
    <HeaderPedido />
    <div class="mt-3" id="pedido_lanche">
      <!-- <div class="row d-flex justify-content-around">
        <div class="col-md-4">
          <label for="lanche" class="form-label">Lanche</label>
          <select
            id="lanche"
            class="form-select"
            v-model="tipoLanche"
            @change="alterarPrecoLanche($event)"
          >
            <option value="" disabled>-- Selecione</option>
            <option v-for="lanche in dadosLanches" :key="lanche.id">{{ lanche.nome }}</option> 
          </select>
          <div class="form-group mt-3">
            <label for="preco_lanche">Preço</label>
            <input
              type="text"
              class="form-control mt-1"
              id="preco_lanche"
              name="preco_lanche"
              readonly
              v-model="dadosPedido.preco_lanche"
            />
          </div>
          <div class="form-group mt-3">
            <label for="observacoes">Observações</label>
            <textarea
              id="observacoes"
              class="form-control mt-1"
              name=""
              rows="2"
              v-model="dadosPedido.observacoes"
              placeholder="Tem algo a acrescentar?"
            ></textarea>
          </div>
        </div>

        <div class="col-12 mt-3 text-center" id="botao_etapa_2">
          <button type="submit" @click="etapa_2" class="btn btn-warning text-dark fw-bold">
            Próxima Etapa
          </button>
        </div>
      </div> -->
      <div class="row">
        <div class="col-md-3 pt-3" v-for="lanche in dadosLanches" :key="lanche.id">
          <div class="card">
            <div class="card-header text-center fw-bold">
              {{lanche.nome}}
            </div>
            <div class="card-body">
              <!-- <img src="img/sem_imagem.png" alt=""> -->
              <!-- <img src="img/burger.jpg" alt=""> -->
              <img :src="'http://127.0.0.1:8000/storage/' + lanche.path">
            </div>
            <div class="card-footer">
              <span class="fw-bold">Ingredientes: </span>{{lanche.ingredientes}}
            </div>
            <div class="card-footer">
              <div class="row text-center">
                <div class="col-md-6">
                  <button class="btn btn-warning text-dark fw-bold w-100">
                    <i class="fa-solid fa-circle-plus"></i> Add
                  </button>
                </div>
                <div class="col-md-6">
                  <button class="btn btn-warning text-dark fw-bold w-100">
                    <i class="fa-solid fa-circle-minus"></i> Rem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3 d-flex justify-content-center align-items-center">
        <div class="col-md-4 text-center">
          <button type="submit" @click="etapa_2" class="btn btn-warning text-dark fw-bold w-75">
            <i class="fa-solid fa-wine-bottle"></i> Adicionar Bebida
          </button>
          <button type="submit" @click="etapa_2" class="btn btn-warning text-dark fw-bold w-75">
            <i class="fa-solid fa-money-bill-wave"></i> Forma de pagamento
          </button>
        </div>
      </div>
    </div>
    <Footer />
</template>

<script>
  import HeaderPedido from '../conteudo/HeaderPedido.vue';
  import Footer from '../conteudo/Footer.vue';

  export default {
      name: "DadosLanche",
      components: { HeaderPedido, Footer },
      data() {
        return {
            dadosPedido: {
              lanche: '',
              preco_lanche: "",
              observacoes: "",
            },
            dadosLanches: []
        };
      },
      methods: {
        // carregar lista de usuarios
        async listarLanche() {
            // cria um array com os dados do pedido 
            const req = await fetch("http://127.0.0.1:8000/api/lanches");
            // const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches");
            const data = await req.json();
            this.dadosLanches = data;
            console.log(this.dadosLanches)
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
      },
      mounted() {
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
</style>