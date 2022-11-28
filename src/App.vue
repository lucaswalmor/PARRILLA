<template>
    <router-view/>
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

body {
  overflow: auto !important;
}

.tbodyDiv{
    max-height: 500px;
    overflow: auto;
}
</style>
