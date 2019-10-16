<template>
  <div :class="['snackbar snackbar_color_' + color, show ? 'snackbar_visible' : null]">
    <p class="snackbar__text">
      {{ $t(message) }}
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
      message: '',
      color: 'alert'
    }
  },
  created () {
    this.$store.watch(
      state => state.snackbar.snack,
      () => {
        const msg = this.$store.state.snackbar.snack
        if (msg !== '') {
          this.show = true
          this.color = this.$store.state.snackbar.color
          this.message = this.$store.state.snackbar.snack
          const self = this

          setTimeout(function () {
            self.show = false
            self.message = ''
            self.color = 'alert'

            self.$store.dispatch('snackbar/updateSnack', {
              snack: '',
              color: 'alert'
            })
          }, 4000)
        }
      }
    )
  }
}
</script>
