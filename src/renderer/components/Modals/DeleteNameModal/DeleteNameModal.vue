<template>
  <div class="modal__wrapper" :class="isOpen ? 'modal__wrapper_open' : null">
    <Card class="modal" shadow="mini">
      <h2 class="modal__title">
        {{ $t('deleteName') }}: {{ walletName }}
      </h2>
      <p class="modal__descr">
        {{ $t('deleteNameDescr') }}
      </p>
      <div class="modal__notice">
        {{ $t('deleteNameNotice') }}
      </div>
      <div class="modal__footer">
        <Button
          :click="closeModal"
          theme="default"
        >
          {{ $t('cancel') }}
        </Button>
        <Button
          :click="deleteName"
          theme="error"
        >
          {{ $t('delete') }}
        </Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    deleteName () {
      const self = this

      const wallet = this.activeWallet
      const name = this.walletName

      wallet.deleteName(name)
        .then(data => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameDeleteSuccess',
            color: 'success',
            timeout: true
          })
          self.$emit('toggleDeleteWalletNameModal', false)
        })
        .catch(error => {
          self.$store.dispatch('snackbar/updateSnack', {
            snack: 'walletNameRegError' + error.code,
            color: 'error',
            timeout: true
          })
          self.$emit('toggleDeleteWalletNameModal', false)
        })
    },
    closeModal () {
      this.$emit('toggleDeleteWalletNameModal', false)
    }
  }
}
</script>
