const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const indexRoutes = require('../src/routes/indexRoutes');
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const dboptions = {
    host: 'brv7cztx3lins91r9l5q-mysql.services.clever-cloud.com',
    user: 'ubodpomxprundbmg',
    password: 'RhfOq9CC4ULESjLxqRbl',
    port: '3306',
    database: 'brv7cztx3lins91r9l5q',
}
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(myConnection(mysql, dboptions, 'single'));
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});