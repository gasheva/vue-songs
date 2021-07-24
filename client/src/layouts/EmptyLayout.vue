<template>
  <div class="layout empty" :class="mode">
    <div class="container layout__content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import messages from "../plugins/messages";
import localize from "../filters/localize.filter";
export default {
  computed: {
    ...mapGetters(["mode"]),
    error() {
      return this.$store.getters.error;
    },
  },
  watch: {
    // отслеживание ошибок
    error(err) {
      if (!err) return;
      // показ ошибки при помощи плагина
      this.$error(localize(messages[err] || "SmthGotWrong"));
      this.$store.commit("CLEAR_ERROR");
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;

  #{&}__content {
    margin-top: -10rem;
  }
}
.content {
  margin-top: 10px;
}
.empty {
  background-color: gainsboro;
}
.dark {
  background-color: #162424;
}
</style>