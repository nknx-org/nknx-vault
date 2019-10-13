<template>
  <Card class="modal">
    <h2 class="modal__title">{{ $t('walletCreated') }}!</h2>
    <p class="modal__descr">
      <b>Save these details!</b> If you lose these credentials, you lose access to your assets.
    </p>
    <div class="modal__body">
      <label class="modal__label">
        {{ $t('publicAddress') }}
        <div class="modal__input">
          <input v-model="wallet.address" readonly="readonly" class="modal__controller" type="text" />
          <span
            class="modal__input-action fe fe-copy"
            v-tooltip="{
  content: $t('copyPublicAddress'),
  placement: 'bottom-center',
  offset: 10,
}"
            @click="copyText(wallet.address)"
          ></span>
        </div>
      </label>
      <label class="modal__label">
        {{ $t('privateKey') }}
        <div class="modal__input">
          <input v-model="pk" readonly="readonly" class="modal__controller" type="text" />
          <span
            class="modal__input-action fe fe-copy"
            v-tooltip="{
  content: $t('copyPrivateKey'),
  placement: 'bottom-center',
  offset: 10,
}"
            @click="copyText(pk)"
          ></span>
        </div>
      </label>
      <label class="modal__label">
        {{ $t('walletPassword') }}
        <div class="modal__input">
          <input
            v-model="password"
            readonly="readonly"
            class="modal__controller"
            :type="!passwordVisible ? 'password' : 'text'"
          />
          <span
            :class="['modal__input-action', passwordVisible ? 'fe fe-eye-off' : 'fe fe-eye']"
            @click="togglePasswordVisible"
          ></span>
        </div>
      </label>
    </div>

    <div class="modal__footer">
      <Button theme="success" :click="downloadWallet">{{ $t('downloadWallet') }}</Button>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import Button from "~/components/Button/Button.vue";

import nknWallet from "nkn-wallet";
import FileSaver from "file-saver";

export default {
  props: {
    wallet: {
      type: Object,
      default: () => {}
    },
    password: {
      type: String,
      default: ""
    }
  },
  components: { Card, Button },
  data() {
    return { passwordVisible: false, pk: "" };
  },
  created() {
    this.pk = this.wallet.getPrivateKey();
  },
  computed: {},
  methods: {
    togglePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
    },
    downloadWallet() {
      const jsonWallet = this.wallet.toJSON();
      var blob = new Blob([jsonWallet], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "wallet.json");
    },
    async copyText(text) {
      try {
        await this.$copyText(text);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
