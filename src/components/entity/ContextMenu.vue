<template>
  <div class="context" v-if="shown" :style="styles">
    <div
      :class="setClassButton(item.text)"
      class="context__item"
      v-for="item in items"
      :key="item.text"
      @click="onCLick(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      items: [],
      shown: false,
      xPos: 0,
      yPos: 0,
    };
  },
  methods: {
    onCLick(item) {
      item.action();
    },
    onShown({ items, caller }) {
      this.items = items;
      this.shown = true;
      this.setPosition(caller);
    },
    onClose() {
      this.items = [];
      this.shown = false;
    },
    setPosition(caller) {
      const pos = caller.getBoundingClientRect();
      this.xPos = pos.left;
      this.yPos = pos.top;
    },
    setClassButton(name) {
      if (name === "Edit") {
        return "edit-icon";
      } else if (name === "Remove") {
        return "remove-icon";
      } else return;
    },
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos + 50}px`,
        left: `${this.xPos - 55}px`,
      };
    },
  },
  mounted() {
    this.$context.EventBus.$on("shown", this.onShown);
    this.$context.EventBus.$on("close", this.onClose);
  },
  beforeDestroy() {
    this.$context.EventBus.$off("shown", this.onShown);
    this.$context.EventBus.$off("close", this.onClose);
  },
};
</script>

<style lang="scss" scoped>
.context {
  position: absolute;
  background: white;
  border: 1px solid lightgrey;
  box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.3);
  padding: 10px;

  &::after {
    background-color: white;
    content: "";
    display: block;
    border-top: 1px solid lightgrey;
    border-left: 1px solid lightgrey;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    position: absolute;
    top: -6px;
    right: 29px;
    z-index: 1;
  }
}
.edit-icon {
  cursor: pointer;
  &::before {
    content: "\270E";
    padding-right: 4px;
  }
  &:hover {
    color: #008b8b;
  }
}
.remove-icon {
  cursor: pointer;
  &::before {
    content: "\2626";
    font-size: 20px;
    padding-right: 8px;
  }
  &:hover {
    color: #008b8b;
  }
}
</style>
