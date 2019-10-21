export const state = () => ({
  online: false
})

export const mutations = {
  setOnline (state) {
    state.online = navigator.onLine
  }
}

export const getters = {
  getOnline (state) {
    return state.online
  }
}

export const actions = {
  updateOnline ({ commit }) {
    commit('setOnline')
  }
}
