<template>
  <Layout>
    <h1>Code by Valeria Vasilieva</h1>
    <Button title="Auth" @onClick="openModelAuth" width="300px" />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import Button from "@/components/ui/Button.vue";

export default {
  name: "About",
  components: {
    Layout,
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
