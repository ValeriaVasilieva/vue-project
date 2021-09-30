<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Layout",
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
