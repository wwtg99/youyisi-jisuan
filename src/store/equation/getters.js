export function getReword (state) {
  return () => {
    const n = Math.ceil(Math.random() * state.rewords.length)
    return state.rewords[n]
  }
}
