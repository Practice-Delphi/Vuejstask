<template>
  <div class="container">
    <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
    <form @submit="login">
      <div class="form-title">Login</div>
      <div class="form-input">
        <label>Email:</label>
        <input type="email" placeholder="Email" @change='changeEmail'>
      </div>
      <div class="form-input">
        <label>Password:</label>
        <input type="password" placeholder="Password" @change='changePassword'>
      </div>
      <button class="form-submit" type='submit'>Login</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  computed: {
    ...mapState({
      userData: "userData"
    })
  },
  methods: {
    ...mapActions({
      login() {
        this.$store.dispatch("loginAction", {
          email: this.email,
          password: this.password
        });
      }
    }),
    changeEmail(e) {
      this.email = e.target.value;
    },
    changePassword(e) {
      this.password = e.target.value;
    }
  },
  created() {
    if (this.userData.user) {
      this.$router.replace("/profile");
    }
  },
  updated() {
    if (this.userData.user) {
      this.$router.replace("/profile");
    }
  }
};
</script>

<style>
</style>