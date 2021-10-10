import { generateEquations } from 'boot/equation'

export function setNumber (state, number) {
    state.equationNumber = number
}

export function setType (state, type) {
    state.equationType = type
}

export function setEquations (state, data) {
    state.equations = data
}

export function generate (state) {
    let equations = generateEquations(state.equationNumber, state.equationType)
    state.equations = equations
}
