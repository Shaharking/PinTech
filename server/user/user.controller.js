import User from './user.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
	if (id === req.user._id) {
		return next();
	}
	next(new Error('You can get only your use data'));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
	return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		name: req.body.username
	});

	user.saveAsync()
		.then((savedUser) => res.json(savedUser))
		.error((e) => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.city - The city of user.
 * @property {string} req.body.state - The state of user.
 * @returns {User}
 */
function update(req, res, next) {
	const user = req.user;
	user.name = req.body.name;
	user.city = req.body.city;
	user.state = req.body.state;

	user.saveAsync()
			.then((savedUser) => res.json(savedUser))
			.error((e) => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
	const { limit = 50, skip = 0 } = req.query;
	User.list({ limit, skip }).then((users) =>	res.json(users))
		.error((e) => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
	const user = req.user;
	user.removeAsync()
		.then((deletedUser) => res.json(deletedUser))
		.error((e) => next(e));
}

export default { load, get, create, update, list, remove };
