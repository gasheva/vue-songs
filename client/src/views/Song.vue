<template>
  <div>
    <div class="row" v-if="!loading">
      <div class="col s7 left-col">
        <panel :title="song.title">
          <div slot="action">
            <a @click="$router.go(-1)" class="btn-floating large" :class="mode"
              ><i class="material-icons large">arrow_back</i></a
            >
          </div>
          <div class="meta-container row">
            <div class="col s5">
              <p>{{'Artist'|localize}}: {{ song.artist }}</p>
              <p>{{'Genre'|localize}}: {{ song.genre }}</p>
              <p>{{'Album'|localize}}: {{ song.album }}</p>
              <p>{{'YoutubeID'|localize}}: {{ song.album }}</p>
            </div>
            <div class="col s7 img-wrapper">
              <img
                v-if="song.albumImage"
                :src="song.albumImage"
                alt="Album Image"
                class="materialboxed"
                width="70%"
                ref="img"
              />
            </div>
            <!-- кнопка закладки для аутентифицированных пользователей -->
            <button
              v-if="isAuthenticated"
              class="btn waves-effect waves-light right"
              :class="mode"
              @click="setBookmark"
            >
            {{(song.bookmark ? 'UnsetBookmark' : 'SetBookmark')|localize}}
            </button>
          </div>
        </panel>
      </div>
      <div class="col s5 right-col">
        <panel :title="'SongStructure'|localize">
          <div class="meta-container">
            <label for="tabs">{{'Tabs'|localize}}:</label>
            <textarea
              name=""
              id="tabs"
              rows="10"
              cols="50"
              v-model="song.tab"
              readonly
              :class="mode"
            />
            <label for="lyrics">{{'Lyrics'|localize}}:</label>
            <textarea
              name=""
              id="lyrics"
              rows="10"
              cols="50"
              v-model="song.lyrics"
              readonly
              :class="mode"
            />
          </div>
        </panel>
      </div>
    </div>
    <loader v-else />
  </div>
</template>

<script>
import Panel from "../components/Panel.vue";
import { mapGetters } from "vuex";
import M from "materialize-css";
export default {
  computed: {
    ...mapGetters(["mode", "isAuthenticated"]),
  },
  data() {
    return {
      song: null,
      img: null,
      loading: true,
    };
  },
  components: { Panel },
  async mounted() {
    const id = this.$route.params.id;
    const song = await this.$store.dispatch("getSong", id);
    console.log('song');
    console.log(song);
    if (this.isAuthenticated)
      song.bookmark = await this.$store.dispatch("getBookmark", id);
    console.log(song.bookmark);
    this.song = song;
    this.loading = false;

    setTimeout(() => {
      this.img = M.Materialbox.init(this.$refs.img);
    }, 1);
  },
  destroyed() {
    // очищение ресурсов
    if (this.img && this.img.destroyed) {
      this.img.destroyed();
    }
  },
  methods: {
    // назначение\удаление закладки
    async setBookmark() {
      if (this.song.bookmark) {
        const success = await this.$store.dispatch("deleteBookmark", this.song.id);
        if(success)this.song.bookmark = false;
      } else {
        const success = await this.$store.dispatch("postBookmark", this.song.id);
        if(success)this.song.bookmark = true;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.meta-container {
  border-radius: 0 0 15px 15px;
  padding: 1rem;
  border & textarea:first-of-type {
    margin-bottom: 0.5rem;
  }
  & .btn{
    right: 1rem;
  }
}
textarea {
  box-sizing: border-box;
  height: auto;
  resize: none;
  border-radius: 15px;
  border: 1px dashed #0b444a9e;
  padding: 0.5rem;
  &.dark {
    color: white;
    background-color: #415c5c;
  }
  &:focus {
    outline: none;
  }
}
.left-col {
  box-sizing: content-box;
  margin-right: -4rem;
}
.right-col {
  box-sizing: content-box;
}
.img-wrapper {
  height: 200px;
  overflow: hidden;
  & img {
    margin: auto;
  }
}
</style>