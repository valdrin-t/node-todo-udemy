var validator = require('validator');
var mongoose = require('mongoose');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        trim: true,
        validate: [validator.isEmail, 'Please fill a valid email address'],
    }
});

module.exports = {User};    