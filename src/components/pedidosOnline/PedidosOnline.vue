<template>
    <Sidenav />
    <input type="hidden" id="ultimo" v-model="ultimo.id">
    <div class="container">
        <div class="row">
            <div class="titulo col-md-12 p-3">
                <div class="col-md-12">
                    <h1 class="text-secondary">Vendas</h1>
                    <hr>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- <audio id="myAudio" controls autoplay="true">
                <source src="https://soundbible.com/mp3/dixie-horn_daniel-simion.mp3" type="audio/mpeg">
            </audio> -->
            <button id="audio" @click="trigger()">teste</button>
            <!-- <button id="audio" @click="trigger('http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3')">teste</button> -->
        </div>
    </div>
</template>

<script>
import Sidenav from '@/components/conteudo/Sidenav'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
    name: 'PedidosOnline',
    components: { Sidenav },
    data() {
        return {
            ultimo: ''
        }
    },
    methods: {
        listarPedidos() {
            // this.axios(`http://127.0.0.1:8000/api/pedidos/`)
            axios.get(`https://www.projetoadocao.com/api/pedidos`)
            .then(res => {
                this.pedidos = res.data[0].pedidos;
                this.somaValorTotal = res.data[0].somas;
                this.totalPedidos = this.pedidos.length;
                this.ultimo = res.data[0].pedidos.at(-1);
            });
        },
        trigger () {
            var x = document.getElementById("myAudio");
	        x.play();
        }
    },
    mounted() {
                        var audio = new Audio('../../../public/audios/musica.mp3');
                        audio.play();
        this.listarPedidos();
        setInterval(function() {
            // let ultimoId = ultimo.value;
            let ultimoId = 107;

            axios.get(`https://www.projetoadocao.com/api/pedidos`)
            .then(res => {
                const novoId = res.data[0].pedidos.at(-1).id;
                let teste = res.data[0].pedidos.at(-1)

                if (ultimoId < novoId) {
                    let teste = res.data[0].pedidos.at(-1)
                    // $('#audio').trigger('click');
                    setInterval(function() {
                    }, 5000);
                    // Swal.fire({
                    //     title: 'Are you sure?',
                    //     text: "You won't be able to revert this!",
                    //     icon: 'warning',
                    //     showCancelButton: true,
                    //     confirmButtonColor: '#3085d6',
                    //     cancelButtonColor: '#d33',
                    //     confirmButtonText: 'Yes, delete it!'
                    // }).then((result) => {
                    //     if (result.isConfirmed) {
                    //         Swal.fire(
                    //         'Deleted!',
                    //         'Your file has been deleted.',
                    //         'success',
                    //         location.reload()
                    //     )}
                    // });
                }
            });
        }, 5000);
    },
}
</script>

<style>

</style>