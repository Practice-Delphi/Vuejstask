<template>
  <div class="container profile" v-if="isUser">
    <div class="profile-container"> 
        <h1 class="profile-title">Profile</h1>
        <div class="profile-photo"><img :src='userphoto' alt="userphoto"/></div>
        <div class="profile-data">
          <Strong>Name:</Strong> {{userData.user.name}}
        </div>
        <div class="profile-data">
          <Strong>Email:</Strong> {{userData.user.email}}
        </div>
    </div>
    <div class="change-container">
        <div class = "chenge_form">
            <form  @submit="addchengeName">
            <h4 class="form-title">Change your name</h4>
            <div class="form-input"><label>Your old name is {{ userData.user.name }}</label></div> 
            <div class="form-input"><label>Please type your new name:</label><input type="text" placeholder="new name" @change='changeName'></div>
            <button class="form-submit" type="submit">Apply</button>
            </form>
        </div>
        <div class = "chenge_form">
            <form  @submit="addchengePass">
            <h4 class="form-title">Change your password</h4>
            <div class="form-input"><label>New Password:</label><input type="password" placeholder="New Password" @change='changePassword'></div>
            <div class="form-input"><label>Confirm New Password:</label><input type="password" placeholder="Confirm Password" @change='changePassconf'></div>
            <button class="form-submit" type="submit">Apply</button>
            </form>
        
        </div>
        <div class = "chenge_form">
            <form  @submit="addchengePhoto">
            <h4 class="form-title">Change Profile Picture</h4>
           <div class="form-photo">
        <div class="form-photo-preview">
          <img :src="photourl" alt="photo"/>
        </div>
        <div class="form-photo-input">
          <div class="form-photo-input-new">
            <button class="form-photo-input-button">Choose</button>
            <input class="form-photo-input-label" :value="photoname" placeholder="Filename"/>
          </div>
          <input class="form-photo-input-file" type="file" accept="image/*" @change='changePhoto'/>
        </div>
      </div> 
            <button class="form-submit" type="submit">Apply</button>
            </form>
        
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import defaultuserphoto from "../assets/default-user.png";

export default {
  name: "profile",
  data() {
    return {
      name: null,
      userphoto: null,
      password: null,
      passconf: null,
      photourl: null,
      photo: null,
      photoname: null
    };
  },
  methods: {
    ...mapActions({
      addchengeName() {
        this.$store.dispatch("changeAction", {
          name: this.name
        });
      },
      addchengePass() {
        this.$store.dispatch("changeAction", {
          password: this.password,
          passconf: this.passconf
        });
      },
      addchengePhoto() {
        this.$store.dispatch("uploadUserPhotoAction", {
          photo: this.photo
        });
      }
    }),
    changeName(e) {
      this.name = e.target.value;
    },
    changePassword(e) {
      this.password = e.target.value;
    },
    changePassconf(e) {
      this.passconf = e.target.value;
    },
    changePhoto(e) {
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
  computed: {
    ...mapState({
      userData: "userData"
    }),
    ...mapGetters({
      isUser: "isUserGetter"
    })
  },
  created() {
    // console.log(this.userphoto, defaultuserphoto);
    if (this.isUser) {
      this.photourl = this.userData.user.photo
        ? `http://localhost:3000/r/photo/${this.userData.user.photo}`
        : defaultuserphoto;
      this.userphoto = this.userData.user.photo
        ? `http://localhost:3000/r/photo/${this.userData.user.photo}`
        : defaultuserphoto;
    } else {
      this.$router.replace("/login");
    }
  },
  updated() {
    if (this.isUser) {
      this.userphoto = this.userData.user.photo
        ? `http://localhost:3000/r/photo/${this.userData.user.photo}`
        : defaultuserphoto;
    } else {
      this.$router.replace("/login");
    }
  }
};
</script>

<style>
.profile {
  display: flex;
  flex-flow: row wrap;
  width: 90%;
}
.chenge_form {
  border-top: 1px solid rgba(128, 128, 128, 0.651);
  border-bottom: 1px solid rgba(128, 128, 128, 0.651);
  margin: 0 15px;
}

.profile-container {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
}

.profile-photo {
  padding: 10px 0;
  border-radius: 5px;
  width: 300px;
  height: 300px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.profile-photo > img {
  position: absolute;
  margin: auto;
  min-height: 300px;
  min-width: 300px;
  width: 300px;
  height: auto;
}

.profile-title {
  margin: 0 auto;
  padding-bottom: 10px;
}

.profile-data {
  align-self: stretch;
  padding: 5px 10px;
  font-size: 18px;
  border-left: 1px solid rgba(0, 0, 0, 0.3);
}

.change-container {
  display: flex;
  flex-flow: column nowrap;
}

.form-input {
  flex-flow: column nowrap;
  align-items: flex-start;
}
.form-input > label {
  margin-left: 10px;
}

@media screen and (max-width: 500px) {
  .profile-photo {
    width: 200px;
    height: 200px;
  }
  
  .profile-photo > img {
    min-width: 200px;
    min-height: 200px;
  }

  .profile {
    width: 95%;
  }
}
</style>
