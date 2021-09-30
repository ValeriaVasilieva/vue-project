import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categoriesList: [],
    pages: 0,
    isFetchListLoading: false,
    totalCosts: 0,
  },
  mutations: {
    setPaymentsListData(state, payload) {
      state.paymentsList = payload;
    },
    addDataToPaymentsList(state, payload) {
      state.paymentsList.push({ id: "?", ...payload });
      state.totalCosts = state.totalCosts + payload.amount;
    },
    setCategories(state, categories) {
      if (!Array.isArray(categories)) {
        categories = [categories];
      }
      state.categoriesList.push(...categories);
    },
    setCurrentPage(state, page) {
      state.page = page;
    },
    toggleLoading(state, value) {
      state.isFetchListLoading = value;
    },
    setTotalCosts(state, value) {
      state.totalCosts = value;
    },
    setPages(state, value) {
      state.pages = value;
    },
  },
  getters: {
    getPaymentsList: (state) => state.paymentsList,
    getFullPaymentValue: (state) => state.totalCosts,
    // state.paymentsList.reduce((acc, item) => acc + item.amount, 0),
    getCategoriesList: (state) => state.categoriesList,
    getLoading: (state) => state.isFetchListLoading,
    getPagesNumber: (state) => state.pages,
  },
  actions: {
    fetchData({ commit }, page) {
      commit("toggleLoading", true);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            page1: [
              { id: 1, date: "28/03/2020", category: "Food", amount: 169 },
              { id: 2, date: "24/03/2020", category: "Transport", amount: 569 },
              { id: 3, date: "21/03/2020", category: "Home", amount: 532 },
            ],
            page2: [
              {
                id: 4,
                date: "28/03/2020",
                category: "Entertaiment",
                amount: 541,
              },
              { id: 5, date: "24/03/2020", category: "Education", amount: 75 },
              { id: 6, date: "21/03/2020", category: "Sport", amount: 854 },
            ],
            page3: [
              {
                id: 7,
                date: "28/03/2020",
                category: "Navigation",
                amount: 456,
              },
              { id: 8, date: "24/03/2020", category: "Books", amount: 586 },
              { id: 9, date: "21/03/2020", category: "Boyfriend", amount: 258 },
            ],
            totalPages: 3,
            totalCosts: 4040,
          });
        }, 1000);
      }).then((res) => {
        commit("setPages", res.totalPages);
        commit("setTotalCosts", res.totalCosts);
        commit("setPaymentsListData", res[page]);
        commit("toggleLoading", false);
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
