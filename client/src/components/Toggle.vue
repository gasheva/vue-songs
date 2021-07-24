<template>
<!-- переключение темы - темная\светлая -->
  <div>
    <div class="switch">
      <label>
        {{ "Day" | localize }}
        <input
          type="checkbox"
          :checked="mode === 'dark' ? 'checked' : false"
          @change="toggleMode"
        />
        <span class="lever"></span>
        {{ "Night" | localize }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: "light",
    };
  },
  mounted() {
    this.mode = this.$store.getters.mode;
  },
  methods: {
    // сохранение выбранной темы
    toggleMode() {
      this.mode = this.mode === "dark" ? "light" : "dark";
      this.$store.commit("SET_MODE", this.mode);
    },
  },
};
</script>