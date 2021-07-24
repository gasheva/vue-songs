<template>
  <panel :title="'Registration' | localize">
    <form @submit.prevent="submitHandler" :class="mode">
      <div>
        <div class="input-field">
          <label for="user-email">{{ "Email" | localize }}:</label>
          <input
            type="email"
            name=""
            id="user-email"
            v-model="email"
            :class="mode"
          />
          <small v-if="$v.email.$dirty && $v.email.required">{{
            "EnterEmail" | localize
          }}</small>
        </div>
        <div class="input-field">
          <label for="user-password">{{ "Password" | localize }}:</label>
          <input
            type="password"
            name=""
            id="user-password"
            v-model="password"
            :class="mode"
          />
          <small v-if="$v.password.$dirty && !$v.password.required">{{
            "EnterPassword" | localize
          }}</small>
          <small v-else-if="$v.password.$dirty && !$v.password.minLength"
            >{{ "PasswordLengthShouldBeMoreThan" | localize }}
            {{ $v.password.minLength.min }}</small
          >
        </div>
      </div>
      <div>
        <div class="card-action">
          <div>
            <button
              class="btn waves-effect waves-light auth-submit right"
              :class="mode"
              type="submit"
            >
              {{ "SignUp" | localize }}
              <i class="material-icons right">send</i>
            </button>
          </div>

          <p class="center">
            {{ "HaveAccount" | localize }}?
            <router-link :to="{ name: 'Login' }"
              >{{ "Enter" | localize }}!</router-link
            >
          </p>
        </div>
      </div>
    </form>
  </panel>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import Panel from "../components/Panel.vue";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["mode"]),
  },
  components: { Panel },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(8) },
  },
  methods: {
    // подтверждение заполнения формы
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      try {
        await this.$store.dispatch("register", {
          email: this.email,
          password: this.password,
        });
        if(this.$store.getters.isAuthenticated)
          this.$router.push({ name: "Home" });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
form {
  border-radius: 0 0 15px 15px;
  padding: 1rem;
  background-color: white;
  &.dark {
    background-color: #415c5c;
  }
}
.card-action {
  padding-top: 1rem;
  & p:last-child {
    margin-top: 3.5rem;
    clear: right;
  }
}
</style>