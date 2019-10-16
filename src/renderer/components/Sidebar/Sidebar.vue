<template>
  <aside
    class="sidebar"
  >
    <div class="sidebar__top">
      <div class="sidebar__logo">
        <Logo />
      </div>

      <nuxt-link
        v-for="route in routes"
        :key="route.path"
        :to="route.path"
        :exact="route.path=='/' ? true : false"
        class="sidebar__item"
        @click.native="markerInitialize()"
        @mouseleave.native="markerInitialize"
      >
        <component :is="route.icon" class="sidebar__icon" />
      </nuxt-link>
      <div class="sidebar__marker" />
    </div>
    <div class="sidebar__exit" @click="logout">
      <ExitIcon />
    </div>
  </aside>
</template>

<style lang="scss">
@import './Sidebar';
</style>

<script>
import Logo from '~/assets/icons/logo.svg'
import WalletIcon from '~/assets/icons/wallet-default.svg'
import TxIcon from '~/assets/icons/transactions.svg'
import SettingsIcon from '~/assets/icons/settings.svg'
import ExitIcon from '~/assets/icons/exit.svg'

export default {
  components: { Logo, WalletIcon, TxIcon, SettingsIcon, ExitIcon },
  data: () => {
    return {
      routes: [
        {
          path: '/dashboard',
          icon: 'WalletIcon'
        },
        {
          path: '/transactions',
          icon: 'TxIcon'
        },
        {
          path: '/settings',
          icon: 'SettingsIcon'
        }
      ]
    }
  },
  mounted () {
    this.markerInitialize()
    this.markerMove() // comment it if wanna turn off mouseover animation
  },
  methods: {
    logout () {
      this.$store.dispatch('wallet/updateActiveWallet', false)
      this.$router.push('/')
    },

    markerInitialize () {
      const marker = document.getElementsByClassName('sidebar__marker')[0]
      const currentActiveElement = document.getElementsByClassName(
        'nuxt-link-active'
      )[0]
      const bodyScrollTop = document.body.scrollTop
      const currentActiveElementOffset =
        currentActiveElement.offsetTop + bodyScrollTop
      marker.style.top = currentActiveElementOffset + 'px'
    },
    markerMove () {
      const totalItems = document.getElementsByClassName('sidebar__item')
      for (let i = 0; i < totalItems.length; i++) {
        totalItems[i].addEventListener('mouseover', function (e) {
          const marker = document.getElementsByClassName('sidebar__marker')[0]
          const currentActiveElement = document.getElementsByClassName(
            'nuxt-link-active'
          )[0]
          const bodyScrollTop = document.body.scrollTop
          const currentActiveElementOffset =
            currentActiveElement.offsetTop + bodyScrollTop
          const currentElement = this
          const currentElementOffset =
            currentElement.offsetTop + bodyScrollTop ||
            currentActiveElementOffset
          marker.style.top = currentElementOffset + 'px'
        })
      }
    }
  }
}
</script>
