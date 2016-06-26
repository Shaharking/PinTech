/**
 * Created by Shahar on 22/06/2016.
 */
import express from 'express';
import validate from 'express-validation';
import paramValidation from './request.validation';
import requestCtrl from './request.controller';
import userCtrl from '../user/user.controller';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/:username')
	.get(requestCtrl.getRequest)
	.post(validate(paramValidation.createRequest), requestCtrl.create);

router.route('/:username/:request')
	.put(validate(paramValidation.updateRequest), requestCtrl.update)
	.delete(requestCtrl.deleteRequest);

router.param('username', userCtrl.load);
router.param('request', requestCtrl.load);

export default router;
