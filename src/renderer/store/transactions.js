import fs from 'fs'
import { remote } from 'electron'
import Pusher from 'pusher-js'
const app = remote.app
export const state = () => ({
  transactions: false,
  loading: true,
  latestTx: false,
  avgFee: false
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
  },
  setAvgFee (state, fee) {
    state.avgFee = fee
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
  },
  getAvgFee (state) {
    return state.avgFee
  }
}

export const actions = {
  initPusher ({ dispatch }) {
    const pusher = new Pusher(process.env.PUSHER_SECRET, {
      cluster: process.env.PUSHER_CLUSTER,
      forceTLS: true,
      wsHost: process.env.PUSHER_HOST,
      wssPort: process.env.PUSHER_PORT,
      wsPort: process.env.PUSHER_PORT
    })
    Pusher.log = function (message) {
      console.log(message)
    }
    const address = this.state.wallet.activeWallet.address
    const channel = pusher.subscribe(`address.${address}`)
    const eventNames = ['coinbase-tx', 'delete-name-tx', 'transfer-asset-tx', 'transfer-name-tx', 'register-name-tx']

    eventNames.forEach(event => {
      channel.bind(event, transaction => {
        console.log(transaction)
        dispatch('updateTransactions', 1)
        dispatch('wallet/updateWalletInfo', address, { root: true })
      })
    })
    console.log(channel)
  },
  clearPusher () {
    const address = this.state.wallet.activeWallet.address
    this._vm.$pusher.unsubscribe(`address.${address}`)
  },
  async updateTransactions ({ commit }, page) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\transactions.json'
    const address = this.state.wallet.activeWallet.address

    if (online === true) {
      const data = await this.$axios.$get(
        `addresses/${address}/transfers?page=${page}`
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
  async updateAvgFee ({ commit }) {
    const data = await this.$axios.$get(
      'https://api.nknx.org/statistics/avgtxfee'
    )

    commit('setAvgFee', data)
  },
  updateLoading ({ commit }, bool) {
    commit('setLoading', bool)
  }
}
