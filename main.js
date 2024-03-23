// Récupération des éléments du DOM
const inputNumber = document.querySelectorAll('.js-input-number')
const comma = document.querySelector('.js-input-comma')
const operator = document.querySelectorAll('.js-input-operator')
const reset = document.querySelector('.js-input-clear')
const validate = document.querySelectorAll('.js-input-valid')
const result = document.querySelector('.js-receive')

let calcul = []
let operatorArray = []
let validatingCount = 0

const regex = /^0+(\.0*)?$/
const operators = ['+', '-', '*', '/']

const clear = (log) => {
  reset.addEventListener('click', () => {
    log.textContent = ''
    calcul = []
    operatorArray = []
    validatingCount = 0
  })
}

const valid = (validate) => {
  validate.forEach((validatingInputs) => {
    validatingInputs.addEventListener('click', () => {
      if (result.textContent !== '' && calcul.length > 0 && operators.includes(result.textContent) === false) {
        pushingNumbers(calcul)
        validatingCount++
        calculating()
        if (validatingCount > 1) {
          calcul.splice(0, 2)
          operatorArray.splice(0, 1)
          if (operatorArray.length === 0) {
            calcul.pop()
            console.log('error')
          } else {
            calculating()
          }
        }
      }
    })
  })
}

const calculating = () => {
  let calculResult = eval(calcul[0] + operatorArray[0] + calcul[1])
  if (!Number.isInteger(calculResult)) {
    let calculResultFormatted = calculResult.toFixed(3)
      while (calculResultFormatted[calculResultFormatted.length - 1] === '0') {
        calculResultFormatted = calculResultFormatted.slice(0, -1)
      }
      result.textContent = calculResultFormatted
      console.log('virgule', calculResult)
  } else {
    result.textContent = calculResult
    console.log(calculResult)
  }
}

const pushingNumbers = (e) => {
  let text = result.textContent
  if (/[,.]/.test(text)) {
    text = text.replace(',', '.')
    e.push(parseFloat(text))
  } else {
    e.push(parseInt(text))
  }
}

const calculator = () => {
  inputNumber.forEach((input) => {
    input.addEventListener('click', () => {
      if (validatingCount > 0 && calcul.length === 2) {
        console.log(new Error('Impossible de d\'ajouter un chiffre a un résultat déjà validé'))
      } else if (validatingCount > 0 && calcul.length === 0) {
        console.log(new Error('Impossible de d\'ajouter un chiffre a un résultat déjà validé'))
      } else {
        result.textContent += input.textContent
        if (result.textContent.includes('+') || result.textContent.includes('-') || result.textContent.includes('*') || result.textContent.includes('/')){
          result.textContent = '' + input.textContent
        }
      }
    })
  })

  comma.addEventListener('click', () => {
    if (result.textContent === '') {
      result.textContent += '0' + comma.textContent
    } else if (result.textContent === '*' || result.textContent === '/' || result.textContent === '+' || result.textContent === '-' || result.textContent === ',') {
      console.log('error') // UNE ALERT ??
    } else if (calcul.length === 2) {
      console.log(new Error('Impossible de d\'ajouter une virgule a un résultat déjà validé'))
    } else {
      result.textContent += comma.textContent
    }
  })

  operator.forEach((operator) => {
    operator.addEventListener('click', () => {
      if (result.textContent === '' || regex.test(result.textContent) && validatingCount < 1) {
        console.log(new Error('Impossible d\'ajouter un opérateur car il n\'y a pas de nombre a calculer'))
      } else if (result.textContent === '*' || result.textContent === '/' || result.textContent === '+' || result.textContent === '-' || result.textContent === ',') {
        operatorArray.pop()
        operatorArray.push(operator.textContent)
        result.textContent = '' + operator.textContent
      } else {
        pushingNumbers(calcul)
        operatorArray.push(operator.textContent)
        result.textContent = ''
        result.textContent += operator.textContent
      }
    })
  })

  valid(validate)
  clear(result)
}

calculator()