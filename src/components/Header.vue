<template>
  <header class="header">
    <div class="container">
      <div>Brand</div>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/profile">Profile</router-link> |
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "header"
};
</script>

<style>
.header {
  background-color: rgb(167, 208, 134);
}
</style>

