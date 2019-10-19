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
    const data = await this.$axios.$get(
      `https://api.nknx.nkn.org/addresses/${address}`
    )
    commit('setWalletInfo', data)
  }
}
