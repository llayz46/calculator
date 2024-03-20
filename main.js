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
        console.log('valid', calcul) // TO REMOVE
        validatingCount++
        console.log('validatingCount', validatingCount) // TO REMOVE
        result.textContent = eval(calcul[0] + operatorArray[0] + calcul[1])
        if (validatingCount > 1) {
          calcul.splice(0, 2)
          operatorArray.splice(0, 1)
          if (operatorArray.length === 0) {
            calcul.pop()
            console.log('error')
          } else {
            result.textContent = eval(calcul[0] + operatorArray[0] + calcul[1])
          }
        }
      }
    })
  })
}

const pushingNumbers = (e) => {
  let text = result.textContent
  if (/,/.test(text)) {
    text = text.replace(',', '.')
    e.push(parseFloat(text))
  } else {
    e.push(parseInt(text))
  }
}

const pushingToArray = (e) => {
  let text = result.textContent
  if (/,/.test(text)) {
    text = text.replace(',', '.')
    e.push(parseFloat(text))
  } else if (operators.includes(text)) {

  }
  else {
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
      console.log ('error') // UNE ALERT ??
    }
    else {
      result.textContent += comma.textContent
    }
  })

  operator.forEach((operator) => {
    operator.addEventListener('click', () => {
      if (result.textContent === '' || regex.test(result.textContent)) {
        console.log ('error : pas de nombre') // UNE ALERT ??
      } else if (result.textContent === '*' || result.textContent === '/' || result.textContent === '+' || result.textContent === '-' || result.textContent === ',') {
        operatorArray.pop()
        operatorArray.push(operator.textContent)
        result.textContent = '' + operator.textContent
      } else {
        pushingNumbers(calcul)
        operatorArray.push(operator.textContent)
        console.log('operator : tableau des signes', operatorArray) // TO REMOVE
        console.log('operator : tableau des nombres', calcul) // TO REMOVE
        result.textContent = ''
        result.textContent += operator.textContent
      }
    })
  })

  valid(validate)
  clear(result)
}

calculator()

// FIXS :
// - Régler le problème de la virgule (nombres de chiffres après vigrule au résultat) = par ex seulement 2 chiffres après la virgule
// - Régler les nombres a virgules
// - Régler le problème d'impossibilité d'agir après un résultat égal a 0 (9+9 - 18)
// - Régler le problème que si un résultat présent est un nombre a virgule ex: 48/5 = 9.6 si on lui ajoute 3: 9.6 + 3 = 12.6 mais cela fait 12