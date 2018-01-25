export default {
  submitError (state, payload) {
    state.error.isError = true
    state.error.type = payload
  },
  clearError (state) {
    state.error.isError = false
    state.error.type = ''
  }
}
