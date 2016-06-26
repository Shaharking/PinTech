import load from './load';	// eslint-disable-line no-unused-vars
import Promise from 'bluebird';
import mongoose from 'mongoose';

import app from './config/express';

const port = process.env.PORT || 8080;
const ip = process.env.IP || '127.0.0.1';

// promisify mongoose
Promise.promisifyAll(mongoose);

// connect to mongo db
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', () => {
	throw new Error(`unable to connect to database: ${process.env.MONGO_URI}`);
});

const debug = require('debug')('express-mongoose-es6-rest-api:index');

// listen on port config.port
app.listen(port, () => {
	debug(`server started on port ${port} (${ip})`);
});

export default app;
