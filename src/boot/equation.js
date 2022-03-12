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

/**
 * 生成随机整数，两边都包含
 * @param {int} minNum
 * @param {int} maxNum
 * @returns
 */
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

/**
 * 生成等式
 * @param {int} maxLevel
 * @param {int} type
 * @returns
 */
function generateEquation(maxLevel, type) {
  // simple equation than maxLevel
  let opeMin = 1
  let opeMax = 2
  if (type === 2) {
    opeMax = 4
  }
  let operator = randomNum(opeMin, opeMax)
  if (operator === 4) {
    // division
    let leftn = randomNum(Math.round(Math.sqrt(maxLevel)))
    let rightn = randomNum(Math.round(Math.sqrt(maxLevel)))
    return new SimpleEquation(leftn * rightn, operator, rightn)
  } else if (operator === 3) {
    // multiplication
    let leftn = randomNum(Math.round(Math.sqrt(maxLevel)))
    let rightn = randomNum(Math.round(Math.sqrt(maxLevel)))
    return new SimpleEquation(leftn, operator, rightn)
  } else if (operator === 2) {
    // minus
    let leftn = randomNum(maxLevel - 1)
    let sum = randomNum(maxLevel - 1) + leftn
    return new SimpleEquation(sum, operator, leftn)
  } else {
    // plus
    let leftn = randomNum(maxLevel - 1)
    let rightn = randomNum(maxLevel - 1)
    return new SimpleEquation(leftn, operator, rightn)
  }
}

function generateEquations(number, type) {
    if (!type) {
        type = 1
    }
    const equations = []
    if (type === 1) {
      // simple equation +- less than 10
      for (let i = 0;i < number; i++) {
        equations.push(generateEquation(10, 1))
      }
    } else if (type === 2) {
      // simple equation +- less than 50
      for (let i = 0;i < number; i++) {
        equations.push(generateEquation(50, 1))
      }
    } else if (type === 3) {
      // simple equation +-*/ less than 50
      for (let i = 0;i < number; i++) {
        equations.push(generateEquation(50, 2))
      }
    } else if (type === 4) {
      // simple equation +- less than 100
      for (let i = 0;i < number; i++) {
        equations.push(generateEquation(100, 1))
      }
    } else if (type === 5) {
      // simple equation +-*/ less than 100
      for (let i = 0;i < number; i++) {
        equations.push(generateEquation(100, 2))
      }
    }
    return equations
}

export { generateEquations }
