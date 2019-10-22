<template>
  <div class="layout-dashboard">
    <Sidebar />
    <nuxt class="layout-dashboard__content" />
    <WalletPanel />
    <Snackbar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Snackbar from '~/components/Snackbar/Snackbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'
import WalletPanel from '~/components/WalletPanel/WalletPanel.vue'

export default {
  components: { Snackbar, Sidebar, WalletPanel },
  computed: {
    ...mapGetters({
      online: 'online/getOnline',
      activeWallet: 'wallet/getActiveWallet'

    })
  },
  watch: {
    online () {
      if (this.online === false) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'offlineModeAlert',
          color: 'alert',
          timeout: false
        })
        this.$store.dispatch('price/updateCurrentPrice')
        this.$store.dispatch('price/updateDailyHistoryPrice')
        this.$store.dispatch('wallet/updateWalletInfo', this.activeWallet.address)
      } else {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'onlineModeAlert',
          color: 'success',
          timeout: true
        })
      }
    }
  },
  created () {
    this.$store.dispatch('online/updateOnline')
  },
  mounted () {

  }
}
</script>
