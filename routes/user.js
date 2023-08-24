const express = require ('express');
const {body} = require('express-validator');
const router = express.Router();
const userModel = require('../models/user')
const {signupController, signinController} = require('../controllers/user');
const user = require('../models/user');


router.put('/signup',[

    body('name').trim().not().isEmpty().withMessage('User name is required'),
    body('email')
    .isEmail()
    .withMessage('Email is invalid')
    .custom((value, {req}) => {
        //Todo: check if email is valid
        return userModel.findOne({Email: value}).then(userDoc => {
            if(userDoc)
                return Promise.reject('Email already taken')
        })
    }),
    body('password').trim().isLength({min: 8})
] ,signupController);

router.post('/signin', [
    body('email')
    .isEmail()
    .withMessage('Email is invalid'),
    body('password').trim().isLength({min: 8})
], signinController)

module.exports = router;
