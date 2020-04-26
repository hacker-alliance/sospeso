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
    response.accounts = records.rows;
    return response;
}
async function getAccount(req) {
    let response = {};
    let record = await authdb.get(req.body.accountID);
    console.log(record);
    response.accountID = record._id;
    console.log(response);
    return response;
}

async function createAccount(req) {
    let response = {};

    let record = await authdb.insert({
        _id: req.body.accountID,
        name: req.body.name,
        accountType: req.body.accountType
    });
    console.log(record);
    response.accountID = record.id;
    return response;
}

async function updateAccount(req) {
    let response = {};
    let findRecord = await authdb.get(req.body.accountID);
    console.log(findRecord);
    findRecord.name = req.body.name;

    let record = await authdb.insert(findRecord);
    response.accountID = record.id;
    response.name = findRecord.name
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
    response.vendors = records.rows;
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
    let findRecord = await vendordb.get(req.body.vendorID);
    console.log(findRecord);
    findRecord.vendorName = req.body.vendorName;

    let record = await vendordb.insert(findRecord);
    response.vendorID = record.id;
    response.vendorName = findRecord.vendorName
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



async function getItems() {

}
async function getItem(req) {

}
async function createItem(req) {

}

async function updateItem(req) {

}

async function deleteItem(req) {

}
async function item(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            responsePromise = await getItems();
            break;
        case 'POST':
            responsePromise = await createItem(req);
            break;
    }

    response = await responsePromise.catch(
        error => res.status(500).send({ error })
    );
    res.send(response);
}


async function getValidation(req) {

}

async function postValidation(req) {

}

async function validate(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            responsePromise = await getValidation(req);
            break;
        case 'POST':
            responsePromise = await postValidation(req);
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
const port = 3000;

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))