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
      <Input placeholder="Payment Discription" v-model="type" />
      <Input type="number" placeholder="Payment Amount" v-model="amount" />
      <Input type="date" placeholder="Payment Date" v-model="date" />
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
      show: false,
      error: false,
    };
  },
  computed: {
    getCurrentDate() {
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      return `${day}.${month}.${year}`;
    },
  },
  methods: {
    onClickAddCost() {
      if (this.amount && this.type && this.date) {
        this.error = false;
        const data = {
          value: +this.amount,
          category: this.type,
          date: this.date
            .split("-")
            .reverse()
            .join("/"),
        };
        this.$emit("addNewPayment", data);
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
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
