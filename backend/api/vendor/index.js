//require('dotenv').config();

// const Cloudant = require('@cloudant/cloudant');
// const cloudant = Cloudant(process.env.cloudant_url);
// const db = cloudant.db.use('sospeso')

// const books = [
//     { author: "Charles Dickens", title: "David Copperfield" },
//     { author: "David Copperfield", title: "Tales of the Impossible" },
//     { author: "Charles Dickens", title: "Great Expectation" }
// ]


function main(params) {
    let payload = 'hello';
    // switch (params.__ow_method) {
    //     case 'get':
    //         // payload.found = await db.list();
    //         break;
    //     case 'post':
    //         // payload.body = params;
    //         break;

    // }
    return { payload };
}

// async function testget() {
//     let params = {
//         __ow_method: 'get'
//     }
//     let result = await main(params);
//     console.log(result);
// }
// testget();

// async function testpost() {
//     let params = {
//         __ow_method: 'post',
//         __ow_body: JSON.stringify({ 'test': 'test2' })
//     }
//     let result = await main(params);
//     console.log(result.payload);
// }
// testpost();

exports.main = main;