<template>
  <div class="content">
    <div class="links">
      <a class="regular" href="/add/Food?value=200">Add Food = 200$</a>
      <a class="regular" href="/add/Transport?value=50">Add Transport = 50$</a>
      <a class="regular" href="/add/Entertainment?value=2000"
        >Add Entertainment = 2000$</a
      >
    </div>
    <p>
      <strong style="color: #008b8b">Total Costs:</strong> {{ getTotalCosts }}$
    </p>
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
        <div class="edit">
          <button
            class="edit-menu"
            @click="onClickContextItem($event, item)"
          ></button>
        </div>
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
  name: "PaymentsDisplay",
  components: {},
  data() {
    return {
      isEditMenuOpen: Number,
    };
  },
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
      this.fetchListData(page);
    },
    onClickContextItem(event, item) {
      const items = [
        {
          text: "Edit",
          action: () => {
            console.log("edit", item);
          },
        },
        {
          text: "Remove",
          action: () => {
            this.actionDelete(item.id);
          },
        },
      ];
      this.$context.show({ event, items });
    },
    actionDelete(id) {
      console.log(id);
      // mutation deleteItem
      this.$context.close();
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
  grid-template-columns: 40px repeat(3, 150px) 20px;
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
.regular {
  text-decoration: none;
  color: black;
  display: block;
  margin: 10px 0;
  &:hover {
    color: #008b8b;
  }
}
.edit {
  position: relative;
}
.edit-menu {
  margin-left: -30px;
  padding-top: 15px;
  border: none;
  background-color: white;
  cursor: pointer;
  &:after {
    content: "\FE19";
    font-size: 20px;
  }
}
</style>
