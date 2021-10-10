<template>
  <Layout>
    <h1 class="heading">My Personal Costs</h1>
    <Button title="Add Payment" @onClick="openModalPayment" width="300px" />
    <PaymentsDisplay />
  </Layout>
</template>

<script>
import PaymentsDisplay from "@/components/entity/PaymentsDisplay";
import Layout from "@/components/Layout";
import { mapActions } from "vuex";
import Button from "@/components/ui/Button.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    Layout,
    Button,
  },
  methods: {
    ...mapActions({
      fetchListData: "fetchData",
      fetchData: "getPaymentList",
    }),
    openModalPayment() {
      this.$modal.show({
        title: "Add Payment Form",
        content: "AddPaymentForm",
      });
    },
  },
  created() {
    this.fetchListData("page1");
    this.fetchData(2);
    if (this.$route.path.split("/")[1] === "add") {
      this.$modal.show({
        title: "Add Payment Form",
        content: "AddPaymentForm",
      });
    }
  },
};
</script>

<style scoped lang="scss"></style>
