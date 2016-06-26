/**
 * Created by Shahar on 19/06/2016.
 */
//	import Promise from 'bluebird';
import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	picture: {
		type: String,
		required: true
	},
	requested: {
		type: Boolean,
		default: false
	}
});

export default BookSchema;
