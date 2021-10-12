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
        v-if="!Object.keys(this.getEditItem).length"
        class="btn"
        width="100%"
        title="Add"
        @onClick="onClickAddCost"
      />
      <Button
        v-if="Object.keys(this.getEditItem).length"
        class="btn"
        width="100%"
        title="Edit"
        @onClick="onClickEditCost"
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
    ...mapGetters(["getCategoriesList", "getEditItem"]),
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
      clearEditItem: "clearEditItem",
    }),
    ...mapActions({
      fetchCategories: "loadCategories",
      addNewPayment: "addPayment",
      editPayment: "editPayment",
    }),
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
        // this.addPayment(data);
        this.addNewPayment(data);
        this.$modal.hide();
      } else this.error = true;
    },
    onClickEditCost() {
      const editedItem = {
        id: this.getEditItem.id,
        amount: +this.amount,
        category: this.type,
        date:
          this.date
            .split("-")
            .reverse()
            .join("/") || this.getCurrentDate,
      };
      this.editPayment(editedItem);
      this.$modal.hide();
      this.clearEditItem();
    },
  },
  mounted() {
    if (!this.getCategoriesList.length) {
      this.fetchCategories();
    }
    if (Object.keys(this.getEditItem).length) {
      console.log(this.getEditItem);
      this.amount = this.getEditItem.amount.toString();
      this.type = this.getEditItem.category;
    }
  },
  created() {
    if (this.$route.path.split("/")[1] === "add") {
      this.type = this.$route.params.category || "";
      this.amount = this.$route.query.value || "";
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
