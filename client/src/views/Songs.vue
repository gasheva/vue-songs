<template>
  <div>
    <loader v-if="loading" />
    <panel v-else :title="'Songs' | localize">
      <div slot="action">
        <input
          class="input-search"
          :class="mode"
          name=""
          id=""
          :placeholder="'Search' | localize"
          v-model="search"
        />
        <router-link
          :to="{ name: 'CreateSong' }"
          class="btn-floating large"
          :class="mode"
          ><i class="large material-icons">add</i></router-link
        >
      </div>
      <div class="container content">
        <ul class="link-list" v-if="items && items.length">
          <router-link
            v-for="song in items"
            :key="song.id"
            :to="{ name: 'Song', params: { id: song.id } }"
            custom
            v-slot="{ href, navigate }"
          >
            <li :class="mode">
              <a :href="href" @click="navigate" class="hoverable" :class="mode">
                {{ song.title }} - {{ song.artist }} -
                {{ song.album }}
              </a>
            </li>
          </router-link>
        </ul>
        <div v-else class="center">
          <span class="msg">{{ "NoSongs" | localize }}</span>
        </div>
      </div>
      <div class="inline-container">
      <paginate
        :class="mode"
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize"
        :next-text="'Forward' | localize"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
      <button class="btn waves-effect waves-light"
      @click="getBookmarked"
      v-if="isAuthenticated"
        >
        {{(bookmarked? "GetAll" : "GetAllBookmarked")|localize}}
      </button>
      </div>
    </panel>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import Panel from "../components/Panel.vue";
import pagenationMixin from "../mixins/paginate.mixins";
export default {
  components: { Panel },
  mixins: [pagenationMixin],
  computed: {
    ...mapGetters(["mode", "isAuthenticated"]),
  },
  data() {
    return {
      songs: [],
      search: this.$route.query.search || "",
      loading: true,
      bookmarked: false
    };
  },
  async mounted() {
    // запрос на получение песен
    try{
      await this.searchQueryHandler(this.search);
    } catch(err){
      return;
    }
    this.loading = false;
  },
  watch: {
    // создание задержки перед изменением параметра search в url
    search: _.debounce(async function (value) {
      if (this.search !== "") {
        this.$router.push({
          query: { ...this.$route.query, search: this.search },
        });
      } else {
        this.$router.push({ query: {} });
      }
    }, 700),
    // отслеживание изменения параметра search в url
    "$route.query.search": {
      // immediate: true,
      // deep: true,
      handler: async function(val){
        await this.searchQueryHandler(val);
        this.pageChangeHandler(1);
      }
    },
  },
  methods:{
    // получение песен при поиске
    async searchQueryHandler(value) { 
      this.search = value;
      this.songs = await this.$store.dispatch("getSongs", value);
      this.setupPagination(this.songs);
    },
    async getBookmarked(){
      console.log('getBookmarked');
      // получить все песни
      if (this.bookmarked){
        this.bookmarked = false;
        this.searchQueryHandler(this.search)
      }else{
        // получить только закладки
        this.bookmarked = true;
        this.songs = await this.$store.dispatch("getBookmarks", this.search);
      this.setupPagination(this.songs);
      }
      this.pageChangeHandler(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.link-list {
  & > li + li {
    margin: 1em 0;
  }
}
.content {
  padding: 1rem;
  border-radius: 0 0 15px 15px;
}
.msg {
  font-size: 1.5rem;
}
.btn-floating {
  position: relative;
  top: -4px;
  &.light {
    background-color: darken(rgb(34, 134, 134), 6%);
  }
  &.dark {
    background-color: darken(rgb(34, 134, 134), 20%);
  }
}
.input-search {
  height: 1.5rem;
  width: 15rem;
  padding: 5px;
  margin-right: 1rem;
  border-radius: 10px;
  &.light {
    background-color: white;
  }
  &.dark {
    background-color: #162424;
    color: white;
  }
}
.inline-container{
  display: flex;
  flex-direction: row;
  & button{
    margin-right: 1rem;
    white-space: pre-line;
    line-height: 1rem;
    font-size: 0.75rem !important;
  }
  & a{
    font-size: 0.75rem !important;
  }
}
</style>