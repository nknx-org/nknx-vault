<template>
  <div class="select__wrapper">
    <div
      class="select__button"
      :class="open ? 'select__button_active' : null"
      @click="toggleSelect()"
    >
      {{ activeItem }}
      <span
        class="select__icon fe fe-chevron-down"
        :class="open ? 'select__icon_open' : null"
      />
    </div>

    <ul class="select__list" :class="open ? 'select__list_open' : null">
      <li
        v-for="item in items"
        :key="item"
        class="select__item"
        @click="setSelect(item),toggleSelect()"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import "./Select.scss";
</style>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    activeItem: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      open: false
    }
  },
  computed: {
  },
  methods: {
    toggleSelect () {
      this.open = !this.open
    },
    setSelect (item) {
      this.$emit('update', item)
    }
  }
}
</script>
