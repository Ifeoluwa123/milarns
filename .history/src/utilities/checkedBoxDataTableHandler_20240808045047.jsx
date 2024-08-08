

export default function handleSelectAll(selectAll, setSelectAll, data, setData, setSelectAll, setSelectedUsers) {
    const newSelectAll = !selectAll;
    const newRows = data.map(row => ({ ...row, checked: newSelectAll }));
    setData(newRows);
    setSelectAll(newSelectAll);
    setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))
  
}
