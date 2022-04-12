export const unixTimeConvert = (unix_timestamp) => {
  const milliseconds = unix_timestamp * 1000;
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString();

  return humanDateFormat;
};

export const getStorageValue = (item) => {
  return localStorage.getItem("loginData")
    ? JSON.parse(localStorage.getItem("loginData"))
    : null;
};
