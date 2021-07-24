import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import song from './song'
import bookmark from './bookmark'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,    // последняя возникшая ошибка при работе с сервером
    mode: localStorage.getItem('mode'),   // тема - светлая\темная
    locale: localStorage.getItem('locale')  // выбранный язык
  },
  mutations: {
    SET_ERROR(state, error){
      state.error = null;
      state.error = error;
    },
    CLEAR_ERROR(state){
      state.error = null;
    },
    SET_MODE(state, mode){
      localStorage.setItem('mode', mode)
      state.mode = mode;
    },
    SET_LOCALE(state, locale){
      localStorage.setItem('locale', locale)
      state.locale = locale;
    }
  },
  getters:{
    error: (s)=>s.error, 
    mode: (s)=>s.mode,
    locale: (s)=>s.locale
  },
  modules: {
    auth,
    song,
    bookmark
  }
})
