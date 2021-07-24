import Api from "./Api";

export default {
  all() {
    return Api.Api().get('songs');
  },
  get(id) {
    return Api.Api().get(`songs/${id}`);
  },
  index(search) {
    return Api.Api().get(`songs`, {
      params: {
        search: search
      }
    });
  },
  post(song) {
    return Api.Api().post('songs', song);
  }
}