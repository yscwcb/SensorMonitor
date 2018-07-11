const express = require('express');
const sql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.locals.pretty = true;
const sqlConn = sql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password    : '12341234',
    database: 'lora_db'
});
sqlConn.connect();
app.set('views', './views_file');
app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'pug'));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(express.static('public'));
 app.use('/script', express.static('js'));
var routeLora = require(path.join(__dirname, 'router' ,'router_lora'))(express, sqlConn);
app.use('/', routeLora);
app.listen(1337, ()=> {
    console.log("Server has been started");
});