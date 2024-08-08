
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
  const newRows = data.map(row => ({ ...row, checked: newSelectAll }));
  setData(newRows);
  setSelectAll(newSelectAll);
  setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))

}