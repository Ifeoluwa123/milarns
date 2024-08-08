

export function handleSelectAll(selectAll, setSelectAll, data, setData, setSelectAll, setSelectedUsers) {
    const newSelectAll = !selectAll;
    const newRows = data.map(row => ({ ...row, checked: newSelectAll }));
    setData(newRows);
    setSelectAll(newSelectAll);
    setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))
  
}


export const handleRowChange = (staffCode) => {
    // console.log(staffCode)
    const newRows = data.map(item => 
      item.code === staffCode ? { ...item, checked: !item.checked } : item
    );
    setData(newRows);
    setSelectAll(newRows.every(item => item.checked ));
    setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))
  };


