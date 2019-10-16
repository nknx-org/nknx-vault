<template>
  <div class="layout-dashboard">
    <Sidebar />
    <nuxt class="layout-dashboard__content" />
    <Snackbar />
  </div>
</template>

<script>
import Snackbar from '~/components/Snackbar/Snackbar.vue'
import Sidebar from '~/components/Sidebar/Sidebar.vue'

export default {
  components: { Snackbar, Sidebar }
}
</script>
