/**
 * Created by Shahar on 20/06/2016.
 */
import Request from './request.model';
import User from '../user/user.model';
import Promise from 'bluebird';

function load(req, res, next, _id) {
	Request.findOne({ _id })
			.populate('user')
			.populate('initiator')
			.exec((err, requestObj) => {
				if (err) {
					return next(new Error(err));
				}
				req.request = requestObj; // eslint-disable-line no-param-reassign
				return next();
			});
}

function create(req, res, next) {
	const userid = req.body.username;
	User.get(userid).then((user) => {
		const newRequest = new Request({
			user: user._id,
			userbook: req.body.userbook,
			initiator: req.user._id,
			initiatorbook: req.body.initiatorbook
		});

		req.user.findBookById(newRequest.initiatorbook)
				.then((book) => {
					book.requested = true; // eslint-disable-line no-param-reassign
					req.user.saveAsync();
				});

		user.findBookById(newRequest.userbook)
				.then((book) => {
					book.requested = true; // eslint-disable-line no-param-reassign
					user.saveAsync();
				});

		newRequest.saveAsync()
			.then((savedRequest) => res.json(savedRequest))
			.error((e) => next(e));
	});
}

function update(req, res, next) {
	const request = req.request;
	if (request.user.username === req.user.username) {
		request.status = req.body.status;
		request.active = false;
		request.saveAsync()
				.then((savedRequest) => res.json(_renderRequest(savedRequest)))
				.error((e) => next(e));
	} else {
		next(new Error('You are not the user that should accept that exchange'));
	}
}

function deleteRequest(req, res, next) {
	const request = req.request;
	if (request.initiator.username === req.user.username) {
		request.removeAsync()
				.then((deletedRequest) => res.json(deletedRequest))
				.error((e) => next(e));
	}
}

function getRequest(req, res) {
	const user = req.user;
	Promise.props({
		byUser: Request.find({ user: user._id }).populate('user')
				.populate('initiator'),
		fromUser: Request.find({ initiator: user._id }).populate('user')
				.populate('initiator')
	}).then((result) => {
		const jsonResult = {};
		jsonResult.byUser = result.byUser.map((request) => {
			const jResult = _renderRequest(request);
			return jResult;
		});
		jsonResult.fromUser = result.fromUser.map((request) => {
			const jResult = _renderRequest(request);
			return jResult;
		});
		res.json(jsonResult);
	});
}

function _renderRequest(request) {
	const requstDetails = {
		id: request._id,
		userbook: request.user.findBookByIdSync(request.userbook),
		initiatorbook: request.initiator.findBookByIdSync(request.initiatorbook),
		active: request.active,
		status: request.status
	};
	return requstDetails;
}

export default { create, update, deleteRequest, getRequest, load };
