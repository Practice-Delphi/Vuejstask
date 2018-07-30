<template>
  <div class="container">
    <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
    <form @submit='register'>
      <div class="form-title">Register</div>
      <div class="form-photo">
        <div class="form-photo-preview">
          <img :src="photourl" alt="photo"/>
        </div>
        <div class="form-photo-input">
          <div class="form-photo-input-new">
            <button class="form-photo-input-button">Choose</button>
            <input class="form-photo-input-label" :value="photoname" placeholder="Filename"/>
          </div>
          <input class="form-photo-input-file" type="file" accept="image/*" @change='choosePhoto'/>
        </div>
      </div>
      <div class="form-input">
        <label>Name:</label>
        <input type="text" placeholder="Name" @change='changeName'>
      </div>
      <div class="form-input">
        <label>Email:</label>
        <input type="email" placeholder="Email" @change='changeEmail'>
      </div>
      <div class="form-input">
        <label>Password:</label>
        <input type="password" placeholder="Password" @change='changePassword'>
      </div>
      <div class="form-input">
        <label>Password Confirm:</label><input type="password" placeholder="Password" @change='changePassconf'>
      </div>
      <button class="form-submit" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import defaultuserphoto from "../assets/default-user.png";
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
    if (!this.photourl) {
      this.photourl = defaultuserphoto;
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
