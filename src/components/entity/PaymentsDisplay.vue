<template>
  <div class="content">
    <p><strong>Total Costs:</strong> {{ getTotalCosts }}$</p>
    <div class="payment table-header">
      <p>#</p>
      <p>Date</p>
      <p>Category</p>
      <p>Value</p>
    </div>
    <p v-if="this.isLoading">...Loading</p>
    <div v-if="!this.isLoading">
      <div class="payment" v-for="(item, idx) in paymentsList" :key="idx">
        <p>{{ item.id }}</p>
        <p>{{ item.date }}</p>
        <p>{{ item.category }}</p>
        <p>{{ item.amount }}$</p>
      </div>
    </div>
    <div class="pagination">
      <button
        class="pagination__button"
        v-for="n in pages"
        :key="n"
        @click="handleChangePage"
      >
        {{ n }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
      pages: "getPagesNumber",
      isLoading: "getLoading",
    }),
    getTotalCosts() {
      return this.$store.getters.getFullPaymentValue;
    },
  },
  methods: {
    ...mapMutations(["setCurrentPage"]),
    ...mapActions({
      fetchListData: "fetchData",
    }),
    handleChangePage(e) {
      const page = `${"page" + e.target.textContent}`.split(" ").join("");
      console.log(page);
      this.fetchListData(page);
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  width: 500px;
}
.payment {
  width: 490px;
  display: grid;
  grid-template-columns: 40px repeat(3, 150px);
  grid-template-rows: auto;
  text-align: left;
  border-bottom: 1px solid lightgray;
}
.table-header {
  font-weight: 700;
}
.pagination {
  display: flex;
  justify-content: center;
  &__button {
    width: 25px;
    height: 25px;
    margin: 15px 5px;
    background-color: white;
    border: none;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
}
</style>
