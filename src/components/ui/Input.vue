<template>
  <label>
    {{ label }}
    <input
      :style="style"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </label>
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
      default: "300px",
    },
    label: String,
  },
  computed: {
    style() {
      return `width: ${this.width}`;
    },
  },
};
</script>

<style scoped lang="scss">
label {
  text-align: left;
}
input {
  margin: 15px 0;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
  border: none;
}
</style>
