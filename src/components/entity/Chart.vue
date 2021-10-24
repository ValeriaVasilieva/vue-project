<script>
import { Doughnut } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  extends: Doughnut,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: "Payments",
          data: [],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(54, 205, 86)",
            "rgb(67, 87, 235)",
          ],
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  computed: {
    ...mapGetters(["getPaymentsList"]),
  },
  created() {
    this.chartdata.labels = [
      ...this.getPaymentsList.map((payment) => payment.category),
    ];
    this.chartdata.datasets[0].data = [
      ...this.getPaymentsList.map((payment) => payment.amount),
    ];
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
