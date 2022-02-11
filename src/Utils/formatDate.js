const formatTimeStampYMD = date => {
  var d = new Date(date * 1000),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

const formatDate = {
  formatTimeStampYMD,
};

export default formatDate;
