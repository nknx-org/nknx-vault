import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  transactions: false,
  loading: true,
  latestTx: false
})

export const mutations = {
  setTransactions (state, txObj) {
    state.transactions = txObj
  },
  setLoading (state, bool) {
    state.loading = bool
  },
  setLatestTx (state, tx) {
    state.latestTx = tx
  }
}

export const getters = {
  getTransactions (state) {
    return state.transactions
  },
  getLoading (state) {
    return state.loading
  },
  getLatestTx (state) {
    return state.latestTx
  }
}

export const actions = {
  async updateTransactions ({ commit }, page) {
    commit('setLoading', true)

    const online = this.state.online.online
    const path = app.getPath('userData') + '\\transactions.json'
    const address = this.state.wallet.activeWallet.address

    if (online === true) {
      const data = await this.$axios.$get(
        `https://api.nknx.nkn.org/addresses/${address}/transfers?page=${page}`
      )

      if (page === 1) {
        commit('setLatestTx', data.data[0])
        const jsonTransactions = JSON.stringify(data)
        fs.writeFileSync(path, jsonTransactions)
      }

      commit('setTransactions', data)
      commit('setLoading', false)
    } else {
      const transactionsJson = fs.readFileSync(path)
      const transactionsObj = JSON.parse(transactionsJson)

      commit('setTransactions', transactionsObj)
      commit('setLoading', false)
    }
  },
  updateLoading ({ commit }, bool) {
    commit('setLoading', bool)
  }
}
