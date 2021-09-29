<template>
  <input
    :style="style"
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    model: String,
    value: String,
    width: {
      type: String,
      default: "100%",
    },
  },
  computed: {
    style() {
      return `width: ${this.width}`;
    },
  },
};
</script>

<style scoped lang="scss">
input {
  margin: 15px 0;
  padding: 10px;
  box-sizing: border-box;
}
</style>
