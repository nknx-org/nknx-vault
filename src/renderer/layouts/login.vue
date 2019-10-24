<template>
  <div class="layout-login">
    <Topbar />
    <div class="layout-login__wrapper">
      <div class="layout-login__header">
        <div class="layout-login__logo">
          <Logo />
          <span class="layout-login__title">NKNx<b>VAULT</b> <span class="small">- a new kind of wallet</span></span>
        </div>
        <div class="layout-login__menu">
          <nuxt-link class="layout-login__btn" to="/createWallet">{{ $t('create') }}</nuxt-link>
          <nuxt-link class="layout-login__btn" to="/importWallet">{{ $t('import') }}</nuxt-link>
        </div>
      </div>
      <nuxt class="layout-login__content" />
      <Snackbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Logo from '~/assets/icons/logo.svg'
import Snackbar from '~/components/Snackbar/Snackbar.vue'
import Topbar from '~/components/Topbar/Topbar.vue'

export default {
  components: { Logo, Snackbar, Topbar },
  data: () => {
    return {
      updateInterval: 300000
    }
  },
  computed: {
    ...mapGetters({
      online: 'online/getOnline',
      exchangeRates: 'currency/getExchangeRates',
      selectedCurrency: 'settings/getSelectedCurrency'
    })
  },
  watch: {
    online () {
      if (this.online === false) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'offlineModeAlert',
          color: 'alert',
          timeout: false
        })
      } else {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'onlineModeAlert',
          color: 'success',
          timeout: true
        })
      }
    }
  },
  destroyed () {
    clearInterval(this.intervalPrice)
    clearInterval(this.intervalDailyHistoryPrice)
  },
  created () {
    this.$store.dispatch('online/updateOnline')
  },
  mounted () {
    this.updatePrice()
    this.updateDailyHistoryPrice()
    this.updateExchangeRates()
    this.getSettings()

    this.intervalPrice = setInterval(this.updatePrice, this.updateInterval)
    this.intervalDailyHistoryPrice = setInterval(
      this.updateDailyHistoryPrice,
      this.updateInterval
    )
  },
  methods: {
    updatePrice () {
      this.$store.dispatch('price/updateCurrentPrice')
    },
    updateDailyHistoryPrice () {
      this.$store.dispatch('price/updateDailyHistoryPrice')
    },
    updateExchangeRates () {
      this.$store.dispatch('currency/init')
    },
    getSettings () {
      this.$store.dispatch('settings/init')
    },
    setExchangeRate () {
      this.$store.dispatch('settings/setCurrency', 'EUR')
    }
  }
}
</script>
