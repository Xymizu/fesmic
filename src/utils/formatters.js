// Format currency to IDR
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (date, options = {}) => {
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...options,
  }).format(new Date(date));
};

// Format date with time
export const formatDateTime = (date) => {
  return formatDate(date, {
    hour: "2-digit",
    minute: "2-digit",
  });
};
