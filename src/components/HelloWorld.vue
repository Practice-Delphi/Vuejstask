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
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.fanny{
  width: 400px;
  height: auto;
}

@keyframes spin{
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}
</style>
