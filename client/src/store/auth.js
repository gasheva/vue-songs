import AuthenticationService from '@/services/AuthenticationService.js'
export default {
  state: {
    token: localStorage.getItem('token') || ''
  },
  getters: {
    isAuthenticated: state => !!state.token,
    token: state => state.token
  },
  mutations: {
    SET_TOKEN(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    CLEAR_TOKEN(state) {
      localStorage.removeItem('token');
      state.token = '';
    }
  },
  actions: {
    async register({ commit }, { email, password }) {
      console.log('[x] register');
      try {
        const resp = await AuthenticationService.register({
          email, password
        });
        commit('SET_TOKEN', resp.data.token);
      } catch (err) {
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    async login({ commit }, { email, password }) {
      console.log('[x] login');
      try {
        const resp = await AuthenticationService.login({
          email, password
        });
        commit('SET_TOKEN', resp.data.token);
      } catch (err) {
        if (err.message && err.message === "Network Error")
          commit('SET_ERROR', err.message);
        else
          commit('SET_ERROR', err.response.data.msg);
      }
    },
    logout({ commit }) {
      console.log('[x] logout');
      commit('CLEAR_TOKEN');
    }
  }
}