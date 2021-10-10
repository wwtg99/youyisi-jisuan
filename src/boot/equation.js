function getOperatorId (operator) {
    if (1 <= operator <= 4) {
        return operator
    }
    if (operator === '-') {
        return 2
    } else if (operator === '*') {
        return 3
    } else if (operator === '/') {
        return 4
    } else {
        return 1
    }
}

function getOperatorName (operatorId) {
    if (operatorId === 1) {
        return '+'
    } else if (operatorId === 2) {
        return '-'
    } else if (operatorId === 3) {
        return '*'
    } else if (operatorId === 4) {
        return '/'
    } else {
        return ''
    }
}

function randomNum (minNum, maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random() * minNum + 1, 10); 
            break;
        case 2: 
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10); 
            break;
        default: 
            return 0; 
            break;
    }
}

class SimpleEquation {
    constructor (leftn, operator, rightn) {
        this.leftn = leftn
        this._operator = getOperatorId(operator)
        this.operator = getOperatorName(this._operator)
        this.rightn = rightn
        this._answer = this.calculate()
    }

    calculate () {
        if (this._operator === 1) {
            return this.leftn + this.rightn
        } else if (this._operator === 2) {
            return this.leftn - this.rightn
        } else if (this._operator === 3) {
            return this.leftn * this.rightn
        } else if (this._operator === 4) {
            return this.leftn / this.rightn
        } else {
            return null
        }
    }

    get answer () {
        return this._answer
    }
}

function generateEquations(number, type) {
    if (!type) {
        type = 1
    }
    const equations = []
    if (type === 1) {
        // simple equation +/- less than 10
        for (let i = 0;i < number;i++) {
            let leftn = randomNum(9)
            let sum = randomNum(leftn + 1, 10)
            let rightn = sum - leftn
            let operator = randomNum(1, 2)
            if (operator === 1) {
                equations.push(new SimpleEquation(leftn, operator, rightn))
            } else {
                equations.push(new SimpleEquation(sum, operator, leftn))
            }
        }
    }
    return equations
}

export { generateEquations }
