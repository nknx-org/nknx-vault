<template>
  <Card class="modal">
    <h2 class="modal__title">{{ $t('importWallet') }}</h2>

    <div class="modal-switch">
      <div
        :class="['modal-switch__button', currentView === 'pk' ? 'modal-switch__button_active' : null]"
        @click="switchView('pk')"
      >
        {{ $t('privateKey') }}
      </div>
      <div
        :class="['modal-switch__button', currentView === 'json' ? 'modal-switch__button_active' : null]"
        @click="switchView('json')"
      >
        {{ $t('walletFile') }}
      </div>
    </div>
  </Card>
</template>

<script>
import Card from '~/components/Card/Card.vue'

export default {
  components: { Card },
  props: {

  },
  data () {
    return { currentView: 'pk' }
  },
  computed: {},
  created () {
  },
  methods: {
    switchView (val) {
      this.currentView = val
    }
  }
}
</script>
