<template>
  <div class="layout-dashboard">
    <Topbar />
    <div class="layout-dashboard__wrapper">
      <Sidebar />
      <nuxt class="layout-dashboard__content" />
      <WalletPanel />
      <Snackbar />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Snackbar from '~/components/Snackbar/Snackbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'
import WalletPanel from '~/components/WalletPanel/WalletPanel.vue'
import Topbar from '~/components/Topbar/Topbar.vue'

export default {
  components: { Snackbar, Sidebar, WalletPanel, Topbar },
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
        this.$store.dispatch('settings/init')
        this.$store.dispatch('currency/init')
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
