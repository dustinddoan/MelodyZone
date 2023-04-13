const {User} = require('../models/user');
const { ApiError } = require('../middleware/apiError');
const httpStatus = require('http-status')
const jwt = require('jsonwebtoken');
require('dotenv').config('../.env');

const findUserByEmail = async(email) => {
    return await User.findOne({email});
};

const findUserById = async(_id) => {
    return await User.findById(_id);
}

const updateUserProfile = async(req) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {
                "$set": {
                    ...req.body.data
                },
               
            },
            { new: true}
        )

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const updateUserEmail = async(req) => {
    try {
        if (await User.emailTaken(req.body.newemail)) {
            throw new ApiError(httpStatus.BAD_GATEWAY, 'Email is already used');
        }


        const user = await User.findOneAndUpdate(
            {_id: req.user._id, email: req.user.email},
            {
                "$set": {
                    email: req.body.newemail,
                    verified: false
                },
               
            },
            { new: true}
        )
        
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }

        return user;
        
    } catch (error) {
        throw error;
    }
}

const validateToken = async(token) => {
    console.log('DUSTIN token: ', token)
    return jwt.verify(token, process.env.DB_SECRET);
}

module.exports = {
    findUserByEmail,
    findUserById,
    updateUserProfile,
    updateUserEmail,
    validateToken
}