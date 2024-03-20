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

const clear = (log) => {
  reset.addEventListener('click', () => {
    log.textContent = ''
    calcul = []
    console.log('clear', calcul) // TO REMOVE
    // Régler le clear : 6 + 6 puis rajout d'un chiffre au résultat fonctionne après un clear
  })
}

const valid = (validate) => {
  validate.forEach((validatingInputs) => {
    validatingInputs.addEventListener('click', () => {
      if (result.textContent !== '' && calcul.length > 0 && result.textContent !== '*' && result.textContent !== '/' && result.textContent !== '+' && result.textContent !== '-') {
        calcul.push(parseFloat(result.textContent))
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

// PUSHING NUMBERS

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
        console.log ('error') // UNE ALERT ??
      } else if (result.textContent === '*' || result.textContent === '/' || result.textContent === '+' || result.textContent === '-' || result.textContent === ',') {
        result.textContent = '' + operator.textContent
      } else {
        calcul.push(parseFloat(result.textContent))
        operatorArray.push(operator.textContent)
        console.log('operator', operatorArray) // TO REMOVE
        console.log('operator', calcul) // TO REMOVE
        result.textContent = ''
        result.textContent += operator.textContent
      }
    })
  })

  valid(validate)
  clear(result)
}

calculator()


// calcul = parseFloat(result.textContent)
// Récupérer la valeur str de result.textContent et la convertir en float a la toute fin

// FIXS :
// - Régler le clear : 6 + 6 puis rajout d'un chiffre au résultat fonctionne après un clear
// - Régler le problème de la virgule (nombres de chiffres après vigrule au résultat)
// - Régler les nombres a virgules


// const pushingNumbers = (e) => {
//   const text = result.textContent
//   if (/,/.test(text)) {
//     text.replace(',', '.')
//   } else {
//     e.push(parseInt(text))
//   }
// }