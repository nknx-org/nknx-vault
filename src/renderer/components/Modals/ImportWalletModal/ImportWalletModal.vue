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

    <template v-if="currentView === 'json'">
      <div class="modal__body">
        <label class="modal__label">
          <div class="modal__input">
            <input
              class="modal__file"
              accept=".json"
              type="file"
              @change="uploadWallet"
            >
            <div class="modal__file-wrapper">
              <div class="modal__file-content">
                <WalletIcon class="modal__file-icon" />
                <div class="modal__file-title"><span v-if="!walletFileName"> {{ $t('dndYourWalletFile') }}</span> <span v-if="isWalletFile && walletFileName">{{ $t('walletFileUploadSuccess') }}</span> <span v-if="!isWalletFile && walletFileName">{{ $t('walletFileUploadFail') }}</span></div>
                <p v-if="!walletFileName" class="modal__file-descr">{{ $t('or') }} <span class="modal__file-descr_accent">{{ $t('browseFiles') }}</span></p>
                <p v-else class="modal__file-descr_accent">{{ walletFileName }}</p>
              </div>
            </div>
          </div>
        </label>
        <label class="modal__label">
          {{ $t('enterWalletFilePassword') }}
          <div class="modal__input">
            <input
              v-model="password"
              class="modal__controller"
              :type="!passwordVisible ? 'password' : 'text'"
            >
            <span
              :class="['modal__input-action', passwordVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
              @click="togglePasswordVisible"
            />
          </div>
        </label>
      </div>
    </template>

    <div class="modal__footer">
      <Button
        v-if="currentView ==='pk'"
        :click="unlockWalletFromPk"
        theme="secondary"
        :disabled="!isPk"
        icon="unlock"
      >
        {{ $t('unlock') }}
      </Button>
      <Button
        v-else
        :click="unlockWalletFromJson"
        theme="secondary"
        :disabled="!isWalletFile || !isPassword"
        icon="unlock"
      >
        {{ $t('unlock') }}
      </Button>
    </div>
  </Card>
</template>

<script>
import fs from 'fs'
import nknWallet from 'nkn-wallet'
import { mapMutations } from 'vuex'

import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import WalletIcon from '~/assets/icons/wallet.svg'

export default {
  components: { Card, Button, WalletIcon },
  props: {

  },
  data () {
    return { currentView: 'pk',
      pkVisible: false,
      pk: '',
      walletFile: false,
      walletFileName: false,
      passwordVisible: false,
      password: ''
    }
  },
  computed: {
    isPk () {
      const pk = this.pk.trim()
      return pk.length === 64
    },
    isWalletFile () {
      const wallet = this.walletFile
      return wallet.hasOwnProperty('Address')
    },
    isPassword () {
      const password = this.password
      return password.length > 1
    }
  },
  created () {
  },
  methods: {
    ...mapMutations({
      setSnack: 'snackbar/setSnack'
    }),
    clearData () {
      this.pk = ''
      this.walletFile = false
      this.walletFileName = false
    },
    switchView (val) {
      this.currentView = val
      this.clearData()
    },
    togglePkVisible () {
      this.pkVisible = !this.pkVisible
    },
    togglePasswordVisible () {
      this.passwordVisible = !this.passwordVisible
    },
    uploadWallet (file) {
      if (file.target.files.length < 1) {
        return
      }
      const walletFilePath = file.target.files[0].path
      const walletFileName = file.target.files[0].name

      let walletJson = fs.readFileSync(walletFilePath)
      walletJson = JSON.parse(walletJson)

      this.walletFileName = walletFileName
      this.walletFile = walletJson
    },
    unlockWalletFromPk () {
      const pk = this.pk
      const wallet = nknWallet.restoreWalletBySeed(pk, 'nknx-password')
      console.log(wallet)
    },
    unlockWalletFromJson () {
      const walletJson = JSON.stringify(this.walletFile)
      const password = this.password

      let wallet = null
      try {
        wallet = nknWallet.loadJsonWallet(walletJson, password)
      } catch (e) {
        this.setSnack({
          snack: 'walletErr' + e.code,
          color: 'error'
        })
      }

      console.log(wallet)
    }
  }
}
</script>
