<template>
  <v-dialog v-model="dialog" width="400">
    <template v-slot:activator="{ on }">
      <v-btn color="teal" dark v-on="on" @click="dialog = !dialog"
        >Add Payment <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card class="pa-6">
      <v-btn @click="dialod = false" :ripple="false" plain class="btn"
        ><v-icon color="teal">mdi-window-close</v-icon></v-btn
      >
      <v-select
        v-model="category"
        label="Category"
        :items="getCategoriesList"
      ></v-select>
      <v-text-field v-model.number="amount" label="Value"></v-text-field>
      <v-menu
        v-model="datePicker"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        width="300"
        max-width="290px"
        min-width="auto"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            label="From Date"
            readonly
            :value="date"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          locale="en-in"
          v-model="dateValue"
          no-title
          @input="convertDate"
        ></v-date-picker>
      </v-menu>
      <v-btn @click="addPayment" color="teal" plain>Add Payment</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  name: "AddPaymentDiolog",
  data() {
    return {
      dialog: false,
      date: "",
      category: "",
      amount: 0,
      datePicker: false,
      dateValue: null,
    };
  },
  computed: {
    ...mapGetters(["getCategoriesList", "getIsDialogOpen"]),
    getCurrentDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${day}/${month}/${year}`;
    },
  },
  methods: {
    ...mapMutations({
      addPayment: "addDataToPaymentsList",
    }),
    ...mapActions({
      fetchCategories: "loadCategories",
      addNewPayment: "addPayment",
    }),
    convertDate() {
      this.datePicker = false;
      this.date = this.dateValue
        .split("-")
        .reverse()
        .join("/");
    },
    addPayment() {
      this.dialog = false;
      const request = {
        date: this.date,
        category: this.category,
        amount: this.amount,
      };
      this.addNewPayment(request);
    },
  },
  mounted() {
    if (!this.getCategoriesList.length) {
      this.fetchCategories();
    }
  },
};
</script>

<style scoped lang="scss">
.btn {
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
