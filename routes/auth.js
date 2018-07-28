const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const jwtconf = require('../configures/tokenconfig');

const db = require('../services/mongodb');


/* body verification middleware */
const bodyverify = (req, res, next) => {
    if (req.body) {
        next();
    } else {
        res.status(400).send({ message: 'Bad request' });
    }
}

/* Authorization middleware */

const authorize = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, jwtconf.secret(), (err, data) => {
                if (!err) {
                    req.tokendata = data;
                    next();
                } else {
                    res.status(400).send({ message: err.message });
                }
            });
        } else {
            res.status(400).send({ message: 'Missing token' });
        }
    } else {
        res.status(400).send({ message: 'Missing authorization header' });
    }
}

/* POST register new user */
router.post('/register', bodyverify, (req, res, next) => {
    db.setUser(req.body)
        .then(user => {
            res.send({ message: 'Register success' });
        })
        .catch(err => {
            res.status(400).send({ message: err.toString() });
        })
});

/* POST create token for user */
router.post('/token', bodyverify, (req, res, next) => {
    db.getUserByEmailAndPassword(req.body.email, req.body.password)
        .then(user => {
            return jwt.sign({ email: user.email }, jwtconf.secret(), jwtconf.options());
        })
        .then(token => {
            res.send({ token });
        })
        .catch(err => {
            res.status(400).send({ message: err.message });
        })
});

/* GET current user data */
router.get('/getuser', authorize, (req, res, next) => {
    db.getUser({ email: req.tokendata.email })
        .then(user => {
            res.send({ user });
        })
        .catch(err => res.status(400).send({ message: err.message }));
});

/* POST update current user */

router.post('/update', bodyverify, authorize, (req, res, next) => {
    db.updateUser(req.tokendata.email, req.body)
        .then(user => res.send({ user }))
        .catch(err => res.status(400).send({ message: err.message }));
});

module.exports = router;
