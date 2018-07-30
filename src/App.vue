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
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

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
  background-color: azure;
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
  margin: 20px auto;
  width: fit-content;
  align-self: center;
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
  align-items: stretch;
  margin: 20px;
}

button {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: rgb(167, 208, 134);
  border-radius: 4px;
  border: 1px solid rgb(167, 208, 134);
  padding: 5px 10px;
  transition: background 0.3s ease-out;
}

button:hover {
  background-color: rgb(114, 143, 90);
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  align-self: stretch;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.3);
}

.form-photo {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.form-photo-input-file {
  height: 100%;
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  opacity: 0;
  margin: 0;
  padding: 0;
}

.form-photo-input {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 10px 0;
}

.form-photo-input-button {
  border-radius: 5px 0 0 5px;
}
.form-photo-input-label {
  border-radius: 0 5px 5px 0;
  margin: 0;
}

.form-photo-preview {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.form-photo-preview > img {
  position: absolute;
  margin: auto;
  min-height: 200px;
  min-width: 200px;
  width: 200px;
  height: auto;
}

.form-input {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.form-input > label {
  font-weight: bold;
  font-size: 16px;
  flex: 1 1 30%;
  word-wrap: break-word;
}
.form-input > input {
  flex: 1 1 70%;
}

.form-submit {
  margin: auto;
}
</style>
