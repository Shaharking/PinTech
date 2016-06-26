import express from 'express';
import validate from 'express-validation';
import paramValidation from './user.validation';
import userCtrl from './user.controller';

const debug = require('debug')('express-mongoose-es6-rest-api:index');
const router = express.Router();	// eslint-disable-line new-cap
const secret = {
	secret: process.env.SECRET_KEY
};
debug(secret);
router.route('/')
	/** GET /api/users - Get list of users */
	.get(userCtrl.list)

	/** POST /api/users - Create new user */
	.post(validate(paramValidation.createUser), userCtrl.create);

router.route('/:username')
	/** GET /api/users/:token - Get user */
	.get(validate(paramValidation.getUser), userCtrl.get)

	/** PUT /api/users/:token - Update user */
	.put(validate(paramValidation.getUser), userCtrl.update)

	/** DELETE /api/users/:token - Delete user */
	.delete(validate(paramValidation.getUser), userCtrl.remove);

/** Load user when API with userId route parameter is hit , required a token*/
router.param('username', userCtrl.load);

export default router;
