<template>
  <div>
    <div class="payment table-header">
      <p>#</p>
      <p>Date</p>
      <p>Category</p>
      <p>Value</p>
    </div>
    <div class="payment" v-for="(item, idx) in items" :key="idx">
      <p>{{ 1 }}</p>
      <p>{{ item.date }}</p>
      <p>{{ item.category }}</p>
      <p>{{ item.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped lang="scss">
.payment {
  width: 490px;
  display: grid;
  grid-template-columns: 40px repeat(3, 150px);
  grid-template-rows: auto;
  text-align: left;
  border-bottom: 1px solid lightgray;
}
.table-header {
  font-weight: 700;
}
</style>
