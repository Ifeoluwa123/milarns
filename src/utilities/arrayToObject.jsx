export default function arrayToObject(arr) {
    return arr.reduce((result, obj) => {
      // Merge each object's properties into the result object
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          result[key] = obj[key];
        }
      }
      return result;
    }, {});
  }
  