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

    <template v-if="currentView === 'pk'">
      <div class="modal__body">
        <label class="modal__label">
          {{ $t('enterYourPrivateKey') }}
          <div class="modal__input">
            <input
              v-model="pk"
              class="modal__controller"
              :type="!pkVisible ? 'password' : 'text'"
            >
            <span
              :class="['modal__input-action', pkVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
              @click="togglePkVisible"
            />
          </div>
        </label>
      </div>
    </template>

    <div class="modal__footer">
      <Button
        :click="unlockWallet"
        theme="secondary"
        :disabled="!isPk"
        icon="unlock"
      >
        {{ $t('unlock') }}
      </Button>
    </div>
  </Card>
</template>

<script>
import nknWallet from 'nkn-wallet'

import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'

export default {
  components: { Card, Button },
  props: {

  },
  data () {
    return { currentView: 'pk', pkVisible: false, pk: '' }
  },
  computed: {
    isPk () {
      const pk = this.pk
      return !(pk.length < 24)
    }
  },
  created () {
  },
  methods: {
    clearData () {
      this.pk = ''
    },
    switchView (val) {
      this.currentView = val
      this.clearData()
    },
    togglePkVisible () {
      this.pkVisible = !this.pkVisible
    },
    unlockWallet () {
      const type = this.currentView
      const pk = this.pk

      if (type === 'pk') {
        const wallet = nknWallet.restoreWalletBySeed(pk, 'nknx-password')
        console.log(wallet)
      }
    }
  }
}
</script>
