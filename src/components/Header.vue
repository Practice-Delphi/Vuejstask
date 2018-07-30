<template>
  <header class="header">
    <div class="page header-container">
      <div class="header-main">
        <div class="header-brand">Brand</div>
      </div>
      <div class="header-navbar">
        <router-link class="header-navbar-link" to="/">Home</router-link>
        <router-link class="header-navbar-link" to="/about">About</router-link>
        <router-link class="header-navbar-link" v-if="!isUser" to="/register">Register</router-link>
        <router-link class="header-navbar-link" v-if="!isUser" to="/login">Login</router-link>
        <router-link class="header-navbar-link" v-if="isUser" to="/profile">Profile</router-link>
        <div class="header-logout" v-if="isUser" @click="logout"><router-link class='header-navbar-link' to='/'>Logout</router-link></div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      userData: 'userData'
    }),
    ...mapGetters({
      isUser: 'isUserGetter'
    })
  },
  methods: {
    ...mapActions({
      logout: 'logoutAction'
    })
  },
  created() {
  },
  updated() {
  }
};
</script>

<style>
  .header {
    background-color: rgb(167, 208, 134);
  }
  .header-container {
    display: flex;
    flex-flow: row wrap;
  }
  .header-main {
    flex-grow: 1;
    padding: 10px;
  }
  .header-navbar {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
  }
  .header-brand {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
  .header-navbar-link {
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    font-weight: bold;
    font-size: 18px;
    color: white;
    transition: background .3s ease-out;
  }
  .header-navbar-link:hover {
    background-color: rgb(114, 143, 90);
  }

  .header-logout {
    display: flex;
    justify-content: center;
    align-items: stretch;
  }
</style>
