<template>
  <div>
    <canvas id="myChart" height="30" width="80"></canvas>
  </div>
</template>

<script>
export default {
    name: 'Grafico',
    props: {
        dadosBackend: Array
    },
    data() {
        return {
            somaJaneiro: 0,
            somaAgosto: 0
        }
    },
    methods: {
        async dados() {
            // const req = await fetch("http://127.0.0.1:8000/api/filtros");
            const req = await fetch("https://www.projetoadocao.com/api/filtros");
            
            const dadosBackend = await req.json();

            const labels = [
                'Jan',
                'Fev',
                'Mar',
                'Abr',
                'Mai',
                'Jun',
                'Jul',
                'Ago',
                'Set',
                'Out',
                'Nov',
                'Dez'
            ];

            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Total R$ ',
                        backgroundColor: '#f9a52f',
                        borderColor: '#f9a52f',
                        borderRadius: '20',
                        data: dadosBackend[0],
                    },
                ]
            };

            const config = {
                type: 'bar',
                data: data,
                options: {}
            };

            const myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
        },
    },
    mounted() {
        this.dados();
    }
};
</script>

<style>
</style>