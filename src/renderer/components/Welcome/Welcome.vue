<template>
  <div>
    <div class="welcome">
      <div class="welcome__content">
        <div class="welcome__left">
          <back class="welcome__back" />
          <h1 class="title_light">Store and send NKN on your terms with a new kind of wallet</h1>
          <p
            class="welcome__descr"
          >No sign up. No catch. Just an effective, community driven desktop-based wallet, putting the control in your hands ready to join the networking revolution.</p>
          <div class="welcome__controls">
            <Button class="welcome__btn" theme="success">{{$t('createWallet')}}</Button>
            <Button class="welcome__btn" theme="ghost">{{$t('import')}}</Button>
          </div>
        </div>
        <share class="welcome__share" />
      </div>
      <div class="welcome__disclaimer">
        <Fragment class="welcome__disclaimer-fragment" />
        <p
          class="welcome__disclaimer-text"
        >Disclaimer: Use this service at your own risk. Please make a backup of your wallet and store your password in a safe place. If you lose or forget the password to your generated wallet rile you will lose access to your funds. New Kind of Wallet is not held responsible for any losses that may occur.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./welcome.scss";
</style>

<script>
import Back from "~/assets/icons/logo-back.svg";
import Share from "~/assets/icons/share.svg";
import Fragment from "~/assets/icons/welcome-fragment.svg";
import Button from "~/components/Button/Button.vue";

export default {
  components: { Back, Share, Button, Fragment },
  data() {
    return {};
  },
  methods: {}
};
</script>
