export default function formatDate(inputDate) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const [year, month, day] = inputDate.split('-');
    const monthIndex = parseInt(month, 10) - 1; // Adjusting month index to 0-based
    const monthName = months[monthIndex];

    return `${day} ${monthName} ${year}`;
}