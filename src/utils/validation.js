const isTaxId = (value) => {
  if (value.length !== 13) {
    return false
  } else {
    if (value === null || value === undefined || value === '') {
      return true
    }
    const _value = Number(value)
    const re = /^-?\d+(\.\d+)?$/
    return re.test(_value)
  }
}

const isEmail = (value) => {
  if (value === '') return true
  return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
    value
  )
}

const isThaiMobile = (value) => {
  if (value === '') return true
  return /^(\+)?(66|0)(-|\s)?\d{2}(-|\s)?\d{3}(-|\s)?\d{4}$/.test(value)
}
const isThaiPhone = (value) => {
  // if (value === '') return true
  return /^(\+)?(66|0)(-|\s)?\d{2}(-|\s)?\d{3}(-|\s)?\d{3}$/.test(value)
}

const isEligbleSimSerialFormat = (value) => {
  if (value.length !== 18) return false
  return /^8966?\d{14}$/.test(value)
}

const isThaiID = (value) => {
  // if (value === '') return true
  if (value.length !== 13) return false
  let j = 13
  const temp = []
  let temp2 = 0

  for (let i = 0; i <= 11; i += 1) {
    temp[i] = Number(value[i]) * j
    temp2 += temp[i]
    j -= 1
  }

  const mod = temp2 % 11
  const ans = 11 - mod
  const answer = ans % 10
  const www = Number(value[12])
  if (www === answer) {
    return true
  }
  return false
}
const isThaiFullname = (value) => {
  return /^\w+(\s)\w+$/.test(value)
}
const isEqualLength = (value, equalLength) => {
  if (value === null || value === undefined || value === '') {
    return true
  }
  return value.length === equalLength
}
const moreThanMaxLength = (value, maxLength) => {
  if (value === null || value === undefined) {
    return true
  }
  return value.length > maxLength
}
const lessThanMinLength = (value, minLength) => {
  if (value === null || value === undefined) {
    return true
  }
  return value.length < minLength
}
const isAlphabet = (value) => {
  return /[a-zA-Zก-ฮ]/.test(value)
}

function isNumber(value) {
  if (value === null || value === undefined || value === '') {
    return true
  }
  const _value = Number(value)
  const re = /^-?\d+(\.\d+)?$/
  return re.test(_value)
}

function isNumberAndStar(value) {
  if (value === null || value === undefined || value === '') {
    return true
  }
  // const _value = Number(value)
  const re = /^(\*|[0-9])+([0-9]{2,7})?$/
  return re.test(value)
}

const isCorrectBracket = (value) => {
  const regex = /^.+\(.+\)/
  if (/[()]/.test(value)) {
    return regex.test(value)
  }
  return true
}
const isStartWithSpacing = (value) => {
  const regex = /^\s/
  return regex.test(value)
}
const isContainDoubleSpacing = (value) => {
  const regex = /\s{2,}/
  return regex.test(value)
}
const isEndWithSpacing = (value) => {
  const regex = /\s$/
  return regex.test(value)
}
const isContainSpecialChar = (value) => {
  const regex = /[!@#$%&฿"'<>*+~`_?{}()|^\\/]/
  return regex.test(value)
}
const validateRules = (value, rules) => {
  let errorMessage = ''
  for (const ruleKey in rules) {
    const rule = rules[ruleKey] // rule could be string or object
    if (errorMessage === '') {
      switch (ruleKey) {
        case 'required':
        case 'require':
          errorMessage =
            value === '' || value === {} || value === undefined || value === null ? rule : ''
          break
        case 'email':
          if (!isEmail(value)) errorMessage = rule
          break
        case 'thaiMobile':
          if (!isThaiMobile(value)) errorMessage = rule
          break
        case 'thaiPhone':
          if (!isThaiPhone(value)) errorMessage = rule
          break
        case 'thaiId':
          if (!isThaiID(value)) errorMessage = rule
          break
        case 'thaiFullname':
          if (!isThaiFullname(value)) errorMessage = rule
          break
        case 'equalLength':
          if (!rule.length) {
            console.error('isEqualLength error. Please send length key')
            break
          }
          if (!isEqualLength(value, rule.length)) errorMessage = rule.message
          break
        case 'maxLength':
          if (!rule.maxLength) {
            console.error('maxLength error. Please send maxLength key')
            break
          }
          if (moreThanMaxLength(value, rule.maxLength)) errorMessage = rule.message
          break
        case 'minLength':
          if (!rule.minLength) {
            console.error('minLength error. Please send minLength key')
            break
          }
          if (lessThanMinLength(value, rule.minLength)) errorMessage = rule.message
          break
        case 'alphabet':
          if (!isAlphabet(value)) errorMessage = rule
          break
        case 'number':
          if (!isNumber(value)) errorMessage = rule
          break
        case 'correctBracket':
          if (!isCorrectBracket(value)) errorMessage = rule
          break
        case 'notStartWithSpacing':
          if (isStartWithSpacing(value)) errorMessage = rule
          break
        case 'notContainDoubleSpacing':
          if (isContainDoubleSpacing(value)) errorMessage = rule
          break
        case 'notEndWithSpacing':
          if (isEndWithSpacing(value)) errorMessage = rule
          break
        case 'notContainSpecialChar':
          if (isContainSpecialChar(value)) errorMessage = rule
          break
        case 'customValidate':
          for (let i = 0; i < rules.customValidate.length; i++) {
            if (value !== '' && !rules.customValidate[i].valid(value)) {
              errorMessage =
                rules.customValidate[i].customMessage !== undefined
                  ? rules.customValidate[i].customMessage(value)
                  : rules.customValidate[i].message
              break
            }
          }
          break
        case 'taxId':
          if (!isTaxId(value)) errorMessage = rule
          break
        default:
          errorMessage = ''
          break
      }
    }
  }
  return errorMessage
}

const isLettersENG = (value) => {
  return /^[A-Za-z]+$/.test(value)
}

const isLettersTHA = (value) => {
  return /^[ก-๙]+$/.test(value)
}

export default {
  validateRules,
  isEmail,
  isThaiMobile,
  isNumber,
  isTaxId,
  isAlphabet,
  isLettersENG,
  isLettersTHA,
  isEligbleSimSerialFormat,
  isNumberAndStar,
}
