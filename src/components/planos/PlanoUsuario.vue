<template>
    <Sidenav />
        <div class="container">
            <div class="row">
                <div class="titulo col-md-12 p-3">
                    <div class="col-md-12">
                        <h1 class="text-secondary">Plano</h1>
                        <hr>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 d-flex justify-content-center">
                    <div class="col-md-3"></div>
                    <div class="col-md-4 offset-md-1">
                        <div class="card text-center" v-for="item in planos" :key="item.id">
                            <div class="card-header bg-dark text-warning">
                                <h1>{{item.descricao}}</h1>
                            </div>
                            <div class="card-body">
                                <h4 class="mt-3">Valor Plano:</h4>
                                <h2 class="text-danger m-3">{{item.valor_plano}}</h2>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-success w-100 p-3" @click="renovarPlano(item)">
                                    <h4>Renovar Plano</h4>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4"></div>
                </div>
            </div>
        </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue'

export default {
    name: 'PlanoUsuario',
    components: { Sidenav },
    data() {
        return {
            planos: []
        }
    },
    methods: {
        listaPlanos() {
            this.axios('https://www.projetoadocao.com/api/planos')
            .then(res => {
                this.planos = res.data
            });
        },
        renovarPlano(item) {
            console.log(item)
        }
    },
    created() {
        this.listaPlanos();
    }
}
</script>

<style scoped>
    h4, h2, h1 {
        margin-bottom: 0;
    }
</style>