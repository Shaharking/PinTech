/**
 * Created by Shahar on 18/06/2016.
 */
import User from '../user/user.model';
import jwt from 'jsonwebtoken';

/**
 * log a user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function login(req, res, next) {
	const userDetails = {};
	userDetails.username = req.body.username;
	userDetails.password = req.body.password;
	User.login(userDetails.username, userDetails.password)
		.then((user) => {
			const token = jwt.sign(user.toObject(), process.env.SECRET_KEY, {
				expiresIn: '1d'
			});

			return res.json({
				token,
				username: userDetails.username
			});
		})
		.error((e) => next(e));
}

export default { login };
