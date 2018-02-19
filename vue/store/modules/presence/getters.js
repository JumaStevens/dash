export default {
  getUserPresence: (state, getters) => (uid) => {
    const presence = state.presence
    return presence[uid]
  }
}
