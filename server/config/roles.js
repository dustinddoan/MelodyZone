const AccessControl = require('accesscontrol');

const allRights = {
    'create:any': ['*'],
    'read:any': ['*'],
    'update:any': ['*'],
    'delete:any': ['*']
}

let grantsObject = {
    admin:{
        profile: allRights // this is route /api/user/profile
    },
    user:{
        profile: {
            'read:own': ['*', '!password', '!_id'],
            'update:own': ['*']
        }
    }
}

const roles = new AccessControl(grantsObject);

module.exports = {roles}