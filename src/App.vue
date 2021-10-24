<template>
  <v-app id="app">
    <v-app-bar app color="teal">
      <v-container>
        <v-btn to="/" :ripple="false" plain color="white">Dashboard</v-btn>
        <v-btn to="/about" :ripple="false" plain color="white">About</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    isWindowOpen: false,
    modalSettings: {},
  }),
};
</script>

<style lang="scss"></style>
