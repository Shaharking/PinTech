/**
 * Created by Shahar on 18/06/2016.
 */
import Joi from 'joi';

export default {
	// POST /api/users
	loginUser: {
		body: {
			username: Joi.string().required(),
			password: Joi.string().required()
		}
	}
};
