<template>
  <div class="container">
    <h1>This is profile page</h1>
    <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
    <img :src='userphoto' alt="userphoto"/>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import defaultuserphoto from '../assets/default-user.png';

    export default {
        name: 'profile',
        data() {
            return {
                userphoto: null
            }
        },
        methods: {
        },
        computed: {
            ...mapState({
                userData: 'userData'
            })
        },
        created() {
            // console.log(this.userphoto, defaultuserphoto);
            if (!this.userData.user) {
                this.$router.replace('/login');
            }
            this.userphoto = (this.userData.user.photo) ? `http://localhost:3000/r/photo/${this.userData.user.photo}` : defaultuserphoto
        }
    };
</script>

<!--<style>

</style>-->
