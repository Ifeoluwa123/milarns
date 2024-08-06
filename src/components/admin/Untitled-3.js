  // Function to update bank information
  const updateBankInformation = (fieldName, value) => {
    setEmployeeData(prevEmployeeData => ({
      ...prevEmployeeData,
      bankinformation: {
        ...prevEmployeeData.bankinformation,
        [fieldName]: value
      }
    }));
  };