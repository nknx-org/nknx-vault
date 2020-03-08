<template>
  <div class="settings">
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">NKN {{ $t('nameService') }}</h3>
        <p class="settings__descr"><span v-if="walletName.length > 0">{{ $t('registeredWalletDescr') }}</span> <span v-else>{{ $t('unregisteredWalletDescr') }}</span> </p>
      </div>
      <div class="settings__right settings__right_flex">
        <Button v-if="walletName.length === 0" class="settings__right-item" theme="ghost-secondary" @click.native="toggleRegisterWalletNameModal(true)">{{ $t('registerName') }}</Button>
        <Button v-else class="settings__right-item" theme="ghost-secondary" @click.native="toggleDeleteWalletNameModal(true)">{{ $t('deleteName') }}</Button>
        <Button v-if="walletName.length > 0" class="settings__right-item" theme="ghost-secondary" @click.native="toggleTransferWalletNameModal(true)">{{ $t('tranfserName') }}</Button>
      </div>
    </div>
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">{{ $t('preferredCurrency') }}</h3>
        <p class="settings__descr"> {{ $t('currencyChoiceDescr') }}</p>
      </div>
      <div class="settings__right">
        <Select :items="availableCurrencies" :active-item="selectedCurrency" @update="updateCurrency" />
      </div>
    </div>
    <div class="settings__item">
      <div class="settings__left">
        <h3 class="title_color_dark">{{ $t('backup') }}</h3>
        <p class="settings__descr"> {{ $t('backupDescr') }}</p>
      </div>
      <div class="settings__right"><Button theme="ghost-secondary" :click="downloadWallet"> {{ $t('download') }}</Button></div>
    </div>
    <RegisterNameModal :open="isRegisterWalletNameModal" @toggleRegisterWalletNameModal="toggleRegisterWalletNameModal" />
    <DeleteNameModal :open="isDeleteWalletNameModal" @toggleDeleteWalletNameModal="toggleDeleteWalletNameModal" />
    <TransferNameModal :open="isTransferNameModal" @toggleTransferWalletNameModal="toggleTransferWalletNameModal" />
  </div>
</template>

<style lang="scss">
@import "./Settings";
</style>

<script>
import FileSaver from 'file-saver'

import { mapGetters } from 'vuex'

import Button from '~/components/Button/Button.vue'
import RegisterNameModal from '~/components/Modals/RegisterNameModal/RegisterNameModal.vue'
import DeleteNameModal from '~/components/Modals/DeleteNameModal/DeleteNameModal.vue'
import TransferNameModal from '~/components/Modals/TransferNameModal/TransferNameModal.vue'
import Select from '~/components/Controls/Select/Select.vue'

export default {
  components: { Button, RegisterNameModal, Select, DeleteNameModal, TransferNameModal },
  data () {
    return {
      isRegisterWalletNameModal: false,
      isDeleteWalletNameModal: false,
      isTransferNameModal: false
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      availableCurrencies: 'currency/getAvailableCurrencies',
      selectedCurrency: 'settings/getSelectedCurrency'
    }),
    walletName () {
      return this.walletInfo.name || ''
    }
  },
  methods: {
    updateCurrency (currency) {
      this.$store.dispatch('settings/setCurrency', currency)
    },
    toggleRegisterWalletNameModal (bool) {
      this.isRegisterWalletNameModal = bool
    },
    toggleDeleteWalletNameModal (bool) {
      this.isDeleteWalletNameModal = bool
    },
    toggleTransferWalletNameModal (bool) {
      this.isTransferNameModal = bool
    },
    downloadWallet () {
      const jsonWallet = this.activeWallet.toJSON()
      const blob = new Blob([jsonWallet], { type: 'text/plain;charset=utf-8' })
      FileSaver.saveAs(blob, 'wallet.json')
    }
  }
}
</script>
