<template>
  <div class='container alert-container' v-if="isError">
    <div class='alert-close' @click='close'><img :src='closeimg' alt='close'/></div>
      <div class='alert-message'>
        <div class='alert-message-span'>Warn: </div>
        <div class='alert-message-text'>{{error}}</div>
      </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import closesvg from "../assets/close.svg";

export default {
  name: "Alert",
  data() {
    return {
      closeimg: closesvg
    };
  },
  computed: {
    ...mapState({
      userData: "userData"
    }),
    ...mapGetters({
      isError: "isErrorGetter",
      error: 'errorGetter'
    })
  },
  methods: {
    close() {
      this.$store.commit('CLOSE_ERROR');
    }
  },
};
</script>

<style>
.alert-container {
  position: fixed;
  max-width: fit-content;
  margin: auto;
  top: 25%;
  bottom: auto;
  z-index: 4;
}
.alert-close {
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
  transition: background 0.3s ease-out;
}
.alert-close > img {
  widows: 20px;
  height: 20px;
}
.alert-close:hover {
  background-color: rgb(0, 0, 0, 0.1);
}
.alert-message {
  padding: 20px;
  display: flex;
  align-items: center;
}
.alert-message-span {
    color: rgb(167, 208, 134);
    font-weight: bold;
    font-size: 20px;
}
.alert-message-text {
    font-size: 18px;
}
</style>
