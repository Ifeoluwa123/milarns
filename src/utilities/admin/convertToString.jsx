function convertToString(inputArr){
    let stringWithoutComma = inputArr.toString('').replace(/,/g, '')
    return stringWithoutComma
  }

  export default convertToString