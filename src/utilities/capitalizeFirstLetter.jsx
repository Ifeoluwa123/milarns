function capitalizeFirstLetter(str) {
    // Check if the input string is empty or null
    if (!str) return str;
  
    // Capitalize the first character and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  export default capitalizeFirstLetter