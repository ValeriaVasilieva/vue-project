<template>
  <v-container>
    <h1>Code by Valeria Vasilieva</h1>
    <Button title="Auth" @onClick="openModelAuth" width="300px" />
  </v-container>
</template>

<script>
import Button from "@/components/ui/Button.vue";

export default {
  name: "About",
  components: {
    Button,
  },
  methods: {
    openModelAuth() {
      this.$modal.show({
        title: "Some Auth...does not work...welcome",
        content: "Auth",
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
