const DateComponent = ({ createdAt }) => {
  // Convert MongoDB created_at date string to JavaScript Date object
  const date = new Date(createdAt);

  // Format the date to a human-readable string
  const formattedDate = date.toLocaleString();

  return <h1>Order Date: {formattedDate}</h1>;
};
export default DateComponent;
