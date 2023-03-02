const mongoose = require('mongoose');

const siteShema = mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Site = mongoose.model('Site', siteShema);

module.exports = {Site}