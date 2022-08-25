<template>
    <Sidenav />
    <div class="container">
        <div class="row m-5">
            <h2>Editar Usuario</h2>
        </div>
        <Message :msg="msg" v-show="msg"/>
        <form class="row g-3" autocomplete="off" @submit.prevent>
            <div class="col-md-6">
                <label for="name" class="form-label">Nome:</label>
                <input type="text" class="form-control" id="name" v-model="dadosUsuarios.name">
            </div>
            <div class="col-md-6">
                <label for="inputEmail4" class="form-label">Email</label>
                <input type="email" class="form-control" id="inputEmail4" v-model="dadosUsuarios.email">
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input type="password" class="form-control" id="inputPassword4" v-model="dadosUsuarios.password">
            </div>
            <div class="row mt-4">
                <div class="col-md-6">
                    <input type="submit" value="Atualizar" class="form-control btn btn-success" @click="updateUsuario">
                </div>
                <div class="col-md-6">
                    <input type="submit" value="Voltar" class="form-control btn btn-secondary" @click="voltar">
                </div>
            </div>
        </form>
    </div>    
</template>

<script>
import Header from '../conteudo/Header.vue';
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
export default {
    name: "EditarUsuario",
    components: { Header, Sidenav, Message },
    data() {
        return {
            name: null,
            password: null,
            email: null,
            dadosUsuarios: [],
            msg: ""
        };
    },
    methods: {
        async updateUsuario() {
            var id = this.$route.params.id;

            const data = {
                name: this.dadosUsuarios.name,
                password: this.dadosUsuarios.password,
                email: this.dadosUsuarios.email
            };

            if(data.name === null || data.preco === null) {
                alert('Porfavor preencha os campos')
            } else {
                const dataJson = JSON.stringify(data);
                // const req = await fetch(`http://127.0.0.1:8000/api/usuarios/${id}`, {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/usuarios/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                if (req.status === 200) {
                    this.msg = "Usuario editado com sucesso";
                    this.name = "";
                    this.preco = "";
                    setTimeout(() => {
                        this.msg = ''
                    }, 2000);
                }
            }

        },
        // carregar lista de usuarios
        async listarUsuario() {
            var id = this.$route.params.id;
            // cria um array com os dados do pedido 
            
            try {
                const req = await fetch(`https://pedidoparrilha.herokuapp.com/api/usuarios/${id}`);
                const data = await req.json();
                this.dadosUsuarios = data;
            } catch (err) {
                console.log('error', err);
            }
        },
        voltar() {
            var token = this.$route.params.token;
            this.$router.push({ path: `/listar-usuario/${token}`, params: {token: token } });
        }
    },
    mounted() {
        this.listarUsuario();
    }
}
</script>

<style>

</style>