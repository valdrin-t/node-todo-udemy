const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: 'Email address is required',
        unique: true,
        trim: true,
        minlength: 5,
        validate: {
            validator: validator.isEmail,
            message: 'Please fill a valid email address'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    // user.tokens.concat({ access, token });
    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    })
};

var User = mongoose.model('User', UserSchema);
module.exports = { User };    