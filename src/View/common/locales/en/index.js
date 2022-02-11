const dashboard = require('./dashboard.json');
const accounts = require('./accounts.json');
const profile = require('./profile.json');
const messages = require('./messages.json');
const users = require('./users.json');
const beneficiaries = require('./beneficiaries.json');
const securitySettings = require('./securitySettings.json');
const exchange = require('./exchange.json');
const languages = require('./languages.json');
const quickTransfer = require('./quickTransfer.json');
const documents = require('./documents.json');
const transfer = require('./transfer.json');
const contactus = require('./contactUs.json');
const cards = require('./cards.json');
const transactions = require('./transactions.json');
const mobile = require('./mobile.json');
const more = require('./more.json');
// and so on

module.exports = function() {
  return {
    dashboard,
    accounts,
    profile,
    messages,
    users,
    beneficiaries,
    languages,
    securitySettings,
    exchange,
    quickTransfer,
    documents,
    transfer,
    cards,
    transactions,
    contactus,
    mobile,
    more,
  };
};
