

export default function handleSelectAll() {
    const newSelectAll = !selectAll;
    const newRows = staffList.results.map(row => ({ ...row, checked: newSelectAll }));
    setData(newRows);
    setSelectAll(newSelectAll);
    setSelectedUsers(newRows.filter(item=>item.checked == true ).map(item=>item.code))
  
}
