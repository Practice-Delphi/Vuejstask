<template>
  <div class="hello">
    <img src="../assets/logo.png" class = "logo">
    <h1>дУбро пожаловать на наш <br/>Очень интересный сайт!!!</h1>
    <img src="../assets/fanny.jpg" class = "fanny">
  </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 10px;
}
.fanny{
  width: 400px;
  height: auto;
  max-width: 95%;
}

@keyframes spin{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
</style>
