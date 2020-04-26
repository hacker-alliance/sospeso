require('dotenv').config();
const express = require('express');

const Cloudant = require('@cloudant/cloudant');
const cloudant = Cloudant(process.env.cloudant_url);
const db = cloudant.db.use('sospeso')

let app = express();

function defaultRoute(req, res) {
    res.send(req.path);
}
async function getAccounts() {

}

async function createAccount(req) {

}

async function accounts(req, res) {
    let response = {};
    switch (req.method) {
        case 'GET':
            response = await getAccounts();
        case 'POST':
            response = await createAccount(req);
    }
    res.send(response);
}

async function getAccount(req) {

}
async function authenticateAccount(req) {

}
async function updateAccount(req) {

}

async function deleteAccount(req) {

}

async function account(req, res) {
    let response = {}
    switch (req.method) {
        case 'GET':
            response = await getAccount(req);
        case 'POST':
            response = await authenticateAccount(req);
        case 'PUT':
            response = await updateAccount(req);
        case 'DELETE':
            response = await deleteAccount(req);
    }
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
    let response = {};
    switch (req.method) {
        case 'GET':
            response = await getVendors();
        case 'POST':
            reponse = await createVendor(req);
    }

    res.send(response);
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
        case 'PUT':
            response = await updateVendor(req);
        case 'DELETE':
            response = await deleteVendor(req);
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
        case 'POST':
            response = await createItem(req);
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
        case 'POST':
            response = await validateItem(req);
        case 'PUT':
            response = await updateItem(req);
        case 'DELETE':
            response = await deleteItem(req);
    }

    res.send(response);
}
app.use('/account', accounts);
app.use('/account/:accountID', account);
app.use('/vendor', vendors);
app.use('/vendor/:vendor', vendor);
app.use('/vendor/:vendorID/item', items);
app.use('/vendor/:vendorID/item/:itemID', item);


app.use(defaultRoute);
const port = 3000;

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))