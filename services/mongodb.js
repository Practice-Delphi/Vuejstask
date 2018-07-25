// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = mongoose.ObjectId;

const UserSchema = new Schema({
    name: {
        type: String, default: "myname",
        required: [true, "Name must be not empty"]
    },
    email: {
        type: String, default: "myemail",
        required: [true, "Email must be not empty"],
        unique: true,
        // validate: {
        //     validator: (v) => {
        //         return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        //     },
        //     message: '{VALUE} is not a valid email!'
        // },
    },
    password: {
        type: String,
        default: "pass",
        required: [true, "Password must be not empty"]
    },
    photo: {
        type: String, default: ""
    },
});

// Connection URL
const dburl = 'mongodb://localhost:27017/vueappdb';

// Database Name
const dbName = 'vueappdb';

class DataBase {
    constructor(url) {
        this.db = null;
        // MongoClient
        //     .connect(url, { useNewUrlParser: true })
        //     .then((db) => {
        //         // console.log(db);
        //         this.db = db;
        //     })
        //     .catch(err => {
        //         console.log(`Connection failed\n ${err.toString()}`);
        //     })
        mongoose.createConnection(url, { useNewUrlParser: true })
            .then(conn => {
                this.db = conn;
                this.User = this.db.model("User", UserSchema);
                console.log("MongoDB is connected");
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
            this.User.find(user)
            .then(data => {
                if (data[0]) {
                    resolve(data[0]);
                } else {
                    reject("User not find");
                }
            })
            .catch(err => reject(err));
        });
    }

    setUser(user) {
        let curruser = new this.User(user);
        return new Promise((resolve, reject) => {
            this.User.find({ email: user.email })
                .then(dat => {
                    if (!dat[0]) {
                        return curruser.save()
                    } else {
                        reject("This email is already used");
                    }
                })
                .then(() => {
                    return this.User.find(user)
                })
                .then(data => resolve(data[0]))
                .catch(err => reject(err));
        });
    }
}

const database = new DataBase(dburl);

module.exports = database;