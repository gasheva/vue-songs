import M from 'materialize-css'

// плагин для вывода сообщений пользователю
export default {
  install(Vue) {
    Vue.prototype.$message = function (html) {
      M.toast({ html })
    }
    Vue.prototype.$error = function (html) {
      M.toast({ html: `Error! ${html}` });
    }
  }
}