const validateUserData = (data, setErr) => {
    const errorsObj = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    Object.keys(data).forEach(key => {
        if (data[key] === '' || data[key] === null ) {
          errorsObj[key] = `${key.replace("_", " ")} is required`;
        } else if (key === 'email' && !emailRegex.test(data[key])) {
          errorsObj[key] = 'Invalid email address';
        } else {
          errorsObj[key] = '';
        }
      });
  
    setErr(errorsObj);
  
    // Check if there are no errors (all fields are valid)
    return Object.values(errorsObj).every(error => error === '');
  };

  export default validateUserData