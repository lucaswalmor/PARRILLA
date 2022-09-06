<template>
  <div class="container-fluid background">
    <router-view/>
  </div>
</template>

<script>

export default {
    name: "App",
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

label {
  color: #f9a529;
  padding-top: 10px;
}

</style>
