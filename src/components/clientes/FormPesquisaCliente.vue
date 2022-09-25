<template>
    <div class="row text-secondary">
        <h1>Pesquiar cliente</h1>
    </div>
    <div class="row mt-5">
        <div class="col-6">
            <label for="" class="form-label">Digite o Telefone:</label>
            <input type="text" name="telefone" class="form-control" v-model="telefone"
                    minlength="15"
                    maxlength="15" 
                    v-maska="'(##) #####-####'">
        </div>
        <div class="form-text">Obs: Todos os campos são obrigatórios</div>
    </div>
    <div class="row mt-3">
        <div class="col">
            <button class="btn btn-dark text-warning fw-bold" @click="pesquisarSomaTotal(this.dados)">Pesquisar</button>
        </div>
    </div>
  
</template>

<script>
export default {
    data() {
        return {
            telefone: '',
            modo: '',
            dados: []
        }
    },
    methods: {
        async pesquisarSomaTotal() {
            if(this.telefone === '') {
                alert(`Não foi encontrado dados com este telefone`);
                localStorage.setItem('dados', '');
                location.reload(true);
            } else {
                let data = {
                    telefone: this.telefone,
                    filtro_valores: null,
                    filtro_total_pedidos: null,
                    compra_cliente_dia: null
                }

                // transforma o array de dados do pedido em texto 
                const dataJson = JSON.stringify(data);

                // const req = await fetch("http://127.0.0.1:8000/api/filtros", {
                const req = await fetch("https://www.projetoadocao.com/api/filtros", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                const dados = await req.json();
                
                var soma = dados.reduce((a, b) => a + parseFloat(b.valor_total), 0)
                localStorage.setItem('soma_total', JSON.stringify(soma));
                localStorage.setItem('dados', JSON.stringify(dados));

                if(req.status === 200) {
                    location.reload(true);
                }
            }

            
        }
    }

}
</script>

<style>

</style>