const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config('../.env');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    firstname: {
        type: String,
        default: '',
        trim: true,
        maxLength: 100
    },
    lastname: {
        type: String,
        default: '',
        trim: true,
        maxLength: 100
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    verified: {
        type: Boolean,
        default: false
    }
});

// middleware

// before user.save() hash the password, reassign password to user and next() - save()
userSchema.pre('save', async function(next) {
    let user = this;

    if (user.isModified('password')) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
    }
    
    next();
})

// generate token so that user can use for all other request, expires in 1 day

userSchema.methods.generateAuthToken = function() {
    let user = this;
    const userObj = {sub: user._id.toHexString()};
    const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '1d'});

    return token;
}

userSchema.methods.generateRegisterToken = function() {
    let user = this;
    const userObj = {sub: user._id.toHexString()};
    const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '10h'});

    return token;
}

// check if email already taken before create a new user
userSchema.statics.emailTaken = async function(email) {
    const user = await this.findOne({email});
    return !! user;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
}

const User = mongoose.model('User', userSchema);

module.exports = {User};