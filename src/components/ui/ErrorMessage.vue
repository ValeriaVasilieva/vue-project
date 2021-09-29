<template>
  <p>{{ text }}</p>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: {
    text: String,
  },
};
</script>

<style scoped lang="scss">
p {
  color: red;
}
</style>
