<template>
    <sidenav></sidenav>
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-5">
                <div class="col-md-12">
                    <h1 class="text-secondary">Logs Clientes</h1>
                    <hr>
                </div>
                <div class="col-md-5 pt-2">
                    <input type="text" name="filtro_logs" id="filtro_logs" class="form-control"
                        placeholder="Pesquisar...">
                </div>
            </div>
        </div>
        <div class="tbodyDiv">
            <table class="table text-center table-striped align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>Cliente</th>
                        <th>Telefone</th>
                        <th>Data</th>
                        <th>Enviou</th>
                    </tr>
                </thead>
                <tbody id="tabela_taxa">
                    <tr v-for="item in logs" :key="item">
                        <td>{{ item.nome_cliente }}</td>
                        <td>{{ item.telefone }}</td>
                        <td>{{ item.created_at.substring(0, 10).split('-').reverse().join('/') }}</td>
                        <td>{{ (item.enviou_pedido != null) ? item.enviou_pedido : 'Não'}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
$(document).ready(function () {
    $("#filtro_logs").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#tabela_taxa tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});
export default {
    name: 'Logs',
    components: { Sidenav },
    data() {
        return {
            logs: [],
        }
    },
    methods: {

    },
    created() {
        this.axios('https://www.projetoadocao.com/api/logs')
        .then(res => {
            this.logs = res.data;
            console.log(res.data)
        });
    }
}
</script>

<style>

</style>