export default {
  setData (state, payload) {
    state.data = payload
    state.isUser = true
    console.log('setData: ', payload)
  },
  destroyData (state) {
    state.data = null
    state.isUser = false
    console.log('destroyData')
  }
}
