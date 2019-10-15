export const state = () => ({
  snack: '',
  color: 'alert'
})

export const mutations = {
  setSnack (state, payload) {
    state = Object.assign(state, payload)
  }
}
