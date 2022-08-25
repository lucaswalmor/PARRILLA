<template>
    <div class="header">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <button class="btn btn-dark" type="button" @click="voltar()">
                    <i class="fa-solid fa-gauge"></i>
                </button>
                <span id="data-hora"></span>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        voltar() {
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>