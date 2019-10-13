<template>
  <div class="layout-login">
    <div class="layout-login__wrapper">
      <div class="layout-login__header">
        <div class="layout-login__logo">
          <Logo />
          <span class="layout-login__title">NKNX VAULT</span>
        </div>
        <div class="layout-login__menu">
          <Button class="layout-login__btn">{{ $t('create') }}</Button>
          <Button class="layout-login__btn">{{ $t('import') }}</Button>
        </div>
      </div>
      <nuxt class="layout-login__content" />
    </div>
  </div>
</template>

<script>
import Logo from '~/assets/icons/logo.svg'

export default {
  components: { Logo }
}
</script>
