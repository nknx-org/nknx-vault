<template>
  <div class="transactions">
    <div class="table__wrapper">
      <div class="table__top">
        <h3 class="title_color_dark">{{ $t('transactionsHistory') }}</h3>
        <a href="https://explorer.nknx.org/" target="_blank" class="text__link">{{ $t('blockchainExplorer') }}</a>
      </div>
    </div>
    <table>
      <thead>
        <th>
          {{ $t('date/time') }}
        </th>
        <th>
          {{ $t('type') }}
        </th>
        <th>
          {{ $t('address') }}
        </th>
        <th class="text_align_right">
          {{ $t('amount') }}
        </th>
      </thead>
      <tr v-for="tx in transactions" :key="tx.id">
        <td>{{ $moment(tx.created_at + "Z").format('YYYY-MM-DD hh:mm') }}</td>
        <td><span v-if="address === tx.recipientWallet">{{ $t('recieved') }}</span> <span v-else>{{ $t('sent') }}</span></td>
        <td><span v-if="address === tx.recipientWallet">{{ tx.senderWallet }}</span> <span v-else>{{ tx.recipientWallet }}</span></td>
        <td class="text_align_right" :class="address === tx.recipientWallet ? 'table__item_positive' : 'table__item_negative'">{{ tx.amount | nknValue | commaNumber }}</td>
      </tr>
    </table>
    <div v-if="transactions.length > 0" class="page-navigation">
      <div
        class="page-navigation__info"
      >
        {{ $t('showing') }} {{ from }} {{ $t('to') }} {{ to }} {{ $t('of') }} {{ totalTransactionsCount }} {{ $t('transactions') }}
      </div>
      <div class="page-navigation__pagination">
        <Pagination :page="prevPage" type="prev" @click.native="getAddressTransactions(prevPage)" />
        <Pagination :page="nextPage" type="next" @click.native="getAddressTransactions(nextPage)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./Transactions";
</style>

<script>
import { mapGetters } from 'vuex'

import Pagination from '~/components/Pagination/Pagination.vue'

export default {
  components: { Pagination },
  data () {
    return {
      address: '',
      transactions: [],
      loading: true,
      nextPage: null,
      prevPage: null,
      currentPage: 1,
      from: 0,
      to: 0,
      totalTransactionsCount: 0
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet'
    })
  },
  created () {
    this.address = this.activeWallet.address
  },
  mounted () {
    this.getAddressTransactions(this.currentPage)
    this.getWalletInfo(this.address)
  },
  methods: {
    getWalletInfo (address) {
      const self = this
      this.$axios
        .get(`https://api.nknx.nkn.org/addresses/${address}`)
        .then(resp => {
          self.totalTransactionsCount = resp.data.count_transactions
        })
    },
    getAddressTransactions (page) {
      const self = this
      // Checking if page exists
      if (page === null) {
        return false
      }
      self.loading = true
      // Disabling pagination untill data fetched
      self.nextPage = null
      self.prevPage = null
      // Fetcing data
      this.$axios
        .$get(`https://api.nknx.nkn.org/addresses/${this.address}/transfers?page=${page}`)
        .then(response => {
          const {
            data,
            current_page: currentPage,
            prev_page_url: prevPage,
            next_page_url: nextPage,
            from,
            to
          } = response
          self.transactions = data
          self.from = from
          self.to = to
          self.currentPage = currentPage
          self.prevPage = prevPage != null ? self.currentPage - 1 : null
          self.nextPage = nextPage != null ? self.currentPage + 1 : null
          self.loading = false
        })
    }
  }
}
</script>
