/**
 * Created by Shahar on 01/07/2016.
 */
import Pin from './pin.model';

function list(req, res, next) {
	Pin.find({})
			.select('-password')
			.populate('createdby')
			.exec((err, pins) => {
				if (err) {
					next(new Error(err));
				}
				res.json(pins);
			});
}

function get(req, res, next) { // eslint-disable-line no-unused-vars
	const user = {
		createdby: req.params.userid
	};
	Pin.find(user)
			.select('-password')
			.populate('createdby')
			.exec((err, pins) => {
				if (err) {
					next(new Error(err));
				}
				res.json(pins);
			});
}

function load(req, res, next, value) {
	const user = req.user;
	Pin.get(user, value).then((pin) => {
		req.pin = pin; // eslint-disable-line no-param-reassign
		next();
	});
}

function deletePin(req, res, next) {
	const pin = req.pin;
	pin.removeAsync()
			.then((pinRemoved) => res.json(pinRemoved))
			.error((e) => next(e));
}

function create(req, res, next) {
	const pin = new Pin({
		title: req.body.title,
		picture: req.body.picture,
		createdby: req.user._id
	});

	pin.saveAsync()
			.then((savedPin) => res.json(savedPin))
			.error((e) => next(e));
}

export default { create, deletePin, list, load, get };
