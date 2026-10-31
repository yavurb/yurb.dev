/** "30 Oct 2026" — rendered uppercase by the `.label` style. */
export default function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC", // API dates are UTC; don't let the server's zone shift the day
  }).format(date);
}
