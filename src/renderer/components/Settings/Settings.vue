<template>
  <div class="settings">
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">NKN {{ $t('nameService') }}</h3>
        <p class="settings__descr"><span v-if="walletName.length > 0">Your address has a name, you can remove it bla bla bla</span> <span v-else>You currently do not have a name associated with your wallet.</span> </p>
      </div>
      <div class="settings__right"><Button theme="ghost-secondary"><span v-if="walletName.length > 0">{{ $t('deleteName') }}</span> <span v-else>{{ $t('registerName') }}</span></Button></div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Settings";
</style>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Button },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo'
    }),
    walletName () {
      return this.walletInfo.name || ''
    }
  },
  methods: {
  }
}
</script>
