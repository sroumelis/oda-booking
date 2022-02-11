const enlayout = require('./en/layout.json');
const ellayout = require('./el/layout.json');
const endashboard = require('./en/dashboard.json');
const eldashboard = require('./el/dashboard.json');
const enaccounts = require('./en/accounts.json');
const elaccounts = require('./el/accounts.json');
const enprofile = require('./en/profile.json');
const elprofile = require('./el/profile.json');
const enmessages = require('./en/messages.json');
const elmessages = require('./el/messages.json');
const enusers = require('./en/users.json');
const elusers = require('./el/users.json');
const enbeneficiaries = require('./en/beneficiaries.json');
const elbeneficiaries = require('./el/beneficiaries.json');
const ensecurity = require('./en/securitySettings.json');
const elsecurity = require('./el/securitySettings.json');
const enexchange = require('./en/exchange.json');
const elexchange = require('./el/exchange.json');
const enquickTransfer = require('./en/quickTransfer.json');
const elquickTransfer = require('./el/quickTransfer.json');
const endocuments = require('./en/documents.json');
const eldocuments = require('./el/documents.json');
const entransfer = require('./en/transfer.json');
const eltransfer = require('./el/transfer.json');
const elcontactus = require('./el/contactUs.json');
const encontactus = require('./en/contactUs.json');
const encards = require('./en/cards.json');
const elcards = require('./el/cards.json');
const entransactions = require('./en/transactions.json');
const eltransactions = require('./el/transactions.json');
const elsuccess = require('./el/success.json');
const ensuccess = require('./en/success.json');
const elerror = require('./el/error.json');
const enerror = require('./en/error.json');
const elmobile = require('./el/mobile.json');
const enmobile = require('./en/mobile.json');
const elUniken = require('./el/uniken.json');
const enUniken = require('./en/uniken.json');
const elMore = require('./el/more.json');
const enMore = require('./en/more.json');
const enlanguages = require('./en/languages.json');
const ellanguages = require('./el/languages.json');

module.exports = () => {
  return {
    en: {
      // layout: enlayout,
      // users: enusers,
      // dashboard: endashboard,
      // accounts: enaccounts,
      // profile: enprofile,
      // beneficiaries: enbeneficiaries,
      // securitySettings: ensecurity,
      // exchange: enexchange,
      // quickTransfer: enquickTransfer,
      // documents: endocuments,
      // transfer: entransfer,
      // contactUs: encontactus,
      // cards: encards,
      // transactions: entransactions,
      // success: ensuccess,
      // error: enerror,
      // mobile: enmobile,

      // messages: enmessages,
      uniken: enUniken,
      // languages: enlanguages,
      // more: enMore,
    },
    el: {
      // layout: ellayout,
      // users: elusers,
      // dashboard: eldashboard,
      // accounts: elaccounts,
      // profile: elprofile,
      // beneficiaries: elbeneficiaries,
      // securitySettings: elsecurity,
      // exchange: elexchange,
      // quickTransfer: elquickTransfer,
      // documents: eldocuments,
      // transfer: eltransfer,
      // transactions: eltransactions,
      // contactUs: elcontactus,
      // cards: elcards,
      // success: elsuccess,
      // error: elerror,
      // mobile: elmobile,

      // messages: elmessages,
      // languages: ellanguages,
      uniken: elUniken,
      // more: elMore,
    },
  };
};

export * from './datePickerLocales';
