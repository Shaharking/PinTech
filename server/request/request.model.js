/**
 * Created by Shahar on 20/06/2016.
 */
// import Promise from 'bluebird';
import mongoose from 'mongoose';
// import httpStatus from 'http-status';
// import APIError from '../helpers/APIError';

const Schema = mongoose.Schema;

const RequestSchema = new mongoose.Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	userbook: String,
	initiator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	initiatorbook: String,
	status: {
		type: Boolean,
		default: false
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	active: {
		type: Boolean,
		default: true
	}
});

export default mongoose.model('Request', RequestSchema);
