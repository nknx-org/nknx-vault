<template>
  <div class="transfer">
    <ConfirmTransferModal :open="isTransferConfirmModal" :fee="fee !== '' ? parseFloat(fee) : 0" :address="address" :amount="parseFloat(amount)" @toggleTransferConfirmModal="toggleTransferConfirmModal" />

    <div class="transfer__controls">
      <label class="modal__label transfer__amount">
        {{ $t('amount') }} <span v-tooltip="{
          content: $t('sendAmountTooltip'),
          placement: 'top-center',
          offset: 5,
        }" class="transfer__info fe fe-info"
        />
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
        {{ $t('toWalletAddress') }} <span v-tooltip="{
          content: $t('toWalletAddressTooltip'),
          placement: 'top-center',
          offset: 5,
        }" class="transfer__info fe fe-info"
        />
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

    <div class="transfer__controls">
      <label class="modal__label transfer__amount">
        {{ $t('networkFees') }} <span v-tooltip="{
          content: $t('networkFeesTooltip'),
          placement: 'top-center',
          offset: 5,
        }" class="transfer__info fe fe-info"
        />
        <Select type="modal" :items="feesTypes" :active-item="activeFeesType" @update="updateFeesType" />

      </label>

      <label class="modal__label transfer__fee">
        <div class="modal__input modal__input_nkn">
          <input
            v-model="fee"
            class="modal__controller"
            :class="!isFee && isFeeChange ? 'modal__controller_error' : null"
            type="number"
          >
        </div>
      </label>
    </div>
    <div class="modal__footer">
      <Button
        theme="success"
        :disabled="!isOk"
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

import Select from '~/components/Controls/Select/Select.vue'
import Button from '~/components/Button/Button.vue'
import ConfirmTransferModal from '~/components/Modals/ConfirmTransferModal/ConfirmTransferModal.vue'
import TxIcon from '~/assets/icons/transactions.svg'

export default {
  components: { Button, ConfirmTransferModal, TxIcon, Select },
  data () {
    return {
      isTransferConfirmModal: false,
      feesTypes: ['high', 'standard', 'low', 'custom'],
      amount: '',
      address: '',
      fee: 0.5
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
    isFee () {
      return this.fee >= 0 && parseFloat(this.walletInfo.balance) > this.fee + this.amount
    },
    isFeeChange () {
      return this.fee !== 0.5
    },
    isOk () {
      return this.isAmount === true && this.isAddress === true && this.isFee === true
    },
    activeFeesType () {
      const fee = this.fee
      return fee === 1 ? 'high' : fee === 0.5 ? 'standard' : fee === 0.1 ? 'low' : 'custom'
    }
  },
  methods: {
    updateFeesType (type) {
      switch (type) {
      case 'high':
        this.fee = 1
        break
      case 'standard':
        this.fee = 0.5
        break
      case 'low':
        this.fee = 0.1
        break
      case 'custom':
        this.fee = ''
      }
    },
    toggleTransferConfirmModal (bool) {
      this.isTransferConfirmModal = bool
    }
  }
}
</script>
