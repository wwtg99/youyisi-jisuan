import { LocalStorage, SessionStorage } from 'quasar'

export function save ({ state }) {
    LocalStorage.set(state.config_key, JSON.stringify(state.local))
}

export function load({ state, commit }) {
    let value = LocalStorage.getItem(state.config_key)
    commit('setLocal', JSON.parse(value))
}
