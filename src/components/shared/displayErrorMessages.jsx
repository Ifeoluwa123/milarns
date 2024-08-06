import Swal from 'sweetalert2';
import formatFieldName from './formatFieldName';


function displayErrorMessages(err) {
    let errorMessage = err.message;
    let errors = err.errors;

    let formattedErrors = '<ul>';
    let mergedformattedErrors  = ""
    let mergedOptions = "";
    if (errors && typeof errors === 'object') {
      
        for (const field in errors) {
            // console.log(errors[field])
          formattedErrors += `<li><strong>${formatFieldName(field)}:</strong> ${errors[field]}</li>`;
        }
        formattedErrors += '</ul>';
        mergedformattedErrors = Object.assign(
            {
              icon: "error",
              title: "Error",
              html:formattedErrors 
          
              // footer: 'Milarn '+`&copy; `+new Date().getFullYear()
             
            },
     
          );
    }

    if(errorMessage && typeof errorMessage === 'string'){
         mergedOptions = Object.assign(
            {
              icon: "error",
              title: "Error",
              text: errorMessage
              // footer: 'Milarn '+`&copy; `+new Date().getFullYear()
             
            },
           
          );
    }
    
  

      Swal.fire(mergedformattedErrors || mergedOptions);
  
  }

  export default displayErrorMessages



 