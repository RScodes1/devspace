export const truncate = (text, len = 50) =>
  text.length > len ? text.slice(0, len) + "..." : text;

export const formatDate = (date) =>
  new Date(date).toLocaleString();
