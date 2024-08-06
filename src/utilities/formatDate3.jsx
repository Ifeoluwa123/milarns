function formatDate3(inputDateTime) {
// Convert input string to Date object
const dateObj = new Date(inputDateTime);

// Extract date components
const day = dateObj.getDate();
const month = dateObj.toLocaleString('default', { month: 'long' });
const year = dateObj.getFullYear();

// Extract time components
const hours = dateObj.getHours();
const minutes = ('0' + dateObj.getMinutes()).slice(-2);
const seconds = ('0' + dateObj.getSeconds()).slice(-2);

// Determine whether it's AM or PM
const am_pm = hours >= 12 ? "PM" : "AM";

// Convert hour to 12-hour format
const hour_12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM

// Construct formatted time string
const time = `${hour_12}:${minutes}:${seconds} ${am_pm}`;

// Construct formatted date and time string
const formattedDateTime = `${day} ${month}, ${year}, ${time}`;

return formattedDateTime;

}


export default formatDate3