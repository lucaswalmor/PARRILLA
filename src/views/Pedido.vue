<template>

  <div class="container-fluid body">
    <div class="col-12 row d-flex justify-content-center">
      <img src="/img/logo.jpg" alt="logo" class="logo" />
    </div>
    <hr />
    <form class="g-3" action="#" method="post" @submit.prevent>
      <!-- DADOS DO USUÁRIO -->
      <div id="dadosPedido" class="row mt-4" v-show="divDataUser">
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
        <div class="col-md-4">
          <label for="telefone" class="form-label">Telefone</label>
          <input
            type="text"
            v-maska="'(##) #####-####'"
            v-model="dadosPedido.telefone"
            name="telefone"
            id="telefone"
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
        <div class="col-md-2">
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
        <div class="col-md-6">
          <label for="rua" class="form-label">Rua</label>
          <input
            type="text"
            v-model="dadosPedido.endereco.logradouro"
            name="rua"
            id="rua"
            class="form-control"
            readonly
          />
        </div>
        <div class="col-md-4">
          <label for="bairro" class="form-label">Bairro</label>
          <input
            type="text"
            name="bairro"
            v-model="dadosPedido.endereco.bairro"
            id="bairro"
            class="form-control"
            readonly
          />
        </div>
        <div class="col-md-2">
          <label for="taxa_entrega" class="form-label">Taxa de Entrega</label>
          <input
            type="text"
            v-model="dadosPedido.taxa_entrega"
            name="taxa_entrega"
            id="taxa_entrega"
            class="form-control"
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
            min=1
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
        <div class="col-md-2">
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
        <div class="col-12 mt-3 d-flex justify-content-center" id="proximo">
          <button type="submit" @click="etapa_1" class="btn etapa_1">
            Próxima Etapa
          </button>
        </div>
      </div>

      <!-- PEDIDO DE LANCHE -->
      <div class="row mt-3" id="pedido_lanche" v-show="divLanches">
        <div class="row d-flex justify-content-around">
          <div class="col-md-4">
            <label for="lanche" class="form-label">Lanche</label>
            <select
              id="lanche"
              class="form-select"
              v-model="tipoLanche"
              @change="alterarPrecoLanche($event)"
            >
              <option selected>Selecione um Lanche</option>
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
                rows="3"
                v-model="dadosPedido.observacoes"
                placeholder="Tem algo a acrescentar?"
              ></textarea>
            </div>
          </div>

          <!-- INGREDIENTES LANCHES -->
          <div class="col-md-4 mt-4">
            <div
              class="berry flex-column"
              v-if="tipoLanche == 'PARRILLA BERRY'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão brioche</li>
                  <li>Hambúrguer de cupim</li>
                  <li>Queijo cheddar cremoso</li>
                  <li>Cebola roxa</li>
                  <li>Bacon</li>
                  <li>Geleia de pimenta</li>
                  <li>Doritos</li>
                </ul>
              </div>
            </div>
            <div
              class="berry_combo flex-column"
              v-if="tipoLanche == 'PARRILLA BERRY COMBO'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão brioche</li>
                  <li>Hambúrguer de cupim</li>
                  <li>Queijo cheddar cremoso</li>
                  <li>Cebola roxa</li>
                  <li>Bacon</li>
                  <li>Geleia de pimenta</li>
                  <li>Doritos</li>
                </ul>
                <hr />
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
            <div
              class="candy flex-column"
              v-if="tipoLanche == 'PARRILLA CANDY'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão brioche</li>
                  <li>Doce de leite</li>
                </ul>
              </div>
            </div>
            <div
              class="parrilla_grilled_herbs flex-column"
              v-if="tipoLanche == 'PARRILLA GRILLED HERBS'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Francês</li>
                  <li>Hambúrguer de Fraldinha</li>
                  <li>Queijo Prato</li>
                  <li>Cebola Roxa</li>
                  <li>Bacon</li>
                  <li>Alface</li>
                  <li>Molho de maionese com ervas</li>
                </ul>
              </div>
            </div>
            <div
              class="parrilla_grilled_herbs_combo flex-column"
              v-if="tipoLanche == 'PARRILLA GRILLED HERBS COMBO'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Francês</li>
                  <li>Hambúrguer de Fraldinha</li>
                  <li>Queijo Prato</li>
                  <li>Cebola Roxa</li>
                  <li>Bacon</li>
                  <li>Alface</li>
                  <li>Molho de maionese com ervas</li>
                </ul>
                <hr />
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
            <div
              class="burguer flex-column"
              v-if="tipoLanche == 'PARRILLA BURGER'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão de Francês</li>
                  <li>Hambúrguer de Angus</li>
                  <li>Queijo cheddar</li>
                  <li>Bacon</li>
                </ul>
              </div>
            </div>
            <div
              class="burguer_combo flex-column"
              v-if="tipoLanche == 'PARRILLA BURGER COMBO'"
            >
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão de Francês</li>
                  <li>Hambúrguer de Angus</li>
                  <li>Queijo cheddar</li>
                  <li>Bacon</li>
                </ul>
                <hr />
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
            <div class="catupiry_angus flex-column" v-if="tipoLanche == 'PARRILLA CATUPIRY ANGUS'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Australiano</li>
                  <li>Hambúrguer de Angus</li>
                  <li>Alface</li>
                  <li>Tomate</li>
                  <li>Catupiry Empanado</li>
                  <li>Cheddar fatia</li>
                </ul>
              </div>
            </div>
            <div class="catupiry_angus_combo flex-column" v-if="tipoLanche == 'PARRILLA CATUPIRY ANGUS COMBO'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Australiano</li>
                  <li>Hambúrguer de Angus</li>
                  <li>Alface</li>
                  <li>Tomate</li>
                  <li>Catupiry Empanado</li>
                  <li>Cheddar fatia</li>
                </ul>
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
            <div class="classic flex-column" v-if="tipoLanche == 'PARRILLA CLASSIC'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão francês</li>
                  <li>Hambúrguer de Cupim</li>
                  <li>Queijo prato</li>
                  <li>Alface</li>
                  <li>Tomate</li>
                  <li>Catupiry</li>
                </ul>
              </div>
            </div>
            <div class="classic_combo flex-column" v-if="tipoLanche == 'PARRILLA CLASSIC COMBO'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão francês</li>
                  <li>Hambúrguer de Cupim</li>
                  <li>Queijo prato</li>
                  <li>Alface</li>
                  <li>Tomate</li>
                  <li>Catupiry</li>
                </ul>
                <hr />
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
            <div class="special flex-column" v-if="tipoLanche == 'PARRILLA SPECIAL DUPLO'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Brioche</li>
                  <li>2 Hambúrgueres de Angus</li>
                  <li>Cheddar</li>
                  <li>Bacon</li>
                </ul>
              </div>
            </div>
            <div class="special_combo flex-column" v-if="tipoLanche == 'PARRILLA SPECIAL DUPLO COMBO'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Brioche</li>
                  <li>2 Hambúrgueres de Angus</li>
                  <li>Cheddar</li>
                  <li>Bacon</li>
                </ul>
                <hr />
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
            <div class="chicken flex-column" v-if="tipoLanche == 'PARRILLA CHICKEN'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Francês</li>
                  <li>Hambúrguer de Frango</li>
                  <li>Maionese de Limão Siciliano</li>
                  <li>Mix de salada de Ruúcula</li>
                  <li>Tomate</li>
                </ul>
              </div>
            </div>
            <div class="chicken_combo flex-column" v-if="tipoLanche == 'PARRILLA CHICKEN COMBO'">
              <div>
                <h4>Ingredientes:</h4>
              </div>
              <div>
                <ul>
                  <li>Pão Francês</li>
                  <li>Hambúrguer de Frango</li>
                  <li>Maionese de Limão Siciliano</li>
                  <li>Mix de salada de Ruúcula</li>
                  <li>Tomate</li>
                </ul>
                <hr />
                <ul>
                  <li>1 Coca cola lata</li>
                  <li>1 Porção de batata frita</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="col-12 mt-3 text-center" id="botao_etapa_2">
            <button type="submit" @click="etapa_2" class="btn etapa_2">
              Próxima Etapa
            </button>
          </div>
        </div>
      </div>

      <!-- PEDIDO DE BEBIDA -->
      <div class="row mt-3" id="pedido_bebida" v-show="divBebida">
        <div class="row d-flex justify-content-around">
          <div class="col-md-4">
            <label for="bebida" class="form-label">Bebidas</label>
            <select id="bebida" class="form-select" @change="alterarPrecoBebida($event)">
              <option selected>Selecione uma bebida</option>
              <option v-for="bebida in dadosBebidas" :key="bebida.id">{{bebida.nome}}</option> 
            </select>
            <div class="form-group mt-3">
              <label for="preco_bebida">Preço</label>
              <input
                type="text"
                class="form-control mt-1"
                id="preco_bebida"
                readonly
                v-model="dadosPedido.preco_bebida"
              />
            </div>
          </div>
          <div class="col-12 mt-3 text-center" id="botao">
            <button type="submit" @click="etapa_3($event)" class="btn etapa_3">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>

      <!-- FORMAS DE PAGAMENTO -->
      <div class="row mt-3" id="pagamento" v-show="divPagamento">
        <div class="row d-flex justify-content-around">
          <div class="col-md-4">
            <label for="forma_pagamento" class="form-label"
              >Forma de pagamento</label
            >
            <select id="forma_pagamento" class="form-select" @change="formaPagamento($event)">
              <option disabled selected>Selecione...</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Pix">Pix</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
            <p>
              Caso sua escolha seja pix, enviar o comprovante assim que efetuar
              o pedido
            </p>
          </div>
          <div
            class="col-md-4 justify-content-center chave_pix text-center"
            v-if="dadosPedido.forma_pagamento === 'Pix'"
          >
            <label for="chave-pix" class="form-label">Chave pix:</label>
            <p>c4c0cd2f-e0b9-4697-af80-0600e14e062e</p>
          </div>
          <div
            class="col-md-4 chave_pix justify-content-center"
            id="qrcode"
            v-if="dadosPedido.forma_pagamento === 'Pix'"
          >
            <img src="/img/qrcode.png" style="width: 250px" />
          </div>

          <div class="col-md-2 dinheiro"
            v-if="dadosPedido.forma_pagamento === 'Dinheiro'">
            <label for="troco" class="form-label">Troco para quanto:</label>
            <input
              type="number"
              id="troco"
              class="form-control"
              placeholder="R$"
              name="troco"
              v-model="dadosPedido.troco"
            />
          </div>

          <div class="col-12 mt-3 text-center" id="botao">
            <button type="submit" @click="etapa_4" class="btn confirmar_pedido">
              Confirmar Pedido
            </button>
          </div>
        </div>
      </div>

      <div class="row mt-3" id="pedido_montado" v-show="divFinPedido">
        <div class="row col-12 text-center">
          <h4>Agradecemos pela preferência, agora só resta enviar o pedido &#x1F60A;</h4>
        </div> 
        <div class="row col-12 text-center">
          <div>
            <strong>Nome:</strong> {{ dadosPedido.nome }}
          </div>
          <div>
            <strong>CPF:</strong> {{ dadosPedido.cpf }}
          </div>
          <div>
            <strong>Rua:</strong> {{ dadosPedido.rua }}
          </div>
          <div>
            <strong>Bairro:</strong> {{ dadosPedido.bairro }}
          </div>
          <div v-if="dadosPedido.apartamento != ''">
            <strong>Apartamento:</strong> {{ dadosPedido.apartamento }}
          </div>
          <div v-if="dadosPedido.bloco != ''">
            <strong>Bloco:</strong> {{ dadosPedido.bloco }}
          </div>
          <div>
            <strong>Telefone:</strong> {{ dadosPedido.telefone }}
          </div>
          <div>
            <strong>Lanche:</strong> {{ dadosPedido.lanche }}
          </div>
          <div v-if="dadosPedido.observacoes != ''">
            <strong>Observações:</strong> {{ dadosPedido.observacoes }}
          </div>
          <div v-if="dadosPedido.bebida != ''">
            <strong>Bebida:</strong> {{ dadosPedido.bebida }}
          </div>
          <div>
            <strong>Valor Total: R$</strong> {{ dadosPedido.valor_total }}
          </div>
          <div v-if="dadosPedido.troco != ''">
            <strong> Troco: </strong> R$ {{ dadosPedido.troco }}
          </div>
          <div>
            <strong>Forma de pagamento:</strong> {{ dadosPedido.forma_pagamento }}
          </div>
        </div>
      </div>
      
      <div
        class="col-12 mt-3 text-center"
        v-show="divFinPedido"
        id="link_wpp"
      >
        <a :href="href" @click="salvarPedidoDB" class="enviar_pedido mb-3"
          >Enviar Pedido</a
        >
      </div>

      <hr />
    </form>
    <div class="row col-12 pb-4">
        <div class="col-12 text-center">
            <div class="row">
                <div>
                    <p>
                        Desenvolvido por Lucas Steinbach
                    </p>
                </div>
                <div class="col-12 row">
                    <div class="col-6 d-flex justify-content-end rodape" target="_blank">
                        <a href="https://api.whatsapp.com/send?phone=5534992021394&text=Ol%C3%A1%20Lucas%2C%20gostaria%20de%20fazer%20um%20or%C3%A7amento%20de%20site.">
                            <i class="fa-brands fa-whatsapp m-2"></i>
                        </a>
                    </div>
                    <div class="col-6 d-flex rodape">
                        <a href="https://www.instagram.com/lucassteinbach/" target="_blank">
                            <i class="fa-brands fa-instagram m-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Pedido",
  data() {
    return {
      divDataUser: true,
      divTipoResidencia: false,
      divLanches: false,
      divBebida: false,
      divPagamento: false,
      divFinPedido: false,
      divHTMLpedido: false,
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
        lanche: '',
        preco_lanche: "",
        bebida: "",
        preco_bebida: "",
        observacoes: "",
        forma_pagamento: "",
        troco: "",
        valor_total: ""
      },
      cep: "",
      errors: [],
      hasError: false,
      tipoLanche: "",
      src: '',
      href: '',
      pedido_wpp: '',
      dadosLanches: [],
      dadosBebidas: [],
      preco: '',
      TipoBebida: '',
      bairros_banco: []
    };
  },
  methods: {
    etapa_1(e) {
      this.errors = [];
      
      if (this.cep.length < 8) {
        alert('Digite um CEP válido')
      } else if (this.dadosPedido.numero < 0) {
        alert('Digite um NÚMERO válido')
      }

      if ( !this.dadosPedido.nome ||
      !this.dadosPedido.telefone ||
      !this.cep || 
      !this.dadosPedido.numero ||
      !this.dadosPedido.residencia ) {
        this.hasError = !this.hasError;
        e.preventDefault();
      } else {
        this.divLanches = !this.divLanches;
        this.divDataUser = !this.divDataUser;
        if(this.dadosPedido.residencia === 'Casa') {
          this.dadosPedido.apartamento = ''
          this.dadosPedido.bloco = ''
        }
        if (this.dadosPedido.nome) return true;
      }

    },
    etapa_2() {
      if(this.dadosPedido.lanche === '') {
        alert('Porfavor selecione seu lanche')
      } else {
        this.divBebida = !this.divBebida;
        this.divLanches = !this.divLanches;
      }
    },
    etapa_3() {
        // formata o texto dos preços e transforma em float para somar 
        // var preco_bebida = parseFloat(this.dadosPedido.preco_bebida.replace('R$ ', ''));
        var preco_bebida = parseFloat(this.dadosPedido.preco_bebida.replace('R$ ', '').replace(',', '.'));
        var preco_lanche = parseFloat(this.dadosPedido.preco_lanche.replace('R$ ', ''));
        var taxa_entrega = parseFloat(this.dadosPedido.taxa_entrega.replace('R$ ', ''));
        var soma = preco_bebida + preco_lanche + taxa_entrega;
        this.dadosPedido.valor_total = soma;
        this.divBebida = !this.divBebida;
        this.divPagamento = !this.divPagamento;
    },
    etapa_4() {
      // se tiver troco, ap e bloco no pedido, entrara neste bloco 
      if (this.dadosPedido.troco != '' && this.dadosPedido.apartamento != '' && this.dadosPedido.bloco != '') {
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
          '%0A' +
          '%0A*--------------------------------------------------------------------------------* ' +
          '%0A*Nome:* ' + this.dadosPedido.nome +
          '%0A' +
          '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
          '%0A' +
          '%0A*Bairro:* ' + this.dadosPedido.bairro +
          '%0A' +
          '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
          '%0A' +
          '%0A*Bloco:* ' + this.dadosPedido.bloco +
          '%0A' +
          '%0A*Telefone:* ' + this.dadosPedido.telefone +
          '%0A' +
          '%0A*Lanche:* ' + this.dadosPedido.lanche +
          '%0A' +
          '%0A*Bebida:* ' + this.dadosPedido.bebida +
          '%0A' +
          '%0A*Observações:* ' + this.dadosPedido.observacoes +
          '%0A' +
          '%0A*Preço Total:* R$ ' + this.dadosPedido.valor_total +
          '%0A' +
          '%0A*Troco para:* R$ ' + this.dadosPedido.troco +
          '%0A' +
          '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
          '%0A*--------------------------------------------------------------------------------* ';
      } else if (this.dadosPedido.troco === '' && this.dadosPedido.apartamento != '' && this.dadosPedido.bloco != '') {
        // se tiver ap e bloco no pedido, entrara neste bloco
        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
          '%0A' +
          '%0A*--------------------------------------------------------------------------------* ' +
          '%0A*Nome:* ' + this.dadosPedido.nome +
          '%0A' +
          '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
          '%0A' +
          '%0A*Bairro:* ' + this.dadosPedido.bairro +
          '%0A' +
          '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
          '%0A' +
          '%0A*Bloco:* ' + this.dadosPedido.bloco +
          '%0A' +
          '%0A*Telefone:* ' + this.dadosPedido.telefone +'%0A' +
          '%0A*Lanche:* ' + this.dadosPedido.lanche +'%0A' +
          '%0A*Bebida:* ' + this.dadosPedido.bebida +'%0A' +
          '%0A*Observações:* ' + this.dadosPedido.observacoes +'%0A' +
          '%0A*Preço Total:* R$ ' + this.dadosPedido.valor_total +'%0A' +
          '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
          '%0A*--------------------------------------------------------------------------------* ';
      } else if (this.dadosPedido.troco != '' && this.dadosPedido.apartamento != '') {
        // se tiver ap e troco no pedido, entrara neste bloco 

        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A*Nome:* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +'%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +'%0A' +
            '%0A*Apartamento:* ' + this.dadosPedido.apartamento +'%0A' +
            '%0A*Telefone:* ' + this.dadosPedido.telefone +'%0A' +
            '%0A*Lanche:* ' + this.dadosPedido.lanche +'%0A' +
            '%0A*Bebida:* ' + this.dadosPedido.bebida +'%0A' +
            '%0A*Observações:* ' + this.dadosPedido.observacoes +'%0A' +
            '%0A*Preço Total:* R$ ' + this.dadosPedido.valor_total +'%0A' +
            '%0A*Troco para:* R$ ' + this.dadosPedido.troco +'%0A' +
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
          '%0A*--------------------------------------------------------------------------------* ';
      } else {
        // se não tiver troco, ap e bloco no pedido, entrara neste bloco 
        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*%0A*Nome:*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A*Nome:* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +'%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +'%0A' +
            '%0A*Telefone:* ' + this.dadosPedido.telefone +'%0A' +
            '%0A*Lanche:* ' + this.dadosPedido.lanche +'%0A' +
            '%0A*Bebida:* ' + this.dadosPedido.bebida +'%0A' +
            '%0A*Observações:* ' + this.dadosPedido.observacoes +'%0A' +
            '%0A*Preço Total:* R$ ' + this.dadosPedido.valor_total +'%0A' +
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
          '%0A*--------------------------------------------------------------------------------* ';
      }

      var telefone_replace = this.dadosPedido.telefone.replace("(", "")
      .replace(")", "").replace(" ", "")
      .replace(" ", "").replace("-", "");

      // ao finalizar o pedido será gerado o link com o pedido do whatsapp para redirecionar o cliente 
      this.href = 'https://api.whatsapp.com/send?phone=55' + telefone_replace + '&text=' + this.pedido_wpp;

      this.divFinPedido = !this.divFinPedido;
      this.divPagamento = !this.divPagamento;
    },
    formaPagamento(event) {
      const option = event.target.value;
      if(option === 'Cartão de crédito') {
        this.dadosPedido.forma_pagamento = option
      } else if(option === 'Cartão de débito') {
        this.dadosPedido.forma_pagamento = option
      } else if(option === 'Pix') {
        this.dadosPedido.forma_pagamento = option
      } else if(option === 'Dinheiro') {
        this.dadosPedido.forma_pagamento = option
      }
    },
    async salvarPedidoDB() {
        // cria um array com os dados do pedido 
        const data = {
            nome_cliente: this.dadosPedido.nome,
            cpf: this.dadosPedido.cpf,
            rua: this.dadosPedido.rua,
            bairro: this.dadosPedido.bairro,
            apartamento: this.dadosPedido.apartamento,
            bloco: this.dadosPedido.bloco,
            telefone: this.dadosPedido.telefone,
            lanche: this.dadosPedido.lanche,
            observacoes: this.dadosPedido.observacoes,
            valor_total: this.dadosPedido.valor_total,
            troco: this.dadosPedido.troco,
            forma_pagamento: this.dadosPedido.forma_pagamento,
        };

        // transforma o array de dados do pedido em texto 
        const dataJson = JSON.stringify(data);

        // const req = await fetch("http://127.0.0.1:8000/api/pedidos", {
        const req = await fetch("https://pedidoparrilha.herokuapp.com/api/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson
        });
    },
    // carregar lista de usuarios
    async listarLanche() {
        // cria um array com os dados do pedido 
        // const req = await fetch("http://127.0.0.1:8000/api/lanches");
        const req = await fetch("https://pedidoparrilha.herokuapp.com/api/lanches");
        const data = await req.json();
        this.dadosLanches = data;
    },
    // carregar lista de usuarios
    async listarBebidas() {
        // cria um array com os dados do pedido 
        const req = await fetch("https://pedidoparrilha.herokuapp.com/api/bebidas");
        const data = await req.json();
        this.dadosBebidas = data;
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
    alterarPrecoBebida(event) {
      const option = event.target.value;
      this.dadosPedido.bebida = option;
      var precoBebida = this.dadosBebidas;

      // const option = event.target.value;
      // var precoLanche = this.dadosLanches;
      // percorre o array de lanches que vem do banco de dados e seta o valor do preco 
      for (var item in precoBebida){
        var nome = precoBebida[item].nome;
        var preco = precoBebida[item].preco;
        if(option == nome) {
          this.dadosPedido.preco_bebida = preco
        }
      }

      // if(option == 'Coca Cola') {
      //   this.src = '/img/bebidas/coca_lata.png'
      //   this.dadosPedido.bebida = option
      //   this.dadosPedido.preco_bebida = 'R$ 4.00'
      // } else if (option == 'Pepsi') {
      //   this.src = '/img/bebidas/pepsi.png'
      //   this.dadosPedido.bebida = option
      //   this.dadosPedido.preco_bebida = 'R$ 3.00'
      // } else if (option == 'Brahma') {
      //   this.src = '/img/bebidas/brahma.jpg'
      //   this.dadosPedido.bebida = option
      //   this.dadosPedido.preco_bebida = 'R$ 4.00'
      // } else if (option == 'Amstel') {
      //   this.src = '/img/bebidas/amstel.jpg'
      //   this.dadosPedido.bebida = option
      //   this.dadosPedido.preco_bebida = 'R$ 5.00'
      // } else if (option == 'Agua') {
      //   this.src = '/img/bebidas/agua.jpg'
      //   this.dadosPedido.bebida = option
      //   this.dadosPedido.preco_bebida = 'R$ 2.00'
      // } else if(option == 'Selecione uma bebida') {
      //   this.src = '/img/sem_imagem.png'
      //   this.dadosPedido.bebida = ''
      //   this.dadosPedido.preco_bebida = ''
      // }
    },
    async listarBairros() {
        // const req = await fetch("http://127.0.0.1:8000/api/taxa_entrega");
        const req = await fetch("https://pedidoparrilha.herokuapp.com/api/taxa_entrega");
        const data = await req.json();
        this.bairros_banco = data;
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
            this.dadosPedido.rua = r.logradouro
            this.dadosPedido.bairro = r.bairro
            // bairros de uberaba taxa de entrega
            var bairros = this.bairros_banco
            for (var item in bairros){
              var bairro = bairros[item].bairro;
              var preco = bairros[item].preco;
              if(r.bairro == bairro) {
                this.dadosPedido.taxa_entrega = preco
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
    this.listarBebidas();
    this.listarBairros();
    this.listarLanche();
  }
}
</script>

<style scoped>

.body {
  width: 100%;
  margin: 0;
  background-color: #212529 !important;
  color: #f9a529;
}

.logo {
  width: 250px;
  border-radius: 50%;
  margin: 10px;
}

.img-lanche {
  width: 270px;
  min-height: 270px;
  margin-top: 30px;
}

.etapa_1,
.etapa_2,
.etapa_3 {
  background-color: #f9a529;
  color: #212529;
  font-weight: bold;
}

.confirmar_pedido {
  background-color: #f9a529;
  color: #212529;
  font-weight: bold;
}

.enviar_pedido {
  background-color: #f9a529;
  color: #212529;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  width: 200px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

hr {
  height: 3px !important;
}

#link_wpp {
  justify-content: center;
}

.enviar_pedido:hover {
  color: #212529;
}

#pedido {
  text-align: center;
}

.rodape a {
  color: #f9a529;
  border: 1px solid #f9a529;
  border-radius: 50%;
  transition: all 0.5s;
}

.rodape a:hover {
  background-color: #f9a529;
  color: #212529;
  border: 1px solid #ffc671;
  border-radius: 50%;
}

.alerta-validacao {
  display: block;
}

.container-fluid.body {
  height: 100vh;
}

@media screen and (max-width: 425px) {
  #pedido_lanche {
    height: 550px;
  }

  #pedido_bebida {
    height: 480px;
  }

  .container-fluid.body {
    height: auto;
  }

  #pagamento {
    min-height: 480px;
  }

  #pedido_montado {
    min-height: 440px;
  }
}
</style>
