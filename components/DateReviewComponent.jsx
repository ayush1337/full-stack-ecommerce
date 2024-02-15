const DateReview = ({ mongoDate }) => {
  // Convert MongoDB date string to a Date object
  const dateObject = new Date(mongoDate);

  // Format the date to display only day and date
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    weekday: 'short', // Full weekday name (e.g., "Monday")
    month: 'short', // Full month name (e.g., "January")
    day: 'numeric', // Numeric day of the month (e.g., "01")
  });

  return <span className="text-xs ">{formattedDate}</span>;
};
export default DateReview;
