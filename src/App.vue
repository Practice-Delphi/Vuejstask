<template>
  <div id="app">
    <Header />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <main class="main">
      <div class="container">
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
  name: "app",
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

.container {
  max-width: 1140px;
  margin: auto;
}
</style>
