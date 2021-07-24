import Api from "./Api";
export default {
  all() {
    return Api.ApiAuth().get('bookmarks');
  },
  index(search) {
    return Api.ApiAuth().get(`bookmarks`, {
      params: {
        search: search
      }
    });
  },
  get(songId) {
    console.log('Bookmark service');
    return Api.ApiAuth().get(`bookmarks/${songId}`);
  },
  delete(songId) {
    return Api.ApiAuth().delete(`bookmarks?song=${songId}`);
  },
  post(songId) {
    return Api.ApiAuth().post(`bookmarks?song=${songId}`);
  }
}