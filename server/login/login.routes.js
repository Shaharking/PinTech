import express from 'express';
import passport from 'passport';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
	.get((req, res) => {
		res.json(req.user);
	})
	.post(passport.authenticate('local', { failWithError: true }), (req, res) => {
		res.json(req.user);
	});

router.route('/twitter')
		.get(passport.authenticate('twitter'));

router.route('/twitter/callback')
		.get(passport.authenticate('twitter', { failWithError: true }), (req, res) => {
			res.redirect('/');
		});

export default router;
