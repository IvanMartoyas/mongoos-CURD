const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



// const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb://localhost:27017/";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db  = mongoose.connection;

db.once("open", ()=> {
    console.log(" Connection to mongo....")
})

app.use(bodyParser.json());

//..............................................................

const routs = require("./router/routs.js");
app.use('/api/', routs);




app.listen(3000, console.log("server start on http://localhost:3000/ "));