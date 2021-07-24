<template>
  <div class="row">
    <div class="col s7 left-col">
      <panel :title="'SongMetadata' | localize">
        <div class="meta-container">
          <div>
            <div class="input-field" :class="mode">
              <label for="title">{{ "Title" | localize }}*:</label>
              <input type="text" name="" id="title" v-model.trim="title" />
              <small v-if="$v.title.$dirty && !$v.title.required"
                >{{ "RequiredField" | localize }}!</small
              >
            </div>
            <div class="input-field" :class="mode">
              <label for="artist">{{ "Artist" | localize }}:</label>
              <input type="text" name="" id="artist" v-model.trim="artist" />
            </div>
            <div class="input-field" :class="mode">
              <label for="genre">{{ "Genre" | localize }}:</label>
              <input type="text" name="" id="genre" v-model.trim="genre" />
            </div>
            <div class="input-field" :class="mode">
              <label for="album">{{ "Album" | localize }}:</label>
              <input type="text" name="" id="album" v-model.trim="album" />
            </div>
            <div class="input-field" :class="mode">
              <label for="album-image">{{ "AlbumImageURL" | localize }}:</label>
              <input
                type="text"
                name=""
                id="album-image"
                v-model.trim="albumImage"
              />
            </div>
            <div class="input-field" :class="mode">
              <label for="youtube-id">{{ "YoutubeID" | localize }}:</label>
              <input
                type="text"
                name=""
                id="youtube-id"
                v-model.trim="youtubeId"
              />
            </div>
          </div>
          <div>
            <div class="card-action">
              <div class="clearfix">
                <button
                  class="btn waves-effect waves-light right"
                  :class="mode"
                  type="submit"
                  @click.prevent="submitHandler"
                >
                  {{ "Create" | localize }}
                  <i class="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </panel>
    </div>
    <div class="col s5 right-col">
      <panel :title="'SongStructure' | localize">
        <div class="meta-container">
          <label for="tabs">{{ "Tabs" | localize }}:</label>
          <textarea
            name=""
            id="tabs"
            rows="10"
            cols="50"
            v-model="tab"
            :class="mode"
          />
          <label for="lyrics">{{ "Lyrics" | localize }}:</label>
          <textarea
            name=""
            id="lyrics"
            rows="10"
            cols="50"
            v-model="lyrics"
            :class="mode"
          />
        </div>
      </panel>
    </div>
  </div>
</template>

<script>
import Panel from "../components/Panel.vue";
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import messages from '../plugins/messages';
import localize from '../filters/localize.filter';
export default {
  computed: {
    ...mapGetters(["mode"]),
  },
  components: { Panel },
  data() {
    return {
      title: "",
      artist: "",
      genre: "",
      album: "",
      albumImage: "",
      youtubeId: "",
      tab: "",
      lyrics: "",
    };
  },
  validations: {
    title: { required },
  },
  methods: {
    // подтверждение заполнения формы
    async submitHandler() {
      this.$v.$touch();
      if (this.$v.$error) {
        return;
      }
      try {
        const success = await this.$store.dispatch("postSong", {
          title: this.title,
          artist: this.artist,
          genre: this.genre,
          album: this.album,
          albumImage: this.albumImage,
          youtubeId: this.youtubeId,
          tab: this.tab,
          lyrics: this.lyrics,
        });
        success && this.$router.push({ name: "Songs" });
      } catch (e) {
        this.$error(localize(messages['CreateSongFail']));
        console.log(e);
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
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
}
.left-col {
  box-sizing: content-box;
  margin-right: -4rem;
}
.right-col {
  box-sizing: content-box;
}
</style>