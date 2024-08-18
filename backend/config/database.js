const mongoose = require('mongoose');
// const {MONGO_URI} = require('../config/index');
// console.log(MONGO_URI)
const connectDatabase = () => {
    mongoose.connect("mongodb+srv://rishabhraj5421:z1tsyMwinazWiZS6@mern-ecommerce.yzkk6gx.mongodb.net/storemohit", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        });
}

module.exports = connectDatabase;