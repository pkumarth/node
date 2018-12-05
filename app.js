#!/usr/bin/env node
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config.json");
const mongoose = require("mongoose");
//===Derived================================
const app = express();
// Imports routes for the products
const product = require('./routes/product.route'); 
const PORT = process.env.PORT || config.network.PORT;
//============DB SETUP=========================
// Set up mongoose connection
//let dev_db_url = 'mongodb://someuser:abcd1234@ds123619.mlab.com:23619/productstutorial';
//  "url":"mongodb://localhost:27017/productstutorial"
mongoose.connect(
    config.mongodb.url, {
        useNewUrlParser: true
    },
    err => {
        if (err) throw err;
        console.log(`Successfully connected to database....`);
    }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//============== configure app to use bodyParser()================
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//=============== REGISTER OUR ROUTES -------------------------------
//routes
app.use('/products', product);
app.get('/', (req, res) => res.send('Hello World!'))
//======================= START THE SERVER====================
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

