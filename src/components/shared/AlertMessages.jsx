

import Swal from 'sweetalert2';


export default  function AlertMessages(title, msg,type, options = {}) {
 
    const mergedOptions = Object.assign(
      {
        icon: type,
        title: title,
        text: msg,
        // footer: 'Milarn '+`&copy; `+new Date().getFullYear()
       
      },
      options
    );
  

    Swal.fire(mergedOptions);
  }