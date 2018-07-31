<template>
  <div class="container about">
    <div class="text">
      <h2>
        Делая этот сайт мы старались использовать 
        разные особенности Vue.js для серверной части 
        также использовались Node.js(Express) и MongoDB
      </h2>
    </div>
    <div class="image">
      <img src="../assets/autors.png" >
    </div>
  </div>
</template>
<style>
.about{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 20px;
  max-width: 90%;
}
.text{
  flex: 3 1 50%;
  margin-right: 25px;
}
.image{
  flex: 1 1 40%;
  width: 40%;
}

.image > img {
  max-width: 100%;
}


</style>

