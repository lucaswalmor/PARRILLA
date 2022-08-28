<template>
    <div class="row text-secondary">
        <h1>Pesquiar cliente</h1>
    </div>
    <div class="row mt-5">
        <div class="col-6">
            <label for="" class="form-label">Digite o CPF:</label>
            <input type="text" name="cpf" class="form-control" v-model="cpf"
                    placeholder="Ex: 00000000000"
                    minlength="14"
                    maxlength="14" 
                    v-maska="'###.###.###-##'">
        </div>
        <!-- <div class="col">
            <label for="" class="form-label">Escolha o modo:</label>
            <select name="modo" id="modo" class="form-select" v-model="modo" @change="$event">
                <option value="" disabled>Selecione...</option>
                <option value="dia">Dia</option>
                <option value="mes">Mês</option>
                <option value="ano">Ano</option>
            </select>
        </div> -->
        <div class="form-text">Obs: Todos os campos são obrigatórios</div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <button class="btn btn-dark text-warning fw-bold" @click="pesquisar">Pesquisar</button>
        </div>
    </div>
  
</template>

<script>
export default {
    data() {
        return {
            cpf: '',
            modo: ''
        }
    },
    methods: {
        async pesquisar() {
            let data = {
                cpf_cliente: this.cpf,
                filtro_valores: null,
                filtro_total_pedidos: null,
                compra_cliente_dia: null
            }

            // transforma o array de dados do pedido em texto 
            const dataJson = JSON.stringify(data);
            // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
            const req = await fetch("https://pedidoparrilha.herokuapp.com/api/filtros", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            const dados = await req.json();
            localStorage.setItem('dados', JSON.stringify(dados))

            if(dados != '') {
                location.reload(true);
            } else {
                alert(`Não foi encontrado dados com o CPF: ${this.cpf}`)
                localStorage.setItem('dados', '')
                location.reload(true);
            }
        }
    }

}
</script>

<style>

</style>