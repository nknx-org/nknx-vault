<template>
  <div class="fragment">
    <Card class="modal">
      <h2 class="modal__title">
        {{ $t('importWallet') }}
      </h2>

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
          :click="goToCreate"
          theme="text"
        >
          {{ $t('dontHaveAWallet') }}
        </Button>
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
    <Fragment class="fragment__right" />
  </div>
</template>

<script>
import fs from 'fs'
import Card from '~/components/Card/Card.vue'
import Button from '~/components/Button/Button.vue'
import WalletIcon from '~/assets/icons/wallet.svg'
import Fragment from '~/assets/icons/modal-fragment.svg'
require('~/assets/nkn.min.js')

export default {
  components: { Card, Button, WalletIcon, Fragment },
  data () {
    return {
      currentView: 'pk',
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
    goToCreate () {
      this.$router.push('/createWallet')
    },
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
      const seed = this.pk
      const password = 'nknx-password'
      let wallet = null
      try {
        // eslint-disable-next-line no-undef
        wallet = new nkn.Wallet({ seed, password })
        this.logIn(wallet)
      } catch (e) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'walletErr' + e.code,
          color: 'error',
          timeout: true
        })
      }
    },
    unlockWalletFromJson () {
      const walletJson = JSON.stringify(this.walletFile)
      const password = this.password

      let wallet = null
      try {
        // eslint-disable-next-line no-undef
        wallet = nkn.Wallet.fromJSON(walletJson, { password })
        this.logIn(wallet)
      } catch (e) {
        this.$store.dispatch('snackbar/updateSnack', {
          snack: 'walletErr' + e.code,
          color: 'error',
          timeout: true
        })
      }
    },
    logIn (wallet) {
      this.$store.dispatch('wallet/updateActiveWallet', wallet)
      this.$store.dispatch('wallet/updateWalletInfo', wallet.address)
      this.$router.push('/dashboard')
    }
  }
}
</script>
