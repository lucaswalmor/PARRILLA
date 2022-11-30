<template>
    <div class="modal fade" tabindex="-1" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">Novas Atualizações</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <ul>
                            <li>Novo menu de Configurações</li>
                            <li>Tempo de entrega agora é possível alterar no menu de configurações</li>
                            <li>Mensagem do restaurante no pedido do cliente agora também é possivel alterar de acordo com a vontade do restaurante</li>
                            <li>Agora o cadastro de usuário fica junto ao menu de configurações</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-header">
                    <h5 class="modal-title text-info">Atualizações Futuras</h5>
                </div>
                <div class="modal-body">
                    <div class="container">
                        <ul>
                            <li>Será implementada uma função aonde o restaurante irá definir sozinho os metodos de pagamento</li>
                            <li>Novo filtro de pesquisa de pedidos por datas especificas</li>
                            <li>Implementaremos em um futuro próximo API de pagamento, aonde seu cliente poderá fazer o pagamento na hora de finalizar o pedido</li>
                            <li>Será implementada a impressão de pedidos para impressoras térmicas</li>
                            <li>Será implementada a função de AVISO de novo pedido</li>
                            <li>Será implementada a função de avisar seu cliente que o pedido esta sendo despachado</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Aviso',
    methods: {
    },
    mounted() {
        $('#myModal').modal('show');
    }
}
</script>

<style>

</style>