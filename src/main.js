import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/payments";
import modal from "./plugins/ModalWindow";
import context from "./plugins/ContextMenu";

Vue.config.productionTip = false;
Vue.use(modal);
Vue.use(context);

new Vue({
  router,
  store,
  modal,
  context,
  render: (h) => h(App),
}).$mount("#app");
