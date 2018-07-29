<template>
  <div class="container">
    <h1>This is register page</h1>
    <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
    <form @submit='register'>
      <label>Name:</label><input type="text" placeholder="Name" @change='changeName'>
      <label>Email:</label><input type="email" placeholder="Email" @change='changeEmail'>
      <label>Password:</label><input type="password" placeholder="Password" @change='changePassword'>
      <label>Password Confirm:</label><input type="password" placeholder="Password" @change='changePassconf'>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      name: null,
      email: null,
      password: null,
      passconf: null
    };
  },
  computed: {
    ...mapState({
      userData: 'userData'
    })
  },
  methods: {
    ...mapActions({
      register() {
        this.$store.dispatch("registerAction", {
          name: this.name,
          email: this.email,
          password: this.password,
          passconf: this.passconf
        });
      }
    }),
    changeName(e) {
      this.name = e.target.value;
    },
    changeEmail(e) {
      this.email = e.target.value;
    },
    changePassword(e) {
      this.password = e.target.value;
    },
    changePassconf(e) {
      this.passconf = e.target.value;
    }
  },
  created() {
    if (this.userData.user) {
      this.$router.replace('/profile');
    }
  },
  updated() {
    if (this.userData.user) {
      this.$router.replace('/profile');
    }
  }
};
</script>

<style>
</style>
