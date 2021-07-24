<template>
<!-- обрамление форм -->
  <div class="container panel z-depth-3" :class="mode">
    <div class="panel__title" :class="mode">
      <h4 class="left white-text title">{{ title }}</h4>
      <div class="button-action right">
        <slot name="action" />
      </div>
    </div>
    <slot>No info</slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["title"],
  computed: {
    ...mapGetters(["mode"]),
  },
};
</script>

<style lang="scss" scoped>
.panel {
  min-height: 15rem;
  border: 1px solid rgb(21, 12, 44);
  border-radius: 15px;
  #{&}__title {
    height: 5rem;
    padding: 0 1rem;
    text-align: center;
    border-radius: 15px 15px 0 0;
  }
  #{&}__title.light {
    background-color: rgb(34, 134, 134);
  }
  #{&}__title.dark {
    background-color: darken(rgb(34, 134, 134), 15%);
  }
}
.button-action {
  margin-top: 1rem;
  &.light {
    background-color: rgb(34, 134, 134);
  }
  &.dark {
    background-color: darken(rgb(34, 134, 134), 15%);
  }
}
.title {
  font-size: 1.5rem;
}
.dark {
  background-color: darkslategray;
}
</style>