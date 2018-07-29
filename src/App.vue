<template>
  <div id="app">
    <Header />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <main class="main">
      <div class="page">
        <router-view/>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';

    export default {
        name: 'app',
        components: {
            Header,
            Footer
        }
    };
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}

#app {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
}

main {
  flex-grow: 1;
}

.main {
  background-color:azure;
}

.page {
  max-width: 1140px;
  margin: auto;
}

.container {
  background-color: white;
  box-shadow: rgb(0, 0, 0, 0.1) 0 0 7px 5px;
  border-radius: 3px;
  padding: 20px;
  margin: 20px;
}

input {
  font-size: 18px;
  border: 1px solid rgb(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 5px;
  margin: 10px;
}
form {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

button {
  font-size: 18px;
  color: white;
  background-color: rgb(167, 208, 134);
  border-radius: 4px;
  border: 1px solid rgb(167, 208, 134);
  padding: 5px 10px;
}

button:hover {
   background-color: rgb(114, 143, 90);
}
</style>
