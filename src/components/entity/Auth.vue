<template>
  <div class="contentAuth">
    <label>
      Login
      <input type="text" />
    </label>
    <label>
      Password
      <input type="text" />
    </label>
  </div>
</template>

<script>
export default {
  name: "Auth",
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
}
</style>
