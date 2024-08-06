function getKeysWithEmptyValues(obj) {
    const keysWithEmptyValues = Object.keys(obj).reduce((acc, key) => {
      if (obj[key] === '') {
        acc[key] = '';
      }
      return acc;
    }, {});
  
    return keysWithEmptyValues;
  }

  export default getKeysWithEmptyValues