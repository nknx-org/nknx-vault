/**
 * By default, Nuxt.js is configured to cover most use cases.
 * This default configuration can be overwritten in this file
 * @link {https://nuxtjs.org/guide/configuration/}
 */
require('dotenv').config()

module.exports = {
  mode: 'spa', // or 'universal'
  head: {
    title: 'nknx-vault',
    link: [
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i|Rubik:300,400,500,700,900&display=swap'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/feather.css',
    '@/assets/scss/main.scss'
  ],
  loading: false,
  plugins: [
    '~plugins/i18n',
    '~plugins/v-tooltip',
    '~plugins/filters',
    '~plugins/pusher'
  ],
  modules: [
    '@nuxtjs/style-resources',
    'nuxt-svg-loader',
    '@nuxtjs/axios',
    'nuxt-clipboard2',
    '@nuxtjs/dotenv',
    [
      '@nuxtjs/moment',
      {
        locales: [
          'de',
          'ru',
          'fr',
          'tr',
          'es',
          'nl',
          'hu',
          'ja',
          'fi',
          'vi',
          'sk',
          'zh-cn'
        ],
        defaultLocale: 'en'
      }
    ],
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'en',
        locales: [
          {
            name: 'English',
            code: 'en',
            iso: 'en-US',
            flag: 'us',
            file: 'en-US.js'
          },
          {
            name: 'Deutsch',
            code: 'de',
            iso: 'de-DE',
            flag: 'de',
            file: 'de-DE.js'
          },
          {
            name: 'Русский',
            code: 'ru',
            iso: 'ru-RU',
            flag: 'ru',
            file: 'ru-RU.js'
          },
          {
            name: 'Nederlands',
            code: 'nl',
            iso: 'nl-NL',
            flag: 'nl',
            file: 'nl-NL.js'
          },
          {
            name: 'Français',
            code: 'fr',
            iso: 'fr-FR',
            flag: 'fr',
            file: 'fr-FR.js'
          },
          {
            name: 'Magyar',
            code: 'hu',
            iso: 'hu-HU',
            flag: 'hu',
            file: 'hu-HU.js'
          },
          {
            name: 'Türkçe',
            code: 'tr',
            iso: 'tr-TR',
            flag: 'tr',
            file: 'tr-TR.js'
          },
          {
            name: 'Español',
            code: 'es',
            iso: 'es-ES',
            flag: 'es',
            file: 'es-ES.js'
          },
          {
            name: 'Slovenčina',
            code: 'sk',
            iso: 'sk-SK',
            flag: 'sk',
            file: 'sk-SK.js'
          },
          {
            name: 'Suomi',
            code: 'fi',
            iso: 'fi-FI',
            flag: 'fi',
            file: 'fi-FI.js'
          },
          {
            name: 'Tiếng Việt',
            code: 'vi',
            iso: 'vi-VI',
            flag: 'vn',
            file: 'vi-VI.js'
          },
          {
            name: '日本語',
            code: 'ja',
            iso: 'ja-JA',
            flag: 'jp',
            file: 'ja-JA.js'
          },
          {
            name: '中文',
            code: 'zh',
            iso: 'zh-CN',
            flag: 'cn',
            file: 'zh-CN.js'
          }
        ],
        lazy: true,
        langDir: 'lang/'
      }
    ]
  ],
  styleResources: {
    scss: [
      '~/assets/scss/_app.variables.scss',
      '~/assets/scss/_app.mixins.scss'
    ]
  },
  axios: {
    baseURL: 'https://openapi.nkn.org/api/v1'
  },
  build: {
    vendor: ['v-tooltip']
  }
}
