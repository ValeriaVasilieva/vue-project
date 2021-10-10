<template>
  <div class="contentPaymentForm">
    <div class="form">
      <label>
        Payment Discription
        <input class="select" type="text" list="category" v-model="type" />
        <datalist id="category">
          <option
            v-for="(option, idx) in getCategoriesList"
            :value="option"
            :key="idx"
          >
            {{ option }}
          </option>
        </datalist>
      </label>
      <Input type="number" v-model="amount" label="Payment Amount, $" />
      <Input type="date" v-model="date" label="Payment Date" />
      <Button
        icon
        class="btn"
        width="100%"
        title="Add"
        @onClick="onClickAddCost"
      />
      <ErrorMessage v-show="error" text="Fill in all the fields" />
    </div>
  </div>
</template>

<script>
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "AddPaymentForm",
  components: {
    Button,
    Input,
    ErrorMessage,
  },
  data() {
    return {
      amount: "",
      type: "",
      date: "",
      id: "",
      error: false,
    };
  },
  computed: {
    ...mapGetters(["getCategoriesList"]),
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
    ...mapActions({ fetchCategories: "loadCategories" }),
    onClickAddCost() {
      if (this.amount && this.type) {
        this.error = false;
        const data = {
          amount: +this.amount,
          category: this.type,
          date:
            this.date
              .split("-")
              .reverse()
              .join("/") || this.getCurrentDate,
        };
        this.addPayment(data);
        this.$modal.hide();
      } else this.error = true;
    },
  },
  mounted() {
    if (!this.getCategoriesList.length) {
      this.fetchCategories();
    }
  },
  created() {
    if (this.$route.path.split("/")[1] === "add") {
      this.type = this.$route.params.category || "";
      this.amount = +this.$route.query.value || "";
    }
  },
};
</script>

<style scoped lang="scss">
.contentPaymentForm {
  display: flex;
  flex-direction: column;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.select {
  margin: 15px 0;
  padding: 10px;
  box-sizing: border-box;
  width: 300px;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
  border: none;
}
label {
  text-align: left;
}
</style>
