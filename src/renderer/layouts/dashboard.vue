<template>
  <div class="layout-dashboard">
    <Sidebar />
    <nuxt class="layout-dashboard__content" />
    <WalletPanel />
    <Snackbar />
  </div>
</template>

<script>
import Snackbar from '~/components/Snackbar/Snackbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'
import WalletPanel from '~/components/WalletPanel/WalletPanel.vue'

export default {
  components: { Snackbar, Sidebar, WalletPanel },
  created () {
    this.$store.dispatch('online/updateOnline')
  }
}
</script>
