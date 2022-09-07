<template>
    <div class="container">
        <input type="file" class="form-control" @change="onFileSelected">
        <button class="btn btn-primary mt-5" @click="onUpload">
            enviar
        </button>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Upload',
    data() {
        return {
            selectedFile: null
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)


            // const req = fetch("http://127.0.0.1:8000/api/upload", {
            const req = fetch("https://www.projetoadocao.com/api/upload", {
                method: "POST",
                body: fd
            });
        }
    }
}
</script>

<style>

</style>