<template>

    <div class="container-fluid body">
        <div class="row col-md-8 card-login">
            <div class="col-lg-3 col-md-2"></div>
            <div class="col-lg-6 col-md-8 login-box">
                <div class="col-lg-12 login-key row justify-content-center mb-5 mt-3">
                  <img src="/img/logo_teste.png" alt="" class="logo mt-3">
                </div>
                <div class="col-lg-12 login-title">
                    <h2>PAINEL ADMIN</h2>
                </div>

                <Message :msg="msg" v-show="msg"/>

                <div class="col-lg-12 login-form">
                        <form @submit.prevent="login" autocomplete="off">
                            <div class="col-12 d-flex align-items-center flex-column">
                                <div class="form-group ">
                                    <label class="form-control-label">Email</label>
                                    <input type="email" class="form-control" name="email" v-model="email">
                                </div>
                                <div class="form-group ">
                                    <label class="form-control-label">Senha</label>
                                    <input type="password" class="form-control" name="password" v-model="password">
                                </div>
                            </div>

                            <div class="col-lg-12 loginbttm">
                                <div class="col-lg-6 login-btm login-text">
                                    <!-- Error Message -->
                                </div>
                                <div class="col-lg-12 text-center login-button">
                                    <button type="submit" class="fw-bold btn btn-warning text-dark ">LOGIN</button>
                                </div>
                            </div>
                        </form>
                    </div>
                <div class="col-lg-3 col-md-2"></div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "../components/message/Message.vue";

export default {
    name: "Admin",
    components: { Message },
    data() {
        return {
            name: null,
            password: null,
            email: null,
            novoCadastro: false,
            msg: "",
            token: ''
        };
    },
    methods: {
        async createUser() {
            // cria um array com os dados do pedido 
            const data = {
                name: this.name,
                password: this.password,
                email: this.email
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);

            // const req = await fetch("http://127.0.0.1:8000/api/register", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", "X-CSRF-Token": this.csrf },
                body: dataJson
            });
            // traz a resposta dos dados criado
            const res = await req.json();
        },
        async login() {
            // cria um array com os dados do pedido 
            const data = {
                password: this.password,
                email: this.email
            };
            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
            // const req = await fetch("http://127.0.0.1:8000/api/login", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });

            // traz a resposta dos dados criado
            const res = await req.json();
            this.token = res.access_token

            window.localStorage.setItem('email', this.email);
            
            // verifica se o usuario é válido, se for faz o login se não for retorna mensagem de erro 
            if (res.error == "UnAuthorised Access") {
                this.msg = 'Usuário ou senha inválido!'
            } else {
                this.$router.push({ path: `/dashboard/${this.token}`, params: {token: res.access_token}} );
            }
        },
        
    }
}
</script>

<style scoped>
.card-login {
    margin-top: -50px;
}

.body {
    width: 100%;
    height: 100vh;
    margin: 0;
    background-color: #666;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.logo {
    border-radius: 50%;
}

.login-box {
    border-radius: 20px;
    height: auto;
    background: #333;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.login-title {
    margin-top: 15px;
    text-align: center;
    font-size: 30px;
    letter-spacing: 2px;
    margin-top: 15px;
    font-weight: bold;
    color: #ECF0F5;
}

.login-form {
    margin-top: 25px;
    text-align: left;
}

.form-group {
    margin-bottom: 40px;
    outline: 0px;
}

input:focus {
    outline: none;
    box-shadow: 0 0 0;
}

label {
    margin-bottom: 0px;
}

.form-control-label {
    font-size: 10px;
    color: #6C6C6C;
    font-weight: bold;
    letter-spacing: 1px;
}

.login-btm {
    float: left;
}

.login-button {
    padding-right: 0px;
    text-align: right;
    margin-bottom: 25px;
}

.login-text {
    text-align: left;
    padding-left: 0px;
    color: #A2A4A4;
}

.loginbttm {
    padding: 0px;
}

img {
  width: 150px;
}

</style>