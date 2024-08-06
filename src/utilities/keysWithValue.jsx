function keysWithValue(obj) {
    return Object.keys(obj).reduce((result, key) => {
      if (obj[key] !== null && obj[key] !== '') {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }


  export default keysWithValue