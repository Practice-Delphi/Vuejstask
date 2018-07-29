<template>
  <header class="header">
    <div class="page">
      <div>Brand</div>
      <div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/register">Register</router-link> |
        <router-link to="/login">Login</router-link> |
        <router-link to="/profile">Profile</router-link> |
        <a href='' @click="logout">Logout</a>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'header',
  methods: {
    ...mapActions({
      logout: 'logoutAction'
    })
  }
};
</script>

<style>
.header {
  background-color: rgb(167, 208, 134);
  padding: 10px;
}
</style>
