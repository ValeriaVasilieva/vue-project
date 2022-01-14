<template>
  <div>
    <p>
      <strong style="color: #008b8b">Total Costs:</strong> {{ getTotalCosts }}$
    </p>
    <v-data-table
      :headers="headers"
      :items="paymentsList"
      class="elevation-1"
      @update:page="handleChangePage"
      @update:items-per-page="handleChangePage"
      :item-page="1"
      :options.sync="pagination"
      :server-items-length="totalCount"
      :loading="this.isLoading"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "PaymentsDisplay",
  components: {},
  data() {
    return {
      isEditMenuOpen: Number,
      headers: [
        { text: "#", value: "id" },
        { text: "Date", value: "date" },
        { text: "Category", value: "category" },
        { text: "Amount, $", value: "amount" },
        { text: "", value: "actions", sortable: false },
      ],
      pagination: {
        page: 1,
        itemsPerPage: 5,
      },
    };
  },
  computed: {
    ...mapGetters({
      paymentsList: "getPaymentsList",
      totalCount: "getTotalCount",
      isLoading: "getLoading",
      page: "getPage",
    }),
    getTotalCosts() {
      return this.$store.getters.getFullPaymentValue;
    },
  },
  methods: {
    ...mapMutations([
      "setCurrentPage",
      "setPage",
      "setEditItem",
      "setIsDialogOpen",
    ]),
    ...mapActions({
      fetchListData: "getPaymentListFromAPI",
      deletePayment: "deletePayment",
    }),
    handleChangePage() {
      const top = this.pagination.itemsPerPage;
      const skip = (this.pagination.page - 1) * this.pagination.itemsPerPage;
      this.fetchListData({ top, skip });
    },
    deleteItem(item) {
      this.deletePayment(item.id);
    },
  },
  created() {
    this.fetchListData({ top: 5, skip: 0 });
  },
};
</script>

<style scoped lang="scss"></style>
