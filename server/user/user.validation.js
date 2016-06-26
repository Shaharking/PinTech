import Joi from 'joi';

export default {
	// POST /api/users
	createUser: {
		body: {
			username: Joi.string().required(),
			password: Joi.string().required(),
			email: Joi.string().email()
		}
	},

	// UPDATE /api/users/:userId
	getUser: {
		headers: {
			'x-access-token': Joi.string().required()
		}
	}
};
