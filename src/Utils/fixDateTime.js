export const fixDateTime = date => {
  const validDate = new Date(date);
  const year = validDate.getFullYear();
  let month = validDate.getMonth() + 1;
  let dt = validDate.getDate();
  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  return dt + '/' + month + '/' + year;
};
