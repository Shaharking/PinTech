import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import BookSchema from '../book/book.model';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		dropDups: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		validate: {
			validator: (v) => {
				/\S+@\S+\.\S+/.test(v);
			},
			message: '{VALUE} is not a mail address!'
		},
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	name: String,
	city: String,
	state: String,
	books: [BookSchema]
});

/**
 * Methods
 */
UserSchema.method({
	findBookById(_id) {
		const book = this.books.id(_id);
		if (!book) {
			return Promise.reject('book not found');
		}
		return Promise.resolve(book);
	},
	findBookByIdSync(_id) {
		const book = this.books.id(_id);
		return book;
	}
});

/**
 * Statics
 */
UserSchema.statics = {
	/**
	 * Get user
	 * @param {ObjectId} id - The objectId of user.
	 * @returns {Promise<User, APIError>}
	 */
	get(id) {
		return this.findById(id)
			.execAsync().then((user) => {
				if (user) {
					return Promise.resolve(user);
				}
				const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
				return Promise.reject(err);
			});
	},

	/**
	 * Get user
	 * @param {String} username - The username of user.
	 * @returns {Promise<User, APIError>}
	 */

	findByUsername(username) {
		return this.findOneAsync({
			username
		}).then((user) => {
			if (user) {
				return Promise.resolve(user);
			}
			const err = new APIError('User not exists', httpStatus.NOT_FOUND);
			return Promise.reject(err);
		});
	},

	/**
	 * Get user
	 * @param {username} username of user.
	 * @param {password} password of user
	 * @returns {Promise<User, APIError>}
	 */
	login(username, password) {
		return this.findOneAsync({
			username,
			password
		}).then((user) => {
			if (user) {
				return Promise.resolve(user);
			}
			const err = new APIError('Worng password / User not exists', httpStatus.NOT_FOUND);
			return Promise.reject(err);
		});
	},
	/**
	 * List users in descending order of 'createdAt' timestamp.
	 * @param {number} skip - Number of users to be skipped.
	 * @param {number} limit - Limit number of users to be returned.
	 * @returns {Promise<User[]>}
	 */
	list({ skip = 0, limit = 50 } = {}) {
		return this.find()
			.select('-password')
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.execAsync();
	},
	findByBook(id) {
		return this.find({ 'books._id': id }).execAsync((err, book) => {
			if (err) {
				Promise.reject(err);
			}
			return Promise.resolve(book);
		});
	}
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
