const passport = require('passport');
const {ApiError} = require('./apiError');
const httpStatus = require('http-status');
const { roles } = require('../config/roles');

const verify = (req, res, resolve, reject, rights) => async(err, user) => {
    if (err || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Sorry, unauthorized'));
    }
    req.user = user;


    if (rights.length) {
        const action = rights[0];
        const resource = rights[1];
        // action could be one or array of action [createOwn, updateOwn]
        const permission = roles.can(req.user.role)[action](resource);
        //roles.can(user)[readOwn](profile) 
        if (!permission.granted) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'You don not have rights to access'));
        }

        res.locals.permission = permission;
        console.log('DUSTIN permission upper1: ', permission)

    }

    req.user = user;

    resolve();
}


const auth = (...rights) => async(req, res, next) => {
    console.log('DUSTIN rights: ', rights)
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', {session:false}, verify(req, res, resolve, reject, rights))(req, res, next)
    })
    .then(() => next())
    .catch((err) => next(err))
}

module.exports = auth;