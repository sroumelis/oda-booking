import elLocale from 'date-fns/locale/el';
import enGBLocale from 'date-fns/locale/en-GB';

const chooseDatepickerLocale = selectedLanguage => {
  if (selectedLanguage === 'el') {
    return elLocale;
  }
  return enGBLocale;
};
export { chooseDatepickerLocale };
