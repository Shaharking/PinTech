/**
 * Created by Shahar on 18/06/2016.
 */
import express from 'express';
import validate from 'express-validation';
import paramValidation from './login.validation';
import loginCtrl from './login.controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
    .post(validate(paramValidation.loginUser), loginCtrl.login);

export default router;
