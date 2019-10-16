<template>
  <div>{{ activeWallet }}</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'dashboard',
  components: { },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet'
    })
  },
  methods: {
  }
}
</script>
