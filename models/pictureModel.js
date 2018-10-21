//Require Mongoose
const mongoose = require('mongoose');

//Define schema class
const Schema = mongoose.Schema;

//new user schema
const pictureModel = new Schema({
    origFileName: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    album: {
        type: String,
        default: "General"
    },
    tag: [
        {
            type: String,
            default: []
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    UpdatedOn: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model('picture', pictureModel);
