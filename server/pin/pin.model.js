/**
 * Created by Shahar on 19/06/2016.
 */
import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;
const PinSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	createdby: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

PinSchema.statics = {
	get(user, _id) {
		return this.findOne({
			createdby: user._id,
			_id })
			.populate('createdby')
			.exec((err, pin) => {
				if (err) {
					const errMsg = new APIError('No such pin exists!', httpStatus.NOT_FOUND);
					return Promise.reject(errMsg);
				}
				return Promise.resolve(pin);
			});
	}
};

export default mongoose.model('Pin', PinSchema);
