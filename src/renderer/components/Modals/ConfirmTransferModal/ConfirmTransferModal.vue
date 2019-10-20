<template>
  <div class="modal__wrapper" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal" shadow="mini">
      <h2 class="modal__title">{{ $t('transferConfirm') }}</h2>
      <p class="modal__descr">{{ $t('transferConfirmDescr') }}</p>
      <div class="modal__notice">
        {{ $t('to') }}: {{ address }}
      </div>
      <div class="modal__notice">
        {{ $t('amount') }}: {{ amount }} NKN
      </div>
      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('cancel') }}
        </Button>
        <Button
          :click="transfer"
          theme="success"
        >
          {{ $t('transfer') }}
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import nknWallet from 'nkn-wallet'
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Card, Button },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0
    },
    address: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet'
    }),
    isOpen () {
      return this.open
    }
  },
  methods: {
    transfer () {
      const self = this
      nknWallet.configure({
        rpcAddr: 'https://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet'
      })
      const wallet = this.activeWallet
      const address = this.address
      const amount = this.amount

      wallet.transferTo(address, amount)
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletTransferSuccess',
            color: 'success'
          })
          self.$emit('toggleTransferConfirmModal', false)
        })
        .catch(error => {
          console.log(error)
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletTransferError' + error.code,
            color: 'error'
          })
          self.$emit('toggleTransferConfirmModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleTransferConfirmModal', false)
    }
  }
}
</script>
