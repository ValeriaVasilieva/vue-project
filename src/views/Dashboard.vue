<template>
  <v-container>
    <v-row>
      <v-col>
        <h1 class="text-h5 text-sm-h3 mb-8 mt-8">My Personal Costs</h1>
        <AddPaymentDiolog />
        <PaymentsDisplay />
      </v-col>
      <v-col class="mt-16">
        <chart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentsDisplay from "@/components/entity/PaymentsDisplay";
import AddPaymentDiolog from "../components/entity/AddPaymentDiolog.vue";
import Chart from "../components/entity/Chart.vue";

export default {
  name: "Dashboard",
  components: {
    PaymentsDisplay,
    AddPaymentDiolog,
    Chart,
  },
};
</script>

<style scoped lang="scss"></style>
