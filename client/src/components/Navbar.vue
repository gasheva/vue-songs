<template>
  <div class="navbar-fixed">
    <nav class="navbar" :class="mode">
      <div class="container nav-wrapper">
        <a href="" class="brand-logo left">Logo</a>
        <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger" data-target="dropdown" ref="dropdown">
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li v-if="!isAuthenticated">
                <router-link :to="{ name: 'Login' }">{{
                  "Login" | localize
                }}</router-link>
              </li>
              <li v-if="!isAuthenticated">
                <router-link :to="{ name: 'Register' }">{{
                  "SignUp" | localize
                }}</router-link>
              </li>
              <li v-if="isAuthenticated" @click="$store.dispatch('logout')">
                <a href="">{{ "Logout" | localize }}</a>
              </li>
              <li>
                <Toggle />
              </li>
              <li>
                <LangToggle />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import Toggle from "./Toggle.vue";
import LangToggle from "./LangToggle.vue";
import { mapGetters } from "vuex";
import M from "materialize-css";
export default {
  components: { Toggle, LangToggle },
  computed: {
    ...mapGetters(["mode", "isAuthenticated"]),
  },
  data() {
    return {
      dropdown: null,
    };
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
    });
  },
  destroyed() {
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
nav {
  background-color: rgb(34, 134, 134);
}
nav.dark {
  background-color: darken(rgb(34, 134, 134), 15%);
}
</style>