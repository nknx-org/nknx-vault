<template>
  <aside class="wallet-panel">
    <div class="wallet-panel__top">
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">{{ $t('name') }}/{{ $t('address') }}</div>
          <h3 v-if="name.length > 0" class="wallet-panel__name">{{ name }}</h3>
          <div class="text__heading">{{ address }}</div>
        </div>
      </div>
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">{{ $t('currentBalance') }}</div>
          <h3>
            {{ balance | commaNumber }}
            <span class="wallet-panel__symbol">NKN</span>
          </h3>
        </div>
        <div class="wallet-panel__right">
          <div class="text__title">{{ $t('marketValue') }} (USD)</div>
          <h3>${{ usdBalance }}</h3>
        </div>
      </div>
    </div>

    <div class="wallet-panel__bot">
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">NKN {{ $t('price') }} (USD)</div>
          <h4>${{ usdPrice }}</h4>
        </div>
        <div class="wallet-panel__right">
          <div class="text__title">{{ $t('last7Days') }}</div>
          <h4
            class="wallet-panel__change"
            :class="weeklyChange > 0 ? 'wallet-panel__change_positive' : 'wallet-panel__change_negative'"
          >
            <PriceArrow class="wallet-panel__change-icon" />
            {{ weeklyChange }}%
          </h4>
        </div>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
@import "./WalletPanel";
</style>

<script>
import { mapGetters } from 'vuex'
import PriceArrow from '~/assets/icons/priceArrow.svg'

export default {
  components: { PriceArrow },
  data: () => {
    return {
      address: ''
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      price: 'price/getCurrentPrice',
      dailyHistoryPrice: 'price/getDailyHistoryPrice'
    }),
    balance () {
      return parseFloat(this.walletInfo.balance).toFixed(3) || 0
    },
    name () {
      return this.walletInfo.name || ''
    },
    usdPrice () {
      return (this.price.prices[0].price).toFixed(6) || 0
    },
    usdBalance () {
      return (this.balance * this.usdPrice).toFixed(2)
    },
    weeklyChange () {
      return (this.price.prices[0].percent_change_7d).toFixed(2) || 0
    }
  },
  created () {
    this.address = this.activeWallet.address
  },
  mounted () {
  },
  methods: {
  }
}
</script>
