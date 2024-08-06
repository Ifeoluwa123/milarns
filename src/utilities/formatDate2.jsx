function formatDate2(inputDate) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Parse the input date string
    const date = new Date(inputDate);

    // Get the day, month, and year from the parsed date
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Format the output string
    const formattedDate = `${day} ${month}, ${year}`;

    return formattedDate;
}

//Format:  "30 April, 2024"

export default formatDate2