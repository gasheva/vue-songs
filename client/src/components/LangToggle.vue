<template>
<!-- переключение языка -->
  <div>
    <div class="switch">
      <label>
        English
        <input
          type="checkbox"
          :checked="lang === 'ru-Ru' ? 'checked' : false"
          @change="toggleMode"
        />
        <span class="lever"></span>
        Русский
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: "en-Us",
    };
  },
  mounted() {
    this.lang = this.$store.getters.locale;
  },
  methods: {
    // сохранение выбранного языка
    toggleMode() {
      this.lang = this.lang === "ru-Ru" ? "en-Us" : "ru-Ru";
      this.$store.commit("SET_LOCALE", this.lang);
    },
  },
};
</script>