<template>
  <Card class="modal">
    <h2 class="modal__title">{{$t('createNewWallet')}}</h2>
    <p class="modal__descr">
      Before creating a new wallet make sure to choose a strong password. You will
      <b>NOT</b> be able to change this once the wallet has been generated.
    </p>
    <div class="modal__body">
      <label class="modal__label">
        {{$t('choosePassword')}}
        <input class="modal__input" v-model="password" type="password" />
      </label>
      <label class="modal__label">
        {{$t('confirmYourPassword')}}
        <input
          class="modal__input"
          v-model="passwordConfirm"
          type="password"
        />
      </label>
      <Checkbox
        class="modal__checkbox"
        name="isReadme"
        :value="isReadme"
        @change="changeIsReadme"
      >{{$t('iHaveBackedUpMyPassword')}}</Checkbox>
    </div>

    <div class="modal__footer">
      <Button theme="success" :disabled="!isReadme || !isPassword">{{$t('createWallet')}}</Button>
    </div>
  </Card>
</template>

<script>
import Card from "~/components/Card/Card.vue";
import Button from "~/components/Button/Button.vue";
import Checkbox from "~/components/Controls/Checkbox/Checkbox.vue";

export default {
  components: { Card, Checkbox, Button },
  data() {
    return {
      isReadme: false,
      password: "",
      passwordConfirm: ""
    };
  },
  computed: {
    isPassword() {
      const password = this.password;
      const passwordConfirm = this.passwordConfirm;

      if (
        password === passwordConfirm &&
        password.length > 1 &&
        passwordConfirm.length > 1
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    changeIsReadme() {
      this.isReadme = !this.isReadme;
    }
  }
};
</script>
