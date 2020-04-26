require('dotenv').config();
const express = require('express');

const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant(process.env.cloudant_url);
const authdb = cloudant.db.use('authentication');
const vendordb = cloudant.db.use('vendor');
const itemdb = cloudant.db.use('item');
let app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function defaultRoute(req, res) {
    let response = {
        'path': req.path,
        'body': req.body
    }
    res.send(response);
}

async function getAccounts() {
    let response = {};
    let records = await authdb.list({ include_docs: true });
    console.log(records.rows);
    response.accounts = [];
    for (row of records.rows) {
        let a = {}
        a.accountID = row.id;
        a.accountName = row.doc.accountName;
        a.accountType = row.doc.accountType;
        response.accounts.push(a);
    }
    return response;
}
async function getAccount(req) {
    let response = {};
    let record = await authdb.get(req.body.accountID);
    console.log(record);
    response.accountID = record._id;
    response.accountName = record.accountName;
    response.accountType = record.accountType;
    response.helped = record.helped;
    console.log(response);
    return response;
}

async function createAccount(req) {
    let response = {};

    let record = await authdb.insert({
        _id: req.body.accountID,
        accountName: req.body.accountName,
        accountType: req.body.accountType,
        helped: 0
    });
    console.log(record);
    response.accountID = record.id;
    response.accountName = req.body.accountName;
    response.accountType = req.body.accountType;
    return response;
}

async function updateAccount(req) {
    let response = {};
    let findAccount = await authdb.get(req.body.accountID);
    console.log(findAccount);
    findAccount.accountName = req.body.accountName;

    let record = await authdb.insert(findAccount);
    response.accountID = record.id;
    response.accountName = findAccount.accountName
    console.log(record);
    return response;
}

async function deleteAccount(req) {
    let response = {};
    let findRecord = await authdb.get(req.body.accountID);
    console.log(findRecord);
    let record = await authdb.destroy(
        req.body.accountID,
        findRecord._rev
    );

    console.log(record);
    response.accountID = record.id;
    return response;
}

async function account(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            if (req.body.accountID) {
                responsePromise = getAccount(req);
            }
            else {
                responsePromise = getAccounts();
            }
            break;
        case 'POST':
            responsePromise = createAccount(req);
            break;
        case 'PUT':
            responsePromise = updateAccount(req);
            break;
        case 'DELETE':
            responsePromise = deleteAccount(req);
    }
    response = await responsePromise.catch(
        error => res.status(500).send({ error })
    );
    res.send(response);
}

async function authenticateAccount(req) {
    let response = await getAccount(req);
    return response;
}

async function authenticate(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'POST':
            responsePromise = authenticateAccount(req)
            break;
    }
    response = await responsePromise.catch(
        error => res.status(500).send({ error })
    );
    res.send(response);
}
async function getVendors() {
    let response = {};
    let records = await vendordb.list({ include_docs: true });
    console.log(records.rows);
    response.vendors = [];
    for (row of records.rows) {
        let v = {}
        v.vendorID = row.id;
        v.vendorName = row.doc.vendorName;
        response.vendors.push(v);
    }

    return response;
}

async function getVendor(req) {

}

async function createVendor(req) {
    let response = {};

    let record = await vendordb.insert({
        _id: req.body.vendorID,
        vendorName: req.body.vendorName
    });
    console.log(record);
    response.vendorID = record.id;
    return response;
}

async function updateVendor(req) {
    let response = {};
    let findVendor = await vendordb.get(req.body.vendorID);
    console.log(findVendor);
    findVendor.vendorName = req.body.vendorName;

    let record = await vendordb.insert(findVendor);
    response.vendorID = record.id;
    response.vendorName = findVendor.vendorName
    console.log(record);
    return response;
}

async function deleteVendor(req) {
    let response = {};
    let findRecord = await vendordb.get(req.body.vendorID);
    console.log(findRecord);
    let record = await vendordb.destroy(
        req.body.vendorID,
        findRecord._rev
    );

    console.log(record);
    response.vendorID = record.id;
    return response;
}

async function vendor(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            if (req.body.vendorID) {
                responsePromise = getVendor(req);
            }
            else {
                responsePromise = getVendors();
            }
            break;
        case 'POST':
            responsePromise = createVendor(req);
            break;
        case 'PUT':
            responsePromise = updateVendor(req);
            break;
        case 'DELETE':
            responsePromise = deleteVendor(req);
            break;
    }
    response = await responsePromise.catch(
        error => res.status(500).send({ error })
    );
    res.send(response);
}



async function getItems(req) {
    let response = {};
    let records = await itemdb.partitionedList(req.body.vendorID, { include_docs: true });
    console.log(records.rows);
    response.items = records.rows;
    response.items = [];

    for (row of records.rows) {
        let i = {}
        i.vendorID = row.doc.vendorID;
        i.itemID = row.doc.itemID;
        i.quantityAvailable = row.doc.quantityAvailable;
        response.items.push(i);
    }

    return response;
}

async function createItem(req) {
    let response = {};

    let record = await itemdb.insert({
        _id: `${req.body.vendorID}:${req.body.itemID}`,
        itemID: req.body.itemID,
        vendorID: req.body.vendorID,
        itemName: req.body.itemName,
        quantityAvailable: 0
    });
    console.log(record);
    response.itemID = req.body.itemID;
    response.vendorID = req.body.vendorID;
    response.itemName = req.body.itemName;
    response.quantityAvailable = 0;
    return response;
}

async function updateItem(req) {
    let response = {};
    let findItem = await itemdb.get(req.body.itemID);
    console.log(findItem);
    findItem.itemName = req.body.itemName;

    let record = await itemdb.insert(findItem);
    response.itemID = record.id;
    response.itemName = findItem.itemName
    console.log(record);
    return response;
}

async function deleteItem(req) {
    let docID = `${req.body.vendorID}:${req.body.itemID}`;
    let response = {};
    let findRecord = await itemdb.get(docID);
    console.log(findRecord);
    let record = await itemdb.destroy(
        docID,
        findRecord._rev
    );

    console.log(record);
    response.vendorID = req.body.vendorID;
    response.itemID = req.body.itemID;
    return response;
}

async function item(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            responsePromise = getItems(req);
            break;
        case 'POST':
            responsePromise = createItem(req);
            break;
        case 'PUT':
            responsePromise = updateItem(req);
            break;
        case 'DELETE':
            responsePromise = deleteItem(req);
            break;
    }

    response = await responsePromise.catch(
        error => res.status(500).send({ error })
    );
    res.send(response);
}

function encode(data) {
    data = `${data.accountID}|${data.vendorID}|${data.itemID}|${data.modeID}`
    let buffer = new Buffer(data);
    return buffer.toString('base64');
}

function decode(code) {
    let buffer = new Buffer(code, 'base64');
    let decoded = buffer.toString('ascii').split('|');
    console.log(decoded);
    let data = {}
    data.accountID = decoded[0];
    data.vendorID = decoded[1];
    data.itemID = decoded[2];
    data.modeID = decoded[3];
    return data;
}
async function generate(req) {
    let response = {};
    response.accountID = req.body.accountID;
    response.vendorID = req.body.vendorID;
    response.itemID = req.body.itemID;
    response.modeID = req.body.modeID;
    let data = response;
    response.validationCode = encode(data);
    return response;
}

async function verify(req) {
    let response = {};
    let data = decode(req.body.validationCode);

    response.accountID = data.accountID;
    response.vendorID = data.vendorID;
    response.itemID = data.itemID;
    response.modeID = data.modeID;
    response.validationCode = req.body.validationCode;
    return response;
}

async function apply(req) {
    let response = {};
    if (req.body.modeID === 'donate') {
        let findAccount = await authdb.get(req.body.accountID);
        console.log(findAccount);
        findAccount.helped = findAccount.helped + 1;

        let record = await authdb.insert(findAccount);
        console.log(record);
        response.accountID = record.id;
        response.accountName = findAccount.accountName;
        response.helped = findAccount.helped;

        let findItem = await itemdb.get(`${req.body.vendorID}:${req.body.itemID}`);
        console.log(findItem);
        findItem.quantityAvailable = findItem.quantityAvailable + 1;

        record = await itemdb.insert(findItem);
        console.log(record);
        response.itemID = findItem.itemID;
        response.vendorID = findItem.vendorID;
        response.quantityAvailable = findItem.quantityAvailable;
    }
    else if (req.body.modeID === 'redeem') {
        let findItem = await itemdb.get(`${req.body.vendorID}:${req.body.itemID}`);
        console.log(findItem);
        findItem.quantityAvailable = findItem.quantityAvailable - 1;

        let record = await itemdb.insert(findItem);
        console.log(record);
        response.itemID = findItem.itemID;
        response.vendorID = findItem.vendorID;
        response.quantityAvailable = findItem.quantityAvailable;
    }
    return response;
}

async function validate(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            if (req.body.validationCode) {
                responsePromise = verify(req);
            }
            else {
                responsePromise = generate(req);
            }

            break;
        case 'POST':
            responsePromise = apply(req);
            break;
    }

    response = await responsePromise.catch(
        error => res.status(500).send({ error })
    );
    res.send(response);
}

app.use('/authenticate', authenticate);
app.use('/account', account);
app.use('/vendor', vendor);
app.use('/item', item);
app.use('/validate', validate);

app.use(defaultRoute);
const port = 80;

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))