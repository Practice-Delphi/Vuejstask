<template>
  <div class="container" v-if="isUser">
    <div > 
        <h1>This is profile page</h1>
        <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
        <img :src='userphoto' alt="userphoto"/>
    </div>
    <div>
        <div class = "chenge_form">
            <form  @submit="addchengeName">
            <h4>change your name</h4>
            <h3>Your old name {{ userData.user.name }}</h3> 
            Please type your new name: <input type="text" placeholder="new name" @change='changeName'> <br/>
            <button type="submit">apply</button>
            </form>
        </div>
        <div class = "chenge_form">
            <form  @submit="addchengePass">
            <h4>change your password</h4>
            <label>New Password:</label><input type="text" placeholder="New Password" @change='changePassword'> <br/>
            <label>Confirm New Password:</label><input type="text" placeholder="Confirm Password" @change='changePassconf'>
            <button type="submit">apply</button>
            </form>
        
        </div>
        <div class = "chenge_form">
            <form  @submit="addchengePhoto">
            <h4>change Profile Picture</h4>
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
            <button type="submit">apply</button>
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
        this.$store.dispatch("chengeAction", {
          name: this.name
        });
      },
        addchengePass() {
        this.$store.dispatch("chengeAction", {
          password:  this.password,
          passconf:  this.passconf
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
    if (!this.userData.user) {
      this.$router.replace("/login");
    }
    if (!this.photourl) {
      this.photourl = this.userData.user.photo
        ? `http://localhost:3000/r/photo/${this.userData.user.photo}`
        : defaultuserphoto;
    }
    if (this.isUser) {
      this.userphoto = this.userData.user.photo
        ? `http://localhost:3000/r/photo/${this.userData.user.photo}`
        : defaultuserphoto;
    }
  },
  updated() {
    if (this.isUser) {
      this.userphoto = this.userData.user.photo
        ? `http://localhost:3000/r/photo/${this.userData.user.photo}`
        : defaultuserphoto;
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-flow: row wrap;
}
.chenge_form{
    border-top: 1px solid rgba(128, 128, 128, 0.651); 
    border-bottom: 1px solid rgba(128, 128, 128, 0.651);
    margin-left: 15px;
}
</style>
