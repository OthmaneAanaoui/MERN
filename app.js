const express = require('express');
const app = express();
const morgan = require('morgan');
const func = require('./fn/function');
const router = require('./router');
const mongodb = require('./db/mongo');
const cors = require('cors');
const soap = require('soap');

mongodb.InitDbConnection();

app.use(cors({
    exposedHeaders: ['Authorization'],
    origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var serviceSoap = require('./service/userServiceSoap');

const xml = require('fs').readFileSync('./user.wsdl', 'utf8');
const xml2 = require('fs').readFileSync('./lobby.wsdl', 'utf8');
app.listen(func.normalizePort(process.env.PORT || '3000'), () =>{
    soap.listen(app, '/user', serviceSoap, xml, ()=>{
        console.log('server initialized');
    });
});

