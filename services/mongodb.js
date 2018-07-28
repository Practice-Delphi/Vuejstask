// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const bcryptconf = require('../configures/bcryptconfig');

const Schema = mongoose.Schema;
// const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String,
        default: 'myname',
        required: [true, 'Name must be not empty']
    },
    email: {
        type: String,
        default: 'myemail',
        required: [true, 'Email must be not empty'],
        unique: true
        // validate: {
        //     validator: (v) => {
        //         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        //     },
        //     message: '{VALUE} is not a valid email!'
        // },
    },
    password: {
        type: String,
        default: 'pass',
        required: [true, 'Password must be not empty']
    },
    photo: {
        type: String, default: ''
    }
});

// Connection URL
const dburl = 'mongodb://localhost:27017/vueappdb';

class DataBase {
    constructor(url) {
        this.db = null;
        mongoose.createConnection(url, { useNewUrlParser: true })
            .then(conn => {
                this.db = conn;
                this.User = this.db.model('User', UserSchema);
                console.log('MongoDB is connected');
            })
            .catch(err => {
                console.log(`Connection failed\n ${err.toString()}`);
            });
    }

    get() {
        return this.db;
    }

    getUser(user) {
        return new Promise((resolve, reject) => {
            this.User.findOne(user)
                .then(data => {
                    if (data) {
                        data.password = undefined;
                        resolve(data);
                    } else {
                        reject(new Error('User not find'));
                    }
                })
                .catch(err => reject(err));
        });
    }

    getUserByEmailAndPassword(email, password) {
        return new Promise((resolve, reject) => {
            if (!email) {
                reject(new Error('Email is empty'));
            } else if (!password) {
                reject(new Error('Password is empty'));
            } else {
                this.User.findOne({ email })
                    .then(data => {
                        if (data) {
                            bcrypt.compare(password, data.password)
                                .then(res => {
                                    if (res) {
                                        resolve(data);
                                    } else {
                                        reject(new Error('Password is wrong'));
                                    }
                                });
                        } else {
                            reject(new Error('User not find'));
                        }
                    })
                    .then(res => {
                    })
                    .catch(err => reject(err));
            }
        });
    }
    
    setUser(user) {
        return new Promise((resolve, reject) => {
            if (user.password !== user.passconf) {
                reject(new Error('Password not confirmed'));
            }
            this.User.findOne({ email: user.email })
                .then(dat => {
                    if (!dat) {
                        return bcrypt.hash(user.password, bcryptconf.saltrounds());
                    } else {
                        reject(new Error('This email is already used'));
                    }
                })
                .then(hash => {
                    user.password = hash;
                    let curruser = new this.User(user);
                    return curruser.save();
                })
                .then(() => {
                    return this.getUser({ email: user.email });
                })
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    }

    updateUser(email, updates) {
        return new Promise((resolve, reject) => {
            this.getUser({ email })
                .then(user => {
                    if (updates.password) {
                        updates.password = bcrypt.hashSync(updates.password, bcryptconf.saltrounds());
                    }
                    if (updates.photo) {
                        updates.photo = undefined;
                    }
                    return this.User.findByIdAndUpdate(user._id, updates, { new: true });
                })
                .then(newuser => {
                    newuser.password = undefined;
                    resolve(newuser);
                })
                .catch(err => reject(err));
        });
    }
}

const database = new DataBase(dburl);

module.exports = database;
