<template>
     <Sidenav />
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-3">
                <div class="col-md-12">
                    <h1 class="text-secondary">Contato</h1>
                    <hr>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card m-4" style="width: 18rem;">
                <div class="card-header text-center bg-dark text-warning">
                    <h4>Whatsapp</h4>
                </div>
                <div class="card-body text-center">
                    <a target="_blank" href="https://api.whatsapp.com/send?phone=5534992021394">
                        <i class="fa-brands fa-whatsapp text-success fa-10x"></i>
                    </a>
                </div>
            </div>
            <div class="card m-4" style="width: 18rem;">
                <div class="card-header text-center bg-dark text-warning">
                    <h4>E-mail</h4>
                </div>
                <div class="card-body text-center">
                    <a target="_blank" href="mailto:lucaswsb52@gmail.com">
                        <i class="fa-regular fa-envelope text-primary fa-10x"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';

export default {
    name: 'Contato',
    components: { Sidenav },
}
</script>

<style scoped>
    a {
        cursor: pointer;
    }

    h4 {
        margin-bottom: 0px;
    }
</style>