import { generateEquations } from 'boot/equation'

export function setNumber (state, number) {
    state.equationNumber = number
}

export function setType (state, type) {
    state.equationType = type
}

export function setScoreEach (state, val) {
    state.scoreEach = val
}

export function setLimitMinutes (state, val) {
    state.limitMinutes = val
}

export function setConfig (state, data) {
    state.equationType = data.equationType
    state.equationNumber = data.equationNumber
    state.scoreEach = data.scoreEach || 0
    state.limitMinutes = data.limitMinutes
}

export function setEquations (state, data) {
    state.equations = data
}

export function generate (state) {
    let equations = generateEquations(state.equationNumber, state.equationType)
    state.equations = equations
}
