<template>
  <div>
    <h1>This is profile page</h1>
    <h1 v-if="userData.user">Welcome {{ userData.user.name }}</h1>
  </div>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'profile',
        methods: {
        },
        computed: {
            ...mapState({
                userData: 'userData'
            })
        },
        created() {
            if (!this.userData.user) {
                this.$router.replace('/login');
            }
        }
    };
</script>

<!--<style>

</style>-->
