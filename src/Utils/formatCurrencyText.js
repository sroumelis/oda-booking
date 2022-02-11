export const formatCurrencyText = currency => {
  let currencyName;
  let symbol;
  switch (currency) {
    case 'EUR':
      currencyName = 'Euro';
      symbol = '€';
      break;
    case 'USD':
      currencyName = 'American Dollar';
      symbol = '$';
      break;
    case 'GBP':
      currencyName = 'Pound';
      symbol = '£';
      break;
    case 'JPY':
      currencyName = 'Japanese yen';
      symbol = '¥';
      break;
    case 'RUB':
      currencyName = 'Russian Ruble';
      symbol = '₽';
      break;
    case 'CNY':
      currencyName = 'Chinese Yuan';
      symbol = '¥';
      break;
    case 'CZK':
      currencyName = 'Czech koruna';
      symbol = 'Kč';
      break;
    case 'CAD':
      currencyName = 'Canadian dollar';
      symbol = 'C$';
      break;
    case 'CHF':
      currencyName = 'Swiss franc';
      symbol = 'Fr';
      break;
    case 'DKK':
      currencyName = 'Danish krone';
      symbol = 'Kr';
      break;
    case 'AED':
      currencyName = 'arab emirates dirhams';
      symbol = 'د.إ';
      break;
    default:
      currencyName = currency;
      symbol = '';
      break;
  }
  return {
    currencyName,
    symbol,
  };
};
