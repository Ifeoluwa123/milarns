
// selectAll, setSelectAll, data:staffList.results, setData,  setSelectedUsers
export const handleSelectAll = (selectAll, setSelectAll, data, setData,  setSelectedUsers)=>{
    const newSelectAll = !selectAll;
    const newRows = data.map(row => ({ ...row, checked: newSelectAll }));
    setData(newRows);
    setSelectAll(newSelectAll);
    setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))
  
}


// staffCode, data, setData, setSelectAll, setSelectedUsers
export const handleRowChange = (staffCode, data, setData, setSelectAll, setSelectedUsers) => {
    // console.log(staffCode)
    const newRows = data.map(item => 
      item.code === staffCode ? { ...item, checked: !item.checked } : item
    );
    setData(newRows);
    setSelectAll(newRows.every(item => item.checked ));
    setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))
  }; 



  // selectAll, setSelectAll, data:staffList.results, setData,  setSelectedUsers
export const handlePayrollSelectAll = (selectAll, setSelectAll, data, setData,  setSelectedUsers)=>{
  const newSelectAll = !selectAll;
  const newRows = data.map(item => {
    return {
      ...item,
      staff: {
        ...item.staff,
        checked: false, 
      }
    };
  });
  setData(newRows);
  setSelectAll(newSelectAll);
  setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))

}


// staffCode, data, setData, setSelectAll, setSelectedUsers
export const handlePayrollRowChange = (staffCode, data, setData, setSelectAll, setSelectedUsers) => {
  const newRows = data.map(item => 
    item.staff.code === staffCode 
      ? { ...item, staff: { ...item.staff, checked: !item.staff.checked } } 
      : item
  );

  setData(newRows);
  setSelectAll(newRows.every(item => item.staff.checked));
  setSelectedUsers(newRows.filter(item => item.staff.checked).map(item => item.staff.code));
}; 