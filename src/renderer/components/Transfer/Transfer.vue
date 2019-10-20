<template>
  <div class="transfer">
    <ConfirmTransferModal :open="isTransferConfirmModal" :address="address" :amount="amount" @toggleTransferConfirmModal="toggleTransferConfirmModal" />

    <div class="transfer__controls">
      <label class="modal__label transfer__amount">
        {{ $t('amount') }}
        <div class="modal__input modal__input_nkn">
          <input
            v-model="amount"
            class="modal__controller"
            :class="!isAmount && isAmountChange ? 'modal__controller_error' : null"
            type="number"
          >
        </div>
      </label>
      <TxIcon class="transfer__icon" />
      <label class="modal__label transfer__address">
        {{ $t('toWalletAddress') }}
        <div class="modal__input">
          <input
            v-model.trim="address"
            class="modal__controller"
            :class="!isAddress && isAddressChange ? 'modal__controller_error' : null"
            type="text"
          >
        </div>
      </label>
    </div>
    <div class="modal__footer">
      <Button
        theme="success"
        :disabled="!isAddress || !isAmount"
        @click.native="isOk ? toggleTransferConfirmModal(true) : false"
      >
        {{ $t('send') }}
      </Button>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Transfer";
</style>

<script>
import { mapGetters } from 'vuex'

import Button from '~/components/Button/Button.vue'
import ConfirmTransferModal from '~/components/Modals/ConfirmTransferModal/ConfirmTransferModal.vue'
import TxIcon from '~/assets/icons/transactions.svg'

export default {
  components: { Button, ConfirmTransferModal, TxIcon },
  data () {
    return {
      isTransferConfirmModal: false,
      amount: '',
      address: ''
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo'
    }),
    walletName () {
      return this.walletInfo.name || ''
    },
    isAddress () {
      const address = this.address
      const regexp = /^((^NKN([A-Za-z0-9]){33}){1})$/
      return regexp.test(address)
    },
    isAddressChange () {
      return this.address.length > 0
    },
    isAmount () {
      return this.amount > 0 && this.amount < parseFloat(this.walletInfo.balance)
    },
    isAmountChange () {
      return this.amount !== ''
    },
    isOk () {
      return this.isAmount === true && this.isAddress === true
    }
  },
  methods: {
    toggleTransferConfirmModal (bool) {
      console.log(bool)
      this.isTransferConfirmModal = bool
    }
  }
}
</script>
