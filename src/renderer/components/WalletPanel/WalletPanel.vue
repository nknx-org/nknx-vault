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
            {{ balance.toFixed(3) | commaNumber }}
            <span class="wallet-panel__symbol">NKN</span>
          </h3>
        </div>
        <div class="wallet-panel__right">
          <div class="text__title">{{ $t('marketValue') }} (USD)</div>
          <h3>${{ usdBalance.toFixed(2) }}</h3>
        </div>
      </div>
    </div>

    <div class="wallet-panel__bot">
      <div class="wallet-panel__row">
        <div class="wallet-panel__left">
          <div class="text__title">NKN {{ $t('price') }} (USD)</div>
          <h4>${{ usdPrice.toFixed(6) }}</h4>
        </div>
        <div class="wallet-panel__right">
          <div class="text__title">{{ $t('last7Days') }}</div>
          <h4
            class="wallet-panel__change"
            :class="weeklyChange > 0 ? 'wallet-panel__change_positive' : 'wallet-panel__change_negative'"
          >
            <PriceArrow class="wallet-panel__change-icon" />
            {{ weeklyChange.toFixed(2) }}%
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
      address: '',
      balance: 0,
      name: '',
      usdBalance: 0,
      usdPrice: 0,
      weeklyChange: 0
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      price: 'price/getCurrentPrice',
      dailyHistoryPrice: 'price/getDailyHistoryPrice'
    })
  },
  created () {
    this.address = this.activeWallet.address
  },
  mounted () {
    this.getWalletInfo(this.address)
  },
  methods: {
    getWalletInfo (address) {
      const self = this
      this.$axios
        .get(`https://api.nknx.nkn.org/addresses/${address}`)
        .then(resp => {
          self.balance = parseFloat(resp.data.balance)
          self.name = resp.data.name
          self.usdPrice = self.price.prices[0].price
          self.usdBalance = self.balance * self.usdPrice
          self.weeklyChange = self.price.prices[0].percent_change_7d
        })
    }
  }
}
</script>
