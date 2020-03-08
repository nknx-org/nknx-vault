<template>
  <div class="modal__wrapper" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal" shadow="mini">
      <h2 class="modal__title">{{ $t('transferName') }}: {{ walletName }}</h2>
      <p class="modal__descr">{{ $t('transferNameDecr') }}</p>
      <div class="modal__notice">
        {{ $t('transferNameNotice') }}
      </div>
      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('cancel') }}
        </Button>
        <Button
          :click="transferName"
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
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo'

    }),
    isOpen () {
      return this.open
    },
    walletName () {
      return this.walletInfo.name || ''
    }
  },
  methods: {
    transferName () {
      const self = this
      nknWallet.configure({
        rpcAddr: 'https://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet'
      })
      const name = this.name
      const wallet = this.walletName
      wallet.transferName(name)
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameTransferSuccess' + data,
            color: 'success',
            timeout: true
          })
          self.$emit('toggleTransferWalletNameModal', false)
        })
        .catch(error => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameTransferError' + error.code,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleTransferWalletNameModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleTransferWalletNameModal', false)
    }
  }
}
</script>
