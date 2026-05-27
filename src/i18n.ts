import { getLocaleFromNavigator, init, register } from "svelte-i18n";

register("en", () => import('@/locales/en.json'))
register("it", () => import('@/locales/it.json'))

init({
    fallbackLocale: "en",
    initialLocale: getLocaleFromNavigator()
})