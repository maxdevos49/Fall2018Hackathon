//Require Mongoose
const mongoose = require('mongoose');

//Define schema class
const Schema = mongoose.Schema;

//new user schema
const pictureModel = new Schema({
    filename: {
        type: String,
        required: true
    },
    album: {
        type: String,
        default: "default"
    }
});

module.exports = mongoose.model('picture', pictureModel);
