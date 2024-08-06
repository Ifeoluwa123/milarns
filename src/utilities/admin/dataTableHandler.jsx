export const handleSelectAll = (e,data,setSelectAll,setData) => {
    const checked = e.target.checked;
    
    setSelectAll(checked);
    const updatedData = data.map((item) => ({ ...item, isChecked: checked }));
    setData(updatedData);
  };


  export const handleSingleCheckboxChange = (code,data,setSelectAll,setData) => {
    const updatedData = data.map((item) =>
      item.code === code ? { ...item, isChecked: !item.isChecked } : item
    );
    setData(updatedData);
    setSelectAll(updatedData.every((item) => item.isChecked));
  };