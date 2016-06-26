import express from 'express';
import passport from 'passport';

const router = express.Router();	// eslint-disable-line new-cap

router.route('/')
	.post(passport.authenticate('local', { failWithError: true }));
