<template>
  <div class="layout" :class="mode">
    <Navbar :key="isAuthenticated" />
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import messages from "../plugins/messages";
import localize from "../filters/localize.filter";
import localizeFilter from '../filters/localize.filter';
export default {
  components: { Navbar },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    mode() {
      return this.$store.getters.mode;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  watch: {
    // отслеживание ошибок
    error(err) {
      if (!err) return;
      // показ ошибки при помощи плагина
      this.$error(localize(messages[err] || "SmthGotWrong"));
      this.$store.commit("CLEAR_ERROR");
    }
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;

  #{&}__content {
    height: 100%;
    width: 100%;
  }
}
.content {
  margin-top: 2rem;
}
.dark {
  background-color: rgb(22, 36, 36);
  color: white;
}
</style>