import passport from 'passport';
import localPassport from 'passport-local';
import twitterPassport from 'passport-twitter';
import User from './user.model';

passport.use(new localPassport.Strategy((username, password, cb) => {
	User.findByUsername(username).then((user) => {
		if (!user) {
			return cb(null, false, {
				message: 'User not found'
			});
		}
		if (user.password !== password) {
			return cb(null, false, 'Password is invalid');
		}
		return cb(null, user);
	})
	.catch((err) => {
		if (err) {
			return cb(err);
		}
	});
  }));

passport.use(new twitterPassport.Strategy({
	consumerKey: process.env.CONSUMER_KEY,
	consumerSecret: process.env.CONSUMER_SECRET,
	callbackURL: `${process.env.URL}/api/login/twitter/callback`
}, 	(token, tokenSecret, profile, cb) => {
	// In this example, the user's Twitter profile is supplied as the user
	// record.  In a production-quality application, the Twitter profile should
	// be associated with a user record in the application's database, which
	// allows for account linking and authentication with other identity
	// providers.
	console.log(profile);
	User.findOrCreateTwitterAccount(profile)
			.then((user) => {
				cb(null, user);
			})
			.catch((err) => {
				cb(err);
			});
}));
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Twitter profile is serialized
// and deserialized.
// https://github.com/passport/express-4.x-local-example/blob/master/server.js
passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((obj, cb) => {
	cb(null, obj);
});
