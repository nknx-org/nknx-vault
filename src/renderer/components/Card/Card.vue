<template>
  <div
    class="card"
    :class="[padding ? `card_padding_${padding}` : null, hover ? 'card_hover' : null]"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@import './Card.scss';
</style>

<script>
export default {
  components: {},
  props: {
    padding: {
      type: String,
      default: 'normal'
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {}
  },
  mounted: function() {},
  methods: {}
}
</script>