<template>
  <Layout>
    <h1>My Personal Costs</h1>
    <AddPaymentForm @addNewPayment="addNewPayment" />
    <PaymentsDisplay :items="paymentList" />
  </Layout>
</template>

<script>
// @ is an alias to /src
import PaymentsDisplay from "@/components/entity/PaymentsDisplay";
import AddPaymentForm from "@/components/entity/AddPaymentForm";
import Layout from "@/components/Layout";

export default {
  name: "Home",
  components: {
    PaymentsDisplay,
    AddPaymentForm,
    Layout,
  },
  data() {
    return {
      paymentList: [],
    };
  },
  methods: {
    fetchData() {
      return [
        {
          date: "28/03/2020",
          category: "Food",
          value: 169,
        },
        {
          date: "24/03/2020",
          category: "Transport",
          value: 360,
        },
        {
          date: "21/03/2020",
          category: "Home",
          value: 532,
        },
      ];
    },
    addNewPayment(data) {
      this.paymentList = [...this.paymentList, data];
    },
  },
  created() {
    this.paymentList = this.fetchData();
  },
};
</script>
