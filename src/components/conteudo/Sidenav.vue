<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="col-md-12 d-flex">
                <div class="col-md-10 d-flex ms-3">
                    <button class="btn btn-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <span class="ps-3 pt-1" @click="dashboardView">
                        <div class="col-md-2">
                            <i class="fa-2x fa-solid fa-gauge text-dark"></i> 
                        </div>
                    </span>
                </div>
                <div class="col-md-2">
                    <span id="data-hora"></span>
                </div>
            </div>
        </nav>
    </div>
    <div class="sidenav">
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <img src="/img/logo.jpg" alt="" class="logo">
                <button type="button" class="btn text-light" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="offcanvas-body">
                <div class="row text-center text-light">
                    <p><strong>{{email_admin}}</strong></p>
                </div>
                <ul class="mt-5 nav flex-column" id="menu">
                    <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link px-0" @click="dashboardView">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-gauge"></i> 
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Dashboard
                                </span>
                            </div>
                        </span>
                    </li>
                    <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link px-0" @click="pedidos_online">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-cash-register"></i> 
                            </div>
                            <div class="col-md-6">
                                <span class="offcanvas-span-titulo">
                                    Vendas
                                </span>
                            </div>
                        </span>
                    </li>
                    <li>
                        <span href="#submenu" data-bs-toggle="collapse"  class="text-white col-md-12 d-flex nav-link px-0">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-gear"></i>
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Configurações
                                </span>
                            </div>
                        </span>
                        <ul class="collapse nav flex-column ms-1" id="submenu" data-bs-parent="#menu">
                            <li class="ms-4">
                                <span class="nav-link px-0" @click="configuracoes"> Geral</span>
                            </li>
                            <li class="w-100 ms-4">
                                <span class="nav-link px-0" @click="listarUsuarios"> Usuários</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span href="#submenu2" data-bs-toggle="collapse"  class="text-white col-md-12 d-flex nav-link px-0">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-file-lines"></i>
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Relatórios
                                </span>
                            </div>
                        </span>
                        <ul class="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                            <li class="ms-4">
                                <span class="nav-link px-0" @click="pedidos_feitos"> Pedidos</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span href="#submenu3" data-bs-toggle="collapse" class="col-md-12 d-flex nav-link px-0 align-middle">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-burger"></i> 
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Lanches
                                </span>
                            </div>
                        </span>
                        <ul class="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                            <li class="w-100 ms-4">
                                <span class="nav-link px-0" @click="cadastrarNovoLanche">Cadastrar</span>
                            </li>
                            <li class=" ms-4">
                                <span class="nav-link px-0" @click="listarLanches">Editar / Excluir</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span href="#submenu4" data-bs-toggle="collapse" class="col-md-12 d-flex nav-link px-0 align-middle">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-martini-glass"></i>
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Bebidas
                                </span>
                            </div>
                        </span>
                        <ul class="collapse nav flex-column ms-1" id="submenu4" data-bs-parent="#menu">
                            <li class="w-100 ms-4">
                                <span class="nav-link px-0" @click="cadastrarNovaBebida">Cadastrar</span>
                            </li>
                            <li class=" ms-4">
                                <span class="nav-link px-0" @click="listarBebidas">Editar / Excluir</span>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link px-0" @click="clientes">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-users"></i>
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Clientes
                                </span>
                            </div>
                        </span>
                    </li>
                    <!-- <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link px-0" @click="planoUsuario">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-money-bill"></i> 
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Plano
                                </span>
                            </div>
                        </span>
                    </li> -->
                    <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link px-0" @click="contato">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-address-book"></i> 
                            </div>
                            <div class="col-md-10">
                                <span class="offcanvas-span-titulo">
                                    Contato
                                </span>
                            </div>
                        </span>
                    </li>
                    <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link px-0" @click="listarTaxas">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-dollar-sign"></i>
                            </div>
                            <div >
                                <span class="offcanvas-span-titulo">
                                    Taxa Entrega 
                                </span>
                            </div>
                        </span>
                    </li>
                </ul>
                <ul class="nav fixed-bottom">
                    <li class="nav-item">
                        <span class="col-md-12 d-flex nav-link justify-content-around" @click="logout('/dashboard')">
                            <div class="col-md-2">
                                <i class="fa-lg fa-solid fa-power-off"></i>
                            </div>
                            <div class="col-md-6">
                            <span>
                                Desconectar
                            </span>
                            </div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidenav',
    data() {
        return {
            email_admin: ''
        }
    },
    methods: {
        dashboardView() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/dashboard/${token}`, params: {token: token } });
        },

        // CONFIGURAÇÕES
        configuracoes() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/configuracoes-gerais/${token}`, params: {token: token } });
        },

        // USUÁRIOS
        cadastrarNovoUsuario() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-usuario/${token}`, params: {token: token } });
        },
        listarUsuarios() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-usuario/${token}`, params: {token: token } });
        },

        // LANCHES
        cadastrarNovoLanche() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-lanche/${token}`, params: {token: token } });
        },
        listarLanches() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-lanche/${token}`, params: {token: token } });
        },

        // BEBIDAS
        cadastrarNovaBebida() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/cadastrar-bebida/${token}`, params: {token: token } });
        },
        listarBebidas() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-bebida/${token}`, params: {token: token } });
        },

        // PEDIDOS ONLINE
        pedidos_online() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/pedidos-online/${token}`, params: {token: token}} );  
        },

        // PEDIDOS
        pedidos_feitos() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/relatorio-pedidos/${token}`, params: {token: token}} );  
        },

        // TAXA DE ENTREGA
        listarTaxas() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-taxa/${token}`, params: {token: token}} );  
        },

        // CLIENTES 
        clientes() {
            var token = this.$route.params.token;
            localStorage.removeItem('dados')
            this.$router.push({ path: `/clientes/${token}`, params: {token: token}} );  
        },

        // CONTATO 
        contato() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/contatos/${token}`, params: {token: token}} );  
        },

        // PLANO USUARIO 
        planoUsuario() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/plano-usuario/${token}`, params: {token: token}} );  
        },

        // OUTROS
        horas() {
            const zeroFill = n => {
                return ('0' + n).slice(-2);
            }

            // Cria intervalo
            const interval = setInterval(() => {
                // Pega o horário atual
                const now = new Date();

                // Formata a data conforme dd/mm/aaaa hh:ii:ss
                const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
                // Exibe na tela usando a div#data-hora
                document.getElementById('data-hora').innerHTML = dataHora;
            }, 1000);
        },

        logout() {
            localStorage.clear();
            this.$router.push("/admin")
        },

        usuarioOnline() {
            this.email_admin = window.localStorage.getItem('email');
        }
    },
    mounted() {
        this.horas();
        this.usuarioOnline();
    }
}
</script>

<style scoped>

span {
    cursor: pointer;
}

span div i {
    color: #f9a529;
}

.logo {
    width: 100px;
    margin-left: 50px;
    border-radius: 50%;
}

.offcanvas {
    width: 250px;
    background-color: #333;
}

.offcanvas-body ul li span {
    color: #fff;
}

.offcanvas-body ul li span:hover {
    opacity: 0.6;
}

.offcanvas-body ul li a i {
    color: #f9a529;
    padding-right: 15px;
}

.fa-2x {
    font-size: 2em;
}

.fa {
    position: relative;
    display: table-cell;
    width: 60px;
    height: 36px;
    text-align: center;
    vertical-align: middle;
    font-size:20px;
}


.main-menu:hover,nav.main-menu.expanded {
    width:250px;
    overflow:visible;
}

.main-menu {
    background:#212121;
    border-right:1px solid #e5e5e5;
    position:absolute;
    top:0;
    bottom:0;
    height:100%;
    left:0;
    width:60px;
    overflow:hidden;
    -webkit-transition:width .05s linear;
    transition:width .05s linear;
    -webkit-transform:translateZ(0) scale(1,1);
    z-index:1000;
}

.main-menu>ul {
    margin:7px 0;
}

.main-menu li {
    position:relative;
    display:block;
    width:250px;
}

.main-menu li > a {
    position:relative;
    display:table;
    border-collapse:collapse;
    border-spacing:0;
    color:#999;
    font-family: arial;
    font-size: 14px;
    text-decoration:none;
    -webkit-transform:translateZ(0) scale(1,1);
    -webkit-transition:all .1s linear;
    transition:all .1s linear;
}

.main-menu .nav-icon {
    position:relative;
    display:table-cell;
    width:60px;
    height:36px;
    text-align:center;
    vertical-align:middle;
    font-size:18px;
}

.main-menu .nav-text {
    position:relative;
    display:table-cell;
    vertical-align:middle;
    width:190px;
    font-family: 'Titillium Web', sans-serif;
}

.main-menu>ul.logout {
    position:absolute;
    left:0;
    bottom:0;
}

a:hover,a:focus {
    text-decoration:none;
}

nav {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    -o-user-select:none;
    user-select:none;
}

nav ul,nav li {
    outline:0;
    margin:0;
    padding:0;
}

.main-menu li:hover>a,nav.main-menu li.active>a,.dropdown-menu>li>a:hover,.dropdown-menu>li>a:focus,.dropdown-menu>.active>a,.dropdown-menu>.active>a:hover,.dropdown-menu>.active>a:focus,.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,.dashboard-page nav.dashboard-menu ul li.active a {
    color:#fff;
    background-color:#5fa2db;
}

.area {
    float: left;
    background: #e2e2e2;
    width: 100%;
    height: 100%;
}

.cards {
    box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.46);
    padding: 30px;
    background-color: #fff;
}

.card-pedidos {
    border-left: 5px solid green;
    border-radius: 10px;
    color: black;
}

.card-valor-total {
    border-left: 5px solid blue;
    border-radius: 10px;
    color: black;
}

.text-card-pedidos div i {
    color: #008000ad;
}

.text-card-valor-total div i {
    color: rgba(0, 0, 255, 0.459);
}
@font-face {
    font-family: 'Titillium Web';
    font-style: normal;
    font-weight: 300;
    src: local('Titillium WebLight'), local('TitilliumWeb-Light'), url(http://themes.googleusercontent.com/static/fonts/titilliumweb/v2/anMUvcNT0H1YN4FII8wpr24bNCNEoFTpS2BTjF6FB5E.woff) format('woff');
}

@media screen and (max-width: 425px) {
    .card-valor-total {
        margin: 35px;
    }
    
    .offcanvas-span-titulo {
        padding-left: 20px;
    }

    .cards {
        width: 85%;
        justify-content: space-around;
    }
    
    .botao-acao-tabela button {
        padding: 2px;
        margin-left: 10px !important;
        margin-top: 3px;
    }
}
</style>