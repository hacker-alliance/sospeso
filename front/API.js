// require('axios');
const axios = require('axios');

const url = 'https://sospeso.hackeralliance.org';

// Also use to Get Account Info
async function login(accountID, accountPassword) {
  // returns promise to object
  // {
  //     "accountID"
  //     "accountType"
  //     "helped"
  // }
  return axios.post(`${url}/authenticate`, { accountID });
}

async function createAccount(accountID, accountName, accountType) {
  // returns promise to object
  // {
  //     "accountID"
  //     "accountType"
  //     "helped"
  // }
  return axios.post(`${url}/account`, { accountID, accountName, accountType });
}

async function getVendors() {
  // returns promise to object containing an array
  // {
  //     "vendors": [
  //         {
  //             "vendorID"
  //             "vendorName"
  //         }
  //     ]
  // }
  return axios.get(`${url}/vendor`);
}

async function createVendor(vendorID, vendorName) {
  // returns promise to object
  // {
  //     "vendorID"
  //     "vendorName"
  // }
  return axios.post(`${url}/vendor`, {
    vendorID,
    vendorName,
  });
}

async function updateVendor(vendorID, vendorName) {
  // returns promise to object
  // {
  //     "vendorID"
  //     "vendorName"
  // }
  return axios.put(`${url}/vendor`, {
    vendorID,
    vendorName,
  });
}

async function deleteVendor(vendorID) {
  // returns promise to object
  // {
  //     "vendorID"
  // }
  return axios.delete(`${url}/vendor`, {
    vendorID,
  });
}

async function getAccounts(accountID) {
  // returns promise to object containing an array
  // {
  //     "accounts": [
  //         {
  //             "accountID"
  //             "accountName"
  //             "accountType"
  //         }
  //     ]
  // }
  return axios.get(`${url}/account`, {
    data: {
      accountID,
    }
  });
}

async function getItems(vendorID) {
  // returns promise to object containing an array
  // {
  //     "items": [
  //         {
  //             "vendorID"
  //             "itemID"
  //             "quantityAvailable"
  //         }
  //     ]
  // }
  return axios.get(`${url}/item?vendorID=${vendorID}`);
}

async function getValidationCode(accountID, vendorID, itemID, modeID) {
  // returns promise to object
  // {
  //   "accountID"
  //   "vendorID"
  //   "itemID"
  //   "modeID"
  //   "validationCode"
  // }
  return axios.get(`${url}/validate?accountID=${accountID}&vendorID=${vendorID}&modeID=${modeID}`);
}

async function verifyValidationCode(validationCode) {
  // returns promise to object
  // {
  //   "accountID"
  //   "vendorID"
  //   "itemID"
  //   "modeID"
  //   "validationCode"
  // }
  return axios.get(`${url}/validate?validationCode=${validationCode}`);
}

// returns promise to object
// {
//   "accountID"
//   "helped"
//   "itemID"
//   "vendorID"
//   "quantityAvailable"
// }
async function validateTransaction(
  accountID,
  vendorID,
  itemID,
  modeID,
  validationCode,
) {
  return axios.get(`${url}/validate?accountID=${accountID}&vendorID=${vendorID}&itemID=${itemID}&validationCode${validationCode}`, {
    accountID,
    vendorID,
    itemID,
    modeID,
    validationCode,
  });
}

let api = {};
api.login = login;
api.createAccount = createAccount;
api.getVendors = getVendors;
api.createVendor = createVendor;
api.updateVendor = updateVendor;
api.deleteVendor = deleteVendor;
api.getAccounts = getAccounts;
api.getItems = getItems;
api.getValidationCode = getValidationCode;
api.verifyValidationCode = verifyValidationCode;
api.validateTransaction = validateTransaction;

export { api };
