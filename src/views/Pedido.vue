<template>

  <div class="container-fluid body">
    <div class="col-12 row d-flex justify-content-center">
      <img src="/img/logo.jpg" alt="logo" class="logo" />
    </div>

    <hr />
    
    <form class="g-3" action="#" method="post" @submit.prevent>
      <dados-usuario></dados-usuario>
      <hr />
    </form>
    
    <!-- FOOTER -->
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
import DadosUsuario from '@/components/pedidos/DadosUsuario.vue'

export default {
  name: "Pedido",
  components: {
    DadosUsuario
  },
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
        lanche: '',
        preco_lanche: "",
        bebida: "",
        preco_bebida: "",
        observacoes: "",
        forma_pagamento: "",
        tem_troco: "Não",
        troco: "",
        valor_total: "",
        pontoReferencia: ""
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
    // recebe os dados do usuario e vai para os lanches
    etapa_1(e) {
      this.errors = [];
      
      if (this.cep.length < 8) {
        alert('Digite um CEP válido')
      } else if (this.dadosPedido.numero < 0) {
        alert('Digite um NÚMERO válido')
      }
      
      let cpf = this.dadosPedido.cpf;
      let telefone = this.dadosPedido.telefone;

      if(cpf.length != 14 ||
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
          alert(`O CPF: ${cpf} é inválido`)
      } else if(telefone.length != 15 ||
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
          alert(`O Telefone: ${telefone} é inválido`)
      } else if (!this.dadosPedido.nome ||
        !this.dadosPedido.telefone ||
        !this.cep || !this.dadosPedido.cpf ||
        !this.dadosPedido.numero ||
        !this.dadosPedido.residencia
      ) {
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

    // altera as divs e vai para as bebidas 
    etapa_2() {
      if(this.dadosPedido.lanche === '') {
        alert('Porfavor selecione seu lanche')
      } else {
        this.divBebida = !this.divBebida;
        this.divLanches = !this.divLanches;
      }
    },

    // soma o pedido e vai para a forma de pagamento 
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

    // monta o pedido para ser enviado para o whatsapp
    etapa_4() {
      // se tiver troco, ap e bloco no pedido, entrara neste bloco 
      if (this.dadosPedido.troco != '' && this.dadosPedido.apartamento != '' && this.dadosPedido.bloco != '' && this.dadosPedido.pontoReferencia != '') {
        this.pedido_wpp = 
          '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
          '%0A*--------------* ' +
          '%0A' +
          '%0A*Olá, meu nome é* ' + this.dadosPedido.nome +
          '%0A' +
          '%0A*e meu contato:* ' + this.dadosPedido.telefone +
          '%0A' +
          '%0A*--------------*' +
          '%0A' +
          '%0A*Pedido* ' +
          '%0A' +
          '%0A*Lanche:* ' + this.dadosPedido.lanche + '( R$ '+ this.dadosPedido.preco_lanche +')' +
          '%0A' +
          '%0A*Bebida:* ' + this.dadosPedido.bebida + '( R$ '+ this.dadosPedido.preco_bebida +')' +
          '%0A' +
          '%0A*Observações:* ' + this.dadosPedido.observacoes +
          '%0A' +
          '%0A*--------------* ' +
          '%0A' +
          '%0A*Total* ' +
          '%0A' +
          '%0A*Valor:* R$ ' + this.dadosPedido.valor_total +
          '%0A' +
          '%0A*Troco para:* R$ ' + this.dadosPedido.troco +
          '%0A' +
          '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
          '%0A' +
          '%0A*--------------* ' +
          '%0A' +
          '%0A*Endereço de entrega* ' +
          '%0A' +
          '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
          '%0A' +
          '%0A*Bairro:* ' + this.dadosPedido.bairro +
          '%0A' +
          '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
          '%0A' +
          '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
          '%0A' +
          '%0A*Bloco:* ' + this.dadosPedido.bloco +
          '%0A*--------------*' +
          '%0A' +
          '%0A*LK Pedidos Whatsapp* ' +
          '%0Ahttps://lucaswalmor.github.io/lk-whatsapp/' +
          '%0A'
          '%0A*--------------*';
          // '%0A' +
          // '%0A*Nome:* ' + this.dadosPedido.nome +
          // '%0A' +
          // '%0A*Telefone:* ' + this.dadosPedido.telefone +
          // '%0A' +
          // '%0A*Lanche:* ' + this.dadosPedido.lanche +
          // '%0A' +
          // '%0A*Bebida:* ' + this.dadosPedido.bebida +
          // '%0A' +
          // '%0A*Observações:* ' + this.dadosPedido.observacoes +
          // '%0A' +
          // '%0A*Preço Total:* R$ ' + this.dadosPedido.valor_total +
          // '%0A' +
          // '%0A*Troco para:* R$ ' + this.dadosPedido.troco +
          // '%0A' +
          // '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento +
      } else if (this.dadosPedido.troco === '' && this.dadosPedido.apartamento != '' && this.dadosPedido.bloco != '' && this.dadosPedido.pontoReferencia != '') {
        // se tiver ap e bloco no pedido, entrara neste bloco
        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
          '%0A' +
          '%0A*--------------------------------------------------------------------------------* ' +
          '%0A' +
          '%0A*Nome:* ' + this.dadosPedido.nome +
          '%0A' +
          '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
          '%0A' +
          '%0A*Bairro:* ' + this.dadosPedido.bairro +
          '%0A' +
          '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
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
      } else if (this.dadosPedido.troco != '' && this.dadosPedido.apartamento != '' && this.dadosPedido.pontoReferencia != '') {
        // se tiver ap e troco no pedido, entrara neste bloco 

        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A' +
            '%0A*Nome:* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
            '%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +
            '%0A' +
            '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
            '%0A' +
            '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
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
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
            '%0A*--------------------------------------------------------------------------------* ';
      } else if (this.dadosPedido.apartamento != '' && this.dadosPedido.pontoReferencia != '') {
        // se tiver ap e troco no pedido, entrara neste bloco 

        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A' +
            '%0A*Nome:* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
            '%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +
            '%0A' +
            '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
            '%0A' +
            '%0A*Apartamento:* ' + this.dadosPedido.apartamento +
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
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
            '%0A*--------------------------------------------------------------------------------* ';
      } else if (this.dadosPedido.troco != '' && this.dadosPedido.pontoReferencia != '') {
        // se tiver ap e troco no pedido, entrara neste bloco 

        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A' +
            '%0A*Nome:* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
            '%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +
            '%0A' +
            '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
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
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
            '%0A*--------------------------------------------------------------------------------* ';
      } else if (this.dadosPedido.pontoReferencia != '') {
        // se tiver ap e troco no pedido, entrara neste bloco 

        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A' +
            '%0A*Nome:* ' + this.dadosPedido.nome +
            '%0A' +
            '%0A*Rua:* ' + this.dadosPedido.rua + ' Nº ' + this.dadosPedido.numero +
            '%0A' +
            '%0A*Bairro:* ' + this.dadosPedido.bairro +
            '%0A' +
            '%0A*Ponto de referência:* ' + this.dadosPedido.pontoReferencia +
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
            '%0A*Forma de pagamento:* ' + this.dadosPedido.forma_pagamento
            '%0A*--------------------------------------------------------------------------------* ';
      } else {
        // se não tiver troco, ap e bloco no pedido, entrara neste bloco 
        // variavel pedido monta o pedido que será enviado no html 
        this.pedido_wpp = '*Agradecemos pela preferência, seu pedido está sendo preparado!*' +
            '%0A' +
            '%0A*--------------------------------------------------------------------------------* ' +
            '%0A' +
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

    // altera divs da forma de pagamento 
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

    // Salvar o pedido gerado no banco de dados
    async salvarPedidoDB() {
        // cria um array com os dados do pedido 
        const data = {
            nome_cliente: this.dadosPedido.nome,
            cpf: this.dadosPedido.cpf,
            rua: this.dadosPedido.rua,
            bairro: this.dadosPedido.bairro,
            ponto_referencia: this.dadosPedido.pontoReferencia,
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
        const req = await fetch("https://www.projetoadocao.com/api/pedidos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJson
        });
    },
    // carregar lista de usuarios
    async listarLanche() {
        // cria um array com os dados do pedido 
        // const req = await fetch("http://127.0.0.1:8000/api/lanches");
        const req = await fetch("https://www.projetoadocao.com/api/lanches");
        const data = await req.json();
        this.dadosLanches = data;
    },
    // carregar lista de usuarios
    async listarBebidas() {
        // cria um array com os dados do pedido 
        const req = await fetch("https://www.projetoadocao.com/api/bebidas");
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
        const req = await fetch("https://www.projetoadocao.com/api/taxa_entrega");
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
  height: auto;
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
