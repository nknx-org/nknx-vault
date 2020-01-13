import fs from 'fs'
import { remote } from 'electron'
const app = remote.app

export const state = () => ({
  activeWallet: false,
  walletInfo: false
})

export const mutations = {
  setActiveWallet (state, activeWalletObj) {
    state.activeWallet = activeWalletObj
  },
  setWalletInfo (state, walletInfoObj) {
    state.walletInfo = walletInfoObj
  }
}

export const getters = {
  getActiveWallet (state) {
    return state.activeWallet
  },
  getWalletInfo (state) {
    return state.walletInfo
  }
}

export const actions = {
  updateActiveWallet ({ commit }, wallet) {
    commit('setActiveWallet', wallet)
  },
  async updateWalletInfo ({ commit }, address) {
    const online = this.state.online.online
    const path = app.getPath('userData') + '\\walletInfo.json'

    if (online === true) {
      const data = await this.$axios.$get(
        `addresses/${address}`
      )

      const jsonWalletInfo = JSON.stringify(data)
      fs.writeFileSync(path, jsonWalletInfo)

      commit('setWalletInfo', data)
    } else {
      const walletInfoJson = fs.readFileSync(path)
      const walletInfoObj = JSON.parse(walletInfoJson)
      commit('setWalletInfo', walletInfoObj)
    }
  }
}
