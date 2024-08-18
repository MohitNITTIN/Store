const mongoose = require('mongoose');
const {MONGO_URI} = require('../config/index');

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/store", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;