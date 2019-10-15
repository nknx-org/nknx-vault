<template>
  <div class="layout-login">
    <div class="layout-login__wrapper">
      <div class="layout-login__header">
        <div class="layout-login__logo">
          <Logo />
          <span class="layout-login__title">NKNX VAULT</span>
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
  components: { Logo, Snackbar }
}
</script>
