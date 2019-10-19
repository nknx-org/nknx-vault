<template>
  <div class="settings">
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">NKN {{ $t('nameService') }}</h3>
        <p class="settings__descr"><span v-if="walletName.length > 0">{{ $t('registeredWalletDescr') }}</span> <span v-else>{{ $t('unregisteredWalletDescr') }}</span> </p>
      </div>
      <div class="settings__right"><Button theme="ghost-secondary" @click.native="walletName.length > 0 ? openDeleteWalletNameModal : toggleRegisterWalletNameModal(true)"><span v-if="walletName.length > 0">{{ $t('deleteName') }}</span> <span v-else>{{ $t('registerName') }}</span></Button></div>
    </div>
    <RegisterNameModal :open="isRegisterWalletNameModal" @toggleRegisterWalletNameModal="toggleRegisterWalletNameModal" />
  </div>
</template>

<style lang="scss">
@import "./Settings";
</style>

<script>
import { mapGetters } from 'vuex'
import Button from '~/components/Button/Button.vue'
import RegisterNameModal from '~/components/Modals/RegisterNameModal/RegisterNameModal.vue'

export default {
  components: { Button, RegisterNameModal },
  data () {
    return {
      isRegisterWalletNameModal: false
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
    toggleRegisterWalletNameModal (bool) {
      this.isRegisterWalletNameModal = bool
    }
  }
}
</script>