<template>
  <div :class="['snackbar', show ? 'snackbar__visible' : null]">
    <p class="snackbar__text">
      {{ message }}
    </p>
    <button class="snackbar__button" @click="show = false"><span class="snackbar__close fe fe-x" /></button>
  </div>
</template>

<style lang="scss">
@import "./Snackbar.scss";
</style>

<script>
export default {
  data () {
    return {
      show: false,
      message: ''
    }
  },
  created () {
    this.$store.watch(
      state => state.snackbar.snack,
      () => {
        const msg = this.$store.state.snackbar.snack
        if (msg !== '') {
          this.show = true
          this.message = this.$store.state.snackbar.snack
          this.$store.commit('snackbar/setSnack', '')
        }
      }
    )
  }
}
</script>
