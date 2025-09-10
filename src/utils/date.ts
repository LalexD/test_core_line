export const formatDate = (dateInput: string | number | Date): string => {
  const date = new Date(dateInput);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

// Example: "Feb 26, 2023, 16.32 PM"
export const formatDateAndTime = (
  dateInput: string | number | Date
): string => {
  const date = new Date(dateInput);

  const enFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const parts = enFormatter.formatToParts(date).reduce<Record<string, string>>(
    (acc, p) => {
      acc[p.type] = p.value;
      return acc;
    },
    {}
  );

  const hours24 = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours24 >= 12 ? "PM" : "AM";
  const hoursStr = String(hours24).padStart(2, "0");
  return `${parts.month} ${parts.day}, ${parts.year}, ${hoursStr}.${minutes} ${ampm}`;
};


