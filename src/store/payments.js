import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoriesList: [],
    totalCount: 0,
    editItem: {},
    totalAmount: 0,
    isFetchListLoading: false,
    isDialogOpen: false,
  },
  mutations: {
    setPaymentsListData(state, payload) {
      state.paymentsList = payload;
    },
    addDataToPaymentsList(state, payload) {
      state.paymentsList.push({ id: payload.id, ...payload });
      state.totalCosts = state.totalCosts + payload.amount;
    },
    setCategories(state, categories) {
      if (!Array.isArray(categories)) {
        categories = [categories];
      }
      state.categoriesList = categories;
    },
    toggleLoading(state, value) {
      state.isFetchListLoading = value;
    },
    setTotalAmount(state, value) {
      state.totalAmount = value;
    },
    setTotalCount(state, value) {
      state.totalCount = value;
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
    setIsDialogOpen(state, value) {
      state.isDialogOpen = value;
    },
  },
  getters: {
    getPaymentsList: (state) => state.paymentsList,
    getFullPaymentValue: (state) => state.totalAmount,
    getCategoriesList: (state) => state.categoriesList,
    getLoading: (state) => state.isFetchListLoading,
    getTotalCount: (state) => state.totalCount,
    getEditItem: (state) => state.editItem,
    getIsDialogOpen: (state) => state.isDialogOpen,
  },
  actions: {
    getPaymentListFromAPI({ commit }, data) {
      commit("toggleLoading", true);
      fetch(
        `http://localhost:3003/api/paymentlist?top=${data.top}&skip=${data.skip}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((jsondata) => {
          setTimeout(() => {
            commit("setPaymentsListData", jsondata.items);
            commit("setTotalCount", jsondata.totalCount);
            commit("setTotalAmount", jsondata.totalAmount);
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
            dispatch("getPaymentListFromAPI", { top: 5, skip: 0 });
            commit("toggleLoading", false);
          } else console.error("error");
        });
    },
    // editPayment({ commit, dispatch }, body) {
    //   commit("toggleLoading", true);
    //   fetch(`http://localhost:3003/api/paymentlist/${body.id}`, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    //   })
    //     .then((response) => response.json())
    //     .then((res) => {
    //       if (res.result === 1) {
    //         commit("clearList");
    //         const curentPage = this.state.page;
    //         this.state.page = 0;
    //         dispatch("getPaymentListFromAPI", curentPage);
    //         commit("toggleLoading", false);
    //       } else console.error("error");
    //     });
    // },
    deletePayment({ commit, dispatch }, id) {
      fetch(`http://localhost:3003/api/paymentlist/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.result === 1) {
            dispatch("getPaymentListFromAPI", { top: 5, skip: 0 });
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
