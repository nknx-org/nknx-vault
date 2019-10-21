<template>
  <div class="transactions">
    <div class="table__wrapper">
      <div class="table__top">
        <h3 class="title_color_dark">{{ $t('transactionsHistory') }}</h3>
        <a href="https://explorer.nknx.org/" target="_blank" class="text__link">{{ $t('blockchainExplorer') }}</a>
      </div>
    </div>
    <table>
      <thead v-if="!loading">
        <th>
          {{ $t('dateTime') }}
        </th>
        <th>
          {{ $t('type') }}
        </th>
        <th>
          {{ $t('addressTable') }}
        </th>
        <th class="text_align_right">
          {{ $t('amount') }}
        </th>
      </thead>
      <template v-if="loading">
        <tr v-for="(headingLoader, index) in loaders" :key="index">
          <td colspan="4" style="padding: 0">
            <TableRowLoader />
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="tx in transactions" :key="tx.id">
          <td>{{ $moment(tx.created_at + "Z").format('YYYY-MM-DD HH:mm') }}</td>
          <td><span v-if="address === tx.recipientWallet">{{ $t('recieved') }}</span> <span v-else>{{ $t('sent') }}</span></td>
          <td><span v-if="address === tx.recipientWallet && tx.senderWallet === 'NKNaaaaaaaaaaaaaaaaaaaaaaaaaaaeJ6gxa'">{{ $t('miningReward') }}</span><span v-else-if="address === tx.recipientWallet">{{ tx.senderWallet }}</span> <span v-else>{{ tx.recipientWallet }}</span></td>
          <td class="text_align_right" :class="address === tx.recipientWallet ? 'table__item_positive' : 'table__item_negative'">{{ tx.amount | nknValue | commaNumber }}</td>
        </tr>
      </template>
    </table>
    <div v-if="transactions.length > 0" class="page-navigation">
      <div
        class="page-navigation__info"
      >
        {{ $t('pagShowing') }} {{ from }} {{ $t('pagTo') }} {{ to }} {{ $t('pagOf') }} {{ totalTransactionsCount }} {{ $t('pagTransactions') }}
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
import fs from 'fs'
import { remote } from 'electron'

import { mapGetters } from 'vuex'

import Pagination from '~/components/Pagination/Pagination.vue'
import TableRowLoader from '~/components/Loaders/TableRowLoader.vue'

export default {
  components: { Pagination, TableRowLoader },
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
      loaders: 11,
      offlineTxPath: ''
    }
  },
  computed: {
    ...mapGetters({
      activeWallet: 'wallet/getActiveWallet',
      walletInfo: 'wallet/getWalletInfo',
      online: 'online/getOnline'
    }),
    totalTransactionsCount () {
      return this.walletInfo.count_transactions || 0
    }
  },
  created () {
    this.address = this.activeWallet.address
    this.$store.dispatch('online/updateOnline')
    this.setLocalDataTxPath()
  },
  mounted () {
    if (this.online === true) {
      this.getAddressTransactions(this.currentPage) // get online transactions
    } else {
      this.getLocalAddressTransactions()
    }
  },
  methods: {
    setLocalDataTxPath () {
      const app = remote.app
      const path = app.getPath('userData') + '\\transactions.json'
      this.offlineTxPath = path
    },
    parseTransactionsData (response) {
      const {
        data,
        current_page: currentPage,
        prev_page_url: prevPage,
        next_page_url: nextPage,
        from,
        to
      } = response
      this.transactions = data
      this.from = from
      this.to = to
      this.currentPage = currentPage
      this.prevPage = prevPage != null && this.online ? this.currentPage - 1 : null
      this.nextPage = nextPage != null && this.online ? this.currentPage + 1 : null
      this.loading = false
    },
    getLocalAddressTransactions () {
      const path = this.offlineTxPath
      const transactionsJson = fs.readFileSync(path)
      const transactionsObj = JSON.parse(transactionsJson)

      this.parseTransactionsData(transactionsObj)
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
          if (self.currentPage === 1) {
            const path = this.offlineTxPath
            const jsonData = JSON.stringify(response)
            fs.writeFileSync(path, jsonData)
          }
          self.parseTransactionsData(response)
        })
    }
  }
}
</script>
