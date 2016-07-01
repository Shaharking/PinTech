/**
 * Created by Shahar on 01/07/2016.
 */
import Joi from 'joi';

export default {
	// POST /api/users
	getByUser: {
		params: {
			userid: Joi.string().required()
		}
	},

	// UPDATE /api/users/:userId
	deletePin: {
		params: {
			pinid: Joi.string().required()
		}
	},

	createPin: {
		body: {
			title: Joi.string().required(),
			picture: Joi.string().required()
		}
	}
};
