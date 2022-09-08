<template>
  <HeaderPedido />
  <div id="dadosPedido">
    <!-- NOME -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="nome" class="form-label">Nome</label>
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

    <!-- CPF -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="cpf" class="form-label">CPF</label>
        <input
          type="text"
          v-model="dadosPedido.cpf"
          name="cpf"
          id="cpf"
          class="form-control"
          placeholder="Ex: 00000000000"
          minlength="14"
          maxlength="14"
          v-maska="'###.###.###-##'"
        />
        <div
          class="alert alert-warning fade show mt-2"
          v-show="hasError"
          v-if="!dadosPedido.cpf"
          role="alert"
          id="validacao-cpf"
        >
          preencha este campo!
        </div>
      </div>
    </div>

    <!-- TELEFONE -->
    <div class="row d-flex justify-content-center">
      <div class="col-md-4">
        <label for="telefone" class="form-label">Telefone</label>
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
        <label for="cep" class="form-label">CEP</label>
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
          style="background-color: transparent; color: black; outline: none"
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
        <label for="numero" class="form-label">Nº</label>
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
        <label for="residencia" class="form-label">Residência</label>
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
</template>

<script>
import HeaderPedido from '../conteudo/HeaderPedido.vue';
import Footer from '../conteudo/Footer.vue';
export default {
    name: "DadosUsuario",
    components: { HeaderPedido, Footer },
    data() {
        return {
            dadosPedido: {
                nome: "",
                cpf: "",
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
            itemsPedido: []
        };
    },
    methods: {
        salvarDadosUsuario() {
            this.errors = [];
            if (this.cep.length < 8) {
                alert("Digite um CEP válido");
            }
            else if (this.dadosPedido.numero < 0) {
                alert("Digite um NÚMERO válido");
            }
            let cpf = this.dadosPedido.cpf;
            let telefone = this.dadosPedido.telefone;
            if (cpf.length != 14 ||
                cpf == "000.000.000-00" ||
                cpf == "111.111.111-11" ||
                cpf == "222.222.222-22" ||
                cpf == "333.333.333-33" ||
                cpf == "444.444.444-44" ||
                cpf == "555.555.555-55" ||
                cpf == "666.666.666-66" ||
                cpf == "777.777.777-77" ||
                cpf == "888.888.888-88" ||
                cpf == "999.999.999-99") {
                alert(`O CPF: ${cpf} é inválido`);
            }
            else if (telefone.length != 15 ||
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
                !this.dadosPedido.cpf ||
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
                this.$router.push('/dadosLanche');
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
                let result1 = " ";
                const charactersLength = characters.length;
                for (let i = 0; i < 7; i++) {
                    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result1;
            };
            this.dadosPedido.codigoPedido = generateRandomString();
        },
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
    },
};
</script>

<style scoped> 

</style>