export function capitalizeWords(str) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
