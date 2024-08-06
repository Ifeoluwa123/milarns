export default function removeEmptyValues(obj) {
    const result = {};
  
    for (const key in obj) {
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        const subObject = removeEmptyValues(obj[key]);
        if (Object.keys(subObject).length !== 0) {
          result[key] = subObject;
        }
      } else if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
        result[key] = obj[key];
      }
    }
  
    return result;
  }