import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: {},
    categoriesList: [],
    pages: 0,
    page: 1,
    editItem: {},
    totalAmount: 0,
    isFetchListLoading: false,
  },
  mutations: {
    setPaymentsListData(state, payload) {
      const items = state.paymentsList;
      Object.assign(items, payload);
    },
    addDataToPaymentsList(state, payload) {
      state.paymentsList.push({ id: payload.id, ...payload });
      state.totalCosts = state.totalCosts + payload.amount;
    },
    setCategories(state, categories) {
      if (!Array.isArray(categories)) {
        categories = [categories];
      }
      state.categoriesList.push(...categories);
    },
    toggleLoading(state, value) {
      state.isFetchListLoading = value;
    },
    setTotalAmount(state, value) {
      state.totalAmount = value;
    },
    setPages(state, value) {
      state.pages = value;
    },
    setPage(state, value) {
      state.page = value;
    },
    clearList(state) {
      state.paymentsList = {};
    },
    setEditItem(state, item) {
      state.editItem = item;
    },
    clearEditItem(state) {
      state.editItem = {};
    },
  },
  getters: {
    getPaymentsList: (state) => state.paymentsList,
    getFullPaymentValue: (state) => state.totalAmount,
    getCategoriesList: (state) => state.categoriesList,
    getLoading: (state) => state.isFetchListLoading,
    getPagesNumber: (state) => state.pages,
    getPage: (state) => state.page,
    getEditItem: (state) => state.editItem,
  },
  actions: {
    getPaymentListFromAPI({ commit }, page) {
      commit("toggleLoading", true);
      fetch(`http://localhost:3003/api/paymentlist?page=${page}`, {
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((jsondata) => {
          setTimeout(() => {
            commit("setPaymentsListData", { [page]: jsondata.items });
            commit("setPages", jsondata.totalPages);
            commit("setTotalAmount", jsondata.totalAmount);
            commit("setPage", page);
            commit("toggleLoading", false);
          }, 1000);
        });
    },
    addPayment({ commit, dispatch }, body) {
      commit("toggleLoading", true);
      fetch("http://localhost:3003/api/paymentlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.result === 1) {
            commit("clearList");
            dispatch("getPaymentListFromAPI", 1);
            dispatch("getPaymentListFromAPI", this.state.pages);
            commit("toggleLoading", false);
          } else console.error("error");
        });
    },
    editPayment({ commit, dispatch }, body) {
      commit("toggleLoading", true);
      fetch(`http://localhost:3003/api/paymentlist/${body.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.result === 1) {
            commit("clearList");
            const curentPage = this.state.page;
            this.state.page = 0;
            dispatch("getPaymentListFromAPI", curentPage);
            commit("toggleLoading", false);
          } else console.error("error");
        });
    },
    deletePayment({ commit, dispatch }, id) {
      fetch(`http://localhost:3003/api/paymentlist/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.result === 1) {
            commit("clearList");
            const curentPage = this.state.page;
            this.state.page = 0;
            dispatch("getPaymentListFromAPI", curentPage);
            commit("toggleLoading", false);
          } else console.error("error");
        });
    },
    loadCategories({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Food", "Transport", "Education", "Entertainment"]);
        }, 1000);
      }).then((res) => {
        commit("setCategories", res);
      });
    },
  },
});
