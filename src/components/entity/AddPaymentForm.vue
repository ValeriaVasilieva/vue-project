<template>
  <div class="content">
    <Button
      icon
      width="300px"
      text="Add new cost"
      @onClick="show = !show"
      v-show="!show"
    />
    <div v-show="show" class="form">
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
      <div class="btns">
        <Button
          class="btn"
          width="145px"
          text="Cancel"
          @onClick="onClickCloseForm"
        />
        <Button
          icon
          class="btn"
          width="145px"
          text="Add"
          @onClick="onClickAddCost"
        />
      </div>
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
      show: false,
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
      } else this.error = true;
    },
    onClickCloseForm() {
      this.error = false;
      this.amount = "";
      this.type = "";
      this.date = "";
      this.show = false;
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
      this.show = true;
    }
  },
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}
.btns {
  width: 100%;
  display: flex;
  justify-content: space-between;
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
