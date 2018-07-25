const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// enable cors
const cors = require('cors');

// jwt token tools
const jwt = require('jsonwebtoken');
const jwtconf = require('./configures/tokenconfig');

// jwt.sign({ email: "emila@mail.com", password: "pass"}, jwtconf.secret(), (err, token) => {
//     console.log(token);
//     jwt.verify(token, jwtconf.secret(), (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(data);
//         }
//     })
// })

// import db service

const db = require('./services/mongodb');

// import routers
const users = require('./routes/users');
const index = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/users', users);
app.use('/', index);

module.exports = app;

