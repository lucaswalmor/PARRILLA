<template>
<div class="container-fluid bg-dark">
  <HeaderPedido />
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="">Selecione o tipo de pedido</label>
        <select name="" id="" class="form-select" v-model="tipoPedido" @change="tipo($event)">
          <option>Entregar</option>
          <option>Retirar</option>
        </select>
      </div>
  </div>
  <!-- entregar -->
  <div id="dadosPedido" v-if="tipoPedido == 'Entregar'">
    <!-- NOME -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="nome" class="form-label">Nome</label> <span style="color: red;">*</span>
        <input
          type="text"
          v-model="dadosPedido.nome"
          name="nome"
          id="nome"
          class="form-control"
        />
        <div
          class="alert alert-warning fade show mt-2"
          v-show="hasError"
          v-if="!dadosPedido.nome"
          role="alert"
          id="validacao-nome"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- TELEFONE -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="telefone" class="form-label">Telefone</label> <span style="color: red;">*</span>
        <input
          type="text"
          v-maska="'(##) #####-####'"
          v-model="dadosPedido.telefone"
          name="telefone"
          id="telefone"
          minlength="15"
          maxlength="15"
          class="form-control telefone"
        />
        <div
          class="alert alert-warning fade show mt-2"
          role="alert"
          id="validacao-telefone"
          v-show="hasError"
          v-if="!dadosPedido.telefone"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- CEP E TAXA DE ENTREGA-->
    <div class="row d-flex justify-content-center">
      <div class="col-md-3">
        <label for="cep" class="form-label">CEP</label> <span style="color: red;">*</span>
        <input
          type="text"
          placeholder="Ex: 00000000"
          v-model="cep"
          name="cep"
          id="cep"
          class="form-control"
          maxlength="8"
        />
        <div
          class="alert alert-warning fade show mt-2 alerta-validacao"
          role="alert"
          id="validacao-cep"
          v-show="hasError"
          v-if="!cep"
        >
          preencha este campo!
        </div>
      </div>
      <div class="col-md-1">
        <label for="taxa_entrega" class="form-label">Frete</label>
        <input
          style="background-color: transparent; color: #fff; outline: none"
          type="text"
          v-model="dadosPedido.taxa_entrega"
          name="taxa_entrega"
          id="taxa_entrega"
          class="form-control"
          placeholder="Autopreenchido"
          readonly
        />
      </div>
    </div>

    <!-- RUA E NUMERO-->
    <div class="row d-flex justify-content-center">
      <div class="col-md-2">
        <label for="rua" class="form-label">Rua</label>
        <input
          type="text"
          v-model="dadosPedido.endereco.logradouro"
          name="rua"
          id="rua"
          class="form-control"
          placeholder="Autopreenchido"
          readonly
        />
      </div>
      <div class="col-md-2">
        <label for="numero" class="form-label">Nº</label> <span style="color: red;">*</span>
        <input
          type="number"
          v-model="dadosPedido.numero"
          name="numero"
          id="numero"
          min="1"
          class="form-control"
        />
        <div
          class="alert alert-warning fade show mt-2 alerta-validacao"
          role="alert"
          id="validacao-numero"
          v-show="hasError"
          v-if="!dadosPedido.numero"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- BAIRRO -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="bairro" class="form-label">Bairro</label>
        <input
          type="text"
          name="bairro"
          placeholder="Autopreenchido"
          v-model="dadosPedido.endereco.bairro"
          id="bairro"
          class="form-control"
          readonly
        />
      </div>
    </div>

    <!-- PONTO DE REFERÊNCIA -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="pontoReferencia" class="form-label">Referência</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          class="form-control"
          v-model="dadosPedido.pontoReferencia"
        ></textarea>
      </div>
    </div>

    <!-- RESIDÊNCIA -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="residencia" class="form-label">Residência</label> <span style="color: red;">*</span>
        <select
          id="residencia"
          v-model="dadosPedido.residencia"
          class="form-select"
        >
          <option disabled selected>Selecione...</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
        </select>
        <div
          class="alert alert-warning fade show mt-2 alerta-validacao"
          role="alert"
          id="validacao-numero"
          v-show="hasError"
          v-if="!dadosPedido.residencia"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- APARTAMENTO E BLOCO-->
    <div class="row d-flex justify-content-center">
      <div
        class="col-md-2 res_ap"
        v-if="dadosPedido.residencia === 'Apartamento'"
      >
        <label for="apartamento" class="form-label">Apartamento</label>
        <input
          type="number"
          v-model="dadosPedido.apartamento"
          name="apartamento"
          id="apartamento"
          class="form-control"
          min="0"
        />
      </div>
      <div
        class="col-md-2 res_ap"
        v-if="dadosPedido.residencia === 'Apartamento'"
      >
        <label for="bloco" class="form-label">Bloco</label>
        <input
          type="text"
          v-model="dadosPedido.bloco"
          name="bloco"
          id="bloco"
          class="form-control"
          style="text-transform: capitalize"
        />
      </div>
    </div>
    
    <div class="col-12 mt-4 d-flex justify-content-center" id="proximo">
      <button
        type="submit"
        @click="salvarDadosUsuario"
        class="btn btn-warning text-dark fw-bold"
      >
        Próxima Etapa
      </button>
    </div>
    <Footer />

  </div>

  <!-- retirar -->
  <div id="dadosPedido" class="vh-100" v-if="tipoPedido == 'Retirar'">
    <!-- NOME -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="nome" class="form-label">Nome</label> <span style="color: red;">*</span>
        <input
          type="text"
          v-model="dadosPedido.nome"
          name="nome"
          id="nome"
          class="form-control"
        />
        <div
          class="alert alert-warning fade show mt-2"
          v-show="hasError"
          v-if="!dadosPedido.nome"
          role="alert"
          id="validacao-nome"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- TELEFONE -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="telefone" class="form-label">Telefone</label> <span style="color: red;">*</span>
        <input
          type="text"
          v-maska="'(##) #####-####'"
          v-model="dadosPedido.telefone"
          name="telefone"
          id="telefone"
          minlength="15"
          maxlength="15"
          class="form-control telefone"
        />
        <div
          class="alert alert-warning fade show mt-2"
          role="alert"
          id="validacao-telefone"
          v-show="hasError"
          v-if="!dadosPedido.telefone"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- RUA E NUMERO-->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="" class="form-label">Endereço de retirada</label>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="rua" class="form-label">Rua</label>
        <input
          type="text"
          :value="'Rua Padre Jacinto Fagundes, Nº 114'"
          name="rua"
          id="rua"
          class="form-control"
          placeholder="Rua Padre Jacinto Fagundes, Nº 114"
          readonly
        />
      </div>
    </div>

    <!-- BAIRRO -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="bairro" class="form-label">Bairro</label>
        <input
          type="text"
          name="bairro"
          placeholder="Autopreenchido"
          :value="'São Benedito'"
          id="bairro"
          class="form-control"
          readonly
        />
      </div>
    </div>
    
    <div class="col-12 mt-4 d-flex justify-content-center" id="proximo">
      <button
        type="submit"
        @click="salvarDadosUsuario()"
        class="btn btn-warning text-dark fw-bold"
      >
        Próxima Etapa
      </button>
    </div>
    <Footer />

  </div>
</div>
</template>

<script>
import HeaderPedido from '../conteudo/HeaderPedido.vue';
import Footer from '../conteudo/Footer.vue';
import axios from 'axios';

export default {
    name: "DadosUsuario",
    components: { HeaderPedido, Footer },
    data() {
        return {
            dadosPedido: {
                nome: "",
                telefone: "",
                rua: "",
                bairro: "",
                taxa_entrega: "",
                residencia: "",
                apartamento: "",
                bloco: "",
                endereco: {},
                pontoReferencia: "",
                codigoPedido: "",
            },
            cep: "",
            errors: [],
            hasError: false,
            bairros_banco: [],
            itemsPedido: [],
            tipoPedido: 'Entregar',
        };
    },
    methods: {
        salvarLog() {
          let data = {
            nome_cliente: this.dadosPedido.nome,
            telefone: this.dadosPedido.telefone,
            enviou_pedido: 'Não'
          }

          this.axios({
            // url: 'http://127.0.0.1:8000/api/pedidos',
            url: "https://www.projetoadocao.com/api/logs", 
            data: data,
            method: 'POST'
          });
        },
        salvarDadosUsuario() {
            this.errors = [];
            let telefone = this.dadosPedido.telefone;

            if(this.tipoPedido === 'Entregar') {
              if (this.cep.length < 8) {
                  alert("Digite um CEP válido");
              }
              else if (this.dadosPedido.numero < 0) {
                  alert("Digite um NÚMERO válido");
              }

              // caso pedido seja para entregar
              if (telefone.length != 15 ||
                telefone == "(00) 00000-0000" ||
                telefone == "(11) 11111-1111" ||
                telefone == "(22) 22222-2222" ||
                telefone == "(33) 33333-3333" ||
                telefone == "(44) 44444-4444" ||
                telefone == "(55) 55555-5555" ||
                telefone == "(66) 66666-6666" ||
                telefone == "(77) 77777-7777" ||
                telefone == "(88) 88888-8888" ||
                telefone == "(99) 99999-9999") {
                alert(`O Telefone: ${telefone} é inválido`);
              }
              else if (!this.dadosPedido.nome ||
                !this.dadosPedido.telefone ||
                !this.cep ||
                !this.dadosPedido.numero ||
                !this.dadosPedido.residencia) {
                this.hasError = !this.hasError;
                e.preventDefault();
              }
              else {
                if (this.dadosPedido.residencia === "Casa") {
                    this.dadosPedido.apartamento = "";
                    this.dadosPedido.bloco = "";
                }
                const data = this.dadosPedido;
                const dataJson = JSON.stringify(data);
                localStorage.setItem('pedido', dataJson)
                localStorage.setItem('tipo_pedido', this.tipoPedido)
                this.salvarLog();
                this.$router.push('/dadosLanche');
              }
            }
            
            // caso pedido seja para retirar
            if(this.tipoPedido === 'Retirar') {
              if (telefone.length != 15 ||
                telefone == "(00) 00000-0000" ||
                telefone == "(11) 11111-1111" ||
                telefone == "(22) 22222-2222" ||
                telefone == "(33) 33333-3333" ||
                telefone == "(44) 44444-4444" ||
                telefone == "(55) 55555-5555" ||
                telefone == "(66) 66666-6666" ||
                telefone == "(77) 77777-7777" ||
                telefone == "(88) 88888-8888" ||
                telefone == "(99) 99999-9999") {
                alert(`O Telefone: ${telefone} é inválido`);
              }
              else if (!this.dadosPedido.nome || !this.dadosPedido.telefone) { this.hasError = !this.hasError;
                e.preventDefault();
              }
              else {
                if (this.dadosPedido.residencia === "Casa") {
                    this.dadosPedido.apartamento = "";
                    this.dadosPedido.bloco = "";
                }
                const data = this.dadosPedido;
                const dataJson = JSON.stringify(data);

                localStorage.setItem('pedido', dataJson)
                localStorage.setItem('tipo_pedido', this.tipoPedido)
                this.salvarLog();
                this.$router.push('/dadosLanche');
              }
            }
        },
        async listarBairros() {
            // const req = await fetch("http://127.0.0.1:8000/api/taxa_entrega");
            const req = await fetch("https://www.projetoadocao.com/api/taxa_entrega");
            const data = await req.json();
            this.bairros_banco = data;
        },
        codigoPedido() {
            const generateRandomString = () => {
                const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                let result1 = "";
                const charactersLength = characters.length;
                for (let i = 0; i < 7; i++) {
                    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result1;
            };
            this.dadosPedido.codigoPedido = generateRandomString();
        },
        tipo(e) {
          const tipo = e.target.value;
          this.tipoPedido = tipo
          this.selecionarTipoPedido = false
        }
    },
    watch: {
        // recebe o valor do cep e traz o endereço com api viacep
        cep(valor) {
            if (valor.length === 8) {
                fetch(`https://viacep.com.br/ws/${valor}/json`)
                    .then((r) => r.json())
                    .then((r) => {
                    this.dadosPedido.endereco = r;
                    this.dadosPedido.rua = r.logradouro;
                    this.dadosPedido.bairro = r.bairro;
                    // bairros de uberaba taxa de entrega
                    var bairros = this.bairros_banco;
                    for (var item in bairros) {
                        var bairro = bairros[item].bairro;
                        var preco = bairros[item].preco;
                        if (r.bairro == bairro) {
                            this.dadosPedido.taxa_entrega = preco;
                        }
                    }
                })
                    .catch((error) => {
                    console.log(error);
                });
            }
        },
    },
    mounted() {
        this.listarBairros();
        this.codigoPedido();
        localStorage.clear();
    },
};
</script>

<style scoped> 
.background {
  background: #333;
}
</style>