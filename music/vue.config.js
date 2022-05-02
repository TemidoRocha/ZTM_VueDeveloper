const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  },

  pwa: {
    name: 'Music App',
    themeColor: '#ff5e3a',
    manifestOptions: {
      // If the following attributes are not defined in the object,
      // the options of pwa or default options will be used instead.
      // name: pwa.name,
      short_name: 'Music',
      // start_url: '.',
      display: 'standalone',
      // theme_color: pwa.themeColor,
    }
  }
});
