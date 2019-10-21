<template>
  <div class="layout-login">
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
import Logo from '~/assets/icons/logo.svg'
import Snackbar from '~/components/Snackbar/Snackbar.vue'

export default {
  components: { Logo, Snackbar },
  data: () => {
    return {
      updateInterval: 300000
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
    }
  }
}
</script>
