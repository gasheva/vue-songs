export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 2,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    // задание начальных значений пагинатора
    setupPagination(allItems) {
      //chunks
      this.allItems = [];
      while (allItems.length > this.pageSize) {
        this.allItems.push(allItems.splice(0, this.pageSize));
      }
      if (allItems.length > 0)
        this.allItems.push(allItems);

      this.pageCount = this.allItems.length;
      this.items = this.allItems[this.page - 1] || this.allItems[0];
    },
    // хандлер изменения выбранной страницы
    pageChangeHandler(page) {
      const query = this.$route.query.search?`?search=${this.$route.query.search}&`:'?';
      this.$router.push(`${this.$route.path}${query}page=${page}`);
      this.items = this.allItems[page - 1] || this.allItems[0];
      this.page = page;
    }
  }
}