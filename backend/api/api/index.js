require('dotenv').config();
const express = require('express');

const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant(process.env.cloudant_url);
const authdb = cloudant.db.use('authentication');
const vendordb = cloudant.db.use('vendor');

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
    let records = await authdb.list();
    console.log(records.rows);
    response.accounts = records.rows;
    return response;
}

async function createAccount(req) {
    let response = {};

    let record = await authdb.insert({
        _id: req.body.accountID,

    });
    console.log(record);
    response.accountID = record.id;
    return response;
}

async function updateAccount(req) {
    let response = {};
    let findRecord = await authdb.get(req.body.accountID);
    console.log(findRecord);
    findRecord.test = 'test';
    let record = await authdb.insert(findRecord);

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

async function accounts(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            responsePromise = getAccounts(req);
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
    let response = {};
    let record = await authdb.get(req.body.accountID);
    console.log(record);
    response.accountID = record._id;
    console.log(response);
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
    response.found = await db.list();
    return response;
}

async function createVendor(req) {

}

async function vendors(req, res) {
    let responsePromise = {};
    switch (req.method) {
        case 'GET':
            responsePromise = getVendors();
            break;
        case 'POST':
            reponse = createVendor(req);
            break;
    }

    res.send(responsePromise);
}

async function getVendor(req) {

}

async function updateVendor(req) {

}

async function deleteVendor(req) {

}

async function vendor(req, res) {
    let response = {};
    switch (req.method) {
        case 'GET':
            response = await getVendor(req);
            break;
        case 'PUT':
            response = await updateVendor(req);
            break;
        case 'DELETE':
            response = await deleteVendor(req);
            break;
    }

    res.send(response);
}

async function getItems() {

}

async function createItem(req) {

}

async function items(req, res) {
    let response = {};
    switch (req.method) {
        case 'GET':
            response = await getItems();
            break;
        case 'POST':
            response = await createItem(req);
            break;
    }

    res.send(response);
}

async function getItem(req) {

}
async function validateItem(req) {

}

async function updateItem(req) {

}

async function deleteItem(req) {

}

async function item(req, res) {
    let response = {};
    switch (req.method) {
        case 'GET':
            response = await getItem(req);
            break;
        case 'POST':
            response = await validateItem(req);
            break;
        case 'PUT':
            response = await updateItem(req);
            break;
        case 'DELETE':
            response = await deleteItem(req);
            break;
    }

    res.send(response);
}

app.use('/account/authenticate', authenticate);
app.use('/account', accounts);
app.use('/vendor', vendors);
app.use('/vendor/:vendor', vendor);
app.use('/vendor/:vendorID/item', items);
app.use('/vendor/:vendorID/item/:itemID', item);


app.use(defaultRoute);
const port = 3000;

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))