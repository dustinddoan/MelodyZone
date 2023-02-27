const userService = require('../services/user.service');
const httpStatus = require('http-status');
const {ApiError} = require('../middleware/apiError');


const usersController = {
    async profile(req, res, next) {
        try {
            const user = await userService.findUserById(req.user._id);
            console.log('DUSTIN user: ', user)

            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }

            res.json(res.locals.permission.filter(user._doc));
        } catch (error) {
            next(error);
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req);
            if (!user) {
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = usersController;