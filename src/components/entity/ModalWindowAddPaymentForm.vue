<template>
  <div class="wrapper">
    <div class="overlay"></div>
    <div class="content">
      <h3 class="heading">{{ settings.title }}</h3>
      <component :is="settings.content" class="component" />
      <div class="btns">
        <Button cancelIcon width="145px" title="" @onClick="onClickClose" />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../ui/Button.vue";

export default {
  components: {
    AddPaymentForm: () => import("./AddPaymentForm.vue"),
    Button,
    Auth: () => import("./Auth.vue"),
  },
  name: "ModalWindowAddPaymentForm",
  props: {
    settings: Object,
  },
  methods: {
    onClickClose() {
      this.$modal.hide();
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.overlay {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(60, 60, 60, 0.5);
}
.content {
  display: table;
  margin: 0 auto;
  position: relative;
  z-index: 100;
  background-color: white;
  margin: auto;
  top: 200px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 15px 25px 25px 25px;
}
.component {
  padding: 20px 0;
}
</style>
