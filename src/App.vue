<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <transition name="fade">
      <ModalWindowAddPaymentForm
        v-if="isWindowOpen"
        :settings="modalSettings"
      />
    </transition>
    <transition name="fade">
      <ContextMenu />
    </transition>
  </div>
</template>

<script>
import ModalWindowAddPaymentForm from "@/components/entity/ModalWindowAddPaymentForm.vue";
import ContextMenu from "@/components/entity/ContextMenu.vue";

export default {
  name: "App",
  data: () => ({
    isWindowOpen: false,
    modalSettings: {},
  }),
  // created() {
  //   this.$router.push("dashboard");
  // },
  components: { ModalWindowAddPaymentForm, ContextMenu },
  methods: {
    onShown(settings) {
      this.modalSettings = settings;
      this.isWindowOpen = true;
    },
    onHide() {
      this.isWindowOpen = false;
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
