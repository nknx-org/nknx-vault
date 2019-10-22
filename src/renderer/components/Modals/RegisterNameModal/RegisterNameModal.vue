<template>
  <div class="modal__wrapper" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal" shadow="mini">
      <h2 class="modal__title">{{ $t('registerName') }}</h2>
      <p class="modal__descr">{{ $t('registerNameDecr') }}</p>
      <div class="modal__notice">
        {{ $t('registerNameNotice') }}
      </div>
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('desiredName') }}
          <div class="modal__input">
            <input
              v-model="name"
              class="modal__controller"
              type="text"
            >
          </div>
        </label>
      </div>

      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('cancel') }}
        </Button>
        <Button
          :click="registerName"
          theme="success"
          :disabled="!isName"
        >
          {{ $t('register') }}
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
      name: ''
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet'
    }),
    isName () {
      return this.name.length > 0
    },
    isOpen () {
      return this.open
    }
  },
  methods: {
    registerName () {
      const self = this
      nknWallet.configure({
        rpcAddr: 'https://mainnet-rpc-node-0001.nkn.org/mainnet/api/wallet'
      })
      const name = this.name
      const wallet = this.activeWallet
      wallet.registerName(name)
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameRegSuccess' + data,
            color: 'success',
            timeout: true
          })
          self.$emit('toggleRegisterWalletNameModal', false)
        })
        .catch(error => {
          console.log(error)
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameRegError' + error.code,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleRegisterWalletNameModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleRegisterWalletNameModal', false)
    }
  }
}
</script>
