function getCurrentMonthAndYear() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Adding 1 since getMonth() returns zero-based index
    const year = currentDate.getFullYear();
    return {
        month: month,
        year: year
    };
}

export default getCurrentMonthAndYear