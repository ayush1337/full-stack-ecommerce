export const filterFormikErros = (errors, touched) => {
  const touchedKeys = Object.entries(touched).map(([key, value]) => {
    if (value) return key;
  });
  const finalErrors = [];
  Object.entries(errors).forEach(([key, value]) => {
    if (touchedKeys.includes(key) && value) finalErrors.push(value);
  });
  return finalErrors;
};
