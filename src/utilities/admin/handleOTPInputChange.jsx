const handleOTPInputChange = (index,inputs,setOtp, e) => {
  const value = e.target.value;
  if (value && /^[a-zA-Z0-9]$/.test(value)) {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });
    if (index < inputs.length - 1 && value) {
      inputs[index + 1].current.focus();
    }
  }
  // if (!value) {
  //   if (index > 0 && !value) {
  //     inputs[index - 1].current.focus();
  //   }
  // }
  

};

const handleOTPPaste = (inputs,setOtp,e) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('text');
  const otpArray = pastedData.match(/\d/g);

  if (otpArray && otpArray.length <= inputs.length) {
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      otpArray.forEach((value, index) => {
        newOtp[index] = value;
        if (index < inputs.length - 1) {
          inputs[index + 1].current.focus();
        }
      });
      return newOtp;
    });
  }
};


const handleKeyDown = (index, inputs, setOtp, e) => {

  if (e.key === "Backspace") {
    // Handle Backspace key press
    if (index > 0 && !e.target.value) {
      inputs[index - 1].current.focus();
    }
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = ''; // Clear the current value
      return newOtp;
    });
  }
};

export {handleOTPInputChange,handleOTPPaste,handleKeyDown}