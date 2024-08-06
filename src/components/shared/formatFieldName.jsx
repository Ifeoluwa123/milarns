function formatFieldName(fieldName) {
    // Split the field name by underscores and capitalize each word
    const words = fieldName.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
    // Join the words to form the formatted field name
    const formattedFieldName = words.join(' ');
  
    return formattedFieldName;
  }

  export default formatFieldName