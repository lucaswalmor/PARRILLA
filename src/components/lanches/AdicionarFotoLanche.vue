<template>
    <Sidenav />
<div class="container">
  <div class="row">
    <div class="titulo col-md-12 p-5">
      <h1 class="text-secondary">Adicionar foto Lanche</h1>
      <hr>
    </div>
  </div>

  <Message :msg="msg" v-show="msg"/>
  <div class="row">
    <div class="col-md-6">
      <input
        type="file"
        name="image"
        class="form-control"
        @change="onFileSelected"
        id="fileInput"
      />
    </div>
  </div>
  <div class="row">
    <div class="col-md-6 pt-3">
      <button
        class="btn btn-warning text-dark fw-bold form-control"
        @click="onUpload"
      >
        Adicionar foto
      </button>
    </div>
  </div>
</div>
</template>

<script>
import Sidenav from '../conteudo/Sidenav.vue';
import Message from '../message/Message.vue';
import { useToast } from "vue-toastification";

export default {
    name: "AdicionarFotoLanche",
    data() {
        return {
            file: "",
            selectedFile: null,
            msg: ''
        };
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        async onUpload() {
            const fd = new FormData();
            fd.append("image", this.selectedFile);

            if(this.selectedFile == null) {
              alert('Porfavor selecionar uma imagem para seu lanche')
            } else {
              // const req = await fetch("http://127.0.0.1:8000/api/upload", {
              const req = await fetch("https://www.projetoadocao.com/api/upload", {
                  method: "POST",
                  body: fd,
              });

              if (req.status === 200) {
                  this.msg = "Foto cadastrada com sucesso!";
                  this.file = '';
                  const toast = useToast();
                  toast.success(`Lanche cadastrado com sucesso!`);
                  var token = this.$route.params.token;
                  this.$router.push({ path: `/listar-lanche/${token}`, params: {token: token } });
                  setTimeout(() => {
                      this.msg = "";
                  }, 2000);
              }
            }

        },
    },
    components: { Sidenav, Message }
};
</script>

<style>
</style>