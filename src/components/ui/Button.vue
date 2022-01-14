<template>
  <div :style="style">
    <button :class="hasIcon" @click="handleClick">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: {
      type: String,
      default: "Click Me",
    },
    width: {
      type: String,
      default: "150px",
    },
    icon: Boolean,
    cancelIcon: Boolean,
  },
  computed: {
    style() {
      console.log("a")
      return `width: ${this.width}`
    },
    hasIcon() {
      console.log("b")
      if (this.icon) {
        return "btnIcon btn"
      } else if (this.cancelIcon) {
        return "btnCancel btn"
      } else {
        return "btn"
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit("onClick")
    },
  },
}
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
.btnCancel {
  width: 40px;
  background-color: white;
  box-shadow: none;
  position: absolute;
  top: 5px;
  right: 5px;
  &:after {
    content: "\2718";
    color: #008b8b;
  }
}
.btnIcon {
  &:after {
    content: "+";
    margin-left: 25px;
  }
}
</style>
