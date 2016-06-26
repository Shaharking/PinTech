/**
 * Created by Shahar on 22/06/2016.
 */
import Joi from 'joi';

export default {
	// POST /api/users
	createRequest: {
		body: {
			username: Joi.string().required(),
			userbook: Joi.string().required(),
			initiatorbook: Joi.string().required()
		},
		headers: {
			'x-access-token': Joi.string().required()
		}
	},
	updateRequest: {
		body: {
			status: Joi.boolean()
		}
	}
};
