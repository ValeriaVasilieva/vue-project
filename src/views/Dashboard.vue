<template>
  <Layout>
    <h1 class="heading">My Personal Costs</h1>
    <AddPaymentForm />
    <PaymentsDisplay />
  </Layout>
</template>

<script>
import PaymentsDisplay from "@/components/entity/PaymentsDisplay";
import AddPaymentForm from "@/components/entity/AddPaymentForm";
import Layout from "@/components/Layout";
import { mapActions } from "vuex";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Layout,
  },
  methods: {
    ...mapActions({
      fetchListData: "fetchData",
    }),
  },
  created() {
    this.fetchListData("page1");
  },
};
</script>

<style scoped lang="scss"></style>
