/**
 * Created by Shahar on 19/06/2016.
 */
import express from 'express';
import validate from 'express-validation';
import paramValidation from './pin.validation';
import pinCtrl from './pin.controller';
import loginCtrl from 'connect-ensure-login';

const router = express.Router();	// eslint-disable-line new-cap

router.route('')
	.get(pinCtrl.list)
	.post((req, res, next) => {
		loginCtrl.ensureLoggedIn();
		validate(paramValidation.createPin)(req, res, next);
	}, pinCtrl.create);

router.route('/:userid')
	.get(pinCtrl.get);

router.route('/:pinid')
    .delete(pinCtrl.deletePin);

router.param('pinid', pinCtrl.load);

export default router;
