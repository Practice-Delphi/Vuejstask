<template>
  <div class='loading-container'>
      <div class='loading-main' v-if="isLoading">
        <div class='loading-shape one'></div>
        <div class='loading-shape two'></div>
        <div class='loading-shape three'></div>
        <div class='loading-shape four'></div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import closesvg from "../assets/close.svg";

export default {
  name: "Loading",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoadingGetter"
    })
  },
  updated() {
      console.log(this.isLoading);
  }
};
</script>

<style>
.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 5;
}

.loading-main {
    position: relative;
    animation: loading 1s linear infinite;
}

.loading-shape {
    position: absolute;
    border-radius: 50%;
    background-color: rgb(114, 143, 90);
}

.one {
    top: -30px;
    left: 0;
    width: 16px;
    height: 16px;
    opacity: 0.8;
}
.two {
    top: -27px;
    left: -15px;
    width: 12px;
    height: 12px;
    opacity: 0.7;
}

.three {
    top: -15px;
    left: -27px;
    width: 8px;
    height: 8px;
    opacity: 0.6;
}

.four {
    top: 0;
    left: -30px;
    width: 4px;
    height: 4px;
    opacity: 0.5;
}

@keyframes loading {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
