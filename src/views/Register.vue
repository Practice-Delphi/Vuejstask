<template>
  <div class="container">
    <h1>This is register page</h1>
    <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
    <form @submit='register'>
      <div>
        <img :src="photourl" alt="photo"/>
        <input type="file" @change='choosePhoto'/>
        <h3>{{this.photoname}}</h3>
      </div>
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
      passconf: null,
      photo: null,
      photourl: null,
      photoname: null
    };
  },
  computed: {
    ...mapState({
      userData: "userData"
    })
  },
  methods: {
    ...mapActions({
      register() {
        this.$store.dispatch("registerAction", {
          name: this.name,
          email: this.email,
          password: this.password,
          passconf: this.passconf,
          photo: this.photo
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
    },
    choosePhoto(e) {
      this.photo = e.target.files.item(0);
      // console.log(this.photo);
      if (this.photo) {
        this.photoname = this.photo.name;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.photourl = reader.result;
          // console.log(this.photourl);
        };
        reader.readAsDataURL(this.photo);
      }
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
