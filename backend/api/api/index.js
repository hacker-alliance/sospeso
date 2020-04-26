const express = require('express');

let app = express();

function defaultRoute(req, res) {
    res.send(req.path);
}

function account(req, res) {
    res.send(req.path);
}
function vendor(req, res) {
    res.send(req.path);
}
function item(req, res) {
    res.send(req.path);
}

app.use('/account', account);
app.use('/vendor', vendor);
app.use('/vendor/:vendor/item', item);

app.use(defaultRoute);
const port = 3000;

app.listen(port, () => console.log(`API listening at http://localhost:${port}`))