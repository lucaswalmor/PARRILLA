<template>
    <div class="message-container alert-success">
        <span>{{ msg }}</span>
    </div>  
</template>

<script>
export default {
    name: 'Message',
    props: {
        msg: String
    }
}
</script>

<style scoped>
    .message-container {
        border-radius: 5px;
        margin: 30px auto;
        padding: 10px;
    }    
</style>