<template>
  <div class="layout-login">
    <div class="layout-login__wrapper">
      <div class="layout-login__header">
        <div class="layout-login__logo">
          <logo />
          <span class="layout-login__title">NKNX VALUT</span>
        </div>
        <div class="layout-login__menu">
          <Button class="layout-login__btn">{{$t('create')}}</Button>
          <Button class="layout-login__btn">{{$t('import')}}</Button>
        </div>
      </div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import logo from "~/assets/icons/logo.svg";

export default {
  components: { logo }
};
</script>
