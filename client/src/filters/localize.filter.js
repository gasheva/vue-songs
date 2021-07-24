import store from '../store'
import ru from '../locales/ru.json'
import en from '../locales/en.json'

const locales = {
  'ru-Ru': ru,
  'en-Us': en
}

// локализация
export default function localizeFilter(key) {
  const locale = store.getters.locale || 'en-Us';
  return locales[locale][key] || `[Localize error]: key ${key} not found`
}