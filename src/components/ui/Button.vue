<template>
  <div :style="style">
    <button :class="hasIcon" @click="handleClick">{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Click Me",
    },
    width: {
      type: String,
      default: "150px",
    },
    icon: Boolean,
  },
  computed: {
    style() {
      return `width: ${this.width}`;
    },
    hasIcon() {
      if (this.icon) {
        return "btnIcon btn";
      } else {
        return "btn";
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style scoped lang="scss">
.btn {
  width: 100%;
  height: 40px;
  background-color: #008b8b;
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
  border: none;
}

.btnIcon {
  &:after {
    content: "+";
    margin-left: 25px;
  }
}
</style>
